'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RenderingIllustration } from './rendering-illustration';

export function RSCSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showProsAndCons, setShowProsAndCons] = useState(false);

  const description = [
    'Representa un cambio paradigmático en cómo pensamos sobre los componentes React, no es una estrategia de renderizado en sí misma.',
    'Introduce una división explícita entre componentes que se ejecutan exclusivamente en el servidor y componentes que se ejecutan en el cliente.',
    'Los Server Components se ejecutan solo en el servidor y nunca se envían al cliente como JavaScript.',
    'Pueden acceder directamente a recursos del backend (BBDD, APIs internas) de forma segura y eficiente.',
    'Su código y dependencias no aumentan el tamaño del bundle JavaScript enviado al navegador.',
    "Los Client Components, marcados con la directiva 'use client', se renderizan inicialmente en el servidor pero también se envían al cliente como JavaScript.",
    'Esto reduce drásticamente el JavaScript del navegador, significando que los RSC en sí no se hidratan.',
    'La hidratación solo es necesaria para los Client Components, que sí manejan interactividad y estado en el cliente.',
    'Se combinan con estrategias como SSR o SSG para optimizar la carga inicial y hacer la hidratación más selectiva.',
  ];

  const pros = [
    'Menos JavaScript en el cliente: Mejora drástica la velocidad de carga y minimiza la hidratación.',
    'Acceso directo y seguro al backend: Simplifica la obtención de datos.',
    'Mejora de rendimiento: Cómputo pesado en servidor, UI más ligera en cliente.',
    'Carga progresiva con Suspense: Mejora la experiencia de usuario.',
    'Bundle de cliente más pequeño: Solo los Client Components envían su JS.',
  ];

  const cons = [
    'Curva de aprendizaje: Adaptarse al nuevo modelo mental cliente/servidor.',
    'Limitaciones de los RSC: No pueden usar estado (useState) ni efectos (useEffect) directamente.',
    'Dependencia de Frameworks: Mejor aprovechados con frameworks como Next.js que soportan la arquitectura.',
    'Gestión de la interactividad: El estado y los eventos se manejan en Client Components, requiriendo una clara separación.',
  ];

  return (
    <section
      id="rsc"
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
            React Server Components (RSC)
          </motion.h2>

          {/* Ilustración Reemplazada */}
          <RenderingIllustration type="server-components" />

          {/* Descripción en formato de puntos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-4xl w-full"
          >
            <ul className="space-y-3 list-disc pl-6">
              {description.map((point, index) => (
                <li key={index}>{point}</li>
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
            {!showProsAndCons && (
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

          {/* Pros y Contras (condicional) */}
          {showProsAndCons && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto"
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
                      <span>{pro}</span>
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
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
