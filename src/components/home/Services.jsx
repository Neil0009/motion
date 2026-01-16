import React from 'react';
import { motion } from 'framer-motion';
import { Play, Cpu, BookOpen, RotateCw, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Play,
    title: 'Promo Videos',
    subtitle: 'Social Ads',
    description: 'Captivating short-form content optimized for social media platforms. Designed to stop the scroll and drive engagement.',
    features: ['15-60 second formats', 'Platform optimized', 'High conversion focus'],
    gradient: 'from-cyan-500 to-blue-600',
    delay: 0,
  },
  {
    icon: Cpu,
    title: 'Feature Videos',
    subtitle: 'Technical Details',
    description: 'In-depth product explorations that highlight technical specifications, materials, and innovative features.',
    features: ['Detailed breakdowns', 'X-ray visuals', 'Technical accuracy'],
    gradient: 'from-violet-500 to-purple-600',
    delay: 0.1,
  },
  {
    icon: BookOpen,
    title: 'Installation Guides',
    subtitle: 'Setup Instructions',
    description: 'Clear, step-by-step animated tutorials that simplify complex assembly and installation processes.',
    features: ['Step-by-step flow', 'Multi-language ready', 'User-friendly'],
    gradient: 'from-amber-500 to-orange-600',
    delay: 0.2,
  },
  {
    icon: RotateCw,
    title: '360° Rotation',
    subtitle: 'E-commerce',
    description: 'Interactive product spins that let customers explore every angle, boosting confidence and reducing returns.',
    features: ['Full rotation', 'Zoom capability', 'Web optimized'],
    gradient: 'from-emerald-500 to-green-600',
    delay: 0.3,
  },
];

export default function Services() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            What We Create
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From concept to final render, we craft visual stories that elevate your brand and captivate your audience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="group relative"
            >
              <div className="relative h-full p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-500 overflow-hidden">
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <span className="text-gray-500 text-sm uppercase tracking-wider">{service.subtitle}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mt-1 mb-4 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.features.map((feature, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 text-sm border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-cyan-400 font-medium group/link cursor-pointer">
                  <span className="group-hover/link:mr-2 transition-all">Learn More</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.gradient} opacity-10 blur-3xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}