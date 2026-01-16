import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Sofa, ShoppingBag, Dumbbell, ArrowRight } from 'lucide-react';

const industries = [
  {
    id: 'technology',
    icon: Monitor,
    title: 'Technology',
    subtitle: 'Consumer Electronics & Gadgets',
    description: 'From sleek smartphones to complex hardware, we showcase cutting-edge technology with precision animations that highlight innovation and functionality.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
    stats: ['50+ Tech Brands', '200+ Products', '4K+ Resolution'],
    color: 'cyan',
  },
  {
    id: 'furniture',
    icon: Sofa,
    title: 'Furniture',
    subtitle: 'Interior & Home Design',
    description: 'Bring furniture to life with warm, cinematic visuals that showcase craftsmanship, materials, and the art of comfortable living.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    stats: ['30+ Brands', '500+ Renders', 'Photorealistic'],
    color: 'amber',
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-commerce',
    subtitle: 'Online Retail & DTC',
    description: 'Convert browsers to buyers with compelling product animations optimized for online stores, marketplaces, and social commerce.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    stats: ['40% Higher CTR', 'Platform Ready', 'A/B Tested'],
    color: 'violet',
  },
  {
    id: 'sports',
    icon: Dumbbell,
    title: 'Sports Equipment',
    subtitle: 'Athletic & Outdoor Gear',
    description: 'Dynamic, high-energy animations that capture the spirit of athletic performance and the engineering behind premium sports equipment.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    stats: ['Action Shots', 'Slow Motion', 'Impact Focus'],
    color: 'emerald',
  },
];

const colorClasses = {
  cyan: 'bg-cyan-500 text-cyan-400 border-cyan-500/30',
  amber: 'bg-amber-500 text-amber-400 border-amber-500/30',
  violet: 'bg-violet-500 text-violet-400 border-violet-500/30',
  emerald: 'bg-emerald-500 text-emerald-400 border-emerald-500/30',
};

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);

  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Industry Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Industries We Serve
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Specialized experience across diverse sectors, each with unique visual requirements and audiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Industry selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {industries.map((industry, index) => (
              <motion.button
                key={industry.id}
                onClick={() => setActiveIndustry(industry)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-300 border ${
                  activeIndustry.id === industry.id
                    ? 'bg-white/[0.05] border-white/20'
                    : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    activeIndustry.id === industry.id 
                      ? colorClasses[industry.color].split(' ')[0] 
                      : 'bg-white/5'
                  }`}>
                    <industry.icon className={`w-6 h-6 ${
                      activeIndustry.id === industry.id ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-1 transition-colors ${
                      activeIndustry.id === industry.id ? 'text-white' : 'text-gray-400'
                    }`}>
                      {industry.title}
                    </h3>
                    <p className={`text-sm transition-colors ${
                      activeIndustry.id === industry.id ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {industry.subtitle}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-all ${
                    activeIndustry.id === industry.id 
                      ? `${colorClasses[industry.color].split(' ')[1]} translate-x-0` 
                      : 'text-gray-600 -translate-x-2 opacity-0'
                  }`} />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Active industry display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8">
                  <img
                    src={activeIndustry.image}
                    alt={activeIndustry.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  
                  {/* Floating badge */}
                  <div className={`absolute top-6 right-6 px-4 py-2 rounded-full ${colorClasses[activeIndustry.color].split(' ').slice(0, 1).join(' ')} text-white text-sm font-medium`}>
                    {activeIndustry.title}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {activeIndustry.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-3">
                  {activeIndustry.stats.map((stat, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 rounded-full border ${colorClasses[activeIndustry.color].split(' ').slice(1).join(' ')} text-sm`}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}