import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Calendar, Clock, MapPin, Plus, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const statusColors = {
  scheduled: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

export default function ProjectCalendar({ projectId, user }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    meeting_date: '',
    location: '',
  });

  const queryClient = useQueryClient();

  const { data: meetings = [] } = useQuery({
    queryKey: ['project-meetings', projectId],
    queryFn: () => base44.entities.ProjectMeeting.filter({ project_id: projectId }, 'meeting_date'),
  });

  const createMeetingMutation = useMutation({
    mutationFn: (meeting) => base44.entities.ProjectMeeting.create(meeting),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-meetings', projectId] });
      setShowForm(false);
      setFormData({ title: '', description: '', meeting_date: '', location: '' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMeetingMutation.mutate({
      ...formData,
      project_id: projectId,
      created_by: user.email,
      attendees: [user.email],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Project Calendar</h3>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-500 hover:bg-cyan-600 text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Meeting Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
            <Textarea
              placeholder="Meeting Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/5 border-white/10 text-white resize-none"
              rows={3}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="datetime-local"
                value={formData.meeting_date}
                onChange={(e) => setFormData({ ...formData, meeting_date: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                required
              />
              <Input
                placeholder="Location or Video Link"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black">
                Schedule
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

      {meetings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No meetings scheduled yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{meeting.title}</h4>
                  {meeting.description && (
                    <p className="text-gray-400 text-sm mb-3">{meeting.description}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[meeting.status]}`}>
                  {meeting.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(meeting.meeting_date).toLocaleString()}
                </div>
                {meeting.location && (
                  <div className="flex items-center gap-2">
                    {meeting.location.includes('http') ? (
                      <>
                        <Video className="w-4 h-4" />
                        <a href={meeting.location} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                          Join Meeting
                        </a>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4" />
                        {meeting.location}
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}