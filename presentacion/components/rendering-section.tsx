'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ChevronDown, ImageIcon } from 'lucide-react';
import { RenderingIllustration } from './rendering-illustration';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HydrationModal } from './hydration-modal';
import { VirtualDomModal } from './modals/virtual-dom-modal';
import { TTIModal } from './modals/tti-modal';
import { TTFBModal } from './modals/ttfb-modal';
import { LCPModal } from './modals/lcp-modal';
import { SEOModal } from './modals/seo-modal';
import { StreamingModal } from './modals/streaming-modal';
import { CacheModal } from './modals/cache-modal';

interface RenderingSectionProps {
  id: string;
  title: string;
  description: string[];
  pros: string[];
  cons: string[];
  illustration: string;
}

export function RenderingSection({
  id,
  title,
  description,
  pros,
  cons,
  illustration,
}: RenderingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showProsAndCons, setShowProsAndCons] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);

  // Estados para los modales
  const [isHydrationModalOpen, setIsHydrationModalOpen] = useState(false);
  const [isVirtualDomModalOpen, setIsVirtualDomModalOpen] = useState(false);
  const [isTTIModalOpen, setIsTTIModalOpen] = useState(false);
  const [isTTFBModalOpen, setIsTTFBModalOpen] = useState(false);
  const [isLCPModalOpen, setIsLCPModalOpen] = useState(false);
  const [isSEOModalOpen, setIsSEOModalOpen] = useState(false);
  const [isStreamingModalOpen, setIsStreamingModalOpen] = useState(false);
  const [isCacheModalOpen, setIsCacheModalOpen] = useState(false);

  // Términos a detectar y sus correspondientes funciones para abrir modales
  const conceptTerms = [
    {
      terms: ['hidratación', 'hidrata', 'hidratar', 'hidratado', 'hidratada'],
      action: () => setIsHydrationModalOpen(true),
    },
    {
      terms: [
        'DOM Virtual',
        'Virtual DOM',
        'DOM virtual',
        'virtual DOM',
        'VDOM',
        'vdom',
      ],
      action: () => setIsVirtualDomModalOpen(true),
    },
    {
      terms: ['TTI', 'Time to Interactive', 'tiempo hasta interactivo'],
      action: () => setIsTTIModalOpen(true),
    },
    {
      terms: ['TTFB', 'Time to First Byte', 'tiempo hasta el primer byte'],
      action: () => setIsTTFBModalOpen(true),
    },
    {
      terms: ['LCP', 'Largest Contentful Paint'],
      action: () => setIsLCPModalOpen(true),
    },
    {
      terms: [
        'SEO',
        'Search Engine Optimization',
        'posicionamiento en buscadores',
      ],
      action: () => setIsSEOModalOpen(true),
    },
    {
      terms: ['streaming', 'stream', 'transmisión progresiva'],
      action: () => setIsStreamingModalOpen(true),
    },
    {
      terms: ['caché', 'cache', 'caching', 'cached', 'cacheado', 'cacheada'],
      action: () => setIsCacheModalOpen(true),
    },
  ];

  // Reemplazar la función processText con esta versión mejorada que evita la duplicación
  const processText = (text: string) => {
    // Buscar texto entre etiquetas <concept> y </concept>
    const conceptRegex = /<concept>(.*?)<\/concept>/;
    const match = text.match(conceptRegex);

    if (match) {
      const parts = text.split(conceptRegex);
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
      );
    }

    // Buscar términos específicos con una expresión regular más robusta
    for (const conceptGroup of conceptTerms) {
      for (const term of conceptGroup.terms) {
        // Usamos una expresión regular que puede encontrar el término incluso cuando está
        // rodeado de otros caracteres como paréntesis, comas, etc.
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedTerm}\\b`, 'i');

        if (regex.test(text)) {
          const parts = text.split(regex);

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
                {parts.slice(1).join('')}
              </>
            );
          }
        }
      }
    }

    return text;
  };

  // Función para manejar clics en conceptos
  const handleConceptClick = (concept: string) => {
    const lowerConcept = concept.toLowerCase();

    for (const conceptGroup of conceptTerms) {
      for (const term of conceptGroup.terms) {
        if (lowerConcept.includes(term.toLowerCase())) {
          conceptGroup.action();
          return;
        }
      }
    }
  };

  return (
    <section
      id={id}
      ref={ref}
      className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800"
    >
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
            {title}
          </motion.h2>

          {/* Ilustración arriba */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md mb-10 mx-auto"
          >
            <RenderingIllustration type={illustration} />
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
              <Button
                onClick={() => setShowDiagram(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ImageIcon className="h-4 w-4" /> Mostrar diagrama técnico
              </Button>
            )}

            {!showProsAndCons && !showDiagram && (
              <Button
                onClick={() => setShowProsAndCons(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                Mostrar ventajas y desventajas{' '}
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </motion.div>

          {/* Diagrama técnico (condicional) */}
          {showDiagram && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="w-full mb-10 overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={`/placeholder.svg?height=400&width=1200&text=Diagrama+Técnico+${id.toUpperCase()}`}
                alt={`Diagrama técnico de ${title}`}
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
              <Button
                onClick={() => setShowProsAndCons(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                Mostrar ventajas y desventajas{' '}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Pros y Contras (condicional) */}
          {showProsAndCons && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 w-full max-w-3xl"
            >
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center">
                  <Check className="mr-2 h-5 w-5" /> Ventajas
                </h3>
                <ul className="space-y-2">
                  {pros.map((pro, index) => (
                    <li
                      key={index}
                      className="text-slate-700 dark:text-slate-300 flex"
                    >
                      <span className="mr-2 text-green-500 flex-shrink-0">
                        •
                      </span>
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
                    <li
                      key={index}
                      className="text-slate-700 dark:text-slate-300 flex"
                    >
                      <span className="mr-2 text-red-500 flex-shrink-0">•</span>
                      <span>{processText(con)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Modales de conceptos */}
          <HydrationModal
            isOpen={isHydrationModalOpen}
            onClose={() => setIsHydrationModalOpen(false)}
          />
          <VirtualDomModal
            isOpen={isVirtualDomModalOpen}
            onClose={() => setIsVirtualDomModalOpen(false)}
          />
          <TTIModal
            isOpen={isTTIModalOpen}
            onClose={() => setIsTTIModalOpen(false)}
          />
          <TTFBModal
            isOpen={isTTFBModalOpen}
            onClose={() => setIsTTFBModalOpen(false)}
          />
          <LCPModal
            isOpen={isLCPModalOpen}
            onClose={() => setIsLCPModalOpen(false)}
          />
          <SEOModal
            isOpen={isSEOModalOpen}
            onClose={() => setIsSEOModalOpen(false)}
          />
          <StreamingModal
            isOpen={isStreamingModalOpen}
            onClose={() => setIsStreamingModalOpen(false)}
          />
          <CacheModal
            isOpen={isCacheModalOpen}
            onClose={() => setIsCacheModalOpen(false)}
          />
        </motion.div>
      </div>
    </section>
  );
}
