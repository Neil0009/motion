import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckSquare, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const priorityColors = {
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  high: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const statusColors = {
  pending: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  'in-progress': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

export default function ProjectTasks({ projectId, user }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium',
  });

  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ['project-tasks', projectId],
    queryFn: () => base44.entities.ProjectTask.filter({ project_id: projectId }, '-created_date'),
  });

  const createTaskMutation = useMutation({
    mutationFn: (task) => base44.entities.ProjectTask.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks', projectId] });
      setShowForm(false);
      setFormData({ title: '', description: '', due_date: '', priority: 'medium' });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ProjectTask.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks', projectId] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTaskMutation.mutate({
      ...formData,
      project_id: projectId,
      assigned_to: user.email,
      assigned_by: user.email,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Tasks</h3>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-500 hover:bg-cyan-600 text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Task Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
            <Textarea
              placeholder="Task Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/5 border-white/10 text-white resize-none"
              rows={3}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black">
                Create Task
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="border-white/10 text-gray-400"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No tasks yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{task.title}</h4>
                  {task.description && (
                    <p className="text-gray-400 text-sm">{task.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  <Select
                    value={task.status}
                    onValueChange={(status) => updateTaskMutation.mutate({ id: task.id, data: { status } })}
                  >
                    <SelectTrigger className={`w-32 h-8 text-xs border ${statusColors[task.status]}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {task.due_date && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4" />
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}