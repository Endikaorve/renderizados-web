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
            'Todo el proceso de renderizado ocurre en el navegador del cliente.',
            'El servidor entrega un archivo HTML mínimo con enlaces a archivos JavaScript.',
            'El navegador descarga, analiza y ejecuta estos scripts para construir la interfaz de usuario.',
            'React utiliza este enfoque en sus implementaciones tradicionales de Single Page Applications (SPAs).',
            'Una vez cargada la aplicación JavaScript, la navegación entre páginas no requiere nuevas solicitudes de HTML al servidor.',
            'La aplicación maneja las transiciones de vista, solicitando solo los datos necesarios a través de APIs.',
            'Este enfoque crea una experiencia de usuario más fluida después de la carga inicial, similar a una aplicación nativa.',
          ]}
          pros={[
            'Baja carga en el servidor, ya que solo entrega archivos estáticos',
            'Experiencia de usuario fluida tras la carga inicial, con transiciones suaves entre páginas',
            'Clara separación entre frontend y backend, permitiendo desarrollo paralelo',
            'Facilita la creación de aplicaciones web altamente interactivas',
            'Menor consumo de ancho de banda después de la carga inicial',
          ]}
          cons={[
            'SEO pobre, ya que los rastreadores pueden no ejecutar JavaScript o esperar a que se complete',
            'Peor tiempo hasta contenido interactivo (TTI), especialmente en dispositivos de gama baja',
            'Carga inicial lenta, especialmente con bundles JavaScript grandes',
            'Mayor consumo de recursos en el dispositivo del usuario',
            'Experiencia degradada para usuarios con JavaScript deshabilitado',
          ]}
          illustration="client-side"
        />

        <RenderingSection
          id="ssg"
          title="Static Site Generation (SSG)"
          description={[
            'Las páginas HTML se generan por adelantado durante el proceso de compilación (build time).',
            'El framework (como Next.js o Gatsby) ejecuta todo el código React en el servidor durante el build.',
            'Se obtienen los datos necesarios y se generan archivos HTML estáticos para cada ruta.',
            'Estos archivos pueden ser servidos desde un CDN, resultando en tiempos de carga extremadamente rápidos.',
            "La hidratación es un concepto fundamental: React 'hidrata' el HTML estático conectándolo con JavaScript.",
            'Durante la hidratación, React establece los event listeners y reconcilia el DOM virtual con el HTML pre-renderizado.',
            'Este proceso permite que el contenido se muestre rápidamente mientras la interactividad se establece progresivamente.',
          ]}
          pros={[
            'Rendimiento excelente, con tiempos de carga muy rápidos',
            'Muy barato de servir, ideal para CDNs y hosting estático',
            'SEO óptimo, ya que los rastreadores reciben HTML completo',
            'Seguridad mejorada al reducir la superficie de ataque',
            'Funciona sin JavaScript (para el contenido inicial)',
            'Menor consumo de recursos del servidor en producción',
          ]}
          cons={[
            'Poco flexible para contenido dinámico o personalizado',
            'Tiempos de build largos para sitios grandes',
            'Requiere reconstrucción completa para actualizar contenido',
            'No adecuado para contenido que cambia frecuentemente',
            'Limitaciones para contenido específico de usuario (como dashboards personalizados)',
          ]}
          illustration="static-generation"
        />

        <RenderingSection
          id="isr"
          title="Incremental Static Regeneration (ISR)"
          description={[
            'Evolución del SSG que resuelve la necesidad de reconstruir todo el sitio para actualizar el contenido.',
            'Permite regenerar páginas estáticas individuales en segundo plano, después del despliegue inicial.',
            'Se puede especificar un intervalo de revalidación para cada página.',
            'Cuando un usuario solicita la página, se muestra la versión estática existente mientras se regenera en segundo plano.',
            'Es posible desencadenar revalidaciones bajo demanda a través de una API.',
            'Combina lo mejor de los mundos estático y dinámico: velocidad y eficiencia con contenido actualizado.',
            'Particularmente útil para sitios con contenido que cambia con frecuencia moderada (blogs, catálogos, noticias).',
          ]}
          pros={[
            'Combina los beneficios de rendimiento del contenido estático con la actualización periódica',
            'Actualización incremental sin necesidad de rebuilds completos',
            'Excelente SEO al servir siempre HTML completo',
            'Menor carga en el servidor comparado con SSR puro',
            'Permite definir estrategias de revalidación por página',
            'Soporta revalidación bajo demanda para contenido crítico',
          ]}
          cons={[
            'Complejidad adicional en la configuración y mantenimiento',
            'Posible contenido obsoleto durante el intervalo de revalidación',
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
            'El HTML se genera dinámicamente en el servidor para cada solicitud.',
            'El servidor ejecuta los componentes React, obtiene los datos necesarios y genera HTML completo.',
            'El usuario ve el contenido inmediatamente, antes de que se descargue y ejecute cualquier JavaScript.',
            'A diferencia del SSG, el SSR genera el HTML en tiempo de ejecución, no durante el build.',
            'Ideal para contenido que debe ser actualizado en cada solicitud o personalizado para cada usuario.',
            "Después de recibir el HTML inicial, el navegador descarga el JavaScript para 'hidratar' la página.",
            'Proporciona un equilibrio entre velocidad de primera carga y capacidad de mostrar contenido dinámico.',
          ]}
          pros={[
            'Ideal para SEO, ya que los rastreadores reciben HTML completo con cada solicitud',
            'Carga inicial perceptivamente rápida (mejor LCP), con contenido visible antes de que se cargue JavaScript',
            'Contenido siempre actualizado en cada solicitud',
            'Permite personalización basada en el usuario o contexto de la solicitud',
            'Funciona incluso con JavaScript deshabilitado (para el contenido inicial)',
            'Mejor experiencia en dispositivos de gama baja que CSR puro',
          ]}
          cons={[
            'Alto coste computacional en el servidor para cada solicitud',
            'Requiere servidores más potentes y escalables que SSG',
            'Tiempo hasta el primer byte (TTFB) potencialmente más lento',
            'Requiere hidratación posterior que puede causar retrasos en la interactividad',
            'Mayor complejidad en la implementación y mantenimiento',
            'Posibles cuellos de botella en el servidor durante picos de tráfico',
          ]}
          illustration="server-side"
        />

        <RenderingSection
          id="streaming"
          title="SSR con Streaming"
          description={[
            'Evolución del SSR tradicional que permite enviar partes del HTML progresivamente.',
            'Aprovecha las capacidades de streaming de HTTP para comenzar a enviar HTML tan pronto como esté disponible.',
            'React renderiza primero el esqueleto de la página (layout, cabecera, navegación) y lo envía inmediatamente.',
            'El navegador puede comenzar a procesar y mostrar este contenido inicial al usuario.',
            'Los componentes que dependen de datos más lentos se renderizan cuando están disponibles.',
            'Se integra perfectamente con React Suspense para declarar estados de carga para diferentes partes de la UI.',
            'Mejora significativamente métricas como TTFB y LCP, especialmente en conexiones lentas.',
          ]}
          pros={[
            'Mejora TTFB y LCP al enviar contenido tan pronto como esté disponible',
            'Experiencia de carga progresiva que parece más rápida para el usuario',
            'Evita que operaciones lentas bloqueen toda la página',
            'Permite priorizar contenido crítico para la experiencia inicial',
            'Integración natural con React Suspense y patrones de carga asíncrona',
            'Mejor UX en conexiones lentas o inestables',
          ]}
          cons={[
            'Mayor complejidad de implementación comparado con SSR tradicional',
            'Requiere planificación cuidadosa de la estructura de componentes y suspense boundaries',
            'Potenciales problemas de layout shift si no se diseña correctamente',
            'Soporte limitado en algunos entornos de hosting',
            'Debugging más complejo debido a la naturaleza asíncrona del renderizado',
            'Requiere consideraciones especiales para hidratación progresiva',
          ]}
          illustration="streaming"
        />

        <RenderingSection
          id="ppr"
          title="Partial Pre-rendering (PPR)"
          description={[
            'Estrategia innovadora introducida por Next.js que combina renderizado estático y dinámico en una misma página.',
            "Permite pre-renderizar estáticamente partes de una página durante el build, dejando 'agujeros' para contenido dinámico.",
            'El shell de la página (layouts, navegación, elementos comunes) se pre-renderiza durante el build.',
            'Estos elementos estáticos se entregan inmediatamente al usuario para una carga inicial rápida.',
            'Las partes dinámicas (contenido personalizado, datos en tiempo real) se renderizan en el servidor en tiempo de ejecución.',
            'Ofrece una solución elegante al dilema entre rendimiento y dinamismo.',
            'Especialmente útil para páginas con elementos comunes y contenido específico de usuario.',
          ]}
          pros={[
            'Optimiza rendimiento y costes al combinar contenido estático y dinámico',
            'Flexibilidad para decidir qué partes de la página son estáticas y cuáles dinámicas',
            'Mejora significativa en métricas de rendimiento como LCP',
            'Reduce la carga del servidor al pre-renderizar partes comunes',
            'Mantiene la capacidad de mostrar contenido personalizado o en tiempo real',
            'Permite estrategias de caché granulares por secciones de página',
            'Ideal para aplicaciones con mezcla de contenido estático y dinámico',
          ]}
          cons={[
            'Relativamente nuevo, con posibles cambios en la implementación',
            'Requiere Next.js 15+ u otros frameworks que lo soporten',
            'Mayor complejidad en el diseño de la arquitectura de componentes',
            'Potenciales desafíos en la gestión del estado compartido entre partes estáticas y dinámicas',
            'Curva de aprendizaje para implementarlo correctamente',
            'Consideraciones especiales para testing y debugging',
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
