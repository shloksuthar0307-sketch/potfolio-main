import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { motion } from 'framer-motion';
import {
  Globe,
  LayoutTemplate,
  Server,
  Network,
  ShieldCheck,
  Database,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const servicesData = [
  {
    id: 'business-websites',
    title: 'Responsive Business Websites',
    category: 'Website Development',
    icon: <Globe className="w-6 h-6 text-cyan-400" />,
    tagline: 'High-converting digital storefronts and marketing sites',
    description:
      'Turn visitors into paying customers with modern, mobile-first business websites engineered for speed, clean aesthetics, and search engine visibility.',
    deliverables: [
      'Pixel-perfect mobile, tablet, and desktop responsiveness',
      'Lighthouse score optimization for fast initial load times',
      'SEO meta tags, OpenGraph sharing, and structured data',
      'Contact inquiry forms with direct email routing',
      'Cross-browser and cross-device testing',
    ],
    benefit:
      'Establishes immediate brand credibility and captures inbound client inquiries effortlessly.',
    badge: 'High Conversion',
  },
  {
    id: 'react-frontend',
    title: 'React Frontend Development',
    category: 'Frontend Engineering',
    icon: <LayoutTemplate className="w-6 h-6 text-primary" />,
    tagline: 'Snappy, interactive, and modular user interfaces',
    description:
      'Transform complex product requirements into intuitive, fluid React web applications built with reusable components and clean state management.',
    deliverables: [
      'Component-driven architecture using React and Tailwind CSS',
      'State management and custom hooks for smooth data flow',
      'Interactive dashboards, charts, and filtering controls',
      'Micro-animations and polished UX transitions',
      'TypeScript support for type-safe frontend codebases',
    ],
    benefit:
      'Keeps users engaged, eliminates clunky interface lag, and makes future UI iterations fast.',
    badge: 'Modern UI/UX',
  },
  {
    id: 'django-backend',
    title: 'Django Backend Development',
    category: 'Backend Architecture',
    icon: <Server className="w-6 h-6 text-emerald-400" />,
    tagline: 'Scalable server-side logic and business automation',
    description:
      'Construct reliable backend systems using Python and Django. Built to handle complex business rules, background processes, and secure data handling.',
    deliverables: [
      'Clean Django MVC / MVT architecture and custom business logic',
      'Built-in security against CSRF, SQL injection, and XSS attacks',
      'Asynchronous task queuing with Celery and Redis',
      'Admin back-office configuration for non-technical team members',
      'Automated email notifications, invoice generation, and file storage',
    ],
    benefit:
      'Provides a bulletproof foundation that your business can run on without worrying about downtime or security leaks.',
    badge: 'Enterprise Grade',
  },
  {
    id: 'rest-api',
    title: 'REST API Development',
    category: 'APIs & Microservices',
    icon: <Network className="w-6 h-6 text-fuchsia-400" />,
    tagline: 'High-performance, well-documented API endpoints',
    description:
      'Design and deploy RESTful APIs using Django REST Framework (DRF) to seamlessly connect frontend SPAs, mobile applications, and third-party services.',
    deliverables: [
      'Standardized REST endpoints with filtering, search, and pagination',
      'JWT (JSON Web Token) and session-based authentication',
      'Strict request validation and consistent error response schemas',
      'Interactive Swagger / OpenAPI or Postman documentation',
      'Rate-limiting and throttling to protect server resources',
    ],
    benefit:
      'Enables painless integration with web and mobile clients while protecting your server against misuse.',
    badge: 'Fast & Documented',
  },
  {
    id: 'auth-dashboards',
    title: 'Authentication & Role Dashboards',
    category: 'Security & Access Control',
    icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
    tagline: 'Multi-tenant authorization, OTP security, and analytics',
    description:
      'Protect sensitive business data with multi-role access control (RBAC), multi-factor verification, and role-specific operational dashboards.',
    deliverables: [
      'Role-based permissions (Admin, Manager, Staff, Customer)',
      'Email OTP verification and secure password reset workflows',
      'Protected frontend routes and backend view decorators',
      'Activity audit trails and user management panels',
      'Real-time data visualization tailored per user clearance',
    ],
    benefit:
      'Ensures every user sees exactly what they are authorized to see, protecting customer data and intellectual property.',
    badge: 'Role Security',
  },
  {
    id: 'database-integration',
    title: 'Database Integration & Modeling',
    category: 'Data & Performance',
    icon: <Database className="w-6 h-6 text-blue-400" />,
    tagline: 'Reliable relational schemas and query optimization',
    description:
      'Structure your application data cleanly with PostgreSQL. Optimize queries to eliminate slow load times as your records grow into thousands or millions.',
    deliverables: [
      'Normalized PostgreSQL schema design and relationship modeling',
      'Safe, versioned schema migrations without data loss',
      'Query optimization using select_related, prefetch_related, and indexing',
      'Database connection pooling and Redis cache integration',
      'Automated backup procedures and data integrity constraints',
    ],
    benefit:
      'Prevents slow database queries from tanking your app performance as your user base scales.',
    badge: 'High Performance',
  },
  {
    id: 'bug-fixing',
    title: 'Bug Fixing & Website Improvements',
    category: 'Optimization & Support',
    icon: <Wrench className="w-6 h-6 text-rose-400" />,
    tagline: 'Rapid troubleshooting, UI repairs, and speed boosts',
    description:
      'Have an existing React or Django codebase with broken features, visual bugs, or sluggish performance? I quickly diagnose root causes and deploy durable fixes.',
    deliverables: [
      'Comprehensive bug diagnosis across frontend and backend code',
      'Fixing broken API calls, state bugs, and responsive CSS glitches',
      'Database query audit to resolve slow endpoint bottlenecks',
      'Dependency upgrades and resolving breaking package conflicts',
      'Clean pull requests with clear technical documentation',
    ],
    benefit:
      'Quickly unblocks your roadmap, restores customer confidence, and prevents small bugs from causing major outages.',
    badge: 'Fast Turnaround',
  },
];

export const Services = ({ onSelectService }) => {
  const handleServiceSelect = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper id="services" className="bg-[#050505] relative overflow-hidden py-24 md:py-32">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-primary font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-primary"></span>
            02. Services &amp; Solutions
            <span className="w-8 h-[1px] bg-primary"></span>
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
            How I Can Help Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400">
              Business Scale
            </span>
          </h2>
          <p className="mt-6 text-foreground/75 text-base md:text-lg font-light leading-relaxed">
            From customer-facing React interfaces to secure, data-driven Django REST backends, I deliver clean,
            maintainable solutions tailored to client deadlines and commercial outcomes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col justify-between rounded-3xl p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-primary/40 transition-all duration-300 shadow-xl"
            >
              {/* Top Row: Icon & Badge */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-primary/50 transition-all shadow-md">
                    {service.icon}
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/70">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-white group-hover:text-primary transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-cyan-400/90 mb-4">
                  {service.category}
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-white/5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-foreground/50">
                    What You Receive:
                  </h4>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Client Benefit & CTA */}
              <div className="pt-6 border-t border-white/5 mt-auto">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary block mb-1">
                    Client Benefit:
                  </span>
                  <p className="text-xs text-foreground/75 italic leading-relaxed">
                    "{service.benefit}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleServiceSelect(service.title)}
                  className="hoverable w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-primary text-white text-xs md:text-sm font-medium border border-white/10 hover:border-primary/80 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-white/[0.03] to-cyan-500/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-2">
              Need a Custom Full-Stack Solution?
            </h3>
            <p className="text-sm text-foreground/70 max-w-xl">
              Have a specialized architecture or need both React frontend and Django backend built together? Let's discuss your timeline and technical specs.
            </p>
          </div>
          <a
            href="#contact"
            className="hoverable whitespace-nowrap px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};
