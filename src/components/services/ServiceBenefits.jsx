import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Target, TrendingUp, Shield, Clock } from 'lucide-react';

const iconMap = {
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Clock,
};

export default function ServiceBenefits({ benefits }) {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Why Choose This Service
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Key Benefits
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how this service can transform your architectural projects and deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || CheckCircle2;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="h-full p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}