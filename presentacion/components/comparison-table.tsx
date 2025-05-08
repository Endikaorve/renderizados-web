'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

export function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const renderingStrategies = [
    { id: 'csr', name: 'Client Side Rendering (CSR)' },
    { id: 'ssg', name: 'Static Site Generation (SSG)' },
    { id: 'isr', name: 'Incremental Static Regeneration (ISR)' },
    { id: 'ssr', name: 'Server Side Rendering (SSR)' },
    { id: 'streaming', name: 'SSR con Streaming' },
    { id: 'ppr', name: 'Partial Pre-rendering (PPR)' },
  ] as const;

  const metrics = [
    {
      name: 'SEO',
      values: {
        csr: { icon: <X className="h-5 w-5 text-red-500" />, note: 'Pobre' },
        ssg: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
        isr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
        ssr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
        streaming: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
        ppr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
      },
    },
    {
      name: 'Tiempo de carga inicial',
      values: {
        csr: { icon: <X className="h-5 w-5 text-red-500" />, note: 'Lento' },
        ssg: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Rápido',
        },
        isr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Rápido',
        },
        ssr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Medio',
        },
        streaming: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Rápido',
        },
        ppr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Rápido',
        },
      },
    },
    {
      name: 'Hidratación',
      values: {
        csr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'No necesaria',
        },
        ssg: {
          icon: <X className="h-5 w-5 text-red-500" />,
          note: 'Completa y bloqueante',
        },
        isr: {
          icon: <X className="h-5 w-5 text-red-500" />,
          note: 'Completa y bloqueante',
        },
        ssr: {
          icon: <X className="h-5 w-5 text-red-500" />,
          note: 'Completa y bloqueante',
        },
        streaming: {
          icon: <Minus className="h-5 w-5 text-amber-500" />,
          note: 'Progresiva pero completa',
        },
        ppr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Selectiva y parcial',
        },
      },
    },
    {
      name: 'Carga en servidor',
      values: {
        csr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Baja',
        },
        ssg: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Solo en build',
        },
        isr: {
          icon: <Minus className="h-5 w-5 text-amber-500" />,
          note: 'Media',
        },
        ssr: { icon: <X className="h-5 w-5 text-red-500" />, note: 'Alta' },
        streaming: {
          icon: <Minus className="h-5 w-5 text-amber-500" />,
          note: 'Media',
        },
        ppr: {
          icon: <Minus className="h-5 w-5 text-amber-500" />,
          note: 'Media',
        },
      },
    },
    {
      name: 'Contenido dinámico',
      values: {
        csr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
        ssg: { icon: <X className="h-5 w-5 text-red-500" />, note: 'Limitado' },
        isr: {
          icon: <Minus className="h-5 w-5 text-amber-500" />,
          note: 'Bueno',
        },
        ssr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
        streaming: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
        ppr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Excelente',
        },
      },
    },
    {
      name: 'Complejidad',
      values: {
        csr: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Baja',
        },
        ssg: {
          icon: <Check className="h-5 w-5 text-green-500" />,
          note: 'Baja',
        },
        isr: {
          icon: <Minus className="h-5 w-5 text-amber-500" />,
          note: 'Media',
        },
        ssr: {
          icon: <Minus className="h-5 w-5 text-amber-500" />,
          note: 'Media',
        },
        streaming: {
          icon: <X className="h-5 w-5 text-red-500" />,
          note: 'Alta',
        },
        ppr: { icon: <X className="h-5 w-5 text-red-500" />, note: 'Alta' },
      },
    },
  ] as const;

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Comparativa de Estrategias
          </h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            Análisis comparativo de las diferentes estrategias de renderizado
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-4 text-left text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  Estrategia / Métrica
                </th>
                {renderingStrategies.map((strategy, index) => (
                  <th
                    key={strategy.id}
                    className="p-4 text-center text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      {strategy.name}
                    </motion.div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, metricIndex) => (
                <tr
                  key={metric.name}
                  className={
                    metricIndex % 2 === 0
                      ? 'bg-white dark:bg-slate-900'
                      : 'bg-slate-50 dark:bg-slate-800/50'
                  }
                >
                  <td className="p-4 border-b border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + metricIndex * 0.1,
                      }}
                    >
                      {metric.name}
                    </motion.div>
                  </td>
                  {renderingStrategies.map((strategy, strategyIndex) => (
                    <td
                      key={`${metric.name}-${strategy.id}`}
                      className="p-4 text-center border-b border-slate-200 dark:border-slate-700"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                        }
                        transition={{
                          duration: 0.3,
                          delay: 0.6 + metricIndex * 0.1 + strategyIndex * 0.05,
                        }}
                        className="flex flex-col items-center justify-center"
                      >
                        {metric.values[strategy.id].icon}
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {metric.values[strategy.id].note}
                        </span>
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
