import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, MapPin, Calendar, Ruler, ChevronLeft, ChevronRight, Play, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Model3DViewer from '@/components/portfolio/Model3DViewer';

export default function ProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const projects = await base44.entities.Project.list();
      return projects.find(p => p.id === projectId);
    },
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project not found</h2>
          <Link to={createPageUrl('Portfolio')} className="text-cyan-400 hover:text-cyan-300">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const images = project.images || [project.thumbnail];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to={createPageUrl('Portfolio')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl">
                {project.description}
              </p>
            </div>
            
            {project.featured && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-bold whitespace-nowrap">
                Featured Project
              </div>
            )}
          </div>

          {/* Project meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.location && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <MapPin className="w-5 h-5 text-cyan-400 mb-2" />
                <div className="text-sm text-gray-500">Location</div>
                <div className="text-white font-semibold">{project.location}</div>
              </div>
            )}
            {project.year && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <Calendar className="w-5 h-5 text-cyan-400 mb-2" />
                <div className="text-sm text-gray-500">Year</div>
                <div className="text-white font-semibold">{project.year}</div>
              </div>
            )}
            {project.area && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <Ruler className="w-5 h-5 text-cyan-400 mb-2" />
                <div className="text-sm text-gray-500">Area</div>
                <div className="text-white font-semibold">{project.area}</div>
              </div>
            )}
            {project.category && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-5 h-5 rounded bg-cyan-500/20 mb-2" />
                <div className="text-sm text-gray-500">Category</div>
                <div className="text-white font-semibold capitalize">{project.category}</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.06] group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt={`${project.title} - Image ${activeImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white text-sm">
                {activeImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Video play button */}
            {project.video_url && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center transition-all hover:scale-110"
              >
                <Play className="w-8 h-8 text-black ml-1" />
              </button>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    index === activeImageIndex
                      ? 'border-cyan-500 scale-105'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {project.challenge && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                    <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Our Solution</h2>
                    <p className="text-gray-400 leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 3D Model Viewer */}
            {project.model_url && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">3D Model Preview</h2>
                <Model3DViewer modelUrl={project.model_url} />
              </motion.div>
            )}

            {/* Client Testimonial */}
            {project.client_testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/20"
              >
                <Quote className="w-12 h-12 text-cyan-500/20 mb-4" />
                <blockquote className="text-lg text-gray-300 leading-relaxed mb-6">
                  "{project.client_testimonial}"
                </blockquote>
                <div className="flex items-center gap-4">
                  {project.client_avatar && (
                    <img
                      src={project.client_avatar}
                      alt={project.client_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="text-white font-semibold">{project.client_name}</div>
                    <div className="text-sm text-gray-500">{project.client_role}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services provided */}
            {project.services && project.services.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <h3 className="text-lg font-bold text-white mb-4">Services Provided</h3>
                <ul className="space-y-3">
                  {project.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08]"
            >
              <h3 className="text-lg font-bold text-white mb-4">Interested in Similar Work?</h3>
              <p className="text-gray-400 text-sm mb-6">
                Get in touch to discuss your project and see how we can help bring your vision to life.
              </p>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all">
                Start a Project
              </button>
            </motion.div>

            {/* Share project */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <h3 className="text-lg font-bold text-white mb-4">Share Project</h3>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all text-sm">
                  Copy Link
                </button>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideoModal && project.video_url && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideoModal(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              >
                <iframe
                  src={project.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}