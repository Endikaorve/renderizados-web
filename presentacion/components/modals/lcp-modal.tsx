"use client"

import { ConceptModal } from "../concept-modal"

interface LCPModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LCPModal({ isOpen, onClose }: LCPModalProps) {
  return (
    <ConceptModal isOpen={isOpen} onClose={onClose} title="LCP (Largest Contentful Paint)">
      <p className="text-slate-700 dark:text-slate-300">
        El Largest Contentful Paint (LCP) es una métrica de rendimiento web que mide el tiempo que tarda en renderizarse
        el elemento de contenido más grande visible en la ventana (viewport) inicial. Es considerada una de las Core Web
        Vitals de Google y un indicador clave de la experiencia de usuario percibida.
      </p>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
        Elementos que suelen determinar el LCP
      </h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">Imágenes grandes</li>
        <li className="text-slate-700 dark:text-slate-300">Bloques de texto</li>
        <li className="text-slate-700 dark:text-slate-300">Elementos de video</li>
        <li className="text-slate-700 dark:text-slate-300">
          Gráficos o elementos con fondo que contienen imágenes grandes
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">Valores de referencia</h4>

      <ul className="space-y-2">
        <li className="text-green-600 dark:text-green-400 font-medium">Bueno: menos de 2.5 segundos</li>
        <li className="text-amber-600 dark:text-amber-400 font-medium">Necesita mejora: entre 2.5 y 4 segundos</li>
        <li className="text-red-600 dark:text-red-400 font-medium">Pobre: más de 4 segundos</li>
      </ul>

      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">Importancia del LCP</h4>

      <ul className="space-y-2">
        <li className="text-slate-700 dark:text-slate-300">
          Representa cuándo el usuario percibe que la mayor parte del contenido está cargado
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Correlaciona bien con la percepción de velocidad de carga
        </li>
        <li className="text-slate-700 dark:text-slate-300">
          Impacta directamente en el SEO, ya que es un factor de ranking para Google
        </li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          Estrategias como SSG, Streaming y PPR están diseñadas para optimizar el LCP al priorizar la entrega rápida del
          contenido principal.
        </p>
      </div>
    </ConceptModal>
  )
}
