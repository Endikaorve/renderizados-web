# Formación sobre Tipos de Renderizado en la Web con Enfoque en React

## 1. Introducción a los Tipos de Renderizado

El renderizado web es el proceso mediante el cual un navegador convierte el código (HTML, CSS, JavaScript) en la interfaz visual que los usuarios ven e interactúan. A lo largo de los años, han surgido diferentes estrategias de renderizado para optimizar la experiencia del usuario, el rendimiento y el SEO.

## 2. Aplicaciones de Página Única (SPA - Single Page Applications)

Las SPAs representaron un cambio significativo en la forma de construir aplicaciones web.

### Características principales:

- **Navegación sin recarga**: La aplicación carga una única página HTML y actualiza dinámicamente el contenido
- **Estado del cliente**: Mantiene el estado en el navegador durante la sesión del usuario
- **Experiencia fluida**: Las transiciones entre "páginas" son instantáneas y sin parpadeos

### Funcionamiento:

- La aplicación se carga completamente al inicio
- Las navegaciones posteriores solo cargan datos (generalmente en formato JSON)
- El enrutamiento se maneja en el cliente a través de la manipulación del historial del navegador

### Ventajas:

- Experiencia de usuario mejorada y rápida
- Menor carga en el servidor (solo proporciona datos)
- Separación clara entre frontend y backend

### Desventajas:

- Tiempo de carga inicial más largo
- Desafíos de SEO (aunque han mejorado)
- Mayor complejidad en la gestión del estado

### Ejemplo con React:

```jsx
// App.jsx - Estructura básica de una SPA con React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 3. Renderizado del Lado del Cliente (CSR - Client-Side Rendering)

CSR está estrechamente relacionado con las SPAs, siendo el método predominante para renderizarlas.

### Funcionamiento:

- El servidor envía un HTML mínimo con enlaces a los scripts necesarios
- El navegador descarga y ejecuta JavaScript
- React (u otro framework) "hidrata" la página renderizando los componentes

### Código típico de un documento HTML para CSR:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Mi Aplicación React</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- Aquí es donde React renderizará la aplicación -->
    <script src="/bundle.js"></script>
  </body>
</html>
```

### Ventajas:

- Desarrollo más sencillo con un solo entorno (navegador)
- Menor carga en el servidor
- Actualizaciones de UI instantáneas

### Desventajas:

- Tiempo de carga inicial perceptible ("tiempo en blanco")
- Peor rendimiento en dispositivos de gama baja
- Desafíos de SEO si no se implementan soluciones específicas

## 4. Renderizado del Lado del Servidor (SSR - Server-Side Rendering)

SSR resuelve algunos problemas del CSR al generar el HTML en el servidor.

### Funcionamiento:

- El servidor ejecuta React para generar HTML completo
- El cliente recibe HTML listo para mostrar
- JavaScript se carga y "hidrata" la página para hacerla interactiva

### Implementación con React:

```jsx
// Ejemplo simplificado de SSR con Express
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', (req, res) => {
  const html = renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Mi App SSR</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);
```

### Ventajas:

- Carga inicial más rápida (el usuario ve contenido de inmediato)
- Mejor SEO (los crawlers ven el contenido completo)
- Mejor experiencia en dispositivos menos potentes

### Desventajas:

- Mayor carga en el servidor
- Complejidad de desarrollo (entorno dual servidor/cliente)
- Tiempo hasta interactividad puede ser mayor que el tiempo de visualización

## 5. Generación de Sitios Estáticos (SSG - Static Site Generation)

SSG pre-renderiza las páginas durante el proceso de construcción.

### Funcionamiento:

- Durante el build, el framework genera archivos HTML para cada ruta
- Estos archivos estáticos se sirven directamente sin procesamiento adicional
- Opcionalmente, se puede "hidratar" con JavaScript para aumentar la interactividad

### Ejemplo con Next.js:

```jsx
// pages/blog/[slug].js
export async function getStaticPaths() {
  // Obtener todas las rutas posibles
  const posts = await getBlogPosts();

  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Obtener datos para cada ruta
  const post = await getBlogPostBySlug(params.slug);

  return {
    props: { post },
  };
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### Ventajas:

- Rendimiento extremadamente rápido (solo se sirven archivos estáticos)
- Excelente SEO
- Seguridad mejorada (superficie de ataque reducida)
- Costos de hosting muy bajos

### Desventajas:

- No es adecuado para contenido que cambia frecuentemente
- El proceso de build puede ser largo para sitios grandes
- Limitaciones para contenido dinámico o personalizado

## 6. Renderizado Incremental Estático (ISR - Incremental Static Regeneration)

ISR es una evolución del SSG que permite regenerar páginas estáticas después del build.

### Funcionamiento:

- Combina SSG con regeneración de páginas bajo demanda
- Permite definir un tiempo de revalidación por página
- Actualiza páginas en segundo plano mientras sirve la versión anterior

### Ejemplo en Next.js:

```jsx
// pages/productos/[id].js
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking', // Generar nuevas páginas bajo demanda
  };
}

export async function getStaticProps({ params }) {
  const producto = await fetchProducto(params.id);

  return {
    props: { producto },
    revalidate: 60, // Regenerar la página cada 60 segundos
  };
}

export default function Producto({ producto }) {
  return (
    <div>
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <span>Precio: €{producto.precio}</span>
    </div>
  );
}
```

### Ventajas:

- Combina los beneficios de SSG con contenido actualizado
- Mantiene el rendimiento y SEO del SSG
- Reduce la carga del servidor comparado con SSR

### Desventajas:

- La primera solicitud después de expirar puede ser más lenta
- Complejidad adicional en la configuración
- Requiere un proveedor de hosting que soporte esta funcionalidad

## 7. React Server Components (RSC)

Los Server Components representan una evolución significativa en el modelo de renderizado de React.

### Concepto fundamental:

- Componentes que se ejecutan exclusivamente en el servidor
- El resultado del renderizado (no el código fuente) se envía al cliente
- Permiten acceso directo a recursos del servidor (bases de datos, sistema de archivos)

### Características clave:

- **Cero JavaScript al cliente**: Los Server Components no envían código JavaScript al navegador
- **Acceso directo a recursos**: Pueden consultar bases de datos directamente
- **Granularidad**: Permiten decidir qué componentes se ejecutan en el servidor vs. cliente

### Ejemplo básico:

```jsx
// ServerComponent.jsx - Se ejecuta sólo en el servidor
import { db } from '../database';

// Este componente nunca se enviará al cliente
export default async function ProductList() {
  // Se puede acceder directamente a la base de datos
  const products = await db.query('SELECT * FROM products');

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - €{product.price}

          {/* Este componente cliente será hidratado en el navegador */}
          <ClientComponent productId={product.id} />
        </li>
      ))}
    </ul>
  );
}

// ClientComponent.jsx - Componente que se ejecuta en el cliente
'use client'; // Directiva que indica que es un componente cliente

import { useState } from 'react';

export default function ClientComponent({ productId }) {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => setAdded(true)}>
      {added ? 'Añadido' : 'Añadir al carrito'}
    </button>
  );
}
```

### Ventajas:

- Reduce drásticamente el JavaScript enviado al cliente
- Mejora el rendimiento y la carga inicial
- Simplifica el acceso a datos (sin necesidad de APIs intermedias)
- Mejor seguridad (código sensible nunca llega al cliente)

### Desventajas:

- Paradigma relativamente nuevo con curva de aprendizaje
- Requiere infraestructura específica
- Limitaciones en bibliotecas y herramientas que asumen componentes cliente

## 8. Streaming y Renderizado Parcial

El streaming permite enviar partes de la página a medida que están listas.

### Características:

- Renderiza y envía partes de la página en orden de prioridad
- Muestra un esqueleto o placeholder mientras se cargan secciones más pesadas
- Permite interactividad temprana en partes ya cargadas

### Ejemplo con Next.js 14:

```jsx
// app/page.js
import { Suspense } from 'react';
import Loading from './loading';
import ProductList from './ProductList';
import RecommendationList from './RecommendationList';

export default function Home() {
  return (
    <main>
      <h1>Nuestra Tienda</h1>

      {/* Esta sección se carga primero */}
      <ProductList />

      {/* Esta sección puede cargarse después con un estado de carga */}
      <Suspense fallback={<Loading />}>
        <RecommendationList />
      </Suspense>
    </main>
  );
}
```

### Ventajas:

- Mejora significativa en Largest Contentful Paint (LCP)
- Experiencia de usuario más fluida y responsiva
- Mejor rendimiento percibido aunque el tiempo total sea similar

### Desventajas:

- Mayor complejidad en la arquitectura
- Puede ser difícil de depurar
- Requiere planificación cuidadosa de la secuencia de carga

## 9. Frameworks y Plataformas Modernos

### Next.js (Vercel)

Next.js es actualmente el framework más popular para aplicaciones React, ofreciendo:

- **App Router**: La nueva arquitectura basada en Server Components
- **Múltiples estrategias de renderizado**: SSG, SSR, ISR, y RSC en un mismo proyecto
- **Optimizaciones automáticas**: Imágenes, fuentes, scripts
- **Middleware**: Funciones que se ejecutan antes de renderizar páginas

#### Novedades en 2025:

- Mejoras en la compilación parcial y renderizado distribuido
- Integración más profunda con herramientas de IA
- Optimizaciones específicas para dispositivos móviles

### Remix

Remix ofrece un enfoque alternativo:

- Enfoque en la arquitectura web nativa y progresiva
- Carga y actualización de datos a nivel de componente
- Manejo avanzado de errores y estado de carga
- Navegación con transiciones suaves

### Astro

Astro se ha consolidado como solución para sitios con alto contenido:

- **Islands Architecture**: Hidrata sólo los componentes interactivos
- **Zero JavaScript por defecto**: Envía solo HTML y CSS inicialmente
- **Múltiples frameworks**: Soporta componentes de React, Vue, Svelte, etc.

### Qwik

Qwik introduce el concepto de "resumibilidad":

- Serializa el estado de la aplicación en el HTML
- Carga JavaScript sólo cuando es necesario ("lazy loading" extremo)
- Elimina la necesidad de hidratación completa

## 10. Edge Rendering

El Edge Rendering ejecuta el código en servidores distribuidos globalmente.

### Características:

- Renderizado en CDN, más cerca del usuario
- Latencia extremadamente baja
- Personalización regional manteniendo beneficios de caché

### Implementación en Vercel:

```jsx
// app/api/geo/route.js
export const runtime = 'edge';

export async function GET(request) {
  const { geo } = request;

  return Response.json({
    country: geo.country,
    city: geo.city,
    region: geo.region,
  });
}
```

## 11. Comparativa y Recomendaciones

| Estrategia | Casos de uso ideales                  | Rendimiento                      | SEO       | Desarrollo |
| ---------- | ------------------------------------- | -------------------------------- | --------- | ---------- |
| CSR (SPA)  | Aplicaciones con alta interactividad  | Medio-Bajo inicial, alto después | Medio     | Sencillo   |
| SSR        | Contenido dinámico con SEO importante | Medio-Alto                       | Excelente | Complejo   |
| SSG        | Blogs, documentación, marketing       | Excelente                        | Excelente | Medio      |
| ISR        | E-commerce, blogs con actualización   | Excelente                        | Excelente | Medio      |
| RSC        | Aplicaciones empresariales complejas  | Alto                             | Excelente | Complejo   |

### Recomendaciones:

- **Sitios estáticos de contenido**: SSG con Astro
- **E-commerce**: Next.js con ISR y RSC
- **Aplicaciones SaaS**: Next.js App Router con RSC
- **Sitios altamente personalizados**: SSR o Edge Functions
- **Aplicaciones colaborativas en tiempo real**: CSR + Server Components para partes estáticas

## 12. El Futuro del Renderizado Web

Tendencias emergentes para 2025 y más allá:

- **Isomórfico 2.0**: Nueva generación de frameworks que difuminan aún más la frontera cliente-servidor
- **Edge Computing Avanzado**: Más capacidades y runtime en el edge
- **IA en el proceso de renderizado**: Optimizaciones predictivas basadas en patrones de usuario
- **WebContainers**: Entornos de ejecución completos en el navegador
- **WebAssembly**: Mayor adopción para partes críticas de rendimiento
- **Arquitecturas compuestas**: Combinación de múltiples estrategias basadas en análisis de rendimiento

## 13. Conclusión

El panorama del renderizado web sigue evolucionando rápidamente, con un enfoque cada vez mayor en experiencias optimizadas para el usuario final. La tendencia clara es hacia arquitecturas híbridas que seleccionen la mejor estrategia de renderizado para cada componente o ruta específica, en lugar de aplicar un enfoque único a toda la aplicación.

### Gestión de CSS y JavaScript en el Proceso de Hidratación

Cuando hablamos de hidratación, no solo debemos considerar el HTML, sino también cómo se gestionan el CSS y JavaScript necesarios para completar el proceso.

#### Transmisión del CSS en Renderizado del Lado del Servidor

El CSS puede enviarse de varias formas durante el renderizado del servidor:

1. **Incrustado directamente en el HTML** (crítico para la primera vista):

```html
<head>
  <style>
    /* CSS crítico para el primer renderizado */
    header {
      background-color: #333;
      color: white;
    }
    .hero {
      min-height: 400px;
    }
  </style>
</head>
```

2. **Como enlaces a archivos externos** (estilos completos):

```html
<head>
  <link rel="stylesheet" href="/styles/main.123abc.css" />
</head>
```

3. **Usando CSS-in-JS con extracción del lado del servidor**:

```jsx
// En servidor con styled-components o emotion
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();
try {
  const html = renderToString(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleTags(); // Obtiene <style> con el CSS

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        ${styleTags}
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/js/bundle.123abc.js"></script>
      </body>
    </html>
  `);
} finally {
  sheet.seal();
}
```

#### Obtención del JavaScript para Hidratación

El JavaScript necesario para la hidratación se obtiene principalmente de estas formas:

1. **Referencias a bundles en el HTML**:

```html
<body>
  <div id="root"><!-- HTML inicial --></div>

  <!-- Scripts principales para la hidratación -->
  <script src="/js/vendor.123abc.js"></script>
  <script src="/js/main.123abc.js"></script>
</body>
```

2. **Carga progresiva con priorización**:

```html
<body>
  <div id="root"><!-- HTML inicial --></div>

  <!-- Script crítico con prioridad alta -->
  <script src="/js/critical.123abc.js" defer></script>

  <!-- Scripts menos importantes con menor prioridad -->
  <script src="/js/comments.123abc.js" defer></script>
  <link rel="prefetch" href="/js/modal.123abc.js" />
</body>
```

3. **Importaciones dinámicas e hidratación selectiva**:

```jsx
// En el cliente
import { hydrateRoot } from 'react-dom/client';

// Hidrata solo componentes críticos inmediatamente
hydrateRoot(document.getElementById('root'), <App />);

// Carga componentes adicionales bajo demanda
if (isVisible('comments')) {
  import('./comments.js').then(module => {
    const Comments = module.default;
    hydrateRoot(document.getElementById('comments'), <Comments />);
  });
}
```

#### Optimizaciones Modernas para la Entrega de Recursos

Los frameworks modernos implementan diversas estrategias:

1. **División de código automática** (Next.js, Astro):

   - Separa el código por páginas/rutas
   - Genera bundles específicos para cada componente cliente
   - Solo envía el JS necesario para la ruta actual

2. **Streaming de HTML + Carga coordinada de JS**:

   - El servidor envía HTML por partes con instrucciones para cargar JS correspondiente
   - Cada fragmento puede tener su propio script asociado

3. **Precarga inteligente**:
   ```html
   <link rel="modulepreload" href="/js/header.js" />
   <link rel="preload" href="/js/main.js" as="script" />
   ```

#### Proceso Completo de Renderizado e Hidratación

1. **Solicitud inicial**:

   - Usuario solicita la página
   - Servidor ejecuta los componentes React
   - Genera HTML completo con CSS crítico

2. **Primera respuesta**:

   - Servidor envía HTML con CSS incluido/enlazado
   - HTML contiene enlaces a los scripts necesarios
   - El navegador muestra la página visualmente

3. **Carga de JavaScript**:

   - El navegador descarga los scripts en segundo plano
   - La página ya es visible pero no interactiva

4. **Hidratación**:
   - React "reconoce" el HTML existente
   - Enlaza los manejadores de eventos
   - Establece el estado inicial
   - La página se vuelve interactiva

Este proceso asegura que el usuario vea contenido rápidamente (HTML+CSS) mientras se prepara la interactividad (JS).
