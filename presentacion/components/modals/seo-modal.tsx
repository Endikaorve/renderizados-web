"use client"

import { ConceptModal } from "../concept-modal"

interface SEOModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SEOModal({ isOpen, onClose }: SEOModalProps) {
  return (
    <ConceptModal isOpen={isOpen} onClose={onClose} title="SEO (Search Engine Optimization)">
      <p className="text-slate-700 dark:text-slate-300">
        El Search Engine Optimization (SEO) es el conjunto de prácticas diseñadas para mejorar la visibilidad y el
        ranking de un sitio web en los resultados de los motores de búsqueda. En el contexto de las estrategias de
        renderizado, el SEO se refiere específicamente a cómo cada enfoque afecta la capacidad de los rastreadores de
        motores de búsqueda para indexar el contenido.
      </p>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Aspectos clave del SEO relacionados con el renderizado
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Contenido accesible</strong>: Los rastreadores deben poder ver todo el contenido relevante
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Tiempo de carga</strong>: Los motores de búsqueda favorecen sitios más rápidos
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>HTML semántico</strong>: Estructura clara que los rastreadores pueden entender
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Metadatos</strong>: Títulos, descripciones y etiquetas estructuradas
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Impacto de las estrategias de renderizado en SEO
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          <strong>CSR</strong>: Problemático porque muchos rastreadores tienen capacidades limitadas para ejecutar
          JavaScript
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>SSR/SSG/ISR</strong>: Excelente para SEO porque entregan HTML completo directamente
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          <strong>Streaming/PPR</strong>: Mantienen buen SEO mientras mejoran la experiencia de usuario
        </li>
      </ul>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-6">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          Google ha mejorado su capacidad para renderizar JavaScript, pero otros motores de búsqueda y redes sociales
          pueden tener limitaciones, por lo que entregar HTML pre-renderizado sigue siendo la mejor práctica para SEO.
        </p>
      </div>
    </ConceptModal>
  )
}
