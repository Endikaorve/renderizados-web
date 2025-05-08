'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Monitor,
  Database,
  Cloud,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface RenderingIllustrationProps {
  type: string;
}

export function RenderingIllustration({ type }: RenderingIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Render different illustrations based on the type
  switch (type) {
    case 'client-side':
      return (
        <motion.div
          className="relative w-full max-w-md h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between">
              <Server className="h-10 w-10 text-slate-400" />
              <ArrowRight className="h-6 w-6 text-slate-500 self-center" />
              <Monitor className="h-10 w-10 text-blue-500" />
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-300 mb-2">
                Contenido renderizado en cliente
              </div>
              <div className="space-y-1">
                <motion.div
                  className="h-2 bg-slate-200 dark:bg-slate-600 rounded w-full"
                  initial={{ width: '30%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                />
                <motion.div
                  className="h-2 bg-slate-200 dark:bg-slate-600 rounded w-3/4"
                  initial={{ width: '20%' }}
                  animate={{ width: '75%' }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    delay: 0.3,
                  }}
                />
                <motion.div
                  className="h-2 bg-slate-200 dark:bg-slate-600 rounded w-1/2"
                  initial={{ width: '10%' }}
                  animate={{ width: '50%' }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                    delay: 0.6,
                  }}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Todo el renderizado ocurre en el cliente
              </span>
            </div>
          </div>
        </motion.div>
      );

    case 'static-generation':
      return (
        <motion.div
          className="relative w-full max-w-md h-64 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: [1, 0.7, 1],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'loop',
                  }}
                >
                  <Server className="h-10 w-10 text-green-500 mx-auto" />
                </motion.div>
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Build Time
                </span>
              </div>

              <ArrowRight className="h-6 w-6 text-slate-500" />

              <div className="text-center">
                <Cloud className="h-10 w-10 text-slate-400 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  CDN
                </span>
              </div>

              <ArrowRight className="h-6 w-6 text-slate-500" />

              <div className="text-center">
                <Monitor className="h-10 w-10 text-slate-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Cliente
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-300 mb-2">
                HTML pre-renderizado
              </div>
              <div className="space-y-1">
                <motion.div
                  className="h-2 bg-green-200 dark:bg-green-700 rounded w-full"
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: [0, 1] } : { opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="h-2 bg-green-200 dark:bg-green-700 rounded w-3/4"
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: [0, 1] } : { opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
                <motion.div
                  className="h-2 bg-green-200 dark:bg-green-700 rounded w-1/2"
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: [0, 1] } : { opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Generado en build time, servido como estático
              </span>
            </div>
          </div>
        </motion.div>
      );

    case 'incremental-static':
      return (
        <motion.div
          className="relative w-full max-w-md h-64 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'loop',
                  }}
                >
                  <Server className="h-10 w-10 text-cyan-500 mx-auto" />
                </motion.div>
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Servidor
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 text-slate-500" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'loop',
                  }}
                  className="text-xs text-slate-500 dark:text-slate-400 mt-1"
                >
                  Revalidación
                </motion.div>
              </div>

              <div className="text-center">
                <Cloud className="h-10 w-10 text-slate-400 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  CDN
                </span>
              </div>

              <ArrowRight className="h-6 w-6 text-slate-500" />

              <div className="text-center">
                <Monitor className="h-10 w-10 text-slate-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Cliente
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  Contenido estático
                </div>
                <motion.div
                  animate={{
                    opacity: [1, 0.5, 1],
                    color: ['#0ea5e9', '#06b6d4', '#0ea5e9'],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="text-xs text-cyan-500 dark:text-cyan-400"
                >
                  Actualizado periódicamente
                </motion.div>
              </div>
              <div className="space-y-1 mt-2">
                <motion.div
                  className="h-2 bg-cyan-200 dark:bg-cyan-700 rounded w-full"
                  animate={{
                    backgroundColor: ['#bae6fd', '#0ea5e9', '#bae6fd'],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
                <motion.div
                  className="h-2 bg-cyan-200 dark:bg-cyan-700 rounded w-3/4"
                  animate={{
                    backgroundColor: ['#bae6fd', '#0ea5e9', '#bae6fd'],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                ></motion.div>
                <motion.div
                  className="h-2 bg-cyan-200 dark:bg-cyan-700 rounded w-1/2"
                  animate={{
                    backgroundColor: ['#bae6fd', '#0ea5e9', '#bae6fd'],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                ></motion.div>
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Estático con revalidación periódica
              </span>
            </div>
          </div>
        </motion.div>
      );

    case 'server-side':
      return (
        <motion.div
          className="relative w-full max-w-md h-64 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <Database className="h-8 w-8 text-slate-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Base de datos
                </span>
              </div>

              <ArrowRight className="h-6 w-6 text-slate-500" />

              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'loop',
                  }}
                >
                  <Server className="h-10 w-10 text-purple-500 mx-auto" />
                </motion.div>
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Servidor
                </span>
              </div>

              <ArrowRight className="h-6 w-6 text-slate-500" />

              <div className="text-center">
                <Monitor className="h-10 w-10 text-slate-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Cliente
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-300 mb-2">
                HTML generado por request
              </div>
              <div className="space-y-1">
                <motion.div
                  className="h-2 bg-purple-200 dark:bg-purple-700 rounded"
                  initial={{ width: 0 }}
                  animate={
                    isHovered ? { width: ['0%', '100%'] } : { width: '100%' }
                  }
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  className="h-2 bg-purple-200 dark:bg-purple-700 rounded"
                  initial={{ width: 0 }}
                  animate={
                    isHovered ? { width: ['0%', '75%'] } : { width: '75%' }
                  }
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="h-2 bg-purple-200 dark:bg-purple-700 rounded"
                  initial={{ width: 0 }}
                  animate={
                    isHovered ? { width: ['0%', '50%'] } : { width: '50%' }
                  }
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Renderizado en el servidor para cada petición
              </span>
            </div>
          </div>
        </motion.div>
      );

    case 'streaming':
      return (
        <motion.div
          className="relative w-full max-w-md h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'loop',
                  }}
                >
                  <Server className="h-10 w-10 text-blue-500 mx-auto" />
                </motion.div>
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Servidor
                </span>
              </div>

              <ArrowRight className="h-6 w-6 text-slate-500" />

              <div className="text-center">
                <Monitor className="h-10 w-10 text-slate-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Cliente
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-300 mb-2">
                Streaming de HTML
              </div>
              <div className="space-y-1">
                <motion.div
                  className="h-2 bg-blue-200 dark:bg-blue-700 rounded"
                  initial={{ width: 0 }}
                  animate={
                    isHovered ? { width: ['0%', '100%'] } : { width: '100%' }
                  }
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="h-2 bg-purple-200 dark:bg-purple-700 rounded"
                  initial={{ width: 0 }}
                  animate={
                    isHovered ? { width: ['0%', '75%'] } : { width: '75%' }
                  }
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.div
                  className="h-2 bg-indigo-200 dark:bg-indigo-700 rounded"
                  initial={{ width: 0 }}
                  animate={
                    isHovered ? { width: ['0%', '50%'] } : { width: '50%' }
                  }
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Envío progresivo de HTML en trozos
              </span>
            </div>
          </div>
        </motion.div>
      );

    case 'partial-prerendering':
      return (
        <motion.div
          className="relative w-full max-w-md h-64 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <Server className="h-10 w-10 text-amber-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Servidor
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex space-x-1">
                  <motion.div
                    className="h-6 w-2 bg-green-400 dark:bg-green-600 rounded"
                    animate={{ height: [6, 12, 6] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  ></motion.div>
                  <motion.div
                    className="h-6 w-2 bg-amber-400 dark:bg-amber-600 rounded"
                    animate={{ height: [6, 16, 6] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.2,
                    }}
                  ></motion.div>
                </div>
                <span className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                  Estático + Dinámico
                </span>
              </div>

              <div className="text-center">
                <Monitor className="h-10 w-10 text-slate-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Cliente
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <div className="text-xs text-green-500 dark:text-green-400">
                  Estático (Shell)
                </div>
                <div className="text-xs text-amber-500 dark:text-amber-400">
                  Dinámico (Datos)
                </div>
              </div>
              <div className="space-y-1">
                <motion.div
                  className="h-2 bg-green-200 dark:bg-green-700 rounded w-full"
                  animate={isHovered ? { opacity: [0, 1] } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="h-2 bg-green-200 dark:bg-green-700 rounded w-3/4"
                  animate={isHovered ? { opacity: [0, 1] } : { opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
                <motion.div
                  className="h-2 bg-amber-200 dark:bg-amber-700 rounded"
                  initial={{ width: 0 }}
                  animate={
                    isHovered ? { width: ['0%', '50%'] } : { width: '50%' }
                  }
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Combina partes estáticas y dinámicas en una misma página
              </span>
            </div>
          </div>
        </motion.div>
      );

    case 'server-components':
      return (
        <motion.div
          className="relative w-full max-w-md h-64 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg"
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <Server className="h-10 w-10 text-indigo-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Servidor
                </span>
              </div>

              <ArrowRight className="h-6 w-6 text-slate-500 self-center" />

              <div className="text-center">
                <Monitor className="h-10 w-10 text-slate-500 mx-auto" />
                <span className="text-xs mt-1 block text-slate-600 dark:text-slate-400">
                  Cliente
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-600 rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <motion.div
                  animate={{
                    color: ['#6366f1', '#4f46e5', '#6366f1'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="text-xs text-indigo-500 dark:text-indigo-400"
                >
                  Server Components
                </motion.div>
                <motion.div
                  animate={{
                    color: ['#8b5cf6', '#7c3aed', '#8b5cf6'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1.5,
                  }}
                  className="text-xs text-violet-500 dark:text-violet-400"
                >
                  Client Components
                </motion.div>
              </div>
              <div className="space-y-1">
                <motion.div
                  animate={{
                    backgroundColor: ['#c7d2fe', '#818cf8', '#c7d2fe'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="h-2 bg-indigo-200 dark:bg-indigo-700 rounded w-full"
                ></motion.div>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{
                      backgroundColor: ['#c7d2fe', '#818cf8', '#c7d2fe'],
                      width: ['72%', '68%', '70%', '72%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                    className="h-2 bg-indigo-200 dark:bg-indigo-700 rounded"
                  ></motion.div>
                  <motion.div
                    animate={{
                      backgroundColor: ['#ddd6fe', '#a78bfa', '#ddd6fe'],
                      width: ['28%', '32%', '30%', '28%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                    className="h-2 bg-violet-200 dark:bg-violet-700 rounded"
                  ></motion.div>
                </div>
                <motion.div
                  animate={{
                    backgroundColor: ['#ddd6fe', '#a78bfa', '#ddd6fe'],
                    x: [0, 2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1.5,
                  }}
                  className="h-2 bg-violet-200 dark:bg-violet-700 rounded w-1/3"
                ></motion.div>
              </div>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                División explícita entre componentes de servidor y cliente
              </span>
            </div>
          </div>
        </motion.div>
      );

    default:
      return (
        <div className="w-full max-w-md h-64 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
          <span className="text-slate-500 dark:text-slate-400">
            Ilustración no disponible
          </span>
        </div>
      );
  }
}
