import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function ServiceProcess({ steps }) {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Process
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A streamlined workflow designed to deliver exceptional results efficiently and on time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-12 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex gap-6 lg:gap-8">
                  {/* Step number */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <span className="text-3xl font-bold text-black">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Connection dot */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full h-8">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500 h-full">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/30 whitespace-nowrap">
                            <Clock className="w-4 h-4" />
                            {step.duration}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}