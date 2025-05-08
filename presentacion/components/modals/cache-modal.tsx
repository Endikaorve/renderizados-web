'use client';

import { ConceptModal } from '../concept-modal';

interface CacheModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CacheModal({ isOpen, onClose }: CacheModalProps) {
  return (
    <ConceptModal
      isOpen={isOpen}
      onClose={onClose}
      title="Caché en Estrategias de Renderizado Web"
    >
      <p className="text-slate-700 dark:text-slate-300">
        La caché es un mecanismo de almacenamiento temporal que guarda copias de
        recursos (como HTML, CSS, JavaScript, imágenes o datos) para servirlos
        más rápidamente en solicitudes futuras, evitando regenerar o descargar
        el mismo contenido repetidamente.
      </p>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Niveles de caché en aplicaciones web
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Caché del navegador</strong>: Almacena recursos localmente en
          el dispositivo del usuario
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Caché de CDN</strong>: Almacena contenido en servidores
          distribuidos geográficamente
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Caché de aplicación</strong>: Almacena resultados de
          renderizado o datos en el servidor
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Caché de base de datos</strong>: Almacena resultados de
          consultas frecuentes
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Rol de la caché en diferentes estrategias
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          <strong>SSG</strong>: Genera HTML en build time que puede ser cacheado
          indefinidamente
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>ISR</strong>: Implementa caché con invalidación automática
          basada en tiempo o eventos
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>SSR con caché</strong>: Almacena respuestas renderizadas para
          solicitudes idénticas
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>PPR</strong>: Cachea partes estáticas mientras genera partes
          dinámicas en tiempo real
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Consideraciones importantes
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Estrategias de invalidación</strong>: Determinar cuándo y cómo
          actualizar contenido cacheado
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Granularidad</strong>: Cachear a nivel de página completa vs.
          componentes individuales
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Personalización</strong>: Balancear caché con contenido
          específico de usuario
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Encabezados HTTP</strong>: Controlar comportamiento de caché
          con Cache-Control, ETag, etc.
        </li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          Una estrategia de caché efectiva es fundamental para optimizar
          rendimiento, reducir costos de infraestructura y mejorar la
          escalabilidad de aplicaciones web.
        </p>
      </div>
    </ConceptModal>
  );
}
