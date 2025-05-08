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
    'Paradigma de arquitectura que divide explícitamente los componentes entre servidor y cliente, no es una estrategia de renderizado por sí misma.',
    'Los Server Components se ejecutan exclusivamente en el servidor y su código nunca se envía al cliente como JavaScript.',
    'Pueden acceder directamente a recursos del backend (bases de datos, sistemas de archivos, APIs internas) de forma segura.',
    "Los Client Components, marcados con la directiva 'use client', se renderizan inicialmente en el servidor pero también se envían al cliente.",
    'La hidratación solo es necesaria para los Client Components, mientras que los Server Components no requieren este proceso.',
    'Esta arquitectura reduce drásticamente el JavaScript enviado al navegador, mejorando los tiempos de carga e interactividad.',
    'Se combina con estrategias como SSR, SSG o Streaming para optimizar diferentes aspectos de la experiencia de usuario.',
    'Permite una clara separación de responsabilidades: lógica de negocio en el servidor, interactividad en el cliente.',
    'Ideal para aplicaciones que requieren acceso directo a datos del backend manteniendo una experiencia de usuario fluida.',
  ];

  const pros = [
    'Reducción drástica de JavaScript en el cliente: Mejora velocidad de carga e interactividad.',
    'Acceso directo a recursos del backend: Elimina la necesidad de APIs intermedias para datos internos.',
    'Mejor rendimiento: Ejecuta computación pesada en el servidor, manteniendo el cliente ligero.',
    'Seguridad mejorada: Código sensible y credenciales permanecen exclusivamente en el servidor.',
    'Bundle de cliente optimizado: Solo los componentes interactivos envían su JavaScript al navegador.',
  ];

  const cons = [
    'Nuevo modelo mental: Requiere repensar la arquitectura de componentes y la división cliente/servidor.',
    'Limitaciones en Server Components: No pueden usar hooks de estado (useState) ni efectos (useEffect).',
    'Mayor dependencia del framework: Funcionan mejor dentro de entornos como Next.js que soportan la arquitectura.',
    'Complejidad en la composición: Gestionar correctamente la interacción entre Server y Client Components.',
    'Potenciales desafíos de debugging al tener código ejecutándose en diferentes entornos.',
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
          <div className="mb-10">
            <RenderingIllustration type="server-components" />
          </div>

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
