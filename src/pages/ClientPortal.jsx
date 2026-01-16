import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { FolderOpen, Clock, CheckCircle2, AlertCircle, ArrowRight, Plus } from 'lucide-react';

const statusColors = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'in-progress': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  review: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
  revision: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'on-hold': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        base44.auth.redirectToLogin(window.location.href);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['client-projects', user?.email],
    queryFn: () => base44.entities.ClientProject.filter({ client_email: user.email }, '-created_date'),
    enabled: !!user,
  });

  if (loading || projectsLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, {user?.full_name || 'Client'}
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your projects, review files, and track progress all in one place.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'cyan' },
            { label: 'In Progress', value: projects.filter(p => p.status === 'in-progress').length, icon: Clock, color: 'violet' },
            { label: 'Completed', value: projects.filter(p => p.status === 'completed').length, icon: CheckCircle2, color: 'emerald' },
            { label: 'Need Review', value: projects.filter(p => p.status === 'review').length, icon: AlertCircle, color: 'amber' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <stat.icon className={`w-8 h-8 text-${stat.color}-400 mb-3`} />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Your Projects</h2>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-6">Your projects will appear here once they're created.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link to={`${createPageUrl('ProjectPortal')}?id=${project.id}`}>
                    <div className="group h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500">
                      {/* Thumbnail */}
                      {project.thumbnail && (
                        <div className="aspect-video rounded-xl overflow-hidden mb-4">
                          <img 
                            src={project.thumbnail} 
                            alt={project.project_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {project.project_name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                          {project.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {project.progress_percentage || 0}% Complete
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${project.progress_percentage || 0}%` }}
                        />
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-cyan-400 text-sm font-medium group/link">
                        <span className="group-hover/link:mr-2 transition-all">View Details</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}