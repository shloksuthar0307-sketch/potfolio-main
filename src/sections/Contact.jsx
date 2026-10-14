import React, { useState, useRef } from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { Send, Mail, MapPin, CheckCircle2, AlertCircle, Copy, Check, Clock, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Stars } from '@react-three/drei';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

// Interactive 3D Wireframe Globe
const WireframeEarth = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[2.5, 32, 32]}>
          <meshBasicMaterial color="#aa3bff" wireframe transparent opacity={0.15} />
        </Sphere>
        {/* Abstract Location Pin */}
        <group position={[1.8, 1, 1.3]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

const PROJECT_TYPES = [
  'Full-Stack Web Application',
  'React Frontend Development',
  'Django Backend & REST API',
  'Responsive Business Website',
  'Authentication & Role Dashboard',
  'Database Integration & Optimization',
  'Bug Fixing & Maintenance',
  'Other / Consultation',
];

const BUDGET_RANGES = [
  '< $1,000 (Small sprint / bug fix)',
  '$1,000 – $3,000 (MVP / feature build)',
  '$3,000 – $5,000 (Full-scale application)',
  '$5,000+ (Enterprise / ongoing)',
  'Hourly / To be discussed',
];

export const Contact = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectTypeOverride: '',
    budget: BUDGET_RANGES[1],
    message: '',
  });

  const effectiveProjectType =
    formData.projectTypeOverride ||
    (selectedService
      ? PROJECT_TYPES.find((t) => t.toLowerCase().includes(selectedService.toLowerCase())) || selectedService
      : PROJECT_TYPES[0]);

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Spotlight effect for the form
  const formRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const { left, top } = formRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address so I can respond.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide a brief project description (at least 15 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    const endpoint =
      import.meta.env.VITE_CONTACT_ENDPOINT || 'https://formsubmit.co/ajax/shloksuthar25@gmail.com';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: effectiveProjectType,
          budget: formData.budget,
          message: formData.message.trim(),
          _subject: `New Freelance Inquiry: ${effectiveProjectType} from ${formData.name}`,
          _template: 'table',
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          errorData.message ||
            'Form service could not accept the submission. You can still reach me directly via email.'
        );
      }
    } catch (err) {
      setStatus('error');
      if (err.name === 'AbortError') {
        setErrorMessage('Request timed out. Please send your inquiry directly via email.');
      } else {
        setErrorMessage(
          'Network connection error. Please click the button below to send your message directly via email.'
        );
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shloksuthar25@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Freelance Inquiry: ${effectiveProjectType}`);
    const body = encodeURIComponent(
      `Hi Shlok,\n\nName: ${formData.name || ''}\nEmail: ${formData.email || ''}\nProject Type: ${
        effectiveProjectType
      }\nBudget: ${formData.budget || ''}\n\nProject Details:\n${formData.message || ''}\n\nBest regards,`
    );
    return `mailto:shloksuthar25@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <SectionWrapper id="contact" className="bg-[#050505] relative min-h-screen flex items-center overflow-hidden py-24 md:py-32">
      {/* 3D Background specifically for Contact section */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
          <group position={[-3, 0, -2]}>
            <WireframeEarth />
          </group>
        </Canvas>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side: Pitch & Direct Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary"></span>
                06. Start a Project
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400">
                  Next High-Impact App.
                </span>
              </h2>
              <p className="text-foreground/75 text-base md:text-lg font-light leading-relaxed">
                Whether you need a full-stack React &amp; Django application built from scratch, an existing API
                optimized, or an operational dashboard, I am ready to collaborate. Let's discuss your timeline,
                budget, and technical deliverables.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              {/* Direct Email with Copy */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-foreground/50 font-mono uppercase tracking-wider">Direct Email</p>
                    <a
                      href="mailto:shloksuthar25@gmail.com"
                      className="text-base md:text-lg font-medium text-white hover:text-primary transition-colors"
                    >
                      shloksuthar25@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="hoverable p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground/70 hover:text-white transition-colors"
                  aria-label="Copy email address to clipboard"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Response Time & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-foreground/50 font-mono uppercase">Typical Response</p>
                    <p className="text-sm font-medium text-white">&lt; 24 Hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-foreground/50 font-mono uppercase">Location &amp; Availability</p>
                    <p className="text-sm font-medium text-white">Ahmedabad • Remote Global</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://github.com/shloksuthar0307-sketch"
                  target="_blank"
                  rel="noreferrer"
                  className="hoverable flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono border border-white/10 hover:border-white/30 transition-all"
                  aria-label="Visit GitHub Profile"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-foreground/40" />
                </a>

                <a
                  href="https://www.linkedin.com/in/shlok-suthar2507/"
                  target="_blank"
                  rel="noreferrer"
                  className="hoverable flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono border border-white/10 hover:border-white/30 transition-all"
                  aria-label="Visit LinkedIn Profile"
                >
                  <FaLinkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-foreground/40" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Professional Hiring Form */}
          <div className="relative">
            <motion.form
              ref={formRef}
              onMouseMove={handleMouseMove}
              onSubmit={handleSubmit}
              noValidate
              className="group relative p-6 sm:p-10 rounded-3xl bg-[#0a0510]/90 backdrop-blur-xl border border-white/10 flex flex-col gap-5 shadow-2xl overflow-hidden"
            >
              {/* Hover Spotlight */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      600px circle at ${mouseX}px ${mouseY}px,
                      rgba(170, 59, 255, 0.15),
                      transparent 80%
                    )
                  `,
                }}
              />

              <div className="relative z-10">
                <h3 className="text-xl font-heading font-semibold text-white mb-1">
                  Project Inquiry &amp; Estimate
                </h3>
                <p className="text-xs text-foreground/60 font-light">
                  Fill in your project scope below for a response with estimated delivery time and architecture suggestions.
                </p>
              </div>

              {/* Success Message Banner */}
              {status === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="relative z-10 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-sm space-y-3"
                >
                  <div className="flex items-center gap-2.5 font-semibold text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Inquiry Sent Successfully!</span>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald-200/90 font-light">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been received.
                    I will review your project details and follow up at{' '}
                    <strong className="text-white">{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        projectTypeOverride: '',
                        budget: BUDGET_RANGES[1],
                        message: '',
                      });
                    }}
                    className="hoverable text-xs font-mono underline text-emerald-300 hover:text-white pt-1 block"
                  >
                    Submit another inquiry
                  </button>
                </div>
              )}

              {/* Error Message Banner */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="relative z-10 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs space-y-3"
                >
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Unable to Submit Automatically</span>
                  </div>
                  <p className="leading-relaxed font-light">{errorMessage}</p>
                  <div className="pt-2">
                    <a
                      href={generateMailtoUrl()}
                      className="hoverable inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-100 transition-colors shadow-md"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Pre-filled in Email Client</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-foreground/80 flex justify-between">
                  <span>Your Name *</span>
                  {errors.name && <span className="text-rose-400 text-[11px]">{errors.name}</span>}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={status === 'submitting'}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full bg-white/5 border ${
                    errors.name ? 'border-rose-500/70' : 'border-white/10'
                  } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-foreground/20 font-light`}
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                />
              </div>

              {/* Email Field */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-foreground/80 flex justify-between">
                  <span>Your Email Address *</span>
                  {errors.email && <span className="text-rose-400 text-[11px]">{errors.email}</span>}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={status === 'submitting'}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full bg-white/5 border ${
                    errors.email ? 'border-rose-500/70' : 'border-white/10'
                  } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-foreground/20 font-light`}
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                />
              </div>

              {/* Project Type & Budget Range Grid */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="text-xs font-medium text-foreground/80">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    disabled={status === 'submitting'}
                    value={effectiveProjectType}
                    onChange={(e) => setFormData({ ...formData, projectTypeOverride: e.target.value })}
                    className="w-full bg-[#120a1f] border border-white/10 rounded-xl px-3 py-3 text-white text-xs focus:outline-none focus:border-primary transition-all font-light"
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#0a0510] text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-xs font-medium text-foreground/80">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    disabled={status === 'submitting'}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#120a1f] border border-white/10 rounded-xl px-3 py-3 text-white text-xs focus:outline-none focus:border-primary transition-all font-light"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b} className="bg-[#0a0510] text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-medium text-foreground/80 flex justify-between">
                  <span>Project Description &amp; Scope *</span>
                  {errors.message && <span className="text-rose-400 text-[11px]">{errors.message}</span>}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  disabled={status === 'submitting'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full bg-white/5 border ${
                    errors.message ? 'border-rose-500/70' : 'border-white/10'
                  } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-foreground/20 font-light resize-none`}
                  placeholder="Outline your project goals, key features, target timeline, or link to design/specs..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: status === 'submitting' ? 1 : 1.01 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.99 }}
                className="hoverable relative z-10 w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Transmitting Inquiry...
                  </span>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              <p className="relative z-10 text-[11px] text-center text-foreground/40 font-mono">
                🔒 Privacy guaranteed. Your inquiry is sent directly to Shlok Suthar.
              </p>
            </motion.form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
