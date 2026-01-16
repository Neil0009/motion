import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, TrendingUp, Package } from 'lucide-react';

const statusColors = {
  pending: 'from-amber-500 to-amber-400',
  'in-progress': 'from-cyan-500 to-cyan-400',
  review: 'from-violet-500 to-violet-400',
  revision: 'from-orange-500 to-orange-400',
  completed: 'from-emerald-500 to-emerald-400',
  'on-hold': 'from-gray-500 to-gray-400',
};

export default function ProjectOverview({ project }) {
  return (
    <div className="space-y-8">
      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08]"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Project Progress</h3>
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${statusColors[project.status]} text-white text-sm font-medium`}>
            {project.status.replace('-', ' ').toUpperCase()}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Overall Completion</span>
            <span className="text-2xl font-bold text-white">{project.progress_percentage || 0}%</span>
          </div>
          <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress_percentage || 0}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Project Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <Calendar className="w-8 h-8 text-cyan-400 mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">Start Date</h4>
          <p className="text-gray-400">
            {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not set'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <Clock className="w-8 h-8 text-violet-400 mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">Estimated Completion</h4>
          <p className="text-gray-400">
            {project.estimated_completion ? new Date(project.estimated_completion).toLocaleDateString() : 'TBD'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <Package className="w-8 h-8 text-amber-400 mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">Project Type</h4>
          <p className="text-gray-400 capitalize">
            {project.project_type?.replace('-', ' ')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <TrendingUp className="w-8 h-8 text-emerald-400 mb-4" />
          <h4 className="text-lg font-semibold text-white mb-2">Current Phase</h4>
          <p className="text-gray-400 capitalize">
            {project.status.replace('-', ' ')}
          </p>
        </motion.div>
      </div>

      {/* Description */}
      {project.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]"
        >
          <h3 className="text-xl font-bold text-white mb-4">Project Description</h3>
          <p className="text-gray-400 leading-relaxed">{project.description}</p>
        </motion.div>
      )}
    </div>
  );
}