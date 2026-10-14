import React, { useState, useEffect } from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  X,
  Database,
  Server,
  Code2,
  Cpu,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projectsData = [
  {
    id: 'repairtrace',
    title: 'RepairTrace',
    subtitle: 'AI-Powered Auto Repair Shop Management System',
    category: 'Full-Stack Web App',
    featured: true,
    tags: ['React', 'Django REST', 'PostgreSQL', 'Three.js', 'WebSockets', 'Gemini AI', 'Celery'],
    problem:
      'Auto repair shops suffer from fragmented communication between car owners, advisors, and mechanics, slow paper-based damage logging, and delayed customer repair approvals.',
    keyFeatures: [
      'Gemini Vision AI damage detection analyzing vehicle photos to estimate severity & repair needs',
      'Interactive 3D vehicle inspection dashboard (React Three Fiber) with clickable damage zones',
      'Real-time WebSocket communication (Django Channels) for live repair status & customer chat',
      'QR Code vehicle check-in for instant service bay onboarding and historical records',
      'Asynchronous task processing with Celery & Redis for image uploads and automated alerts',
    ],
    role: 'Full-Stack Architect & Developer',
    roleDetails:
      'Designed PostgreSQL schema, developed Django REST API endpoints with JWT auth, implemented WebSocket consumers, integrated Gemini Vision API, and engineered the 3D vehicle canvas.',
    demoUrl: 'https://garege-1.onrender.com',
    githubUrl: 'https://github.com/shloksuthar0307-sketch/garege',
    caseStudy: {
      clientOverview:
        'Targeted at independent auto repair shops and collision centers needing a digitized, transparent workflow between vehicle drop-off and final checkout.',
      architecture: [
        'Frontend: React (TypeScript, Vite, Tailwind CSS) with React Three Fiber for 3D vehicle inspection.',
        'Backend: Django 5 + Django REST Framework (DRF) handling authenticated API requests.',
        'Real-Time: Django Channels with Redis channel layer for WebSocket events.',
        'AI Pipeline: Google Gemini Vision API for automatic damage analysis and repair severity grading.',
        'Task Queue: Celery workers backed by Redis for offloading heavy image processing.',
        'Database: PostgreSQL relational models storing vehicles, work orders, findings, and inspection logs.',
      ],
      technicalChallenges: [
        'Real-time state synchronization: Solved potential race conditions between multiple technicians updating repair statuses simultaneously by implementing WebSocket channel groups and optimistic UI updates.',
        'Computer vision latency: Decoupled AI damage estimation via Celery background tasks so technicians can upload photos without interface freezing.',
        'Interactive 3D performance: Optimized 3D model geometry and materials in React Three Fiber to maintain 60 FPS on mobile and low-power workshop tablets.',
      ],
      databaseHighlights:
        'Engineered relational tables for WorkOrders, VehicleSpecs, AIFindings, ServiceLogs, and Technicians with strict foreign key constraints and transactional integrity.',
      deliverables:
        'Complete end-to-end web application, fully functioning 3D inspection module, real-time customer messaging, and automated AI damage detection pipeline.',
    },
  },
  {
    id: 'vyse',
    title: 'Vyse',
    subtitle: 'AI-Powered Publishing & Editorial Platform',
    category: 'Full-Stack Web App',
    featured: true,
    tags: ['Django', 'Python', 'PostgreSQL', 'Gemini AI', 'Tailwind CSS', 'JavaScript'],
    problem:
      'Digital writers and content businesses struggle with bloated publishing software and lack automated tools to generate summaries and engagement tags for time-constrained readers.',
    keyFeatures: [
      'AI Writing Intelligence: Auto-generates concise 3-bullet article summaries (TL;DR) and smart topic tags using Google GenAI SDK',
      'Cinematic dark-first UI featuring glassmorphism, responsive grids, and subtle micro-interactions',
      'Next-Gen Publishing: Drag-and-drop cover image uploader with Markdown content editing and instant previews',
      'Complete Authentication: Login, signup, user profiles, and secure OTP-based password recovery',
      'Reader Discussions: Threaded comment architecture and bookmarking system',
    ],
    role: 'Full-Stack Developer',
    roleDetails:
      'Architected the Django application from ground up, implemented the Gemini API summarization pipeline, designed the responsive dark UI, and deployed the production stack.',
    demoUrl: 'https://vyse-7nj1.onrender.com',
    githubUrl: 'https://github.com/shloksuthar0307-sketch/vyse',
    caseStudy: {
      clientOverview:
        'A publication platform designed for tech writers, developers, and digital publishers seeking a sleek, distraction-free reading experience enhanced by generative AI.',
      architecture: [
        'Backend: Django 5 MVT architecture with robust security and session management.',
        'AI Integration: Google GenAI SDK generating structured JSON summaries and semantic tags.',
        'Frontend: Modern dark UI with Tailwind CSS, custom glassmorphism layers, and responsive layouts.',
        'Database: PostgreSQL managing users, stories, categories, AI metadata, and threaded comments.',
      ],
      technicalChallenges: [
        'Reliable AI structuring: Prompt-engineered Google Gemini API calls to consistently return valid 3-bullet bulleted summaries and relevant taxonomy tags.',
        'Media handling: Built a drag-and-drop file uploader with client-side image validation and secure media serving.',
        'Reader engagement: Optimized page load speeds with efficient Django queryset caching and database index tuning.',
      ],
      databaseHighlights:
        'Designed schema for Articles, Revisions, Categories, Tags, Profiles, and Comments with index optimization on publication dates and slugs.',
      deliverables:
        'Production-ready publishing web application with automated AI summary tools, OTP account recovery, and responsive reading views.',
    },
  },
  {
    id: 'ecom',
    title: 'ApexStore',
    subtitle: 'Django E-Commerce & Affiliate Marketing Engine',
    category: 'Django & DRF',
    featured: true,
    tags: ['Django', 'Python', 'PostgreSQL', 'Affiliate Engine', 'JavaScript', 'Tailwind CSS'],
    problem:
      'Online retailers frequently need an autonomous e-commerce store with built-in affiliate referral marketing without paying steep monthly software subscriptions to third-party providers.',
    keyFeatures: [
      'End-to-End Shopping Experience: Dynamic product catalog, multi-category filters, persistent cart, and checkout',
      'Built-in Affiliate System: Custom referral tracking middleware, personal affiliate links, and commission tracking',
      'Customer Portal: Order tracking, shipping addresses, purchase history, and profile management',
      'Django Admin Inventory: Back-office controls for product variants, stock levels, orders, and affiliate payouts',
      'Secure Architecture: CSRF-protected checkout forms, session management, and robust data sanitization',
    ],
    role: 'Full-Stack Developer',
    roleDetails:
      'Engineered Django apps (accounts, affiliates, cart, orders), wrote custom affiliate tracking middleware, designed database models, and built responsive customer workflows.',
    demoUrl: 'https://ecom-3atc.onrender.com',
    githubUrl: 'https://github.com/shloksuthar0307-sketch/ecom',
    caseStudy: {
      clientOverview:
        'A standalone digital commerce platform for direct-to-consumer businesses wanting direct control over their product sales and partner affiliate marketing.',
      architecture: [
        'Core Apps: Accounts, Products, Cart, Orders, and Affiliates modules built with clean Django separation.',
        'Tracking Engine: Custom Django HTTP middleware intercepting affiliate query params and setting secure session cookies.',
        'Database: PostgreSQL relational tables handling transactions with atomic database operations.',
        'Frontend: Responsive, accessible storefront layout with dynamic AJAX cart updates.',
      ],
      technicalChallenges: [
        'Attribution integrity: Designed referral middleware that prevents fraudulent self-referrals and accurately credits affiliates even if users navigate away and return later.',
        'Cart persistence: Ensured cart contents seamlessly merge when a guest shopper logs into an existing customer account.',
        'Transactional consistency: Wrapped order placement and stock deduction inside Django atomic transactions to prevent inventory overselling.',
      ],
      databaseHighlights:
        'Relational schema managing Products, Variants, Carts, Orders, OrderItems, Affiliates, and CommissionLogs with database-level constraints.',
      deliverables:
        'Complete e-commerce web application with product management, shopping cart, customer accounts, and an integrated affiliate referral engine.',
    },
  },
  {
    id: 'hospital',
    title: 'CareSync',
    subtitle: 'Hospital & Clinic Multi-Role Management System',
    category: 'Django & DRF',
    featured: false,
    tags: ['Django', 'Python', 'PostgreSQL', 'Role-Based Access', 'Dashboards'],
    problem:
      'Medical facilities waste hours coordinating appointments and managing records across disconnected communication channels between doctors, staff, and patients.',
    keyFeatures: [
      'Multi-Role Authorization: Granular permissions for Administrators, Doctors, Receptionists, and Patients',
      'Queue & Scheduling: Appointment booking, doctor schedule management, and real-time consultation status',
      'Department Organization: Multi-department schema supporting specialized clinics and doctor assignments',
      'Secure Health Records: Strict patient data privacy segregation ensuring only assigned medical staff view records',
      'Schema Automation: Custom Django management commands for automated tenant/branch schema initialization',
    ],
    role: 'Backend & Full-Stack Developer',
    roleDetails:
      'Designed relational schema for clinical workflows, created role-based permission decorators, automated schema migrations, and built administrative views.',
    demoUrl: 'https://hospital-glxp.onrender.com',
    githubUrl: 'https://github.com/shloksuthar0307-sketch/hospital',
    caseStudy: {
      clientOverview:
        'Designed for clinics and multi-specialty healthcare centers requiring operational clarity and role-restricted record management.',
      architecture: [
        'Backend: Django with custom authentication backends and role-based decorators.',
        'Schema: Multi-department architecture created via automated management commands.',
        'Security: Strict permission boundaries preventing unauthorized access to medical records.',
        'Database: PostgreSQL storing encrypted user roles, doctor schedules, and appointment histories.',
      ],
      technicalChallenges: [
        'Role segregation: Created custom Django auth decorators ensuring staff, doctors, and patients only access their respective operational surfaces.',
        'Appointment conflicts: Implemented validation logic preventing overlapping doctor bookings across time slots.',
      ],
      databaseHighlights:
        'Normalized tables for Users, Doctors, Patients, Appointments, Departments, and ClinicalNotes.',
      deliverables:
        'Operational clinic management portal with multi-role dashboards, scheduling workflows, and medical record security.',
    },
  },
  {
    id: 'library',
    title: 'LibriTrack',
    subtitle: 'Enterprise Multi-Branch Library & Catalog System',
    category: 'Django & DRF',
    featured: false,
    tags: ['Django', 'Python', 'PostgreSQL', 'Docker', 'Inventory Control'],
    problem:
      'Educational institutions and corporate repositories struggle with catalog silos, lost physical inventory, and lack of cross-branch availability tracking.',
    keyFeatures: [
      'Multi-Branch Cataloging: Centralized book inventory with branch-specific stock levels and circulation audits',
      'Member Management: Member tier verification, lending limit enforcement, and overdue fine calculations',
      'Book Reservation: Cross-branch hold system and real-time availability status',
      'Dockerized Architecture: Containerized Dockerfile setup for repeatable deployments across environments',
      'Audit Logs: Complete chronological tracking of all book issues, returns, and inventory write-offs',
    ],
    role: 'Full-Stack Developer',
    roleDetails:
      'Architected the multi-branch database models, created circulation algorithms, implemented user branch decorators, and dockerized the environment.',
    demoUrl: 'https://library-y845.onrender.com',
    githubUrl: 'https://github.com/shloksuthar0307-sketch/library',
    caseStudy: {
      clientOverview:
        'Targeted at academic libraries and multi-office institutions needing centralized asset visibility and circulation rules.',
      architecture: [
        'Backend: Django with modular circulation and cataloging applications.',
        'Containerization: Dockerfile and container configuration for rapid staging deployment.',
        'Database: PostgreSQL handling thousands of catalog entries and transaction logs.',
      ],
      technicalChallenges: [
        'Branch-level isolation: Allowed branch librarians to manage local inventory while head administrators maintain global catalog control.',
        'Automated overdue fees: Scheduled background checks calculating fines based on customized grace periods.',
      ],
      databaseHighlights:
        'Structured models for Branches, BookTitles, BookCopies, Members, Loans, and PenaltyLedgers.',
      deliverables:
        'Dockerized multi-branch inventory management platform with automated circulation rules and member dashboards.',
    },
  },
  {
    id: 'contact',
    title: 'ContactBook',
    subtitle: 'Secure Contact Management with OTP Verification',
    category: 'Full-Stack Web App',
    featured: false,
    tags: ['Django', 'Python', 'PostgreSQL', 'OTP Auth', 'REST APIs'],
    problem:
      'Users need an accessible yet private contact management repository safeguarded by multi-factor email verification rather than easily compromised single passwords.',
    keyFeatures: [
      'Email OTP Authentication: One-time password verification for registrations, login confirmation, and password resets',
      'Interactive Contact Management: Instant search, custom category tags, and favorite contact toggles',
      'Row-Level Privacy: Absolute data isolation ensuring users strictly view and modify only their own address book',
      'Export & Backup: Clean contact data exports and responsive mobile-first dashboard',
      'REST API Integration: Modular API endpoints for programmatic contact synchronization',
    ],
    role: 'Full-Stack Developer',
    roleDetails:
      'Implemented OTP verification backend, engineered database security rules, created REST endpoints, and developed the dashboard frontend.',
    demoUrl: 'https://contact-xs5q.onrender.com',
    githubUrl: 'https://github.com/shloksuthar0307-sketch/contact',
    caseStudy: {
      clientOverview:
        'Built for security-conscious professionals and teams seeking private contact synchronization with verification security.',
      architecture: [
        'Backend: Django with custom OTP generation and email dispatch pipeline.',
        'Security: Time-limited cryptographic OTP tokens with automatic invalidation.',
        'Database: PostgreSQL with row-level user ownership constraints.',
      ],
      technicalChallenges: [
        'OTP security: Implemented rate-limiting and 5-minute expiry windows to prevent brute-force attacks on OTP codes.',
        'Responsive UI: Engineered dynamic AJAX partials for real-time contact favoriting without full-page reloads.',
      ],
      databaseHighlights:
        'User, OTPToken, Contact, and ContactGroup models with strict cascade deletion and ownership rules.',
      deliverables:
        'Production web application with working email OTP authentication, contact CRUD, and REST API access.',
    },
  },
];

const categories = ['All Projects', 'Full-Stack Web App', 'Django & DRF'];

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === 'All Projects'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SectionWrapper id="projects" className="bg-[#050505] relative overflow-hidden py-24 md:py-32">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-primary font-mono text-sm tracking-widest uppercase flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-primary"></span>
              03. Selected Works
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight">
              Production Projects &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400">
                Case Studies
              </span>
            </h2>
            <p className="mt-4 text-foreground/75 text-base md:text-lg max-w-2xl font-light">
              Real applications built with React, Django REST Framework, and PostgreSQL. Every project below includes
              verified source code, live deployments, and architectural case studies.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`hoverable px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col justify-between rounded-3xl p-7 md:p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-xl overflow-hidden"
            >
              {/* Top Row: Category & Badges */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/20 text-accent border border-primary/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" /> Featured
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-cyan-400/90 mb-4 font-mono">
                  {project.subtitle}
                </p>

                {/* Problem Being Solved */}
                <div className="mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] font-mono uppercase text-foreground/50 block mb-1">
                    Problem Solved:
                  </span>
                  <p className="text-xs text-foreground/80 leading-relaxed font-light">
                    {project.problem}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-6 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-foreground/50 block mb-1">
                    Core Functionality:
                  </span>
                  {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-foreground/75 leading-tight">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {project.keyFeatures.length > 3 && (
                    <p className="text-[11px] text-accent/80 font-mono pl-5">
                      + {project.keyFeatures.length - 3} more features in case study
                    </p>
                  )}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-foreground/80 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-white/5 mt-auto flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="hoverable w-full py-3 px-4 rounded-xl bg-primary text-white text-xs md:text-sm font-semibold hover:bg-accent transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/25"
                  aria-label={`View deep dive case study for ${project.title}`}
                >
                  <Layers className="w-4 h-4" />
                  <span>View Case Study Details</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hoverable flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-1.5"
                    aria-label={`Visit live demo for ${project.title}`}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hoverable py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-1.5"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <FaGithub className="w-4 h-4 text-foreground/80" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0510] border border-white/20 p-6 md:p-10 shadow-2xl custom-scrollbar"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="hoverable absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-colors"
                aria-label="Close case study modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="pr-12 mb-8 border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/20 text-accent border border-primary/30">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-foreground/70 border border-white/10">
                    Role: {selectedProject.role}
                  </span>
                </div>
                <h2 id="case-study-title" className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-base text-cyan-400 font-mono">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Modal Body */}
              <div className="space-y-8 text-foreground/80 font-light text-sm md:text-base leading-relaxed">
                {/* Problem & Audience */}
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                    Problem Statement &amp; Context
                  </h3>
                  <p className="mb-2">{selectedProject.problem}</p>
                  <p className="text-xs md:text-sm text-foreground/60 italic">
                    {selectedProject.caseStudy.clientOverview}
                  </p>
                </div>

                {/* Architecture Breakdown */}
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-3 flex items-center gap-2">
                    <Server className="w-5 h-5 text-primary" />
                    Architecture &amp; Stack Decisions
                  </h3>
                  <div className="space-y-2 bg-white/[0.02] p-4 md:p-5 rounded-2xl border border-white/5">
                    {selectedProject.caseStudy.architecture.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Technical Challenges & Solutions */}
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-3 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    Engineering Challenges &amp; Solutions
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.caseStudy.technicalChallenges.map((challenge, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="text-xs md:text-sm text-foreground/80">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Database Highlights */}
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Database &amp; Data Integrity
                  </h3>
                  <p className="text-xs md:text-sm bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {selectedProject.caseStudy.databaseHighlights}
                  </p>
                </div>

                {/* Deliverables & Real Impact */}
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-3 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                    Deliverables &amp; Role Details
                  </h3>
                  <p className="text-xs md:text-sm mb-2">{selectedProject.roleDetails}</p>
                  <p className="text-xs md:text-sm text-foreground/60 italic">
                    Deliverables: {selectedProject.caseStudy.deliverables}
                  </p>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hoverable inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-accent text-white font-semibold text-sm transition-all shadow-lg shadow-primary/30"
                  >
                    <span>Visit Live Application</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hoverable inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 hover:border-white/30 transition-all"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="hoverable text-xs font-mono uppercase tracking-wider text-foreground/50 hover:text-white transition-colors"
                >
                  Close Modal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
