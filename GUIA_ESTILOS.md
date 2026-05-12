# 🎨 Guía de Estilos - RLP Software Factory

## Paleta de Colores

### Colores Primarios
| Color | Hex | Uso |
|-------|-----|-----|
| Primary | #00dbe7 | Botones, acentos |
| Surface | #08132a | Fondo principal |
| Surface Container | #151f37 | Contenedores |
| Surface Container Low | #101b33 | Fondos secundarios |

### Colores de Texto
| Color | Hex | Uso |
|-------|-----|-----|
| On Surface | #d9e2ff | Texto principal |
| On Surface Variant | #b9cacb | Texto secundario |
| On Primary | #00363a | Texto sobre primary |

## Tipografía

### Fuentes Utilizadas
```scss
// Display/Títulos
font-family: 'Montserrat';
font-weight: 600, 700, 800;

// Cuerpo
font-family: 'Inter';
font-weight: 400, 600;
```

### Estilos de Texto
```scss
// Título Principal
.font-display-lg {
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
}

// Título Secundario
.font-headline-md {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

// Cuerpo
.text-body-md {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

// Etiquetas
.font-label-caps {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 16px;
}
```

## Espaciado

```scss
$spacing-xs:   8px;   // Muy pequeño
$spacing-sm:   16px;  // Pequeño
$spacing-md:   24px;  // Medio
$spacing-lg:   48px;  // Grande
$spacing-xl:   80px;  // Extra grande
```

## Componentes UI

### Botón Primario
```html
<button class="bg-primary-fixed-dim text-on-primary px-lg py-md rounded-lg 
               font-label-caps text-label-caps font-bold hover:brightness-110 
               active:scale-95 transition-all duration-200">
  Acción
</button>
```

### Botón Secundario
```html
<button class="border border-primary-fixed-dim text-primary-fixed-dim px-lg py-md 
               rounded-lg font-label-caps font-bold hover:bg-primary-fixed-dim/10 
               transition-all">
  Acción
</button>
```

### Glass Panel
```html
<div class="glass-panel p-lg rounded-xl">
  <!-- Contenido con efecto vidrio -->
</div>
```

### Card
```html
<div class="glass-panel p-lg rounded-xl transition-all hover:-translate-y-2">
  <!-- Card con hover effect -->
</div>
```

## Animaciones

### Transiciones Globales
```scss
transition: all 0.3s ease;
transition-colors: 0.3s ease;
transition-transform: 0.3s ease;
```

### Animaciones Disponibles
- `fadeInUp`: Aparece desde abajo
- `slideInRight`: Entra desde la derecha
- `scaleIn`: Aparece escalada
- `slideUpIn`: Sube mientras aparece

## Responsividad

### Breakpoints de Tailwind
```scss
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Ejemplo de Uso
```html
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
  <!-- Items -->
</div>

<!-- Responsive Text -->
<h1 class="text-display-lg-mobile md:text-display-lg">
  Título
</h1>
```

## Patrones Comunes

### Hero Section
```html
<section class="min-h-[921px] flex items-center pt-xl">
  <div class="max-w-container-max mx-auto px-xl grid md:grid-cols-2 gap-lg">
    <!-- Contenido -->
  </div>
</section>
```

### Section Container
```html
<section class="py-xl">
  <div class="max-w-container-max mx-auto px-xl">
    <!-- Contenido -->
  </div>
</section>
```

### Grid de Componentes
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
  <div class="glass-panel p-lg rounded-xl">
    <!-- Card Item -->
  </div>
</div>
```

## Clases Personalizadas

### Glass Panel
Crea un efecto de vidrio esmerilado con blur
```scss
.glass-panel {
  background: rgba(45, 52, 54, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }
}
```

### Cyan Glow
Añade un brillo cyan alrededor del elemento
```scss
.cyan-glow {
  box-shadow: 0 0 40px rgba(0, 219, 231, 0.1);
}
```

## Accesibilidad

### Focus States
```scss
&:focus {
  outline: none;
  border-color: rgba(0, 219, 231, 0.8);
  ring: 1px solid rgba(0, 219, 231, 0.5);
}
```

### Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Mejores Prácticas

### ✅ DO's
- Usar classes de Tailwind cuando sea posible
- Mantener consistencia en espaciado
- Usar variables de color definidas
- Implementar transiciones suaves
- Responsive desde mobile

### ❌ DONT's
- No usar colores hardcoded
- No usar `!important` sin razón
- No mezclar estilos de diferentes fuentes
- No ignorar accesibilidad
- No crear estilos no reutilizables

## Ejemplos de Componentes

### Formulario
```html
<form class="space-y-md">
  <div>
    <label class="font-label-caps text-on-surface-variant mb-xs block">
      ETIQUETA
    </label>
    <input class="w-full bg-surface-container-low border border-white/10 
                   rounded-lg focus:border-primary-fixed-dim focus:ring-1 
                   focus:ring-primary-fixed-dim text-white p-sm" />
  </div>
</form>
```

### Testimonial
```html
<div class="glass-panel p-lg rounded-xl relative">
  <span class="material-symbols-outlined absolute top-4 right-4 
               text-primary-fixed-dim/30 text-[60px]">
    format_quote
  </span>
  <p class="text-body-lg italic mb-md">Cita del cliente</p>
  <div class="flex items-center gap-md">
    <div class="w-12 h-12 rounded-full bg-surface-variant"></div>
    <div>
      <h5 class="font-bold">Nombre</h5>
      <p class="text-xs text-on-surface-variant">Posición</p>
    </div>
  </div>
</div>
```

---

Para más información, consulta la documentación de Angular y Tailwind CSS.
