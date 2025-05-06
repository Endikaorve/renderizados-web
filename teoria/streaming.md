# Explicación del streaming en Next.js con PPR

## ¿Qué es Partial Prerendering (PPR)?

PPR es una estrategia de renderizado en Next.js que combina:

- Contenido estático (prerenderizado)
- Contenido dinámico (renderizado bajo demanda)

Todo en una misma respuesta HTTP, ofreciendo lo mejor de ambos mundos.

## Cómo funciona el streaming técnicamente

1. **Respuesta en dos fases:**

   - **Fase 1:** El servidor envía inmediatamente la "shell" estática de la página
   - **Fase 2:** Los componentes dinámicos se envían progresivamente cuando están listos

2. **Mecanismo de transporte:**

   - Se utiliza una única conexión HTTP que permanece abierta
   - El contenido se envía en fragmentos (chunks) mediante "chunked transfer encoding" en HTTP/1.1 o DATA frames en HTTP/2
   - No se espera a que todos los datos estén disponibles para iniciar la respuesta

3. **Implementación en React/Next.js:**

   - Se basa en React Server Components y la API `Suspense`
   - Los componentes envueltos en `<Suspense>` generan "huecos" en el HTML inicial
   - Estos huecos se rellenan progresivamente con contenido real cuando las promesas se resuelven
   - Se insertan pequeños scripts inline que reemplazan los fallbacks por el contenido real

4. **Proceso de renderizado:**
   - El servidor identifica componentes que dependen de datos asíncronos
   - Envía primero todo lo que puede renderizar inmediatamente
   - Mantiene la conexión abierta mientras procesa las operaciones asíncronas
   - Cuando los datos están disponibles, genera y transmite el HTML correspondiente

## Ventajas concretas

1. **Rendimiento:**

   - TTFB (Time To First Byte) extremadamente rápido
   - FCP (First Contentful Paint) mejorado al mostrar contenido estático de inmediato
   - LCP (Largest Contentful Paint) optimizado al no bloquear toda la página

2. **Experiencia de usuario:**

   - La página se va construyendo progresivamente ante los ojos del usuario
   - Los estados de carga (skeletons) se reemplazan naturalmente por contenido real
   - No hay saltos visuales ni recálculos de layout como en la hidratación tradicional

3. **Eficiencia:**
   - Se evita el "waterfall problem" donde toda la página espera por el dato más lento
   - Cada componente dinámico se resuelve independientemente
   - El servidor puede liberar recursos más rápidamente al enviar partes de la respuesta

## En la práctica

En nuestra aplicación de Pokémon:

1. El usuario recibe instantáneamente el título, descripción y estructura de la página
2. Ve un skeleton loader mientras los datos de Pokémon se cargan en el servidor
3. Cuando los datos están disponibles (después de 2 segundos), el skeleton se reemplaza por la lista real
4. Todo ocurre en una única carga de página, sin navegación adicional

Este enfoque ofrece una experiencia significativamente más fluida que las alternativas tradicionales como CSR (Client-Side Rendering) o SSR (Server-Side Rendering) bloqueante.
