import React from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckCircle2, Clock, Circle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statusIcons = {
  pending: Circle,
  'in-progress': Clock,
  'awaiting-approval': CheckCircle2,
  approved: CheckCircle2,
  completed: CheckCircle2,
};

const statusColors = {
  pending: 'text-gray-400',
  'in-progress': 'text-cyan-400',
  'awaiting-approval': 'text-amber-400',
  approved: 'text-emerald-400',
  completed: 'text-emerald-400',
};

export default function ProjectMilestones({ projectId, user }) {
  const queryClient = useQueryClient();

  const { data: milestones = [], isLoading } = useQuery({
    queryKey: ['milestones', projectId],
    queryFn: () => base44.entities.ProjectMilestone.filter({ project_id: projectId }, 'order'),
  });

  const approveMutation = useMutation({
    mutationFn: (milestoneId) =>
      base44.entities.ProjectMilestone.update(milestoneId, {
        status: 'approved',
        approved_by: user?.email,
        approved_date: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones', projectId] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {milestones.length === 0 ? (
        <div className="text-center py-20">
          <CheckCircle2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No milestones yet</h3>
          <p className="text-gray-500">Milestones will be added as your project progresses.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const StatusIcon = statusIcons[milestone.status] || Circle;
            
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${statusColors[milestone.status]}`}>
                    <StatusIcon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xl font-bold text-white">{milestone.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        milestone.status === 'completed' || milestone.status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : milestone.status === 'awaiting-approval'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                      }`}>
                        {milestone.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-4">{milestone.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      {milestone.due_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Due: {new Date(milestone.due_date).toLocaleDateString()}
                        </div>
                      )}
                      {milestone.approved_date && (
                        <div className="text-emerald-400">
                          Approved on {new Date(milestone.approved_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {milestone.status === 'awaiting-approval' && (
                      <div className="mt-4">
                        <Button
                          onClick={() => approveMutation.mutate(milestone.id)}
                          disabled={approveMutation.isPending}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          {approveMutation.isPending ? 'Approving...' : 'Approve Milestone'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}