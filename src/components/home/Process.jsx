import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Box, Zap, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Concept & Storyboarding',
    description: 'We analyze your architectural plans and develop a comprehensive visualization strategy that captures your design intent.',
    details: ['Design review', 'Mood boards', 'View planning', 'Timeline setup'],
    color: 'cyan',
  },
  {
    number: '02',
    icon: Box,
    title: '3D Modeling & Texturing',
    description: 'Precise architectural modeling from your CAD/Revit files with photorealistic materials, lighting, and environmental details.',
    details: ['BIM integration', 'Material library', 'Furniture/fixtures', 'Landscape design'],
    color: 'violet',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Animation & Motion Graphics',
    description: 'Cinematic camera paths and animations showcase spatial flow, design features, and the experience of moving through spaces.',
    details: ['Camera paths', 'Day/night cycles', 'People animation', 'Visual effects'],
    color: 'amber',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Rendering & Post-Production',
    description: 'High-resolution renders with professional color grading and post-processing for presentation-ready deliverables.',
    details: ['V-Ray/Corona render', 'Color correction', 'Multiple formats', 'Final delivery'],
    color: 'emerald',
  },
];

const colorMap = {
  cyan: 'from-cyan-500 to-cyan-400 text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  violet: 'from-violet-500 to-violet-400 text-violet-400 border-violet-500/30 bg-violet-500/10',
  amber: 'from-amber-500 to-amber-400 text-amber-400 border-amber-500/30 bg-amber-500/10',
  emerald: 'from-emerald-500 to-emerald-400 text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

export default function Process() {
  return (
    <section id="architecture-process" className="relative py-32 bg-[#111111] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Architectural Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Architecture Visualization Process
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A refined workflow for creating stunning architectural visualizations and BIM documentation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative h-full">
                  {/* Number badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`absolute -top-4 -left-2 z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[step.color].split(' ')[0]} ${colorMap[step.color].split(' ')[1]} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </motion.div>

                  <div className="pt-8 p-6 h-full rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500 group-hover:bg-white/[0.04]">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${colorMap[step.color].split(' ').slice(3).join(' ')} flex items-center justify-center mb-5 mt-4`}>
                      <step.icon className={`w-6 h-6 ${colorMap[step.color].split(' ')[2]}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colorMap[step.color].split(' ')[0]} ${colorMap[step.color].split(' ')[1]}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow connector (hidden on last item) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">
            Ready to start your project?
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
          >
            Schedule a Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}