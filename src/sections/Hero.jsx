import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  Sparkles,
  Torus,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { motion } from 'framer-motion';
import { ArrowRight, FolderKanban, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

// ---------------------------------------------------------------------
// Advanced Abstract Node System
// ---------------------------------------------------------------------
const AbstractCore = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Smoothly follow mouse
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        {/* TorusKnot for complex glass refractions */}
        <torusKnotGeometry args={[1.2, 0.4, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
          attenuationDistance={1}
          attenuationColor="#aa3bff"
        />
      </mesh>
    </Float>
  );
};

// Orbital Rings
const OrbitalRings = () => {
  const ringsRef = useRef();

  useFrame((_, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x += delta * 0.05;
      ringsRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={ringsRef} position={[2, 0, -2]}>
      <Torus args={[3, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#c084fc" transparent opacity={0.2} />
      </Torus>
      <Torus args={[4, 0.01, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.15} />
      </Torus>
      <Torus args={[5, 0.02, 16, 100]} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <meshBasicMaterial color="#aa3bff" transparent opacity={0.3} />
      </Torus>
    </group>
  );
};

// Glowing particles
const ParticleSystem = () => {
  return (
    <group position={[2, 0, -2]}>
      <Sparkles count={150} scale={10} size={2} speed={0.4} color="#c084fc" opacity={0.6} />
      <Sparkles count={50} scale={12} size={3} speed={0.2} color="#67e8f9" opacity={0.4} />
      <Sparkles count={100} scale={8} size={1.5} speed={0.6} color="#aa3bff" opacity={0.8} />
    </group>
  );
};

// ---------------------------------------------------------------------
// Post-Processing & Scene Root
// ---------------------------------------------------------------------
const Scene = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#c084fc" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#67e8f9" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#aa3bff" />

      <AbstractCore />
      <OrbitalRings />
      <ParticleSystem />

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.5} 
          levels={8}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-24 pb-16">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-background pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center space-x-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md shadow-sm"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-xs md:text-sm font-medium text-emerald-200 tracking-wide uppercase">
            Available for Hire • Freelance & Contract Projects
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-4 leading-tight">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="block text-white"
          >
            Full-Stack Developer
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400"
          >
            React &amp; Django Specialist
          </motion.span>
        </h1>

        {/* Tech Focus Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {['React.js', 'Django', 'Django REST Framework', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'].map((tech) => (
            <span
              key={tech}
              className="text-xs md:text-sm font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/90 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-2xl text-lg md:text-xl text-foreground/80 mb-8 font-light leading-relaxed"
        >
          I design and build <strong className="text-white font-medium">responsive business websites</strong>,{' '}
          <strong className="text-white font-medium">resilient Django REST APIs</strong>, and{' '}
          <strong className="text-white font-medium">interactive React web applications</strong> that turn visitors into
          paying clients and automate critical operations.
        </motion.p>

        {/* High-Impact CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="hoverable group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all"
            aria-label="Hire me for your project"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#projects"
            className="hoverable inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-semibold text-base rounded-full backdrop-blur-md hover:border-white/40 transition-all hover:scale-[1.02]"
            aria-label="View portfolio projects"
          >
            <FolderKanban className="w-5 h-5 text-cyan-400" />
            <span>View Projects</span>
          </a>
        </motion.div>

        {/* Trust Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-3xl"
        >
          <div className="flex items-center gap-2.5 text-sm text-foreground/75">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Production-Tested Delivery</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-foreground/75">
            <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Fast, Responsive UI/UX</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-foreground/75 col-span-2 md:col-span-1">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Secure DRF &amp; PostgreSQL</span>
          </div>
        </motion.div>
      </div>

      {/* Modern Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center space-x-4"
      >
        <motion.div
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[2px] h-12 bg-white/20 relative overflow-hidden"
        >
          <motion.div 
            className="absolute left-0 w-full bg-primary" 
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ height: "50%" }}
          />
        </motion.div>
        <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 rotate-90 origin-left translate-y-6">Scroll</span>
      </motion.div>
    </section>
  );
};
