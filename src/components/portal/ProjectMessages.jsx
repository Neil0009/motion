import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Send, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ProjectMessages({ projectId, user }) {
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['project-messages', projectId],
    queryFn: () => base44.entities.ProjectMessage.filter({ project_id: projectId }, 'created_date'),
  });

  const sendMutation = useMutation({
    mutationFn: (messageData) => base44.entities.ProjectMessage.create(messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-messages', projectId] });
      setNewMessage('');
    },
  });

  const handleSend = () => {
    if (!newMessage.trim()) return;

    sendMutation.mutate({
      project_id: projectId,
      sender_email: user?.email,
      sender_name: user?.full_name || user?.email,
      message: newMessage,
      is_admin: user?.role === 'admin',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Messages list */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
            <p className="text-gray-500">Start a conversation with the studio team.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${msg.sender_email === user?.email ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  msg.sender_email === user?.email
                    ? 'bg-cyan-500/20 border border-cyan-500/30'
                    : msg.is_admin
                    ? 'bg-violet-500/20 border border-violet-500/30'
                    : 'bg-white/[0.05] border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-white">
                    {msg.sender_name || msg.sender_email.split('@')[0]}
                  </span>
                  {msg.is_admin && (
                    <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs">
                      Studio
                    </span>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
                <span className="text-xs text-gray-500 mt-2 block">
                  {new Date(msg.created_date).toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Message input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
      >
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          rows={4}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 rounded-xl resize-none mb-4"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sendMutation.isPending}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
          >
            <Send className="w-4 h-4 mr-2" />
            {sendMutation.isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}