import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  const queryClient = useQueryClient();

  const { data: posts = [] } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }),
  });

  const post = posts.find(p => p.slug === slug || p.id === slug);

  const incrementViewsMutation = useMutation({
    mutationFn: (postId) => base44.entities.BlogPost.update(postId, { views: (post?.views || 0) + 1 }),
    onSuccess: () => queryClient.invalidateQueries(['blog-posts']),
  });

  useEffect(() => {
    if (post?.id) {
      incrementViewsMutation.mutate(post.id);
    }
  }, [post?.id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-6">Article not found</p>
          <Link to={createPageUrl('Blog')} className="text-cyan-400 hover:text-cyan-300">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back button */}
        <Link 
          to={createPageUrl('Blog')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {post.category && (
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6">
              {post.category.replace('-', ' ')}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.published_date || post.created_date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            {post.read_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time} min read
              </div>
            )}
            {post.author_name && (
              <div>By {post.author_name}</div>
            )}
          </div>

          {post.featured_image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none mb-12"
        >
          <ReactMarkdown
            components={{
              h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-white mt-12 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-white mt-8 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed mb-6" {...props} />,
              ul: ({node, ...props}) => <ul className="space-y-2 mb-6" {...props} />,
              ol: ({node, ...props}) => <ol className="space-y-2 mb-6" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
              a: ({node, ...props}) => <a className="text-cyan-400 hover:text-cyan-300 transition-colors" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-cyan-500 pl-6 py-2 my-6 text-gray-400 italic" {...props} />
              ),
              code: ({node, inline, ...props}) => 
                inline ? (
                  <code className="px-2 py-1 rounded bg-white/5 text-cyan-400 text-sm" {...props} />
                ) : (
                  <code className="block p-4 rounded-xl bg-white/5 text-gray-300 text-sm overflow-x-auto" {...props} />
                ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap py-8 border-t border-white/10">
            <Tag className="w-4 h-4 text-gray-500" />
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-400 mb-6">
            Let's discuss how we can bring your vision to life with stunning animations and visualizations.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all"
          >
            Get in Touch
          </a>
        </motion.div>
      </article>
    </div>
  );
}