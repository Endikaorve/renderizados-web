# Estrategias de Renderizado Web en React

Este repositorio contiene una presentación interactiva sobre las diferentes estrategias de renderizado en React, junto con implementaciones prácticas de cada estrategia.

## Estructura del Proyecto

El proyecto está organizado como un monorepo con la siguiente estructura:

- `/presentacion`: Aplicación Next.js que muestra la presentación interactiva
- `/apps`: Mini-proyectos que implementan cada estrategia de renderizado
  - `/apps/csr`: Client-Side Rendering (React + Vite)
  - `/apps/ssg`: Static Site Generation (Next.js)
  - `/apps/ssr`: Server-Side Rendering (Next.js)
  - `/apps/isr`: Incremental Static Regeneration (Next.js)
  - `/apps/streaming`: SSR con Streaming (Next.js App Router)
  - `/apps/ppr`: Partial Pre-rendering (Next.js experimental)
- `/teoria`: Documentos markdown con teoría que me ha ayudado a entender ciertos conceptos

## Caso de Uso

Todos los mini-proyectos implementan la misma aplicación: un listado y página de detalles de Pokémon utilizando la PokeAPI. Esto permite comparar directamente cómo funciona cada estrategia de renderizado con exactamente el mismo caso de uso.

## Conceptos Cubiertos

La presentación y los mini-proyectos cubren los siguientes conceptos:

1. **Client Side Rendering (CSR)**

   - Estrategia donde todo el renderizado ocurre en el navegador del cliente
   - Implementación con React + Vite

2. **Static Site Generation (SSG)**

   - Generación de HTML durante el proceso de compilación
   - Implementación con Next.js

3. **Server Side Rendering (SSR)**

   - Generación de HTML en el servidor para cada solicitud
   - Implementación con Next.js

4. **Incremental Static Regeneration (ISR)**

   - Estrategia híbrida que regenera páginas estáticas bajo demanda
   - Implementación con Next.js

5. **SSR con Streaming**

   - Envío progresivo de partes de la página al navegador
   - Implementación con Next.js App Router y React Suspense

6. **Partial Pre-rendering (PPR)**

   - Combinación de contenido estático y dinámico en una misma página
   - Implementación con Next.js (característica experimental)

7. **React Server Components (RSC)**
   - Componentes que se ejecutan exclusivamente en el servidor
   - Integrados en los ejemplos modernos usando Next.js App Router

## Tecnologías Utilizadas

- **React**: Framework de UI
- **Next.js**: Framework para SSR, SSG, ISR, Streaming y PPR
- **Vite**: Herramienta de desarrollo para CSR
- **TanStack Query**: Gestión de datos para ejemplos CSR
- **Tailwind CSS**: Estilizado de la presentación
- **Framer Motion**: Animaciones en la presentación
- **Vercel**: Despliegue de los mini-proyectos

## Herramientas de IA Utilizadas

- **v0.dev**: Prototipado de la UI de la presentación
- **Cursor**: Asistente de código basado en IA para el desarrollo

## Licencia

MIT

## Agradecimientos

- PokeAPI por proporcionar los datos para los ejemplos
- Vercel por la infraestructura de despliegue
- La comunidad de React y Next.js por su excelente documentación
- Jakala DxP por darme espacios para investigar, implementar y exponer la charla
