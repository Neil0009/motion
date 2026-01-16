import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building, Store, Trees, Monitor, Sofa, Dumbbell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const industries = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential',
    subtitle: 'Houses & Apartments',
    description: 'Stunning visualizations of residential projects that help clients envision their dream homes before construction begins.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    stats: ['100+ Homes', 'Luxury Villas', 'Apartments'],
    color: 'cyan',
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial',
    subtitle: 'Offices & Mixed-Use',
    description: 'Professional visualizations for office buildings, corporate headquarters, and mixed-use developments that attract investors and tenants.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    stats: ['High-rise towers', 'Office complexes', 'Mixed-use'],
    color: 'amber',
  },
  {
    id: 'interior',
    icon: Store,
    title: 'Interior Design',
    subtitle: 'Retail & Hospitality',
    description: 'Immersive interior visualizations for retail spaces, restaurants, hotels, and hospitality venues that showcase ambiance and design.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    stats: ['Retail spaces', 'Restaurants', 'Hotels'],
    color: 'violet',
  },
  {
    id: 'urban',
    icon: Trees,
    title: 'Urban Planning',
    subtitle: 'Master Plans & Landscape',
    description: 'Large-scale master planning visualizations, public spaces, and landscape architecture that communicate vision to stakeholders.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    stats: ['Master plans', 'Public spaces', 'Landscapes'],
    color: 'emerald',
  },
  {
    id: 'technology',
    icon: Monitor,
    title: 'Technology',
    subtitle: 'Consumer Electronics',
    description: 'Sleek product animations for smartphones, laptops, wearables, and tech gadgets that highlight innovation and premium design.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
    stats: ['50+ Tech Brands', '4K Resolution', 'Premium quality'],
    color: 'cyan',
  },
  {
    id: 'furniture',
    icon: Sofa,
    title: 'Furniture',
    subtitle: 'Home & Office',
    description: 'Beautiful product visualizations that showcase furniture craftsmanship, materials, and design details for e-commerce and marketing.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    stats: ['E-commerce ready', 'Multiple angles', 'Material focus'],
    color: 'amber',
  },
  {
    id: 'sports',
    icon: Dumbbell,
    title: 'Sports Equipment',
    subtitle: 'Athletic & Outdoor Gear',
    description: 'Dynamic product animations that capture performance, engineering, and the energy of athletic equipment and outdoor gear.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    stats: ['Action shots', 'Feature details', 'Performance'],
    color: 'violet',
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
                <Link to={`${createPageUrl('Portfolio')}?category=${industry.id}`} className="flex items-start gap-4 w-full">
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
                </Link>
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