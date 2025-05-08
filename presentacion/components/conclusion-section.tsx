'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function ConclusionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const conclusions = [
    'Cada estrategia tiene un uso ideal según el tipo de aplicación y contenido.',
    'Para sitios con contenido mayormente estático (blogs, documentación), SSG es la opción óptima.',
    'Para aplicaciones con datos personalizados y actualizaciones frecuentes, SSR con streaming ofrece el mejor equilibrio.',
    'Las aplicaciones tipo dashboard o admin pueden beneficiarse de CSR con librerías de gestión de estado modernas.',
    'PPR es ideal para sitios con una combinación de contenido estático y dinámico, como tiendas online o plataformas de contenido.',
    'El enfoque híbrido es la norma: diferentes estrategias coexistiendo en la misma aplicación según la página o componente.',
    'React Server Components representa el futuro para optimizaciones de tamaño de bundle y separación de responsabilidades.',
  ];

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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Conclusiones
          </h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            Reflexiones finales sobre las estrategias de renderizado
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <ul className="space-y-6">
            {conclusions.map((conclusion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700 dark:text-slate-300">
                  {conclusion}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
