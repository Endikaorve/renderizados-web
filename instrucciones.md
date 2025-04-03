# Instrucciones para Configurar Mini-Proyectos de Renderizado Web

## Objetivo

Configurar una serie de mini-proyectos que demuestren diferentes tipos de renderizado web (CSR, SSR, SSG, ISR, RSC, Islands, Streaming y Edge), utilizando un listado de productos con buscador como caso de ejemplo común.

## Estructura General Recomendada: Monorepo con Yarn Workspaces

### Estructura de Directorios

renderizado-demos/
├── package.json # Configuración principal
├── yarn.lock # Archivo de bloqueo de dependencias
├── datos/ # API compartida o datos mock (opcional)
│ └── productos.json # Datos comunes para todos los demos
├── apps/
│ ├── csr/ # Demo de Client-Side Rendering
│ │ ├── package.json
│ │ └── ...
│ ├── ssr/ # Demo de Server-Side Rendering
│ │ ├── package.json
│ │ └── ...
│ ├── ssg/ # Demo de Static Site Generation
│ │ ├── package.json
│ │ └── ...
│ ├── isr/ # Demo de Incremental Static Regeneration
│ │ ├── package.json
│ │ └── ...
│ ├── rsc/ # Demo de React Server Components
│ │ ├── package.json
│ │ └── ...
│ ├── islands/ # Demo de Islands Architecture
│ │ ├── package.json
│ │ └── ...
│ ├── streaming/ # Demo de Streaming SSR
│ │ ├── package.json
│ │ └── ...
│ └── edge/ # Demo de Edge Rendering
│ ├── package.json
│ └── ...
└── README.md # Documentación y guía de uso

### Configuración Inicial

1. **Inicializar el monorepo**:

   ```bash
   mkdir renderizado-demos
   cd renderizado-demos
   yarn init -y
   ```

   Añade la configuración de workspaces en el package.json:

   ```json
   {
     "workspaces": ["apps/*", "api"],
     "private": true
   }
   ```

   > Nota: Es recomendable añadir `"private": true` para evitar la publicación accidental del monorepo.

2. **Crear proyectos para cada tipo de renderizado**:

   ```bash
   # Para CSR con Vite
   yarn create vite apps/csr --template react

   # Para SSR/SSG/ISR con Next.js (Pages Router)
   yarn create next-app apps/ssr
   yarn create next-app apps/ssg
   yarn create next-app apps/isr

   # Para RSC con Next.js App Router
   yarn create next-app apps/rsc --app

   # Para Islands con Astro
   yarn create astro apps/islands
   cd apps/islands
   yarn astro add react
   cd ../..

   # Para Streaming con Next.js App Router
   yarn create next-app apps/streaming --app

   # Para Edge con Next.js App Router
   yarn create next-app apps/edge --app
   ```

   > Nota: Si alguno de los comandos `yarn create` falla, puedes instalar globalmente la herramienta primero:
   >
   > ```bash
   > yarn global add create-vite
   > yarn global add create-next-app
   > yarn global add create-astro
   > ```

3. **Instalar dependencias comunes**:

   ```bash
   yarn add -W concurrently cross-env
   ```

   > Nota: El flag `-W` en Yarn indica que la instalación debe realizarse en el workspace raíz.

4. **Configurar scripts en package.json raíz**:
   ```json
   {
     "scripts": {
       "dev": "concurrently \"yarn workspace csr dev\" \"yarn workspace ssr dev\" \"yarn workspace ssg dev\" \"yarn workspace isr dev\" \"yarn workspace rsc dev\" \"yarn workspace islands dev\" \"yarn workspace streaming dev\" \"yarn workspace edge dev\"",
       "dev:csr": "yarn workspace csr dev",
       "dev:ssr": "yarn workspace ssr dev",
       "dev:ssg": "yarn workspace ssg dev",
       "dev:isr": "yarn workspace isr dev",
       "dev:rsc": "yarn workspace rsc dev",
       "dev:islands": "yarn workspace islands dev",
       "dev:streaming": "yarn workspace streaming dev",
       "dev:edge": "yarn workspace edge dev",
       "build": "yarn workspaces run build"
     }
   }
   ```

## Implementación de los Demo-Proyectos

### 1. Client-Side Rendering (CSR)

**Tecnologías**: React + Vite + React Query

**Implementación principal**:

```jsx
// apps/csr/src/App.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function ListadoProductos() {
  const [busqueda, setBusqueda] = useState("");

  // Carga de datos en el cliente
  const { data: productos = [], isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: () => fetch("/api/productos").then((res) => res.json()),
  });

  // Filtrado en el cliente
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>CSR: Client-Side Rendering</h1>
      <p>Los datos se cargan y filtran completamente en el cliente.</p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {productosFiltrados.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - €{producto.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListadoProductos;
```

**Dependencias a instalar**:

```bash
cd apps/csr
yarn add @tanstack/react-query
```

### 2. Server-Side Rendering (SSR)

**Tecnologías**: Next.js con Pages Router

**Implementación principal**:

```jsx
// apps/ssr/pages/index.js
import { useState } from "react";

// Datos cargados en servidor
export async function getServerSideProps() {
  const res = await fetch("https://api.ejemplo.com/productos");
  const productos = await res.json();

  return {
    props: {
      productos,
    },
  };
}

export default function Productos({ productos }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado en cliente después del renderizado inicial
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>SSR: Server-Side Rendering</h1>
      <p>
        Datos cargados en el servidor, HTML generado dinámicamente en cada
        solicitud.
      </p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Static Site Generation (SSG)

**Tecnologías**: Next.js con Pages Router

**Implementación principal**:

```jsx
// apps/ssg/pages/index.js
import { useState } from "react";

// Datos cargados durante el build
export async function getStaticProps() {
  const res = await fetch("https://api.ejemplo.com/productos");
  const productos = await res.json();

  return {
    props: {
      productos,
      generadoEn: new Date().toISOString(),
    },
  };
}

export default function Productos({ productos, generadoEn }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado en cliente
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>SSG: Static Site Generation</h1>
      <p>Página generada durante el build. Generada el: {generadoEn}</p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 4. Incremental Static Regeneration (ISR)

**Tecnologías**: Next.js con Pages Router

**Implementación principal**:

```jsx
// apps/isr/pages/index.js
import { useState } from "react";

// Datos cargados con regeneración incremental
export async function getStaticProps() {
  const res = await fetch("https://api.ejemplo.com/productos");
  const productos = await res.json();

  return {
    props: {
      productos,
      generadoEn: new Date().toISOString(),
    },
    // Regeneración automática cada 1 minuto (para demostración)
    revalidate: 60,
  };
}

export default function Productos({ productos, generadoEn }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado en cliente
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>ISR: Incremental Static Regeneration</h1>
      <p>
        Página estática que se regenera cada minuto. Última generación:{" "}
        {generadoEn}
      </p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 5. React Server Components (RSC)

**Tecnologías**: Next.js App Router

**Implementación principal**:

```jsx
// apps/rsc/app/page.jsx
import { ProductSearch } from "./product-search";

// Componente servidor - se ejecuta siempre en el servidor
export default async function Page() {
  // Fetch desde el servidor
  const productos = await fetch("https://api.ejemplo.com/productos", {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div>
      <h1>RSC: React Server Components</h1>
      <p>
        El listado es un componente servidor, el buscador es un componente
        cliente.
      </p>

      {/* Componente cliente para la búsqueda */}
      <ProductSearch productos={productos} />
    </div>
  );
}

// apps/rsc/app/product-search.jsx
("use client");

import { useState } from "react";

export function ProductSearch({ productos }) {
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </>
  );
}
```

### 6. Islands Architecture

**Tecnologías**: Astro con React

**Implementación principal**:

```astro
---
// apps/islands/src/pages/index.astro
// Código que se ejecuta sólo en servidor
const response = await fetch('https://api.ejemplo.com/productos');
const productos = await response.json();
---

<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Islands Architecture Demo</title>
  </head>
  <body>
    <main>
      <h1>Islands Architecture</h1>
      <p>Solo el buscador es interactivo, el resto es HTML estático.</p>

      <!-- Componente React hidratado como "isla" -->
      <ProductSearch client:load productos={productos} />

      <!-- Contenido estático que no necesita JavaScript -->
      <footer>
        <p>Esta parte es HTML estático, 0 JavaScript.</p>
      </footer>
    </main>
  </body>
</html>

<script>
  // Importación del componente de React
  import ProductSearch from '../components/ProductSearch.jsx';
</script>
```

```jsx
// apps/islands/src/components/ProductSearch.jsx
import { useState } from "react";

export default function ProductSearch({ productos }) {
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="search-island">
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
      />

      <ul>
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - €{producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Notas Adicionales para Yarn Workspaces

1. **Instalación de dependencias en un workspace específico**:

   ```bash
   yarn workspace <nombre-workspace> add <paquete>
   ```

2. **Ejecución de un comando en todos los workspaces**:

   ```bash
   yarn workspaces run <comando>
   ```

3. **Actualización de Yarn**:

   ```bash
   yarn set version latest
   ```

4. **Resolución de problemas con Yarn**:

   ```bash
   yarn cache clean
   yarn install --force
   ```

5. **Para Vercel**: Asegúrate de configurar cada proyecto en Vercel apuntando al directorio específico dentro de apps/.
