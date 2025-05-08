import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { RenderingSection } from '@/components/rendering-section';
import { ComparisonTable } from '@/components/comparison-table';
import { RSCSection } from '@/components/rsc-section';
import { ConclusionSection } from '@/components/conclusion-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <main>
        <HeroSection />

        {/* Secciones de Estrategias de Renderizado */}
        <RenderingSection
          id="csr"
          title="Client Side Rendering (CSR)"
          description={[
            'Estrategia donde todo el proceso de renderizado ocurre en el navegador del cliente.',
            'El servidor entrega un archivo HTML mínimo con enlaces a archivos JavaScript.',
            'El navegador descarga, analiza y ejecuta estos scripts para construir la interfaz de usuario.',
            'Después de la carga inicial, la navegación entre páginas no requiere nuevas solicitudes de HTML.',
            'La aplicación maneja las transiciones de vista, solicitando solo los datos necesarios a través de APIs.',
            'React utiliza este enfoque en sus implementaciones tradicionales de Single Page Applications (SPAs).',
            'Librerías como React Query, SWR o TanStack Query optimizan el rendimiento mediante caché y gestión de estado.',
            'Ideal para aplicaciones altamente interactivas con usuarios recurrentes.',
          ]}
          pros={[
            'Experiencia de usuario fluida tras la carga inicial, con transiciones suaves entre páginas',
            'Menor consumo de ancho de banda después de la carga inicial',
            'Baja carga en el servidor, ya que solo entrega archivos estáticos',
            'Clara separación entre frontend y backend, permitiendo desarrollo paralelo',
            'Excelente para aplicaciones web altamente interactivas y complejas',
          ]}
          cons={[
            'Carga inicial lenta, especialmente con bundles JavaScript grandes',
            'Peor tiempo hasta contenido interactivo (TTI), especialmente en dispositivos de gama baja',
            'SEO limitado, ya que los rastreadores pueden no ejecutar JavaScript o esperar a que se complete',
            'Mayor consumo de recursos en el dispositivo del usuario',
            'Experiencia degradada para usuarios con JavaScript deshabilitado',
          ]}
          illustration="client-side"
        />

        <RenderingSection
          id="ssg"
          title="Static Site Generation (SSG)"
          description={[
            'Estrategia donde las páginas HTML se generan por adelantado durante el proceso de compilación.',
            'El framework ejecuta todo el código React en el servidor durante el build.',
            'Se obtienen los datos necesarios y se generan archivos HTML estáticos para cada ruta.',
            'Estos archivos pueden ser servidos desde un CDN, resultando en tiempos de carga extremadamente rápidos.',
            'React "hidrata" el HTML estático conectándolo con JavaScript para añadir interactividad.',
            'Ideal para sitios con contenido que no cambia frecuentemente como landing pages o documentación.',
            'Ofrece el mejor rendimiento posible para el usuario final, con un coste de infraestructura mínimo.',
          ]}
          pros={[
            'Rendimiento excelente, con tiempos de carga muy rápidos',
            'SEO óptimo, ya que los rastreadores reciben HTML completo',
            'Muy económico de servir, ideal para CDNs y hosting estático',
            'Seguridad mejorada al reducir la superficie de ataque',
            'Funciona incluso sin JavaScript (para el contenido inicial)',
          ]}
          cons={[
            'No adecuado para contenido que cambia frecuentemente',
            'Limitaciones para contenido personalizado o específico de usuario',
            'Requiere reconstrucción completa para actualizar contenido',
            'Tiempos de build largos para sitios grandes',
            'Poca flexibilidad para datos en tiempo real o contenido dinámico',
          ]}
          illustration="static-generation"
        />

        <RenderingSection
          id="isr"
          title="Incremental Static Regeneration (ISR)"
          description={[
            'Evolución del SSG que permite regenerar páginas estáticas individuales en segundo plano.',
            'Las páginas se generan estáticamente en el build inicial, como en SSG tradicional.',
            'Se puede especificar un intervalo de revalidación para cada página o sección.',
            'Cuando un usuario solicita la página, se muestra la versión estática mientras se regenera en segundo plano.',
            'Es posible desencadenar revalidaciones bajo demanda a través de una API.',
            'Combina la velocidad del contenido estático con la frescura del contenido actualizado periódicamente.',
            'Ideal para sitios con contenido que cambia con frecuencia moderada como blogs, catálogos o noticias.',
          ]}
          pros={[
            'Rendimiento óptimo al servir contenido pre-generado como SSG',
            'Actualización incremental sin necesidad de rebuilds completos',
            'Excelente SEO al servir siempre HTML completo',
            'Menor carga en el servidor comparado con SSR puro',
            'Estrategias de revalidación flexibles por página o sección',
          ]}
          cons={[
            'Posible contenido obsoleto durante el intervalo de revalidación',
            'Complejidad adicional en la configuración y mantenimiento',
            'Requiere infraestructura que soporte esta funcionalidad',
            'Mayor complejidad para depurar problemas de caché',
            'Potenciales inconsistencias entre páginas durante actualizaciones',
          ]}
          illustration="incremental-static"
        />

        <RenderingSection
          id="ssr"
          title="Server Side Rendering (SSR)"
          description={[
            'Estrategia donde el HTML se genera dinámicamente en el servidor para cada solicitud.',
            'El servidor ejecuta los componentes React, obtiene los datos necesarios y genera HTML completo.',
            'El usuario recibe contenido visible inmediatamente, antes de que se descargue el JavaScript.',
            'A diferencia del SSG, el SSR genera el HTML en tiempo de ejecución, no durante el build.',
            'Después de recibir el HTML inicial, el navegador descarga el JavaScript para "hidratar" la página.',
            'Ideal para contenido que debe ser actualizado en cada solicitud o personalizado para cada usuario.',
            'Proporciona un equilibrio entre velocidad de primera carga y capacidad de mostrar contenido dinámico.',
          ]}
          pros={[
            'Carga inicial perceptivamente rápida, con contenido visible antes de que se cargue JavaScript',
            'SEO óptimo, ya que los rastreadores reciben HTML completo con cada solicitud',
            'Contenido siempre actualizado en cada solicitud',
            'Permite personalización basada en el usuario o contexto de la solicitud',
            'Funciona incluso con JavaScript deshabilitado (para el contenido inicial)',
          ]}
          cons={[
            'Alto coste computacional en el servidor para cada solicitud',
            'Tiempo hasta el primer byte (TTFB) potencialmente más lento',
            'Requiere servidores más potentes y escalables que SSG',
            'Retrasos en la interactividad debido al proceso de hidratación',
            'Posibles cuellos de botella en el servidor durante picos de tráfico',
          ]}
          illustration="server-side"
        />

        <RenderingSection
          id="str"
          title="SSR con Streaming"
          description={[
            'Evolución del SSR tradicional que permite enviar partes del HTML progresivamente.',
            'Aprovecha las capacidades de streaming de HTTP para comenzar a enviar HTML tan pronto como esté disponible.',
            'React renderiza primero el esqueleto de la página y lo envía inmediatamente al navegador.',
            'Los componentes que dependen de datos más lentos se renderizan cuando están disponibles.',
            'Se integra con React Suspense para declarar estados de carga para diferentes partes de la UI.',
            'Mejora significativamente métricas como TTFB y LCP, especialmente en conexiones lentas.',
            'Ideal para páginas complejas con múltiples fuentes de datos de diferentes velocidades.',
          ]}
          pros={[
            'Mejora TTFB y LCP al enviar contenido tan pronto como esté disponible',
            'Experiencia de carga progresiva que parece más rápida para el usuario',
            'Evita que operaciones lentas bloqueen toda la página',
            'Permite priorizar contenido crítico para la experiencia inicial',
            'Mejor experiencia en conexiones lentas o inestables',
          ]}
          cons={[
            'Mayor complejidad de implementación comparado con SSR tradicional',
            'Requiere planificación cuidadosa de la estructura de componentes',
            'Potenciales problemas de layout shift si no se diseña correctamente',
            'Soporte limitado en algunos entornos de hosting',
            'Debugging más complejo debido a la naturaleza asíncrona del renderizado',
          ]}
          illustration="streaming"
        />

        <RenderingSection
          id="ppr"
          title="Partial Pre-rendering (PPR)"
          description={[
            'Estrategia innovadora que combina renderizado estático y dinámico en una misma página.',
            'Permite pre-renderizar estáticamente partes de una página durante el build, dejando "agujeros" para contenido dinámico.',
            'El shell de la página (layouts, navegación, elementos comunes) se pre-renderiza durante el build.',
            'Las partes dinámicas (contenido personalizado, datos en tiempo real) se renderizan en el servidor en tiempo de ejecución.',
            'Ofrece una solución equilibrada entre rendimiento y dinamismo.',
            'Introducida en Next.js 15+ como una evolución natural de las estrategias anteriores.',
            'Ideal para aplicaciones con elementos estáticos compartidos y secciones de contenido personalizado.',
          ]}
          pros={[
            'Optimiza rendimiento al combinar lo mejor del contenido estático y dinámico',
            'Mejora significativa en métricas como LCP para contenido crucial',
            'Reduce la carga del servidor al pre-renderizar partes comunes',
            'Mantiene la capacidad de mostrar contenido personalizado o en tiempo real',
            'Permite estrategias de caché granulares por secciones de página',
          ]}
          cons={[
            'Tecnología relativamente nueva, con posibles cambios en la implementación',
            'Requiere frameworks modernos que lo soporten (Next.js 15+)',
            'Mayor complejidad en el diseño de la arquitectura de componentes',
            'Desafíos en la gestión del estado compartido entre partes estáticas y dinámicas',
            'Curva de aprendizaje para implementarlo correctamente',
          ]}
          illustration="partial-prerendering"
        />

        <ComparisonTable />
        <RSCSection />
        <ConclusionSection />
      </main>
      <Footer />
    </div>
  );
}
