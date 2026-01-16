import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function FileComments({ file, user }) {
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ['file-comments', file.id],
    queryFn: () => base44.entities.FileComment.filter({ file_id: file.id }, '-created_date'),
  });

  const addCommentMutation = useMutation({
    mutationFn: (comment) => base44.entities.FileComment.create(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file-comments', file.id] });
      setNewComment('');
    },
  });

  const resolveCommentMutation = useMutation({
    mutationFn: (commentId) => base44.entities.FileComment.update(commentId, { status: 'resolved' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file-comments', file.id] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addCommentMutation.mutate({
      file_id: file.id,
      project_id: file.project_id,
      user_email: user.email,
      user_name: user.full_name,
      comment: newComment,
      is_admin: user.role === 'admin',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-cyan-400" />
        <h4 className="text-lg font-semibold text-white">
          Comments ({comments.length})
        </h4>
      </div>

      {/* Comments list */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${
              comment.status === 'resolved' 
                ? 'bg-white/[0.01] border border-white/[0.04]' 
                : 'bg-white/[0.03] border border-white/[0.08]'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className={`font-semibold ${comment.is_admin ? 'text-cyan-400' : 'text-white'}`}>
                  {comment.user_name}
                  {comment.is_admin && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
                      Studio
                    </span>
                  )}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {new Date(comment.created_date).toLocaleString()}
                </span>
              </div>
              {comment.status === 'open' && user.role === 'admin' && (
                <button
                  onClick={() => resolveCommentMutation.mutate(comment.id)}
                  className="p-1 hover:bg-emerald-500/20 rounded transition-colors"
                  title="Mark as resolved"
                >
                  <CheckCircle2 className="w-4 h-4 text-gray-500 hover:text-emerald-400" />
                </button>
              )}
            </div>
            <p className="text-gray-300 text-sm">{comment.comment}</p>
            {comment.status === 'resolved' && (
              <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Resolved
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment or feedback..."
          className="bg-white/5 border-white/10 text-white mb-3 resize-none"
          rows={3}
        />
        <Button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-cyan-500 hover:bg-cyan-600 text-black"
        >
          <Send className="w-4 h-4 mr-2" />
          Post Comment
        </Button>
      </form>
    </div>
  );
}