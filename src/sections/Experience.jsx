import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
import { Briefcase, GraduationCap } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    title: "Full-Stack Web Developer",
    company: "Freelance & Independent Practice",
    period: "2022 - Present",
    description: "Designing and developing production full-stack web applications with React, Django REST Framework, and PostgreSQL. Engineering real-time features, secure authentication (JWT/OTP), relational database schemas, and AI-assisted workflows for clients.",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Frontend & UI/UX Developer",
    company: "Creative Design & Multimedia Institute",
    period: "2021 - 2024",
    description: "Built responsive, component-driven interfaces using React and modern CSS/Tailwind. Collaborated on cross-device compatibility, accessibility standards, and clean API consumption.",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Diploma in Computer Engineering",
    company: "Swarrnim Startup & Innovation University",
    period: "2022 - Present",
    description: "Focusing on software development fundamentals, relational database management, data structures, and computer science systems.",
    icon: <GraduationCap className="w-5 h-5" />
  }
];

export const Experience = () => {
  return (
    <SectionWrapper id="experience" className="bg-[#0a0510]">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-20 reveal-up opacity-0">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">05. Timeline</span>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-white">Experience &amp; Education</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-white/10 to-transparent -translate-x-1/2 hidden md:block" />
          <div className="absolute left-[39px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:hidden" />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div 
                key={item.id} 
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} reveal-up opacity-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 top-0 translate-x-[-50%] w-12 h-12 rounded-full glass border border-primary/50 flex items-center justify-center z-10 text-primary shadow-[0_0_15px_rgba(170,59,255,0.3)]">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 pl-24 md:pl-0">
                  <div className={`md:w-5/6 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                    <div className="glass p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                      <span className="text-primary font-mono text-sm mb-2 block">{item.period}</span>
                      <h3 className="text-2xl font-heading font-semibold text-white mb-1">{item.title}</h3>
                      <h4 className="text-foreground/60 font-medium mb-4">{item.company}</h4>
                      <p className="text-foreground/70 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
