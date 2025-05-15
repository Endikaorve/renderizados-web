export function Footer() {
  return (
    <footer className="py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Presentación de Estrategias de
          Renderizado Web en React
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          Creado por{' '}
          <a
            href="https://www.linkedin.com/in/endikaorube/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 underline"
          >
            Endika Orube
          </a>{' '}
          con Next.js, Tailwind CSS y Framer Motion
        </p>
      </div>
    </footer>
  );
}
