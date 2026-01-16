import React from 'react';
import { motion } from 'framer-motion';
import { Package, Pencil, Play, Upload } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Product Analysis & Planning',
    description: 'We study your product specifications, CAD files, and marketing goals to develop the perfect visualization strategy.',
    details: ['CAD file review', 'Shot planning', 'Style references', 'Timeline setup'],
    color: 'cyan',
  },
  {
    number: '02',
    icon: Pencil,
    title: '3D Modeling & Texturing',
    description: 'Precise product modeling with accurate materials, textures, and details that showcase your product\'s quality and features.',
    details: ['High-poly modeling', 'Material setup', 'Product variants', 'Lighting design'],
    color: 'violet',
  },
  {
    number: '03',
    icon: Play,
    title: 'Animation & Assembly',
    description: 'Dynamic animations including exploded views, assembly sequences, feature highlights, and cinematic product reveals.',
    details: ['Exploded views', 'Assembly guides', 'Feature demos', 'Camera movement'],
    color: 'amber',
  },
  {
    number: '04',
    icon: Upload,
    title: 'Rendering & Delivery',
    description: 'High-resolution rendering with professional post-production, optimized for web, social media, and presentations.',
    details: ['4K rendering', 'Color grading', 'Multiple formats', 'Final delivery'],
    color: 'emerald',
  },
];

const colorMap = {
  cyan: 'from-cyan-500 to-cyan-400 text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  violet: 'from-violet-500 to-violet-400 text-violet-400 border-violet-500/30 bg-violet-500/10',
  amber: 'from-amber-500 to-amber-400 text-amber-400 border-amber-500/30 bg-amber-500/10',
  emerald: 'from-emerald-500 to-emerald-400 text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

export default function ProductProcess() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
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
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Product Animation Process
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From concept to delivery, our streamlined workflow brings your products to life with stunning animations.
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
                      className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center"
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
            Ready to showcase your product?
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}