"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export function ConclusionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const conclusions = [
    "Cada estrategia tiene un uso ideal según el tipo de aplicación y contenido.",
    "El enfoque híbrido es la norma: CSR + SSR + SSG coexistiendo en la misma aplicación.",
    "React evoluciona hacia optimizaciones de carga progresiva y server-first.",
    "Es importante evaluar siempre: tipo de contenido, SEO, rendimiento y costes.",
    "Las nuevas estrategias como PPR y RSC ofrecen lo mejor de ambos mundos.",
  ]

  return (
    <section
      id="conclusion"
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Conclusiones</h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            Reflexiones finales sobre las estrategias de renderizado
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <ul className="space-y-6">
            {conclusions.map((conclusion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700 dark:text-slate-300">{conclusion}</p>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Mensaje final</h3>
            <p className="text-slate-700 dark:text-slate-300">
              El futuro del renderizado web se dirige hacia soluciones híbridas y adaptativas. La elección de la
              estrategia correcta dependerá siempre del caso de uso específico, pero las nuevas tecnologías nos permiten
              combinar lo mejor de cada enfoque para crear experiencias web rápidas, interactivas y accesibles.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
