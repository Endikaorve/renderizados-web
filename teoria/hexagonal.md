# Arquitectura Hexagonal con DI en Next.js

Este documento explica cómo implementar la arquitectura hexagonal (también conocida como puertos y adaptadores) en aplicaciones Next.js, desacoplando las estrategias de renderizado de la capa de infraestructura.

## Problema: Acoplamiento en Next.js

En Next.js, las estrategias de renderizado (SSG, SSR, ISR) a menudo quedan acopladas a la capa de infraestructura cuando usamos directamente `fetch` con opciones de caché específicas:

```tsx
// Acoplamiento directo entre renderizado y petición HTTP
export default async function Page({ params }) {
  const nombre = params.nombre;

  // Opciones de caché directamente en la capa de UI
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`, {
    cache: "force-cache",
  });

  const pokemon = await res.json();

  return <div>{/* ... */}</div>;
}
```

Este enfoque mezcla:

1. Estrategia de renderizado
2. Implementación HTTP
3. Configuración de caché
4. Lógica de negocio

## Solución: Arquitectura Hexagonal

La arquitectura hexagonal nos permite separar claramente:

- Dominio (reglas de negocio)
- Puertos (interfaces)
- Adaptadores (implementaciones)
- UI (presentación)

## Implementación paso a paso

### 1. Define tus puertos (interfaces)

```typescript
// domain/ports/pokemon-repository.ts
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string };
}

export interface PokemonRepository {
  getPokemonByName(name: string): Promise<Pokemon>;
  getAllPokemonNames(): Promise<Array<{ name: string }>>;
}

// domain/ports/rendering-strategy.ts
export interface RenderingStrategy {
  applyCacheStrategy<T>(operation: () => Promise<T>): Promise<T>;
}
```

### 2. Implementa los adaptadores

```typescript
// infrastructure/adapters/http-pokemon-repository.ts
import { Pokemon, PokemonRepository } from "@/domain/ports/pokemon-repository";
import { HttpClient } from "@/infrastructure/http/http-client";

export class HttpPokemonRepository implements PokemonRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getPokemonByName(name: string): Promise<Pokemon> {
    const data = await this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return data;
  }

  async getAllPokemonNames(): Promise<Array<{ name: string }>> {
    const response = await this.httpClient.get<{
      results: Array<{ name: string }>;
    }>("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    return response.results;
  }
}
```

### 3. Implementa la abstracción HTTP

```typescript
// infrastructure/http/http-client.ts
export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T, D>(url: string, data: D): Promise<T>;
  // otros métodos...
}

// infrastructure/http/fetch-http-client.ts
import { HttpClient } from "./http-client";
import { RenderingStrategy } from "@/domain/ports/rendering-strategy";

export class FetchHttpClient implements HttpClient {
  constructor(private readonly renderingStrategy: RenderingStrategy) {}

  async get<T>(url: string): Promise<T> {
    return this.renderingStrategy.applyCacheStrategy(async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<T>;
    });
  }

  async post<T, D>(url: string, data: D): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store", // Los POST nunca deben cachearse
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
```

### 4. Implementa las estrategias de renderizado

```typescript
// infrastructure/rendering/ssg-strategy.ts
import { RenderingStrategy } from "@/domain/ports/rendering-strategy";

export class SSGRenderingStrategy implements RenderingStrategy {
  async applyCacheStrategy<T>(operation: () => Promise<T>): Promise<T> {
    // Aquí es donde aplicamos las opciones de caché para SSG
    const originalFetch = global.fetch;

    // Sobrescribimos fetch temporalmente para aplicar caché
    global.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      return originalFetch(input, {
        ...init,
        cache: "force-cache", // Estrategia SSG
      });
    };

    try {
      return await operation();
    } finally {
      // Restauramos el fetch original
      global.fetch = originalFetch;
    }
  }
}

// infrastructure/rendering/isr-strategy.ts
export class ISRRenderingStrategy implements RenderingStrategy {
  constructor(private readonly revalidateSeconds: number) {}

  async applyCacheStrategy<T>(operation: () => Promise<T>): Promise<T> {
    const originalFetch = global.fetch;

    global.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      return originalFetch(input, {
        ...init,
        next: { revalidate: this.revalidateSeconds }, // Estrategia ISR
      });
    };

    try {
      return await operation();
    } finally {
      global.fetch = originalFetch;
    }
  }
}

// infrastructure/rendering/ssr-strategy.ts
export class SSRRenderingStrategy implements RenderingStrategy {
  async applyCacheStrategy<T>(operation: () => Promise<T>): Promise<T> {
    const originalFetch = global.fetch;

    global.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      return originalFetch(input, {
        ...init,
        cache: "no-store", // Estrategia SSR
      });
    };

    try {
      return await operation();
    } finally {
      global.fetch = originalFetch;
    }
  }
}
```

### 5. Casos de uso en el dominio

```typescript
// domain/use-cases/get-pokemon-details.ts
import { Pokemon, PokemonRepository } from "@/domain/ports/pokemon-repository";

export class GetPokemonDetailsUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(name: string): Promise<Pokemon> {
    return this.pokemonRepository.getPokemonByName(name);
  }
}

// domain/use-cases/get-all-pokemon.ts
export class GetAllPokemonUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(): Promise<Array<{ name: string }>> {
    return this.pokemonRepository.getAllPokemonNames();
  }
}
```

### 6. Configuración de la DI

```typescript
// di/container.ts
import { PokemonRepository } from "@/domain/ports/pokemon-repository";
import { RenderingStrategy } from "@/domain/ports/rendering-strategy";
import { HttpPokemonRepository } from "@/infrastructure/adapters/http-pokemon-repository";
import { HttpClient } from "@/infrastructure/http/http-client";
import { FetchHttpClient } from "@/infrastructure/http/fetch-http-client";
import { SSGRenderingStrategy } from "@/infrastructure/rendering/ssg-strategy";
import { ISRRenderingStrategy } from "@/infrastructure/rendering/isr-strategy";
import { SSRRenderingStrategy } from "@/infrastructure/rendering/ssr-strategy";
import { GetPokemonDetailsUseCase } from "@/domain/use-cases/get-pokemon-details";
import { GetAllPokemonUseCase } from "@/domain/use-cases/get-all-pokemon";

type RenderingMode = "ssg" | "isr" | "ssr";

export class Container {
  private static instance: Container;

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  getRenderingStrategy(
    mode: RenderingMode,
    revalidateSeconds?: number
  ): RenderingStrategy {
    switch (mode) {
      case "ssg":
        return new SSGRenderingStrategy();
      case "isr":
        return new ISRRenderingStrategy(revalidateSeconds || 60);
      case "ssr":
        return new SSRRenderingStrategy();
      default:
        return new SSGRenderingStrategy();
    }
  }

  getHttpClient(renderingStrategy: RenderingStrategy): HttpClient {
    return new FetchHttpClient(renderingStrategy);
  }

  getPokemonRepository(
    renderingStrategy: RenderingStrategy
  ): PokemonRepository {
    const httpClient = this.getHttpClient(renderingStrategy);
    return new HttpPokemonRepository(httpClient);
  }

  getGetPokemonDetailsUseCase(
    renderingStrategy: RenderingStrategy
  ): GetPokemonDetailsUseCase {
    const repository = this.getPokemonRepository(renderingStrategy);
    return new GetPokemonDetailsUseCase(repository);
  }

  getGetAllPokemonUseCase(
    renderingStrategy: RenderingStrategy
  ): GetAllPokemonUseCase {
    const repository = this.getPokemonRepository(renderingStrategy);
    return new GetAllPokemonUseCase(repository);
  }
}
```

### 7. Implementación en tus componentes de Next.js

```tsx
// app/detalles/[nombre]/page.tsx
import { notFound } from "next/navigation";
import { Container } from "@/di/container";
import PokemonDetails from "@/ui/components/PokemonDetails";

// Configuración de estrategia de renderizado
const RENDERING_MODE = "ssg"; // Podría venir de una variable de entorno

export async function generateStaticParams() {
  const container = Container.getInstance();
  const renderingStrategy = container.getRenderingStrategy(RENDERING_MODE);
  const getAllPokemonUseCase =
    container.getGetAllPokemonUseCase(renderingStrategy);

  const pokemonNames = await getAllPokemonUseCase.execute();

  return pokemonNames.map((pokemon) => ({
    nombre: pokemon.name,
  }));
}

export default async function Page({ params }: { params: { nombre: string } }) {
  const container = Container.getInstance();
  const renderingStrategy = container.getRenderingStrategy(RENDERING_MODE);
  const getPokemonDetailsUseCase =
    container.getGetPokemonDetailsUseCase(renderingStrategy);

  try {
    // Simulación del retraso existente en tu código original
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const pokemon = await getPokemonDetailsUseCase.execute(params.nombre);

    const generadoEn = new Date().toISOString();

    return <PokemonDetails pokemon={pokemon} generadoEn={generadoEn} />;
  } catch (err) {
    console.error(err);
    notFound();
  }
}
```

### 8. Componente de UI puro

```tsx
// ui/components/PokemonDetails.tsx
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/domain/ports/pokemon-repository";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  generadoEn: string;
}

export default function PokemonDetails({
  pokemon,
  generadoEn,
}: PokemonDetailsProps) {
  return (
    <div className="container">
      <div className="card">
        <Link href="/" className="back-link">
          Volver al listado
        </Link>
        <h1>Detalles (SSG): {pokemon.name}</h1>
        <div className="pokemon-detail">
          <div className="pokemon-image-container">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className="pokemon-info">
            <p>
              <strong>ID:</strong> {pokemon.id}
            </p>
            <p>
              <strong>Altura:</strong> {pokemon.height / 10} m
            </p>
            <p>
              <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>
            <p>
              <strong>Tipos:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p className="generation-time">
              <small>Página generada/revalidada el: {generadoEn}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Beneficios de esta arquitectura

1. **Desacoplamiento completo**: La estrategia de renderizado está separada de la lógica de negocio y la infraestructura HTTP.

2. **Testabilidad mejorada**: Puedes hacer tests unitarios de cada capa sin preocuparte por las configuraciones de Next.js.

3. **Flexibilidad para cambiar implementaciones**:

   - Puedes cambiar `fetch` por `axios` sin modificar el dominio ni la UI
   - Puedes cambiar la estrategia de renderizado sin tocar el resto del código
   - Puedes implementar un mock repository para pruebas

4. **Reutilización**: La lógica de negocio se puede reutilizar en diferentes contextos (API routes, webhooks, etc.).

5. **Claridad conceptual**: Cada parte del sistema tiene una responsabilidad clara.

## Alternativa con Axios

Si prefieres usar Axios en lugar de fetch, puedes crear una implementación alternativa del HttpClient:

```typescript
// infrastructure/http/axios-http-client.ts
import axios from "axios";
import { HttpClient } from "./http-client";
import { RenderingStrategy } from "@/domain/ports/rendering-strategy";

export class AxiosHttpClient implements HttpClient {
  constructor(private readonly renderingStrategy: RenderingStrategy) {}

  async get<T>(url: string): Promise<T> {
    return this.renderingStrategy.applyCacheStrategy(async () => {
      const response = await axios.get<T>(url);
      return response.data;
    });
  }

  async post<T, D>(url: string, data: D): Promise<T> {
    const response = await axios.post<T>(url, data);
    return response.data;
  }
}
```

Luego, modifica tu contenedor de DI para usar este cliente:

```typescript
getHttpClient(renderingStrategy: RenderingStrategy): HttpClient {
  // Cambiar entre implementaciones según configuración
  const useAxios = process.env.USE_AXIOS === 'true';

  if (useAxios) {
    return new AxiosHttpClient(renderingStrategy);
  }

  return new FetchHttpClient(renderingStrategy);
}
```

## Consideraciones adicionales

1. **Complejidad**: Este enfoque introduce más abstracción y código boilerplate, que debe justificarse con el tamaño y complejidad del proyecto.

2. **Tipado seguro**: Asegúrate de mantener un tipado fuerte en todas las interfaces para aprovechar al máximo TypeScript.

3. **Context API**: Podrías usar React Context para la inyección de dependencias en componentes cliente:

```tsx
// context/dependency-context.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { Container } from "@/di/container";

const DependencyContext = createContext<Container | undefined>(undefined);

export function DependencyProvider({ children }: { children: ReactNode }) {
  const container = Container.getInstance();
  return (
    <DependencyContext.Provider value={container}>
      {children}
    </DependencyContext.Provider>
  );
}

export function useDependencies() {
  const context = useContext(DependencyContext);
  if (context === undefined) {
    throw new Error("useDependencies must be used within a DependencyProvider");
  }
  return context;
}
```

4. **Middleware**: Considera implementar middlewares para aspectos transversales como logging o manejo de errores:

```typescript
// infrastructure/http/middleware/logging-middleware.ts
export function withLogging(httpClient: HttpClient): HttpClient {
  return {
    async get<T>(url: string): Promise<T> {
      console.log(`GET request to ${url}`);
      const startTime = performance.now();
      try {
        const result = await httpClient.get<T>(url);
        const endTime = performance.now();
        console.log(
          `GET request to ${url} completed in ${endTime - startTime}ms`
        );
        return result;
      } catch (error) {
        console.error(`Error in GET request to ${url}:`, error);
        throw error;
      }
    },

    // Otros métodos con logging similar
  };
}
```

## Conclusión

La arquitectura hexagonal permite mantener los beneficios de las estrategias de renderizado de Next.js mientras mantienes un dominio limpio y desacoplado, siguiendo los principios SOLID y facilitando la mantenibilidad a largo plazo de tu aplicación.

Este enfoque es especialmente valioso para aplicaciones empresariales complejas donde la lógica de negocio es importante y necesita estar bien aislada de los detalles de infraestructura y presentación.

Este enfoque es especialmente valioso para aplicaciones empresariales complejas donde la lógica de negocio es importante y necesita estar bien aislada de los detalles de infraestructura y presentación.
