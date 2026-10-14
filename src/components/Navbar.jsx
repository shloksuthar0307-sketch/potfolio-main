import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Arsenal', id: 'skills' },
    { name: 'Timeline', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 md:px-12 md:py-5"
    >
      <div className="max-w-7xl mx-auto glass rounded-full px-5 py-3 flex justify-between items-center border border-white/10 bg-black/60 backdrop-blur-xl shadow-xl">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hoverable font-heading font-bold text-xl md:text-2xl tracking-tighter text-white flex items-center gap-1.5 focus:outline-none"
        >
          <span>Shlok</span>
          <span className="text-primary font-bold">.</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/90 ml-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 hidden sm:inline-block">
            Full-Stack
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-7">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-foreground/75 hover:text-white transition-colors hoverable py-1 relative group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="hoverable hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-all rounded-full text-xs md:text-sm font-semibold shadow-md shadow-primary/25"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 mx-2 p-6 rounded-3xl glass bg-[#0a0510]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex flex-col space-y-3">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-2.5 px-4 rounded-xl text-base font-medium text-foreground/80 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-primary font-mono">&rarr;</span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
              >
                <span>Hire Me for a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
