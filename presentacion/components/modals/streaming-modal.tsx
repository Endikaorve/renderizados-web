'use client';

import { ConceptModal } from '../concept-modal';

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StreamingModal({ isOpen, onClose }: StreamingModalProps) {
  return (
    <ConceptModal
      isOpen={isOpen}
      onClose={onClose}
      title="Streaming en Renderizado Web"
    >
      <p className="text-slate-700 dark:text-slate-300">
        El streaming es una técnica que permite enviar partes de una página HTML
        al navegador de forma progresiva, en lugar de esperar a que todo el
        contenido esté listo. Funciona de manera similar al streaming de video,
        donde puedes comenzar a ver el contenido antes de que se descargue por
        completo.
      </p>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Cómo funciona el streaming
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          El servidor comienza a enviar HTML tan pronto como las primeras partes
          están listas. Se deja la conexión abierta
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          El navegador puede comenzar a procesar y mostrar este HTML inicial
          mientras llega más contenido
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Los componentes que dependen de datos más lentos se renderizan y
          envían cuando están disponibles a través de la conexión abierta
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          El resultado es una experiencia de carga progresiva y perceptivamente
          más rápida
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Beneficios del streaming
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          Reduce significativamente el tiempo hasta el primer contenido visible
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Mejora la percepción de velocidad para el usuario
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Permite priorizar contenido crítico (como navegación y layout)
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Evita que operaciones lentas bloqueen toda la página
        </li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          En React, el streaming se implementa a través de React Suspense, que
          permite "suspender" el renderizado de componentes mientras esperan
          datos, permitiendo que el resto de la UI se renderice y envíe al
          cliente.
        </p>
      </div>
    </ConceptModal>
  );
}
