# Mini-Proyectos de Listado con Buscador: Implementación en Diferentes Paradigmas de Renderizado

## Comparativa de Implementaciones según Estrategias de Renderizado

Cada paradigma de renderizado presenta características específicas que se adaptan a diferentes requerimientos. Aquí analizamos cómo implementar un mismo proyecto (listado con API + buscador cliente) en diferentes paradigmas, destacando tecnologías y enfoques para cada caso.

### 1. Renderizado del Lado del Cliente (CSR)

**Tecnologías:**

- React + Vite
- React Query para gestión de datos
- React Router para navegación

**Enfoque:**

```jsx
// App.jsx - Implementación CSR
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function ListadoProductos() {
  const [busqueda, setBusqueda] = useState('');

  // Carga de datos en el cliente
  const { data: productos = [], isLoading } = useQuery({
    queryKey: ['productos'],
    queryFn: () => fetch('/api/productos').then(res => res.json()),
  });

  // Filtrado en el cliente
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {productosFiltrados.map(producto => (
            <li key={producto.id}>
              {producto.nombre} - €{producto.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Características clave:**

- Toda la lógica de filtrado ocurre en el cliente
- Carga inicial de todos los productos con una pantalla de carga
- Estado local para la búsqueda
- Ideal para aplicaciones internas con muchas interacciones

### 2. Renderizado del Lado del Servidor (SSR)

**Tecnologías:**

- Next.js con Pages Router
- getServerSideProps para datos iniciales

**Enfoque:**

```jsx
// pages/productos.js - Implementación SSR
import { useState } from 'react';

// Datos cargados en servidor
export async function getServerSideProps() {
  const res = await fetch('https://api.ejemplo.com/productos');
  const productos = await res.json();

  return {
    props: {
      productos,
    },
  };
}

export default function Productos({ productos }) {
  const [busqueda, setBusqueda] = useState('');

  // Filtrado en cliente después del renderizado inicial
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Características clave:**

- Primera carga con datos ya incluidos en el HTML
- Mejor SEO al tener contenido completo en la respuesta inicial
- Hidratación para hacer interactivo el buscador
- Apropiado para sitios con tráfico orgánico o necesidades SEO

### 3. Generación Estática (SSG)

**Tecnologías:**

- Next.js o Astro
- getStaticProps para datos durante build

**Enfoque con Next.js:**

```jsx
// pages/productos.js - Implementación SSG
import { useState } from 'react';

// Datos cargados durante el build
export async function getStaticProps() {
  const res = await fetch('https://api.ejemplo.com/productos');
  const productos = await res.json();

  return {
    props: {
      productos,
    },
    // Opcional: Regenerar cada cierto tiempo
    revalidate: 3600, // 1 hora
  };
}

export default function Productos({ productos }) {
  const [busqueda, setBusqueda] = useState('');

  // Filtrado en cliente
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Características clave:**

- Generación completa en tiempo de build
- Rendimiento óptimo de primera carga
- Menor costo de servidor
- Perfecto para catálogos que cambian con poca frecuencia

### 4. Renderizado Incremental Estático (ISR)

**Tecnologías:**

- Next.js
- getStaticProps con revalidate

**Enfoque:**

```jsx
// pages/productos.js - Implementación ISR
// Similar al SSG pero con revalidación
export async function getStaticProps() {
  const res = await fetch('https://api.ejemplo.com/productos');
  const productos = await res.json();

  return {
    props: {
      productos,
      generadoEn: new Date().toISOString(),
    },
    // Regeneración automática cada 10 minutos
    revalidate: 600,
  };
}

// Componente igual que en SSG
```

**Características clave:**

- Combina rendimiento estático con actualización periódica
- Ideal para datos que cambian con frecuencia moderada
- Buena solución para catálogos actualizados regularmente

### 5. React Server Components (RSC)

**Tecnologías:**

- Next.js App Router
- Server y Client Components
- Suspense para carga de datos

**Enfoque:**

```jsx
// app/productos/page.jsx - Componente servidor para listado
import { ProductSearch } from './product-search';

// Este componente se ejecuta completamente en el servidor
export default async function ProductosPage() {
  // Fetch en el servidor
  const productos = await fetch('https://api.ejemplo.com/productos', {
    cache: 'no-store',
  }).then(res => res.json());

  return (
    <div>
      {/* Componente cliente para la búsqueda */}
      <ProductSearch productos={productos} />
    </div>
  );
}

// app/productos/product-search.jsx - Componente cliente para búsqueda
('use client');

import { useState } from 'react';

export function ProductSearch({ productos }) {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <>
      <input
        type="text"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </>
  );
}
```

**Características clave:**

- Zero JavaScript para componentes servidor
- Datos cargados en el servidor sin APIs cliente
- Solo se hidrata el componente de búsqueda
- Excelente para interfaces complejas con necesidades mixtas

### 6. Islands Architecture

**Tecnologías:**

- Astro
- React para islas interactivas

**Enfoque:**

```astro
---
// productos.astro
// Toda esta parte se ejecuta en el servidor en tiempo de build o request
const response = await fetch('https://api.ejemplo.com/productos');
const productos = await response.json();
---

<html>
  <head>
    <title>Listado de Productos</title>
  </head>
  <body>
    <h1>Nuestros Productos</h1>

    <!-- Solo este componente será hidratado con JavaScript -->
    <ProductSearch client:load productos={productos} />

    <!-- Contenido estático -->
    <footer>
      <p>© 2025 - Catálogo de Productos</p>
    </footer>
  </body>
</html>

<!-- Componente React importado como isla interactiva -->
<script>
  import ProductSearch from '../components/ProductSearch.jsx';
</script>
```

```jsx
// components/ProductSearch.jsx
import { useState } from 'react';

export default function ProductSearch({ productos }) {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```
