'use client';

import { ConceptModal } from '../concept-modal';

interface HydrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HydrationModal({ isOpen, onClose }: HydrationModalProps) {
  return (
    <ConceptModal
      isOpen={isOpen}
      onClose={onClose}
      title="¿Qué es la hidratación?"
    >
      <p className="text-slate-700 dark:text-slate-300">
        La hidratación (hydration) en React es el proceso mediante el cual React
        "revive" o "activa" el HTML estático previamente renderizado,
        convirtiéndolo en una aplicación React interactiva. Técnicamente,
        durante este proceso:
      </p>

      <ul className="space-y-2 my-4">
        <li className="text-slate-700 dark:text-slate-300">
          React reconcilia su árbol virtual de componentes con el DOM existente
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Adjunta los event listeners a los elementos DOM
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Inicializa el estado local de los componentes
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Establece las referencias y otras APIs de React
        </li>
      </ul>

      <p className="text-slate-700 dark:text-slate-300 italic">
        Es como "verter agua" (JavaScript) sobre el "polvo deshidratado" (HTML
        estático) para obtener una aplicación plenamente funcional.
      </p>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Problemas comunes de la hidratación
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Tiempo de bloqueo:</strong> La hidratación tradicional bloquea
          el hilo principal
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Flash of non-interactive content:</strong> Período donde el
          contenido se ve pero no responde
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Mismatch de contenido:</strong> Errores cuando el HTML del
          servidor y el render en cliente no coinciden
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Costo de JavaScript:</strong> Toda la lógica de renderizado
          debe enviarse al cliente
        </li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
        <h5 className="text-blue-700 dark:text-blue-400 font-medium mb-2">
          Evolución de la hidratación
        </h5>
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          React ha evolucionado su enfoque de hidratación con nuevas técnicas
          como la hidratación progresiva, hidratación selectiva y React Server
          Components, que buscan mitigar estos problemas manteniendo la
          interactividad.
        </p>
      </div>
    </ConceptModal>
  );
}
