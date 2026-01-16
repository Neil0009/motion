import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProjectCard from '@/components/portfolio/ProjectCard';

export default function ServiceProjects({ projects, serviceName }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              Our Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Projects Using This Service
            </h2>
            <p className="text-gray-400 text-lg">
              See how we've delivered exceptional results for our clients.
            </p>
          </div>

          <Link
            to={createPageUrl('Portfolio')}
            className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center md:hidden"
        >
          <Link
            to={createPageUrl('Portfolio')}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}