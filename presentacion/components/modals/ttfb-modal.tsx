'use client';

import { ConceptModal } from '../concept-modal';

interface TTFBModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TTFBModal({ isOpen, onClose }: TTFBModalProps) {
  return (
    <ConceptModal
      isOpen={isOpen}
      onClose={onClose}
      title="TTFB (Time to First Byte)"
    >
      <p className="text-slate-700 dark:text-slate-300">
        El Time to First Byte (TTFB) es una métrica que mide el tiempo desde que
        el navegador solicita una página hasta que recibe el primer byte de
        información del servidor. Es un indicador clave de la capacidad de
        respuesta del servidor y la eficiencia de la red.
      </p>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Componentes del TTFB
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          Tiempo de búsqueda DNS
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Tiempo de establecimiento de conexión TCP
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Tiempo de negociación TLS (para HTTPS)
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Tiempo que tarda el servidor en procesar la solicitud
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Tiempo que tarda el primer byte en viajar desde el servidor al cliente
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Importancia del TTFB
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          Es un factor crítico en el rendimiento general de carga de la página
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Afecta todas las métricas de rendimiento posteriores
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Un TTFB alto puede indicar problemas de servidor, base de datos lenta
          o configuración de red ineficiente
        </li>
      </ul>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-6">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          En estrategias como SSR, el TTFB puede ser más alto porque el servidor
          debe renderizar completamente la página antes de enviar cualquier byte
          al cliente, mientras que estrategias como Streaming mejoran esta
          métrica al enviar partes de la página tan pronto como estén
          disponibles.
        </p>
      </div>
    </ConceptModal>
  );
}
