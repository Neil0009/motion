import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Building2, Layers, FileText, Sparkles, CheckCircle, Eye, ArrowRight, Play, Box, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectModal from '@/components/home/ProjectModal';

const subServices = [
  {
    icon: Building2,
    title: '3D Visualization',
    description: 'Photorealistic renders and immersive visualizations showcasing architectural designs with stunning detail.',
    features: ['Photorealistic quality', 'Interior/Exterior', 'Multiple viewpoints'],
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: Layers,
    title: 'Revit BIM Models',
    description: 'Comprehensive Building Information Modeling with accurate data, clash detection, and full coordination.',
    features: ['LOD 300-500', 'Clash detection', 'MEP coordination'],
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: FileText,
    title: 'CAD Documentation',
    description: 'Code-compliant construction documents and permit-ready drawings meeting all regulatory requirements.',
    features: ['Code compliant', 'Permit ready', 'As-built drawings'],
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    icon: Box,
    title: 'Walkthrough Videos',
    description: 'Cinematic architectural animations guiding viewers through spaces with realistic lighting and materials.',
    features: ['Cinematic quality', 'Day/night cycles', 'Camera paths'],
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Ruler,
    title: 'Architectural Drafting',
    description: 'Precise technical drawings and construction documentation for seamless project execution.',
    features: ['Technical accuracy', 'Detail drawings', 'Construction sets'],
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const benefits = [
  'Win more clients with stunning presentations',
  'Reduce design revisions with clear visualizations',
  'Accelerate approval processes with regulatory bodies',
  'Improve construction coordination and reduce errors',
  'Enhance marketing materials for real estate',
  'Make informed design decisions earlier',
];

export default function ArchitecturalService() {
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['architectural-projects'],
    queryFn: async () => {
      const allProjects = await base44.entities.Project.list('-created_date');
      return allProjects.filter(p => 
        ['architectural-viz', 'bim-model', 'cad-documentation'].includes(p.service_type)
      );
    },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-semibold">Architectural Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Visualize Architecture
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                Before It's Built
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              From concept to construction, we deliver photorealistic visualizations, comprehensive BIM models, 
              and code-compliant documentation that bring architectural visions to reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black font-semibold text-lg rounded-full">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/5 text-white rounded-full">
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Architectural Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive visualization and documentation solutions for architects and developers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Architectural Visualization?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Bridge the gap between concept and reality with powerful visual communication tools.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-500/20 to-rose-500/20 border border-white/10 flex items-center justify-center">
                <Building2 className="w-24 h-24 text-white/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Architectural Projects
            </h2>
            <p className="text-gray-400 text-lg">
              Explore our portfolio of stunning architectural visualizations
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-white/5 rounded-2xl mb-4" />
                  <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-500">Featured projects coming soon</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 6).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-emerald-500/10 to-rose-500/10">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-16 h-16 text-white/20" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium">View Case Study</span>
                      </div>
                    </div>

                    {project.service_type && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
                        {project.service_type.replace(/-/g, ' ')}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {project.description || 'View full case study for details'}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Visualize Your Design?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Let's transform your architectural vision into stunning reality with our expert visualization services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="h-14 px-10 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-black font-semibold text-lg rounded-full">
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="h-14 px-10 border-white/20 hover:bg-white/5 text-white rounded-full">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}