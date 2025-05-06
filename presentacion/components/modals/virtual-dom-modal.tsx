"use client"

import { ConceptModal } from "../concept-modal"

interface VirtualDomModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VirtualDomModal({ isOpen, onClose }: VirtualDomModalProps) {
  return (
    <ConceptModal isOpen={isOpen} onClose={onClose} title="DOM Virtual (Virtual DOM)">
      <p className="text-slate-700 dark:text-slate-300">
        El DOM Virtual es una representación ligera en memoria del DOM real (Document Object Model) que React utiliza
        para optimizar las actualizaciones de la interfaz de usuario. Funciona como sigue:
      </p>

      <ul className="space-y-2 my-4">
        <li className="text-slate-700 dark:text-slate-300">
          React mantiene dos copias del DOM Virtual: una que representa el estado actual de la UI y otra que representa
          el estado deseado después de una actualización.
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Cuando cambia el estado o las props de un componente, React crea un nuevo árbol de DOM Virtual.
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          React compara este nuevo árbol con el anterior mediante un algoritmo llamado "diffing" para determinar
          exactamente qué cambios son necesarios.
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Solo los cambios identificados se aplican al DOM real del navegador, minimizando las operaciones DOM que son
          costosas en términos de rendimiento.
        </li>
      </ul>

      <p className="text-slate-700 dark:text-slate-300">
        Este enfoque permite a React evitar manipulaciones innecesarias del DOM y agrupar múltiples cambios en una sola
        actualización, resultando en un rendimiento significativamente mejor que la manipulación directa del DOM.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
        <h5 className="text-blue-700 dark:text-blue-400 font-medium mb-2">¿Por qué es importante?</h5>
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          El DOM Virtual es fundamental para entender cómo React logra su rendimiento. Sin él, cada pequeño cambio en el
          estado requeriría reconstruir toda la interfaz de usuario, lo que sería extremadamente ineficiente.
        </p>
      </div>
    </ConceptModal>
  )
}
