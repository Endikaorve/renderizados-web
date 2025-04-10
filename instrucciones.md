# Instrucciones para Configurar Mini-Proyectos de Renderizado Web

## Objetivo

Configurar una serie de mini-proyectos que demuestren diferentes tipos de renderizado web (CSR, SSR, SSG, ISR, RSC, Islands, Streaming y Edge), utilizando un listado de Pokémon con buscador como caso de ejemplo común. Usaremos la PokeAPI para obtener datos de los 151 Pokémon originales.

## Estructura General Recomendada: Monorepo con Yarn Workspaces

### Estructura de Directorios

```
renderizados-web/               # Directorio actual
├── package.json                # Configuración principal
├── yarn.lock                   # Archivo de bloqueo de dependencias
├── datos/                      # API compartida o datos mock (opcional)
│   └── pokemon.json            # Datos comunes para todos los demos (caché opcional)
├── apps/
│   ├── csr/                    # Demo de Client-Side Rendering
│   │   ├── package.json
│   │   └── ...
│   ├── ssr/                    # Demo de Server-Side Rendering
│   │   ├── package.json
│   │   └── ...
│   ├── ssg/                    # Demo de Static Site Generation
│   │   ├── package.json
│   │   └── ...
│   ├── isr/                    # Demo de Incremental Static Regeneration
│   │   ├── package.json
│   │   └── ...
│   ├── rsc/                    # Demo de React Server Components
│   │   ├── package.json
│   │   └── ...
│   ├── islands/                # Demo de Islands Architecture
│   │   ├── package.json
│   │   └── ...
│   ├── streaming/              # Demo de Streaming SSR
│   │   ├── package.json
│   │   └── ...
│   └── edge/                   # Demo de Edge Rendering
│       ├── package.json
│       └── ...
└── README.md                   # Documentación y guía de uso
```

### Configuración Inicial

1. **Inicializar el monorepo**:

   Ya estamos en el directorio `renderizados-web`, así que inicializamos el proyecto allí:

   ```bash
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

2. **Crear la estructura de directorios**:

   ```bash
   mkdir -p apps datos
   ```

3. **Crear proyectos para cada tipo de renderizado**:

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

4. **Instalar dependencias comunes**:

   ```bash
   yarn add -W concurrently cross-env
   ```

   > Nota: El flag `-W` en Yarn indica que la instalación debe realizarse en el workspace raíz.

5. **Configurar scripts en package.json raíz**:
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

function ListadoPokemon() {
  const [busqueda, setBusqueda] = useState("");

  // Carga de datos en el cliente
  const { data, isLoading } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
      );
      const data = await response.json();
      return data.results;
    },
  });

  // Filtrado en el cliente
  const pokemonFiltrados = data
    ? data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  return (
    <div>
      <h1>CSR: Client-Side Rendering</h1>
      <p>Los datos se cargan y filtran completamente en el cliente.</p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Pokémon..."
      />

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {pokemonFiltrados.map((pokemon, index) => {
            // Extraer el ID del Pokémon de la URL
            const pokemonId =
              pokemon.url.split("/")[pokemon.url.split("/").length - 2];

            return (
              <li key={pokemon.name}>
                #{pokemonId} - {pokemon.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ListadoPokemon;
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
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await res.json();

  return {
    props: {
      pokemon: data.results,
    },
  };
}

export default function ListadoPokemon({ pokemon }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado en cliente después del renderizado inicial
  const pokemonFiltrados = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
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
        placeholder="Buscar Pokémon..."
      />

      <ul>
        {pokemonFiltrados.map((pokemon) => {
          // Extraer el ID del Pokémon de la URL
          const pokemonId =
            pokemon.url.split("/")[pokemon.url.split("/").length - 2];

          return (
            <li key={pokemon.name}>
              #{pokemonId} - {pokemon.name}
            </li>
          );
        })}
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
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await res.json();

  return {
    props: {
      pokemon: data.results,
      generadoEn: new Date().toISOString(),
    },
  };
}

export default function ListadoPokemon({ pokemon, generadoEn }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado en cliente
  const pokemonFiltrados = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>SSG: Static Site Generation</h1>
      <p>Página generada durante el build. Generada el: {generadoEn}</p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Pokémon..."
      />

      <ul>
        {pokemonFiltrados.map((pokemon) => {
          // Extraer el ID del Pokémon de la URL
          const pokemonId =
            pokemon.url.split("/")[pokemon.url.split("/").length - 2];

          return (
            <li key={pokemon.name}>
              #{pokemonId} - {pokemon.name}
            </li>
          );
        })}
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
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await res.json();

  return {
    props: {
      pokemon: data.results,
      generadoEn: new Date().toISOString(),
    },
    // Regeneración automática cada 1 hora (para demostración)
    revalidate: 3600,
  };
}

export default function ListadoPokemon({ pokemon, generadoEn }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrado en cliente
  const pokemonFiltrados = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>ISR: Incremental Static Regeneration</h1>
      <p>
        Página estática que se regenera cada hora. Última generación:{" "}
        {generadoEn}
      </p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Pokémon..."
      />

      <ul>
        {pokemonFiltrados.map((pokemon) => {
          // Extraer el ID del Pokémon de la URL
          const pokemonId =
            pokemon.url.split("/")[pokemon.url.split("/").length - 2];

          return (
            <li key={pokemon.name}>
              #{pokemonId} - {pokemon.name}
            </li>
          );
        })}
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
import { PokemonSearch } from "./pokemon-search";

// Componente servidor - se ejecuta siempre en el servidor
export default async function Page() {
  // Fetch desde el servidor
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  return (
    <div>
      <h1>RSC: React Server Components</h1>
      <p>
        El listado es un componente servidor, el buscador es un componente
        cliente.
      </p>

      {/* Componente cliente para la búsqueda */}
      <PokemonSearch pokemon={data.results} />
    </div>
  );
}

// apps/rsc/app/pokemon-search.jsx
("use client");

import { useState } from "react";

export function PokemonSearch({ pokemon }) {
  const [busqueda, setBusqueda] = useState("");

  const pokemonFiltrados = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Pokémon..."
      />

      <ul>
        {pokemonFiltrados.map((pokemon) => {
          // Extraer el ID del Pokémon de la URL
          const pokemonId =
            pokemon.url.split("/")[pokemon.url.split("/").length - 2];

          return (
            <li key={pokemon.name}>
              #{pokemonId} - {pokemon.name}
            </li>
          );
        })}
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
const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
const data = await response.json();
const pokemon = data.results;
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
      <PokemonSearch client:load pokemon={pokemon} />

      <!-- Contenido estático que no necesita JavaScript -->
      <footer>
        <p>Esta parte es HTML estático, 0 JavaScript.</p>
      </footer>
    </main>
  </body>
</html>

<script>
  // Importación del componente de React
  import PokemonSearch from '../components/PokemonSearch.jsx';
</script>
```

```jsx
// apps/islands/src/components/PokemonSearch.jsx
import { useState } from "react";

export default function PokemonSearch({ pokemon }) {
  const [busqueda, setBusqueda] = useState("");

  const pokemonFiltrados = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="search-island">
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Pokémon..."
      />

      <ul>
        {pokemonFiltrados.map((pokemon) => {
          // Extraer el ID del Pokémon de la URL
          const pokemonId =
            pokemon.url.split("/")[pokemon.url.split("/").length - 2];

          return (
            <li key={pokemon.name}>
              #{pokemonId} - {pokemon.name}
            </li>
          );
        })}
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

## Despliegue en Vercel

Para desplegar los mini-proyectos en Vercel, la mejor estrategia es configurar cada proyecto por separado, aunque todos estén en el mismo repositorio. Esto te permitirá tener URLs independientes y configuraciones específicas para cada tipo de renderizado.

### Preparación del Repositorio

Antes de desplegar, asegúrate de que tu repositorio esté correctamente estructurado:

1. **Configura un repositorio Git**:

   ```bash
   git init
   git add .
   git commit -m "Configuración inicial del monorepo"
   ```

2. **Sube el repositorio a GitHub, GitLab o Bitbucket**:

   ```bash
   git remote add origin <URL_DE_TU_REPOSITORIO>
   git push -u origin main
   ```

### Configuración en Vercel

Para cada mini-proyecto en tu monorepo:

1. **Inicia sesión en Vercel** y haz clic en "Add New..." → "Project"

2. **Importa el repositorio** donde está tu monorepo

3. **Configura cada proyecto individualmente** con la siguiente información:

   - **Nombre del Proyecto**: Elige un nombre descriptivo (ej: "renderizados-csr")
   - **Framework Preset**: Selecciona automáticamente basado en el proyecto (Vite, Next.js, Astro)
   - **Root Directory**: Especifica la ruta al subdirectorio del proyecto (ej: "apps/csr")
   - **Build Command**: Usa el comando específico para cada framework o `yarn build`
   - **Output Directory**: Depende del framework (generalmente `dist` para Vite, `.next` para Next.js)
   - **Environment Variables**: Configura las que necesite cada proyecto

4. **Haz clic en "Deploy"**

### Ejemplo de Configuración para Cada Tipo de Proyecto

#### Para CSR (Vite)

- **Root Directory**: `apps/csr`
- **Build Command**: `yarn build`
- **Output Directory**: `dist`

#### Para SSR/SSG/ISR (Next.js Pages Router)

- **Root Directory**: `apps/ssr` (o ssg, isr)
- **Build Command**: `yarn build`
- **Output Directory**: `.next`

#### Para RSC/Streaming/Edge (Next.js App Router)

- **Root Directory**: `apps/rsc` (o streaming, edge)
- **Build Command**: `yarn build`
- **Output Directory**: `.next`

#### Para Islands (Astro)

- **Root Directory**: `apps/islands`
- **Build Command**: `yarn build`
- **Output Directory**: `dist`

### Acceso a los Mini-Proyectos

Una vez desplegados, cada mini-proyecto tendrá su propia URL en Vercel:

- **CSR**: https://renderizados-csr.vercel.app
- **SSR**: https://renderizados-ssr.vercel.app
- **SSG**: https://renderizados-ssg.vercel.app
- **ISR**: https://renderizados-isr.vercel.app
- **RSC**: https://renderizados-rsc.vercel.app
- **Islands**: https://renderizados-islands.vercel.app
- **Streaming**: https://renderizados-streaming.vercel.app
- **Edge**: https://renderizados-edge.vercel.app

### Configuración Avanzada

#### Monorepos y Vercel

Para optimizar el despliegue en monorepos, puedes crear un archivo `vercel.json` en la raíz del proyecto para configurar aspectos como:

```json
{
  "workspaceCommand": "yarn install",
  "installCommand": "yarn install"
}
```

#### Automatización con Vercel CLI

Si deseas automatizar el despliegue de todos los proyectos, puedes usar Vercel CLI:

1. **Instala Vercel CLI**:

   ```bash
   yarn global add vercel
   ```

2. **Crea un script para desplegar todos los proyectos**:

   ```bash
   # deploy-all.sh
   #!/bin/bash

   projects=("csr" "ssr" "ssg" "isr" "rsc" "islands" "streaming" "edge")

   for project in "${projects[@]}"; do
     echo "Deploying $project..."
     (cd apps/$project && vercel --prod)
   done
   ```

3. **Haz el script ejecutable**:
   ```bash
   chmod +x deploy-all.sh
   ```

#### Dominio Personalizado

También puedes configurar un dominio personalizado y subdominios para cada mini-proyecto:

- **CSR**: https://csr.tudominio.com
- **SSR**: https://ssr.tudominio.com
- **SSG**: https://ssg.tudominio.com

Y así sucesivamente.
