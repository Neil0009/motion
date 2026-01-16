import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'CEO, TechCore Industries',
    company: 'TechCore',
    rating: 5,
    text: 'The product animation they created for our industrial equipment was phenomenal. It helped us close 3 major deals in the first month. Highly professional team!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
  {
    name: 'Sarah Williams',
    role: 'Marketing Director',
    company: 'InnovateLabs',
    rating: 5,
    text: 'Outstanding work on our promo video! The attention to detail and cinematic quality exceeded our expectations. Our social media engagement increased by 250%.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    name: 'David Martinez',
    role: 'Project Architect',
    company: 'UrbanDesign Co.',
    rating: 5,
    text: 'Their architectural visualization brought our mixed-use development to life. Clients could truly see the vision, and we secured funding faster than ever before.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  },
  {
    name: 'Emily Thompson',
    role: 'Product Manager',
    company: 'HomeEssentials',
    rating: 5,
    text: 'The assembly animation and exploded views made our instruction manuals obsolete. Customer support calls dropped by 60%. Absolutely worth every penny!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  },
  {
    name: 'James Anderson',
    role: 'Real Estate Developer',
    company: 'Skyline Properties',
    rating: 5,
    text: 'Best architectural visualization studio I have worked with. The photorealistic renders and walkthrough videos helped us pre-sell 85% of units before construction.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  },
  {
    name: 'Lisa Kumar',
    role: 'Design Director',
    company: 'ModernSpaces',
    rating: 4.5,
    text: 'Incredible interior visualization work. The lighting and material details were spot-on. Our clients approved the design on first presentation. Will definitely work again!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
  },
  {
    name: 'Robert Foster',
    role: 'Engineering Manager',
    company: 'Precision Tools Inc.',
    rating: 5,
    text: 'Their industrial animation expertise is unmatched. They understood our technical requirements perfectly and delivered animations that our sales team loves.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
  },
  {
    name: 'Amanda Garcia',
    role: 'Brand Manager',
    company: 'EliteProducts',
    rating: 5,
    text: 'The feature video they created showcased our product beautifully. Production quality was movie-level. Our competitors are now trying to copy the style!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda'
  },
  {
    name: 'Daniel Park',
    role: 'Construction Manager',
    company: 'BuildRight Construction',
    rating: 5,
    text: 'Their BIM models and CAD documentation were flawless. Zero clash issues, and the permit approval process was smooth. Professional and reliable team.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel'
  },
  {
    name: 'Sophia Turner',
    role: 'Startup Founder',
    company: 'GreenTech Solutions',
    rating: 5,
    text: 'As a startup, we needed high-quality visuals on a budget. Studio Nakxal delivered beyond expectations. The promo video helped us secure our Series A funding!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'
  },
  {
    name: 'Alexander Brown',
    role: 'VP of Sales',
    company: 'IndustrialPro',
    rating: 4.5,
    text: 'The product animations transformed our sales presentations. Complex machinery is now easy to understand for clients. Sales cycle reduced from 6 months to 3.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander'
  },
  {
    name: 'Maria Rodriguez',
    role: 'Interior Designer',
    company: 'Luxe Interiors',
    rating: 5,
    text: 'Their 3D visualization services are exceptional. Clients can now walk through their future homes virtually. This has dramatically improved our client satisfaction rate.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  },
  {
    name: 'Kevin White',
    role: 'Operations Director',
    company: 'ManuTech Systems',
    rating: 5,
    text: 'The installation guide animations they created reduced our on-site training time by 70%. Clear, concise, and professionally executed. Great ROI!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin'
  },
  {
    name: 'Rachel Lee',
    role: 'Architect',
    company: 'Architectural Visions',
    rating: 5,
    text: 'Collaborating with Studio Nakxal has been amazing. Their understanding of architecture and ability to create stunning visualizations is remarkable. True professionals!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel'
  },
  {
    name: 'Thomas Mitchell',
    role: 'Product Designer',
    company: 'DesignHub',
    rating: 4.5,
    text: 'Fast turnaround, exceptional quality, and great communication throughout. The exploded view animations made our product patents much easier to understand.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas'
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">4.9</span>
            <span className="text-gray-400">/ 5.0</span>
          </div>
          <p className="text-gray-400 text-lg">
            Based on {testimonials.length} client reviews
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-shrink-0 w-[400px] p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-white/20 transition-all group"
              >
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-cyan-400/30" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(testimonial.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : i < testimonial.rating
                          ? 'fill-amber-400/50 text-amber-400/50'
                          : 'fill-none text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-300 leading-relaxed mb-6 min-h-[100px]">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full bg-white/10"
                  />
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                    <div className="text-cyan-400 text-xs">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="absolute right-0 top-0 bottom-8 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}