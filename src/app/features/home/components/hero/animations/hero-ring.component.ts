import { Component, ElementRef, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

@Component({
  selector: 'app-hero-ring',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #ringCanvas class="ring-canvas"></canvas>`,
  styles: [`
    .ring-canvas {
      position: absolute;
      top: 0; left: 0; 
      width: 100vw; height: 100vh;
      z-index: 1; 
      pointer-events: none;
      background-color: #000000; /* Negro puro para la física de luz */
    }
  `]
})
export class HeroRingComponent implements OnInit, OnDestroy {
  @ViewChild('ringCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private renderer!: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  
  private cometGroup!: THREE.Group;
  private ring!: THREE.Mesh;
  private particles!: THREE.Points;
  private horizon!: THREE.Mesh;
  
  private animationFrameId?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initEngine();
      this.playCinematicReveal();
    }
  }

  private initEngine() {
    this.scene = new THREE.Scene();
    
    // Cámara posicionada para mirar ligeramente hacia abajo al horizonte
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2.5, 9);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 1);

    // --- MOTOR DE RESPLANDOR (BLOOM) ---
    const renderScene = new RenderPass(this.scene, this.camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      2.0,  // Intensidad del resplandor
      0.5,  // Radio de expansión
      0.1   // Umbral bajísimo para que todo brille
    );
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(bloomPass);

    const cyanColor = new THREE.Color(0x00dbe7);

    // =========================================================
    // 1. EL HORIZONTE PLANETARIO (Curva perfecta)
    // =========================================================
    const horizonGeo = new THREE.SphereGeometry(150, 64, 64);
    const horizonMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: cyanColor },
        uOpacity: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          // Fresnel: solo el borde superior de la esfera brilla
          float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          
          // Hacemos que la luz sea más fuerte en el centro y se desvanezca a los lados
          vec3 finalColor = uColor * intensity * 1.5;
          gl_FragColor = vec4(finalColor, intensity * uOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.horizon = new THREE.Mesh(horizonGeo, horizonMat);
    // Posicionamos la esfera GIGANTE muy abajo. Solo asoma la cresta curva.
    this.horizon.position.set(0, -150.8, -3); 
    this.scene.add(this.horizon);

    // =========================================================
    // 2. EL COMETA Y SU ESTELA (Sin parpadeos)
    // =========================================================
    this.cometGroup = new THREE.Group();

    const ringRadius = 4.2;
    const ringGeo = new THREE.TorusGeometry(ringRadius, 0.012, 16, 256);
    const ringMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: cyanColor },
        uOpacity: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          // El secreto para no parpadear: el degradado es estático en la geometría.
          // Lo que girará será el objeto entero, no el shader.
          
          // La cabeza del cometa está en vUv.x = 0.0 (y 1.0)
          float head = smoothstep(0.98, 1.0, vUv.x) + smoothstep(0.0, 0.02, vUv.x);
          
          // La cola se difumina suavemente hacia atrás
          float tail = pow(vUv.x, 3.5);
          
          vec3 color = mix(uColor * tail, vec3(1.0), head) * 2.5; // Blanco puro en la cabeza
          float alpha = (head + tail) * uOpacity;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.ring = new THREE.Mesh(ringGeo, ringMat);
    this.cometGroup.add(this.ring);

    // =========================================================
    // 3. POLVO ESTELAR (Partículas estáticas en el grupo)
    // =========================================================
    const pCount = 150;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pAlpha = new Float32Array(pCount); // Opacidad individual
    
    for(let i=0; i<pCount; i++) {
      // Concentramos las partículas detrás de la cabeza del cometa
      const angle = Math.pow(Math.random(), 2.0) * Math.PI * 1.5; 
      
      const radiusOffset = ringRadius + (Math.random() - 0.5) * 0.2;
      
      pPos[i*3] = Math.cos(angle) * radiusOffset;
      pPos[i*3+1] = Math.sin(angle) * radiusOffset;
      pPos[i*3+2] = (Math.random() - 0.5) * 0.2;
      
      // Se vuelven invisibles a medida que se alejan de la cabeza
      pAlpha[i] = 1.0 - (angle / (Math.PI * 1.5));
    }
    
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pAlpha, 1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: cyanColor },
        uOpacity: { value: 0 }
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = 2.5 * (8.0 / -mvPos.z);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        uniform float uOpacity;
        uniform vec3 uColor;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          
          vec3 finalColor = mix(uColor, vec3(1.0), vAlpha * 0.8);
          gl_FragColor = vec4(finalColor, (1.0 - dist * 2.0) * vAlpha * uOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.particles = new THREE.Points(pGeo, pMat);
    this.cometGroup.add(this.particles);

    // =========================================================
    // INCLINACIÓN Y POSICIÓN FINAL DEL GRUPO
    // =========================================================
    // Inclinamos todo el grupo junto (anillo + partículas)
    this.cometGroup.rotation.x = Math.PI / 2.2; 
    this.cometGroup.position.y = 1.2;
    this.scene.add(this.cometGroup);

    this.animate();
  }

  private playCinematicReveal() {
    const horizonMat = this.horizon.material as THREE.ShaderMaterial;
    const ringMat = this.ring.material as THREE.ShaderMaterial;
    const pMat = this.particles.material as THREE.ShaderMaterial;

    const tl = gsap.timeline({ delay: 0.2 });
    
    // Revelado cinematográfico
    tl.to(horizonMat.uniforms['uOpacity'], { value: 1.0, duration: 3, ease: "power2.out" });
    tl.to([ringMat.uniforms['uOpacity'], pMat.uniforms['uOpacity']], { value: 1.0, duration: 2, ease: "sine.inOut" }, "-=1.5");
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    
    // Gira físicamente el objeto entero. Cero problemas matemáticos de UVs.
    if (this.cometGroup) {
      this.cometGroup.rotation.z -= 0.015;
    }
    
    this.composer.render();
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) {
      this.renderer.dispose();
      this.scene.clear();
    }
  }
}