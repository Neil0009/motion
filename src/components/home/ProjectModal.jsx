import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Award, Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Hero image/video */}
          <div className="relative h-[400px] bg-gradient-to-br from-cyan-500/10 to-violet-500/10">
            {project.video_url ? (
              <div className="w-full h-full flex items-center justify-center">
                <iframe
                  src={project.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play className="w-20 h-20 text-white/20" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {project.service_type && (
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
                    {project.service_type.replace(/-/g, ' ').toUpperCase()}
                  </span>
                )}
                {project.category && (
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold border border-violet-500/30">
                    {project.category.toUpperCase()}
                  </span>
                )}
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {project.title}
              </h2>

              <div className="flex flex-wrap items-center gap-6 text-gray-400">
                {project.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{project.year}</span>
                  </div>
                )}
                {project.area && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{project.area}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {project.description && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
              </div>
            )}

            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {project.challenge && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <h3 className="text-lg font-bold text-white mb-3">Challenge</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <h3 className="text-lg font-bold text-white mb-3">Solution</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            )}

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Gallery</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      className="w-full h-64 object-cover rounded-2xl border border-white/10"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.client_testimonial && (
              <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 border border-white/10">
                <p className="text-gray-300 text-lg italic mb-6">
                  "{project.client_testimonial}"
                </p>
                <div className="flex items-center gap-4">
                  {project.client_avatar && (
                    <img
                      src={project.client_avatar}
                      alt={project.client_name}
                      className="w-12 h-12 rounded-full border-2 border-cyan-500/30"
                    />
                  )}
                  <div>
                    <div className="text-white font-semibold">{project.client_name}</div>
                    <div className="text-gray-500 text-sm">{project.client_role}</div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <Button
                onClick={onClose}
                className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-semibold rounded-xl"
              >
                Start Similar Project
              </Button>
              {project.video_url && (
                <Button
                  variant="outline"
                  className="h-12 border-white/20 hover:bg-white/5 text-white rounded-xl"
                  onClick={() => window.open(project.video_url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}