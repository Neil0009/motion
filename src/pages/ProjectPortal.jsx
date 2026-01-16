import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, FileText, MessageSquare, CheckCircle, Receipt, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProjectOverview from '@/components/portal/ProjectOverview';
import ProjectFiles from '@/components/portal/ProjectFiles';
import ProjectMessages from '@/components/portal/ProjectMessages';
import ProjectMilestones from '@/components/portal/ProjectMilestones';
import ProjectInvoices from '@/components/portal/ProjectInvoices';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'milestones', label: 'Milestones', icon: CheckCircle },
  { id: 'files', label: 'Files', icon: Upload },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'invoices', label: 'Invoices', icon: Receipt },
];

export default function ProjectPortal() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        base44.auth.redirectToLogin(window.location.href);
      }
    };
    fetchUser();
  }, []);

  const { data: project, isLoading } = useQuery({
    queryKey: ['client-project', projectId],
    queryFn: async () => {
      const projects = await base44.entities.ClientProject.list();
      return projects.find(p => p.id === projectId);
    },
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project not found</h2>
          <Link to={createPageUrl('ClientPortal')} className="text-cyan-400 hover:text-cyan-300">
            Back to Portal
          </Link>
        </div>
      </div>
    );
  }

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
            to={createPageUrl('ClientPortal')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portal
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.project_name}
          </h1>
          <p className="text-gray-400 text-lg">
            {project.description}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 border-b border-white/10"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white/[0.05] text-white border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <ProjectOverview project={project} />}
          {activeTab === 'milestones' && <ProjectMilestones projectId={project.id} user={user} />}
          {activeTab === 'files' && <ProjectFiles projectId={project.id} user={user} />}
          {activeTab === 'messages' && <ProjectMessages projectId={project.id} user={user} />}
          {activeTab === 'invoices' && <ProjectInvoices projectId={project.id} />}
        </motion.div>
      </div>
    </div>
  );
}