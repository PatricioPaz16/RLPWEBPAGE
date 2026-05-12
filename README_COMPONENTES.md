# RLP Software Factory - Angular Project

Proyecto Angular modular con arquitectura en capas y mejores prácticas de desarrollo senior.

## 📦 Estructura del Proyecto

```
src/
├── app/
│   ├── shared/
│   │   └── components/
│   │       ├── header/        # Navegación global
│   │       └── footer/        # Pie de página
│   ├── features/
│   │   └── home/
│   │       ├── components/
│   │       │   ├── hero/      # Sección héroe
│   │       │   ├── services/  # Grid de servicios
│   │       │   ├── about/     # Sección acerca de
│   │       │   ├── clients/   # Proyectos de clientes
│   │       │   ├── process/   # Proceso RLP
│   │       │   ├── team/      # Equipo
│   │       │   ├── testimonials/
│   │       │   └── contact/   # Formulario de contacto
│   │       └── pages/
│   │           └── home.component.ts    # Página principal
│   ├── core/
│   │   ├── services/          # Servicios globales
│   │   └── models/            # Interfaces y tipos
│   ├── app.component.ts       # Componente raíz
│   ├── app.routes.ts          # Configuración de rutas
│   └── app.config.ts          # Configuración de aplicación
├── styles.scss                # Estilos globales
├── main.ts                    # Punto de entrada
└── index.html                 # HTML principal
```

## 🎨 Características Clave

### ✅ Mejores Prácticas Implementadas
- **Componentes Standalone**: Últimas características de Angular
- **Change Detection OnPush**: Optimización de rendimiento
- **Separación de Responsabilidades**: HTML, TypeScript y SCSS por separado
- **Módulos Funcionales**: Estructura escalable con features
- **Formularios Reactivos**: Validación robusta en Contact Form
- **Tipado Fuerte**: Interfaces para todos los modelos

### 🎯 Componentes

| Componente | Ubicación | Responsabilidad |
|-----------|-----------|-----------------|
| **Header** | shared | Navegación global y branding |
| **Footer** | shared | Enlaces y información corporativa |
| **Hero** | home/components | Sección inicial con CTA |
| **Services** | home/components | Grid de 4 servicios |
| **About** | home/components | Metodología RLP con fases |
| **Clients** | home/components | Portafolio de proyectos |
| **Process** | home/components | Roadmap de éxito |
| **Team** | home/components | Perfiles del equipo |
| **Testimonials** | home/components | Testimonios de clientes |
| **Contact** | home/components | Formulario de auditoría |
| **Home Page** | home/pages | Agrupa todos los componentes |

## 🚀 Instalación y Ejecución

```bash
# 1. Navegar al proyecto
cd rlp-app

# 2. Instalar dependencias
npm install

# 3. Ejecutar servidor de desarrollo
ng serve

# 4. Abrir en navegador
http://localhost:4200
```

## 📋 Configuración de Tailwind

El proyecto incluye:
- **Tailwind CSS**: Framework de utilidades
- **Variables Personalizadas**: Colores y espaciado del diseño
- **Material Symbols**: Iconografía
- **Dark Mode**: Configurado por defecto

### Variables de Color Principales
- `primary-fixed-dim`: #00dbe7 (Cyan)
- `surface`: #08132a (Fondo oscuro)
- `on-surface`: #d9e2ff (Texto)

## 📁 Convenciones de Código

### Nombres de Archivos
- Componentes: `*.component.ts` | `*.component.html` | `*.component.scss`
- Servicios: `*.service.ts`
- Interfaces: `*.model.ts` o inline en `.ts`

### Estructura de Componentes
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {}
```

## 🔧 Desarrollo

### Agregar Nuevo Componente
```bash
# Generar componente (desde src/app)
ng generate component features/home/components/new-component --standalone
```

### Agregar Nuevo Servicio
```bash
ng generate service core/services/new-service
```

## 📦 Build para Producción

```bash
# Compilar optimizado
ng build --configuration production

# Los archivos estarán en: dist/rlp-app/
```

## 🛠 Herramientas Utilizadas

- **Angular 19**: Framework principal
- **TypeScript**: Tipado fuerte
- **Tailwind CSS**: Utilidades de estilos
- **SCSS**: Preprocesador de CSS
- **Reactive Forms**: Validación de formularios
- **Material Symbols**: Iconografía

## 📱 Responsive Design

El proyecto es totalmente responsive:
- Mobile first approach
- Breakpoints de Tailwind
- Componentes flexibles

## 🎓 Aprendizajes y Patrones

1. **Standalone Components**: Eliminan la necesidad de NgModules
2. **OnPush Change Detection**: Mejora performance
3. **Lazy Loading**: Carga perezosa de rutas
4. **Componentes Reutilizables**: Header y Footer compartidos
5. **Feature Modules**: Escalabilidad
6. **Type Safety**: Interfaces para datos

## 📝 Próximas Mejoras Sugeridas

- [ ] Agregar interceptores HTTP
- [ ] Implementar estado global (NgRx o Akita)
- [ ] Agregar tests unitarios (Jasmine/Karma)
- [ ] Implementar lazy loading de módulos
- [ ] Agregar PWA capabilities
- [ ] SEO optimization
- [ ] Analytics integration

## 📄 Licencia

Proyecto de RLP Software Factory

---

**Creado con Angular 19 y Tailwind CSS** ✨
