import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-[#111111] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              Let's Create
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Visualize
              <span className="block bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                Your Project?
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg">
              Tell us about your architectural project and let's create stunning visualizations together. We typically respond within 24 hours.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Avg. Response', value: '< 24h' },
                { label: 'Project Start', value: '1-2 weeks' },
                { label: 'Delivery', value: '2-6 weeks' },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Follow us</span>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: '#' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <social.icon className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08]">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Name</label>
                    <Input
                      placeholder="John Doe"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Company</label>
                  <Input
                    placeholder="Your company name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Project Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Promo Video',
                      'Product Feature',
                      'Assembly Animation',
                      'Installation Guide',
                      'Exploded View',
                      'Industrial Animation',
                      '3D Visualization',
                      'BIM Model',
                      'CAD Documentation',
                      'Architectural Drafting',
                      'Drawing Redrawing',
                      'Walkthrough Video',
                      'Interior Design'
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 hover:border-cyan-500/30 hover:text-white transition-all focus:bg-cyan-500/10 focus:border-cyan-500/50 focus:text-cyan-400"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Project Details</label>
                  <Textarea
                    placeholder="Tell us about your architectural project, site location, and visualization needs..."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-semibold text-lg rounded-xl group"
                >
                  Send Message
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-gray-500 text-sm">
                  By submitting, you agree to our privacy policy.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}