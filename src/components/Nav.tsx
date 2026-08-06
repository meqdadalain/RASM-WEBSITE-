import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const NAV = [
  { label: 'Platform', href: '#demo' },
  { label: 'Intelligence', href: '#ai-thinking' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Industries', href: '#industries' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      /* Ajout de bg-black/80 et backdrop-blur-md pour masquer le texte qui dépasse par-dessous */
      className="fixed top-0 left-0 right-0 z-[90] bg-black/80 backdrop-blur-md border-b border-white/5"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="RASM"
            className="h-9 w-9 rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-sans text-lg font-bold tracking-tight text-cyan-50">
            RASM
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 lg:flex ${
            scrolled ? 'glass-strong' : ''
          }`}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-cyan-100/60 transition-colors hover:bg-cyan-400/10 hover:text-cyan-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-cyan-200 to-cyan-400 px-5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-950 transition-transform hover:scale-105 sm:inline-block"
          >
            Request access
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-cyan-100 lg:hidden"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mb-3 flex flex-col gap-1 rounded-2xl glass-strong p-3 lg:hidden"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-100/70 transition-colors hover:bg-cyan-400/10 hover:text-cyan-100"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}