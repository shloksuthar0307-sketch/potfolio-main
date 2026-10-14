import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-16 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="font-heading font-bold text-2xl tracking-tighter text-white">
              Shlok<span className="text-primary">.</span>
            </div>
            <p className="text-sm text-foreground/70 max-w-sm font-light leading-relaxed">
              Full-Stack Developer specializing in React, Django, Django REST Framework, and PostgreSQL.
              Engineering high-performance web applications, responsive business websites, and scalable APIs for clients worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/shloksuthar0307-sketch"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors hoverable text-white"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/shlok-suthar2507/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors hoverable text-white"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:shloksuthar25@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors hoverable text-white"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-foreground/50">Navigation</h4>
            <ul className="space-y-2 text-sm text-foreground/75">
              <li>
                <button type="button" onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">
                  About Me
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('services')} className="hover:text-primary transition-colors">
                  Services &amp; Solutions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('projects')} className="hover:text-primary transition-colors">
                  Selected Works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('skills')} className="hover:text-primary transition-colors">
                  Technical Arsenal
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('experience')} className="hover:text-primary transition-colors">
                  Experience &amp; Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-foreground/50">Services</h4>
            <ul className="space-y-2 text-sm text-foreground/75">
              <li>React Frontend Development</li>
              <li>Django Backend Systems</li>
              <li>Django REST Framework APIs</li>
              <li>Responsive Business Websites</li>
              <li>PostgreSQL Database Modeling</li>
              <li>Role-Based Dashboards &amp; OTP</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
          <p>© {new Date().getFullYear()} Shlok Suthar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with React &amp; Vite</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hoverable w-10 h-10 rounded-full glass border flex items-center justify-center border-white/10 hover:border-primary/50 text-foreground/60 hover:text-white transition-all"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
