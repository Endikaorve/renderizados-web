"use client"

import { ConceptModal } from "../concept-modal"

interface TTIModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TTIModal({ isOpen, onClose }: TTIModalProps) {
  return (
    <ConceptModal isOpen={isOpen} onClose={onClose} title="TTI (Time to Interactive)">
      <p className="text-slate-700 dark:text-slate-300">
        El Time to Interactive (TTI) es una métrica de rendimiento web que mide el tiempo que tarda una página en
        volverse completamente interactiva para el usuario. Una página se considera "interactiva" cuando:
      </p>

      <ul className="space-y-2 my-4">
        <li className="text-slate-700 dark:text-slate-300">Ha mostrado contenido útil (como texto e imágenes)</li>
        <li className="text-slate-700 dark:text-slate-300">
          Los event listeners están registrados en los elementos visibles e interactivos
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          La página responde a las interacciones del usuario en 50ms o menos
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">Importancia del TTI</h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          Afecta directamente la percepción de velocidad y usabilidad
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Un TTI alto puede frustrar a los usuarios cuando intentan interactuar con elementos que parecen listos pero no
          responden
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Es especialmente relevante en dispositivos móviles o de gama baja con capacidades de procesamiento limitadas
        </li>
      </ul>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-6">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          En estrategias como CSR, el TTI suele ser más alto porque el navegador debe descargar, analizar y ejecutar
          todo el JavaScript antes de que la página sea interactiva, incluso si el contenido ya es visible.
        </p>
      </div>
    </ConceptModal>
  )
}
