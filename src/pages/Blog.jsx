import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Calendar, Clock, Tag, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'product-animation', label: 'Product Animation' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'industry-insights', label: 'Industry Insights' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'tips-tricks', label: 'Tips & Tricks' }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-published_date'),
  });

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Insights & Knowledge
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert insights on product animation, architectural visualization, and industry trends.
          </p>
        </motion.div>

        {/* Search and filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-cyan-500/50 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No articles found</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featuredPost && (
              <Link to={createPageUrl(`BlogPost?slug=${featuredPost.slug || featuredPost.id}`)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16 group cursor-pointer"
                >
                  <div className="grid lg:grid-cols-2 gap-8 p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-white/20 transition-all">
                    {featuredPost.featured_image && (
                      <div className="aspect-video rounded-2xl overflow-hidden">
                        <img
                          src={featuredPost.featured_image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4">
                        Featured Post
                      </span>
                      <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.published_date || featuredPost.created_date).toLocaleDateString()}
                        </div>
                        {featuredPost.read_time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredPost.read_time} min read
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Posts grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <Link key={post.id} to={createPageUrl(`BlogPost?slug=${post.slug || post.id}`)}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer h-full"
                  >
                    <div className="h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all">
                      {post.featured_image && (
                        <div className="aspect-video rounded-xl overflow-hidden mb-4">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      
                      {post.category && (
                        <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-3">
                          {post.category.replace('-', ' ')}
                        </span>
                      )}
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.published_date || post.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        {post.read_time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {post.read_time} min
                          </div>
                        )}
                      </div>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-4">
                          <Tag className="w-3 h-3 text-gray-600" />
                          <div className="flex gap-2">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs text-gray-600">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}