import React, { useRef, useState } from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

const InteractiveBlob = () => {
  const sphereRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Scale up slightly on hover
      const targetScale = hovered ? 1.6 : 1.4;
      sphereRef.current.scale.setScalar(
        sphereRef.current.scale.x + (targetScale - sphereRef.current.scale.x) * 0.1
      );
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere 
          ref={sphereRef} 
          args={[1, 100, 100]} 
          scale={1.4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#c084fc" : "#aa3bff"}
            attach="material"
            distort={hovered ? 0.6 : 0.4}
            speed={hovered ? 3 : 1.5}
            roughness={0.1}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={4} 
        color="#aa3bff" 
      />
    </group>
  );
};

export const About = () => {
  return (
    <SectionWrapper id="about" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Text content */}
        <div className="space-y-8">
          <div className="inline-flex reveal-up opacity-0">
            <span className="text-primary font-mono text-sm tracking-widest uppercase flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary"></span>
              01. About Me
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-semibold reveal-up opacity-0 leading-tight">
            Engineering robust backends &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              high-converting frontends.
            </span>
          </h2>
          
          <div className="space-y-6 text-foreground/75 text-base md:text-lg reveal-up opacity-0 font-light leading-relaxed">
            <p>
              I am a Full-Stack Web Developer specialized in architecting production web applications with 
              <strong className="text-white font-medium"> React</strong>, <strong className="text-white font-medium">Django</strong>, 
              <strong className="text-white font-medium"> Django REST Framework (DRF)</strong>, and <strong className="text-white font-medium">PostgreSQL</strong>.
            </p>
            <p>
              My focus is bridging the gap between business objectives and technical execution. Whether building an auto repair 
              management suite with real-time WebSockets and AI inspection, an e-commerce platform with custom affiliate tracking, 
              or a multi-role hospital portal, I write clean, maintainable, and secure code.
            </p>
            <p className="text-sm text-foreground/60 border-l-2 border-primary/50 pl-4">
              "Every line of code should serve a tangible business outcome: faster load times, reliable data integrity, and higher conversion rates."
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4 reveal-up opacity-0">
            <a 
              href="#contact" 
              className="hoverable inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-200 transition-colors shadow-lg"
            >
              <span>Work With Me</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="https://github.com/shloksuthar0307-sketch" 
              target="_blank" 
              rel="noreferrer" 
              className="hoverable inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-full text-sm hover:bg-white/10 hover:border-white/30 transition-colors"
            >
              <span>Verify GitHub Repos</span>
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Unique 3D Visual element */}
        <motion.div 
          className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden reveal-up opacity-0 group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ perspective: 1000 }}
        >
          
          {/* Glass background panel */}
          <motion.div 
            className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-3xl"
            whileHover={{ rotateY: 5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          />
          
          {/* Decorative glowing orb in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 blur-[120px] rounded-full pointer-events-none" />

          {/* 3D Canvas */}
          <motion.div 
            className="absolute inset-0 z-10"
            whileHover={{ rotateY: 5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} color="#c084fc" />
              <pointLight position={[-10, -10, -5]} intensity={1} color="#67e8f9" />
              <Environment preset="city" />
              <InteractiveBlob />
            </Canvas>
          </motion.div>
          
          {/* Floating Quote overlay */}
          <motion.div 
            className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none"
            whileHover={{ y: -10, z: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            <div className="glass p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
              <p className="font-heading text-lg md:text-xl font-light text-white/90 italic leading-relaxed">
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
