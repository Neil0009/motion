import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categoryColors = {
  residential: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  commercial: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  interior: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
  urban: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`${createPageUrl('ProjectDetail')}?id=${project.id}`}>
        <div className="group relative h-full rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={project.thumbnail || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            
            {/* Category badge */}
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full border text-xs font-medium ${categoryColors[project.category]}`}>
              {project.category?.charAt(0).toUpperCase() + project.category?.slice(1)}
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-xs font-bold">
                Featured
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {project.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-500">
              {project.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{project.year}</span>
                </div>
              )}
            </div>

            {/* Services tags */}
            {project.services && project.services.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.services.slice(0, 3).map((service, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs border border-white/10"
                  >
                    {service}
                  </span>
                ))}
                {project.services.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{project.services.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-cyan-400 font-medium text-sm group/link">
              <span className="group-hover/link:mr-2 transition-all">View Project</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
            </div>
          </div>

          {/* Corner glow */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}