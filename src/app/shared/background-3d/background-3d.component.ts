// import { Component, ElementRef, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import * as THREE from 'three';

// @Component({
//   selector: 'app-background-3d',
//   standalone: true,
//   template: `<div #canvasContainer class="canvas-container"></div>`,
//   styles: [`
//     .canvas-container {
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       z-index: -1;
//       pointer-events: none;
//       background: #000000;
//     }
//   `]
// })
// export class Background3dComponent implements OnInit, OnDestroy {
//   private renderer!: THREE.WebGLRenderer;
//   private scene!: THREE.Scene;
//   private camera!: THREE.PerspectiveCamera;
//   private points!: THREE.Points;
//   private mouse = { x: 0, y: 0 };
//   private target = { x: 0, y: 0 };

//   constructor(@Inject(PLATFORM_ID) private platformId: Object, private el: ElementRef) {}

//   @HostListener('window:mousemove', ['$event'])
//   onMouseMove(event: MouseEvent) {
//     this.mouse.x = (event.clientX - window.innerWidth / 2) / 100;
//     this.mouse.y = (event.clientY - window.innerHeight / 2) / 100;
//   }

//   ngOnInit() {
//     if (isPlatformBrowser(this.platformId)) {
//       this.initThree();
//     }
//   }

//   private initThree() {
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
//     this.camera.position.z = 1000;

//     this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     this.el.nativeElement.querySelector('.canvas-container').appendChild(this.renderer.domElement);

//     // Sistema de Partículas (Estilo Nebulosa Técnica)
//     const geometry = new THREE.BufferGeometry();
//     const vertices = [];
//     for (let i = 0; i < 8000; i++) {
//       vertices.push(
//         THREE.MathUtils.randFloatSpread(2000), 
//         THREE.MathUtils.randFloatSpread(2000), 
//         THREE.MathUtils.randFloatSpread(2000)
//       );
//     }
//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

//     const material = new THREE.PointsMaterial({
//       color: 0x00dbe7,
//       size: 1.5,
//       transparent: true,
//       opacity: 0.4,
//       blending: THREE.AdditiveBlending
//     });

//     this.points = new THREE.Points(geometry, material);
//     this.scene.add(this.points);

//     this.animate();
//   }

//   private animate() {
//     requestAnimationFrame(() => this.animate());

//     // Suavizado de movimiento (Lerp)
//     this.target.x += (this.mouse.x - this.target.x) * 0.05;
//     this.target.y += (this.mouse.y - this.target.y) * 0.05;

//     this.points.rotation.y += 0.001;
//     this.points.rotation.x = this.target.y * 0.2;
//     this.points.rotation.y = this.target.x * 0.2;

//     this.renderer.render(this.scene, this.camera);
//   }

//   ngOnDestroy() {
//     if (this.renderer) {
//       this.renderer.dispose();
//     }
//   }
// }

import { Component, ElementRef, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

@Component({
  selector: 'app-background-3d',
  standalone: true,
  template: `<div #canvasContainer class="canvas-container"></div>`,
  styles: [`
    .canvas-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      background: radial-gradient(circle at center, #000814 0%, #000000 100%);
      overflow: hidden;
    }
  `]
})
export class Background3dComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private mesh!: THREE.Mesh;
  private geometry!: THREE.PlaneGeometry;
  private noise2D = createNoise2D();
  private clock = new THREE.Clock();
  
  private mouse = { x: 0, y: 0 };
  private targetMouse = { x: 0, y: 0 };
  private is3dEnabled = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Normalizado de -1 a 1 para cálculos de Three.js
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (!this.is3dEnabled || !this.camera || !this.renderer) return;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.is3dEnabled = !prefersReducedMotion;

      if (!this.is3dEnabled) return;

      this.initThree();
    }
  }

  private initThree() {
    // 1. Escena y Cámara
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 15); // Distancia para cubrir la pantalla

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Reducimos densidad en pantallas pequeñas para mantener el fondo activo sin penalizar rendimiento.
    const isSmallViewport = window.innerWidth < 768;
    const widthSegments = isSmallViewport ? 72 : 120;
    const heightSegments = isSmallViewport ? 72 : 120;
    this.geometry = new THREE.PlaneGeometry(80, 60, widthSegments, heightSegments);

    // 4. Material Estilo Neon Grid
    const material = new THREE.MeshPhongMaterial({
      color: 0x00dbe7,
      wireframe: true,
      transparent: true,
      opacity: isSmallViewport ? 0.14 : 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    this.mesh = new THREE.Mesh(this.geometry, material);
    // Inclinación leve para dar profundidad de "campo"
    this.mesh.rotation.x = -Math.PI / 2.5; 
    this.scene.add(this.mesh);

    // 5. Luces
    const mainLight = new THREE.PointLight(0x00dbe7, 20, 100);
    mainLight.position.set(0, 5, 10);
    this.scene.add(mainLight);

    const ambientLight = new THREE.AmbientLight(0x00151f, 2);
    this.scene.add(ambientLight);

    this.animate();
  }

  private animate() {
    if (!this.renderer) return;
    requestAnimationFrame(() => this.animate());

    const time = this.clock.getElapsedTime();
    
    // Suavizado del movimiento del mouse (Lerp)
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    const pos = this.geometry.attributes['position'];

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // RUIDO: El "time * 0.5" hace que las ondas fluyan solas
      // El factor "y - time" hace que parezca que avanzamos sobre la malla
      let noise = this.noise2D(x * 0.07, (y * 0.07) - (time * 0.4)) * 2.5;

      // INTERACCIÓN MOUSE: Crea un bulto/onda que sigue al mouse
      // Multiplicamos mouse.x/y por factores de escala de la malla
      const dist = Math.sqrt(
        Math.pow(x - (this.mouse.x * 30), 2) + 
        Math.pow(y - (this.mouse.y * 20), 2)
      );
      
      const mouseInfluence = Math.exp(-dist * 0.3) * 6;

      // Aplicamos la deformación en el eje Z
      pos.setZ(i, noise + mouseInfluence);
    }

    pos.needsUpdate = true;

    // Movimiento sutil de la cámara para aumentar la inmersión
    this.camera.position.x += (this.mouse.x * 2 - this.camera.position.x) * 0.02;
    this.camera.rotation.y = -this.mouse.x * 0.1;

    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
      this.geometry.dispose();
      (this.mesh.material as THREE.Material).dispose();
    }
  }
}
