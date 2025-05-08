'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="intro" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Estrategias de Renderizado Web en React
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8"
          >
            Explorando las diferentes técnicas de renderizado para crear
            aplicaciones web modernas, optimizadas y con excelente experiencia
            de usuario.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-12"
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              Introducción
            </h2>
            <div className="space-y-4 text-left">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>El renderizado web</strong> es el proceso técnico que
                transforma el código en interfaces visuales. Su correcta
                implementación es determinante para el éxito de cualquier
                aplicación moderna.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>
                  Una buena estrategia de renderizado impacta directamente en:
                </strong>
              </p>
              <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300">
                <li>La experiencia de usuario (UX)</li>
                <li>El posicionamiento en buscadores (SEO)</li>
                <li>El rendimiento y la escalabilidad</li>
                <li>Los costes de desarrollo y mantenimiento</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>La evolución en React:</strong> Desde su nacimiento en
                2013, React transformó el desarrollo frontend con su enfoque
                declarativo y su Virtual DOM.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>De SPAs a arquitecturas modernas:</strong> El viaje
                desde las Single Page Applications tradicionales hasta
                frameworks como Next.js, Remix y React Server Components
                representa una respuesta a las limitaciones del renderizado
                exclusivo en cliente.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>En esta guía:</strong> Se analizan las diferentes
                estrategias disponibles, sus ventajas, desventajas y casos de
                uso óptimos para poder tomar decisiones informadas en cualquier
                proyecto.
              </p>
            </div>
          </motion.div>

          <motion.a
            href="#csr"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Explorar estrategias <ArrowDown className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </section>
  );
}
