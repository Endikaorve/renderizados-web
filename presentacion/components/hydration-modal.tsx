'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HydrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HydrationModal({ isOpen, onClose }: HydrationModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                ¿Qué es la hidratación?
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300">
                  La hidratación (hydration) en React es el proceso mediante el
                  cual React "revive" o "activa" el HTML estático previamente
                  renderizado, convirtiéndolo en una aplicación React
                  interactiva. Técnicamente, durante este proceso:
                </p>

                <ul className="space-y-2 my-4">
                  <li className="text-slate-700 dark:text-slate-300">
                    React reconcilia su árbol virtual de componentes con el DOM
                    existente
                  </li>
                  <li className="text-slate-700 dark:text-slate-300">
                    Adjunta los event listeners a los elementos DOM
                  </li>
                  <li className="text-slate-700 dark:text-slate-300">
                    Inicializa el estado local de los componentes
                  </li>
                  <li className="text-slate-700 dark:text-slate-300">
                    Establece las referencias y otras APIs de React
                  </li>
                </ul>

                <p className="text-slate-700 dark:text-slate-300 italic">
                  Es como "verter agua" (JavaScript) sobre el "polvo
                  deshidratado" (HTML estático) para obtener una aplicación
                  plenamente funcional.
                </p>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
                  Problemas comunes de la hidratación
                </h4>

                <ul className="space-y-2">
                  <li className="text-slate-700 dark:text-slate-300">
                    <strong>Tiempo de bloqueo:</strong> La hidratación
                    tradicional bloquea el hilo principal
                  </li>
                  <li className="text-slate-700 dark:text-slate-300">
                    <strong>Flash of non-interactive content:</strong> Período
                    donde el contenido se ve pero no responde
                  </li>
                  <li className="text-slate-700 dark:text-slate-300">
                    <strong>Mismatch de contenido:</strong> Errores cuando el
                    HTML del servidor y el render en cliente no coinciden
                  </li>
                  <li className="text-slate-700 dark:text-slate-300">
                    <strong>Costo de JavaScript:</strong> Toda la lógica de
                    renderizado debe enviarse al cliente
                  </li>
                </ul>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                  <h5 className="text-blue-700 dark:text-blue-400 font-medium mb-2">
                    Evolución de la hidratación
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    React ha evolucionado su enfoque de hidratación con nuevas
                    técnicas como la hidratación progresiva, hidratación
                    selectiva y React Server Components, que buscan mitigar
                    estos problemas manteniendo la interactividad.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 border-t border-slate-200 dark:border-slate-700">
              <Button onClick={onClose}>Cerrar</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
