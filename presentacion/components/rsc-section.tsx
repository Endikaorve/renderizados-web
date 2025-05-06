"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X, ChevronDown, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HydrationModal } from "./hydration-modal"
import { VirtualDomModal } from "./modals/virtual-dom-modal"
import { TTIModal } from "./modals/tti-modal"
import { TTFBModal } from "./modals/ttfb-modal"
import { LCPModal } from "./modals/lcp-modal"
import { SEOModal } from "./modals/seo-modal"
import { StreamingModal } from "./modals/streaming-modal"
import { CacheModal } from "./modals/cache-modal"

export function RSCSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [showProsAndCons, setShowProsAndCons] = useState(false)
  const [showDiagram, setShowDiagram] = useState(false)

  // Estados para los modales
  const [isHydrationModalOpen, setIsHydrationModalOpen] = useState(false)
  const [isVirtualDomModalOpen, setIsVirtualDomModalOpen] = useState(false)
  const [isTTIModalOpen, setIsTTIModalOpen] = useState(false)
  const [isTTFBModalOpen, setIsTTFBModalOpen] = useState(false)
  const [isLCPModalOpen, setIsLCPModalOpen] = useState(false)
  const [isSEOModalOpen, setIsSEOModalOpen] = useState(false)
  const [isStreamingModalOpen, setIsStreamingModalOpen] = useState(false)
  const [isCacheModalOpen, setIsCacheModalOpen] = useState(false)

  const description = [
    "React Server Components representa un cambio paradigmático en cómo pensamos sobre los componentes React, no es una estrategia de renderizado en sí misma.",
    "Introduce una división explícita entre componentes que se ejecutan exclusivamente en el servidor y componentes que se ejecutan en el cliente.",
    "Los Server Components se ejecutan solo en el servidor y nunca se envían al cliente como JavaScript.",
    "Pueden acceder directamente a recursos del servidor como bases de datos, sistema de archivos o APIs internas sin exponer credenciales.",
    "Su código y dependencias no aumentan el tamaño del bundle JavaScript enviado al navegador.",
    "Los Client Components, marcados con la directiva 'use client', se renderizan inicialmente en el servidor pero también se envían al cliente como JavaScript.",
    "Esta arquitectura permite una composición flexible donde los Server Components pueden renderizar Client Components y viceversa.",
    "Proporciona un modelo mental claro para los desarrolladores sobre dónde se ejecuta cada parte de la aplicación.",
  ]

  const pros = [
    "Reduce significativamente el tamaño del bundle JavaScript enviado al cliente",
    "Acceso directo a recursos del servidor sin APIs intermedias",
    "Mejor seguridad al mantener código y datos sensibles solo en el servidor",
    "Modelo mental claro sobre la ejecución de componentes",
    "Mejora el rendimiento al mover computación pesada al servidor",
    "Permite usar librerías solo-servidor sin penalización en el cliente",
    "Integración perfecta con streaming para carga progresiva",
  ]

  const cons = [
    "Curva de aprendizaje significativa para el nuevo paradigma",
    "Limitaciones en componentes de servidor (no pueden usar estado o efectos)",
    "Requiere frameworks que soporten la arquitectura RSC",
    "Mayor complejidad en la comunicación entre componentes servidor y cliente",
    "Consideraciones especiales para testing y debugging",
    "Potenciales desafíos de rendimiento si no se diseña correctamente la frontera cliente/servidor",
  ]

  // Términos a detectar y sus correspondientes funciones para abrir modales
  const conceptTerms = [
    {
      terms: ["hidratación", "hidrata", "hidratar", "hidratado", "hidratada"],
      action: () => setIsHydrationModalOpen(true),
    },
    {
      terms: ["DOM Virtual", "Virtual DOM", "DOM virtual", "virtual DOM", "VDOM", "vdom"],
      action: () => setIsVirtualDomModalOpen(true),
    },
    {
      terms: ["TTI", "Time to Interactive", "tiempo hasta interactivo"],
      action: () => setIsTTIModalOpen(true),
    },
    {
      terms: ["TTFB", "Time to First Byte", "tiempo hasta el primer byte"],
      action: () => setIsTTFBModalOpen(true),
    },
    {
      terms: ["LCP", "Largest Contentful Paint"],
      action: () => setIsLCPModalOpen(true),
    },
    {
      terms: ["SEO", "Search Engine Optimization", "posicionamiento en buscadores"],
      action: () => setIsSEOModalOpen(true),
    },
    {
      terms: ["streaming", "stream", "transmisión progresiva"],
      action: () => setIsStreamingModalOpen(true),
    },
    {
      terms: ["caché", "cache", "caching", "cached", "cacheado", "cacheada"],
      action: () => setIsCacheModalOpen(true),
    },
  ]

  // Reemplazar la función processText con esta versión mejorada que evita la duplicación
  const processText = (text: string) => {
    // Buscar texto entre etiquetas <concept> y </concept>
    const conceptRegex = /<concept>(.*?)<\/concept>/
    const match = text.match(conceptRegex)

    if (match) {
      const parts = text.split(conceptRegex)
      return (
        <>
          {parts[0]}
          <button
            onClick={() => handleConceptClick(match[1])}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded inline-flex items-center"
          >
            {match[1]}
          </button>
          {parts[2]}
        </>
      )
    }

    // Buscar términos específicos con una expresión regular más robusta
    for (const conceptGroup of conceptTerms) {
      for (const term of conceptGroup.terms) {
        // Usamos una expresión regular que puede encontrar el término incluso cuando está
        // rodeado de otros caracteres como paréntesis, comas, etc.
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const regex = new RegExp(`\\b${escapedTerm}\\b`, "i")

        if (regex.test(text)) {
          const parts = text.split(regex)

          if (parts.length >= 2) {
            return (
              <>
                {parts[0]}
                <button
                  onClick={conceptGroup.action}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded inline-flex items-center"
                >
                  {term}
                </button>
                {parts.slice(1).join("")}
              </>
            )
          }
        }
      }
    }

    return text
  }

  // Función para manejar clics en conceptos
  const handleConceptClick = (concept: string) => {
    const lowerConcept = concept.toLowerCase()

    for (const conceptGroup of conceptTerms) {
      for (const term of conceptGroup.terms) {
        if (lowerConcept.includes(term.toLowerCase())) {
          conceptGroup.action()
          return
        }
      }
    }
  }

  return (
    <section id="rsc" ref={ref} className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center"
          >
            React Server Components (RSC)
          </motion.h2>

          {/* Ilustración */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md mb-10 mx-auto bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="h-10 w-10 text-indigo-500 mx-auto">🖥️</div>
                  <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">Servidor</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 rounded text-xs text-indigo-700 dark:text-indigo-300">
                    RSC
                  </div>
                  <div className="h-4 w-4 text-slate-500 my-1">➡️</div>
                  <div className="px-2 py-1 bg-violet-100 dark:bg-violet-900/50 rounded text-xs text-violet-700 dark:text-violet-300">
                    HTML + JSON
                  </div>
                </div>

                <div className="text-center">
                  <div className="h-10 w-10 text-slate-500 mx-auto">💻</div>
                  <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">Cliente</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <div className="text-xs text-indigo-500 dark:text-indigo-400">Server Components</div>
                  <div className="text-xs text-violet-500 dark:text-violet-400">Client Components</div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-indigo-200 dark:bg-indigo-700 rounded w-full"></div>
                  <div className="flex space-x-1">
                    <div className="h-2 bg-indigo-200 dark:bg-indigo-700 rounded w-1/2"></div>
                    <div className="h-2 bg-violet-200 dark:bg-violet-700 rounded w-1/4"></div>
                  </div>
                  <div className="h-2 bg-violet-200 dark:bg-violet-700 rounded w-1/3"></div>
                </div>
              </div>

              <div className="text-center mt-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  División explícita entre componentes de servidor y cliente
                </span>
              </div>
            </div>
          </motion.div>

          {/* Descripción en formato de puntos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-3xl w-full"
          >
            <ul className="space-y-3 list-disc pl-6">
              {description.map((point, index) => (
                <li key={index}>{processText(point)}</li>
              ))}
            </ul>
          </motion.div>

          {/* Botones para mostrar diagrama y pros/cons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-8 justify-center"
          >
            {!showDiagram && (
              <Button onClick={() => setShowDiagram(true)} variant="outline" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Mostrar diagrama técnico
              </Button>
            )}

            {!showProsAndCons && !showDiagram && (
              <Button onClick={() => setShowProsAndCons(true)} variant="outline" className="flex items-center gap-2">
                Mostrar ventajas y desventajas <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </motion.div>

          {/* Diagrama técnico (condicional) */}
          {showDiagram && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="w-full mb-10 overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src="/placeholder.svg?height=400&width=1200&text=Diagrama+Técnico+RSC"
                alt="Diagrama técnico de React Server Components"
                width={1200}
                height={400}
                className="w-full h-auto bg-slate-900 dark:bg-slate-950"
              />
            </motion.div>
          )}

          {/* Botón de ventajas/desventajas debajo del diagrama cuando éste está visible */}
          {!showProsAndCons && showDiagram && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Button onClick={() => setShowProsAndCons(true)} variant="outline" className="flex items-center gap-2">
                Mostrar ventajas y desventajas <ChevronDown className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Pros y Contras (condicional) */}
          {showProsAndCons && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 w-full max-w-3xl"
            >
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center">
                  <Check className="mr-2 h-5 w-5" /> Ventajas
                </h3>
                <ul className="space-y-2">
                  {pros.map((pro, index) => (
                    <li key={index} className="text-slate-700 dark:text-slate-300 flex">
                      <span className="mr-2 text-green-500 flex-shrink-0">•</span>
                      <span>{processText(pro)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center">
                  <X className="mr-2 h-5 w-5" /> Desventajas
                </h3>
                <ul className="space-y-2">
                  {cons.map((con, index) => (
                    <li key={index} className="text-slate-700 dark:text-slate-300 flex">
                      <span className="mr-2 text-red-500 flex-shrink-0">•</span>
                      <span>{processText(con)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Modales de conceptos */}
          <HydrationModal isOpen={isHydrationModalOpen} onClose={() => setIsHydrationModalOpen(false)} />
          <VirtualDomModal isOpen={isVirtualDomModalOpen} onClose={() => setIsVirtualDomModalOpen(false)} />
          <TTIModal isOpen={isTTIModalOpen} onClose={() => setIsTTIModalOpen(false)} />
          <TTFBModal isOpen={isTTFBModalOpen} onClose={() => setIsTTFBModalOpen(false)} />
          <LCPModal isOpen={isLCPModalOpen} onClose={() => setIsLCPModalOpen(false)} />
          <SEOModal isOpen={isSEOModalOpen} onClose={() => setIsSEOModalOpen(false)} />
          <StreamingModal isOpen={isStreamingModalOpen} onClose={() => setIsStreamingModalOpen(false)} />
          <CacheModal isOpen={isCacheModalOpen} onClose={() => setIsCacheModalOpen(false)} />
        </motion.div>
      </div>
    </section>
  )
}
