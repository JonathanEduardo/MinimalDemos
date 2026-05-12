# Design System - Bene Access

Sistema de diseño centralizado para el proyecto Bene Access.

## 📋 Tabla de Contenidos

1. [Paleta de Colores](#paleta-de-colores)
2. [Componentes Atómicos](#componentes-atómicos)
3. [Clases Reutilizables](#clases-reutilizables)
4. [Uso](#uso)
5. [Reglas](#reglas)

---

## 🎨 Paleta de Colores

### Colores Custom

Solo PRIMARY y SECONDARY tienen variables personalizadas con 3 tonos cada uno:

#### Primary (Azul) - `#4267B2`
Color principal del sistema, usado en sidebar, botones principales y elementos destacados.
- **Light**: `rgb(var(--primary-light))` 
- **Base**: `rgb(var(--primary-base))` → `#4267B2`
- **Dark**: `rgb(var(--primary-dark))`

#### Secondary (Amarillo/Mostaza) - `#F0AD4E`
Color secundario del sistema, usado para acciones secundarias y alertas.
- **Light**: `rgb(var(--secondary-light))` 
- **Base**: `rgb(var(--secondary-base))` → `#F0AD4E`
- **Dark**: `rgb(var(--secondary-dark))`

### Colores de Estado (Tailwind)

Para Success, Warning y Danger, usamos los colores de Tailwind directamente:

- **Success (Verde)**: `green-700`, `-700`, etc.  
  Usado para: aprobaciones, éxitos, confirmaciones
  
- **Warning (Amarillo)**: `yellow-500`, `amber-500`, etc.  
  Usado para: pendientes, advertencias, alertas
  
- **Danger (Rojo)**: `red-500`, `red-600`, etc.  
  Usado para: rechazos, errores, eliminaciones

**Ventaja**: No reinventamos la rueda, aprovechamos todo el ecosistema de Tailwind.

---

## 🧩 Componentes Atómicos

Todos los componentes están ubicados en `src/components/atoms/`

### Button

```tsx
import { Button } from "@/components/atoms"

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// Tamaños
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Con iconos
<Button variant="primary">
  <Icon className="h-4 w-4" />
  Text
</Button>
```

### Badge

```tsx
import { Badge } from "@/components/atoms"

<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Aprobado</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="danger">Rechazado</Badge>
<Badge variant="neutral">Neutral</Badge>
```

### Alert

```tsx
import { Alert } from "@/components/atoms"

<Alert variant="primary">
  <div>
    <h4 className="font-semibold mb-1">Título</h4>
    <p className="text-sm">Mensaje de la alerta</p>
  </div>
</Alert>

// Sin icono
<Alert variant="success" icon={false}>
  Mensaje sin icono
</Alert>
```

### Card

```tsx
import { Card, StatCard } from "@/components/atoms"

// Card básico
<Card variant="base">
  <h4>Título</h4>
  <p>Contenido</p>
</Card>

// StatCard para métricas
<StatCard
  variant="primary"
  label="Permisos Hoy"
  value="12"
  icon={<Icon />}
/>
```

---

## 📐 Clases Reutilizables (@apply)

**IMPORTANTE:** Usa estas clases en lugar de escribir estilos directamente.

### Botones

```css
.btn-primary     /* Botón primario azul - usa variables custom */
.btn-secondary   /* Botón secundario amarillo - usa variables custom */
.btn-success     /* Botón verde - usa green-700 de Tailwind */
.btn-warning     /* Botón amarillo - usa yellow-500 de Tailwind */
.btn-danger      /* Botón rojo - usa red-500 de Tailwind */
.btn-ghost       /* Botón transparente */
.btn-outline     /* Botón con borde */

/* Tamaños */
.btn-sm          /* Botón pequeño */
.btn-lg          /* Botón grande */
```

### Badges

```css
.badge-primary    /* Usa blue-100/700 de Tailwind */
.badge-secondary  /* Usa yellow-100/700 de Tailwind */
.badge-success    /* Usa green-100/700 de Tailwind */
.badge-warning    /* Usa yellow-100/700 de Tailwind */
.badge-danger     /* Usa red-100/700 de Tailwind */
.badge-neutral    /* Usa gray-100/700 de Tailwind */
```

### Cards

```css
.card-base        /* Card básico blanco */
.card-primary     /* Card con fondo azul claro */
.card-secondary   /* Card con fondo amarillo claro */
.card-success     /* Card con fondo verde claro */
.card-warning     /* Card con fondo amarillo claro */
.card-danger      /* Card con fondo rojo claro */

.card-stat        /* Card para estadísticas */
.card-stat-value  /* Valor grande en stat card */
.card-stat-label  /* Label del stat card */
```

### Alerts

```css
.alert-base
.alert-primary
.alert-secondary
.alert-success
.alert-warning
.alert-danger
```

### Inputs

```css
.input-base      /* Input estándar */
.label-base      /* Label para inputs */
```

### Tables

```css
.table-wrapper       /* Contenedor de tabla */
.table-base          /* Tabla base */
.table-header        /* Header de tabla */
.table-header-cell   /* Celda de header */
.table-body-row      /* Fila de body */
.table-body-cell     /* Celda de body */
```

### Layout

```css
.sidebar-container       /* Contenedor del sidebar */
.sidebar-menu-item       /* Item de menú */
.sidebar-menu-item-active /* Item activo */

.navbar-container        /* Contenedor del navbar */
.navbar-brand            /* Logo/marca */
.navbar-actions          /* Acciones del navbar */
```

### Utilidades

```css
.divider-horizontal  /* Línea divisora horizontal */
.divider-vertical    /* Línea divisora vertical */

.text-muted          /* Texto gris */
.text-primary        /* Texto azul - usa variable custom */
.text-secondary      /* Texto amarillo - usa variable custom */
.text-success        /* Texto verde - green-700 */
.text-warning        /* Texto amarillo - yellow-500 */
.text-danger         /* Texto rojo - red-500 */
```

---

## 💡 Uso

### Ejemplo 1: Botón Personalizado

❌ **INCORRECTO** (no usar clases directas)
```tsx
<button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md">
  Click me
</button>
```

✅ **CORRECTO** (usar clases @apply)
```tsx
<button className="btn-primary">
  Click me
</button>
```

✅ **MEJOR** (usar componente atómico)
```tsx
import { Button } from "@/components/atoms"

<Button variant="primary">Click me</Button>
```

### Ejemplo 2: Badge de Estado

❌ **INCORRECTO**
```tsx
<div className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs">
  Aprobado
</div>
```

✅ **CORRECTO**
```tsx
<div className="badge-success">Aprobado</div>
```

✅ **MEJOR**
```tsx
import { Badge } from "@/components/atoms"

<Badge variant="success">Aprobado</Badge>
```

### Ejemplo 3: Card con Estadísticas

❌ **INCORRECTO**
```tsx
<div className="bg-white rounded-lg p-6 shadow border">
  <span className="text-4xl font-bold">12</span>
  <p className="text-sm text-gray-600">Permisos Hoy</p>
</div>
```

✅ **CORRECTO**
```tsx
<div className="card-stat">
  <span className="card-stat-value">12</span>
  <span className="card-stat-label">Permisos Hoy</span>
</div>
```

✅ **MEJOR**
```tsx
import { StatCard } from "@/components/atoms"

<StatCard 
  variant="primary" 
  value="12" 
  label="Permisos Hoy"
  icon={<CalendarIcon />}
/>
```

---

## 📏 Reglas del Design System

### 1. **NO usar clases Tailwind directas**
   - ❌ `className="mb-2 px-4 bg-blue-500"`
   - ✅ `className="btn-primary"`

### 2. **Siempre usar componentes atómicos cuando existan**
   - Preferir `<Button>` sobre `<button>`
   - Preferir `<Badge>` sobre `<div>` con estilos

### 3. **Crear clases @apply para estilos recurrentes**
   - Si un patrón se repite 2+ veces, crear una clase en `index.css`

### 4. **Usar variables CSS solo para Primary y Secondary**
   - ❌ Crear variables para colores que ya existen en Tailwind
   - ✅ Usar `green-700`, `red-500`, `yellow-500` directamente
   - ✅ Variables custom solo para `--primary-*` y `--secondary-*`
   - ✅✅ Mejor aún: usar clases @apply que ya incluyan el color

### 5. **Estandarizar todos los elementos**
   - Todos los botones deben usar las mismas clases
   - Todos los badges deben ser consistentes
   - Mantener consistencia visual

### 6. **Documentar nuevos componentes**
   - Al crear un componente, agregarlo al catálogo en `/components`
   - Mostrar todas las variantes

---

## 🌗 Dark Mode

El sistema está preparado para dark mode. Para activarlo:

```tsx
// Agregar clase 'dark' al elemento raíz
<html className="dark">
```

Todos los componentes y clases ya tienen soporte para dark mode automáticamente.

---

## 📍 Catálogo de Componentes

Visita `/components` para ver todos los componentes del Design System en acción.

El catálogo incluye:
- ✅ Paleta de colores completa
- ✅ Todos los componentes atómicos
- ✅ Variantes y tamaños
- ✅ Estados (hover, disabled, active)
- ✅ Ejemplos de uso

---

## 🔄 Próximos Pasos

- [ ] Estilizar AppSidebar con clases del Design System
- [ ] Estilizar AppHeaderbar con clases del Design System
- [ ] Crear componentes moleculares (FormField, SearchBar, etc.)
- [ ] Crear componentes organismo (DataTable, Dashboard, etc.)
- [ ] Implementar theme switcher para dark mode

---

**Desarrollado para Bene Access**
