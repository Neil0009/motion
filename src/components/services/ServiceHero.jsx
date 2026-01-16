import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ServiceHero({ service }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to={createPageUrl('Home')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6`}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium tracking-wide">{service.subtitle}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {service.title}
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {service.detailed_description || service.description}
            </p>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {service.typical_timeline && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-sm text-gray-500 mb-1">Typical Timeline</div>
                  <div className="text-white font-semibold">{service.typical_timeline}</div>
                </div>
              )}
              {service.pricing_note && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-sm text-gray-500 mb-1">Starting From</div>
                  <div className="text-white font-semibold">{service.pricing_note}</div>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all"
            >
              Request a Quote
            </motion.button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img
                src={service.hero_image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating badge */}
            <div className={`absolute top-6 right-6 px-4 py-2 rounded-full bg-gradient-to-r ${service.gradient} text-white text-sm font-medium shadow-lg`}>
              Premium Service
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}