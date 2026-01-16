import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Wand2, Tag as TagIcon, Save, Eye, Trash2, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function BlogEditor() {
  const [user, setUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: '',
    tags: [],
    status: 'draft'
  });
  const [tagInput, setTagInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: posts = [] } = useQuery({
    queryKey: ['blog-posts-all'],
    queryFn: () => base44.entities.BlogPost.list('-created_date'),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        if (currentUser.role !== 'admin') {
          window.location.href = createPageUrl('Home');
        }
        setUser(currentUser);
      } catch (error) {
        window.location.href = createPageUrl('Home');
      }
    };
    checkAuth();
  }, []);

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.BlogPost.create({
      ...data,
      author_name: user?.full_name,
      author_email: user?.email,
      published_date: data.status === 'published' ? new Date().toISOString() : null,
      read_time: Math.ceil(data.content.split(' ').length / 200)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog-posts-all']);
      toast({ title: 'Post created successfully!' });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.BlogPost.update(id, {
      ...data,
      read_time: Math.ceil(data.content.split(' ').length / 200)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog-posts-all']);
      toast({ title: 'Post updated successfully!' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.BlogPost.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog-posts-all']);
      toast({ title: 'Post deleted' });
      resetForm();
    },
  });

  const generateIdeas = async () => {
    setAiLoading(true);
    try {
      const { data } = await base44.functions.invoke('blogAI', {
        action: 'generate_ideas',
        data: { count: 5 }
      });
      
      if (data.success && data.ideas?.length > 0) {
        const idea = data.ideas[0];
        setFormData(prev => ({
          ...prev,
          title: idea.title,
          excerpt: idea.description,
          category: idea.category,
          tags: idea.tags
        }));
        toast({ title: 'AI generated blog idea!' });
      }
    } catch (error) {
      toast({ title: 'Error generating ideas', variant: 'destructive' });
    }
    setAiLoading(false);
  };

  const writeDraft = async () => {
    if (!formData.title) {
      toast({ title: 'Please enter a title first', variant: 'destructive' });
      return;
    }
    
    setAiLoading(true);
    try {
      const { data } = await base44.functions.invoke('blogAI', {
        action: 'write_draft',
        data: {
          title: formData.title,
          category: formData.category,
          keywords: formData.tags.join(', ')
        }
      });
      
      if (data.success && data.draft) {
        setFormData(prev => ({
          ...prev,
          content: data.draft.content,
          excerpt: data.draft.excerpt || prev.excerpt,
          tags: data.draft.suggested_tags || prev.tags
        }));
        toast({ title: 'AI generated draft content!' });
      }
    } catch (error) {
      toast({ title: 'Error generating draft', variant: 'destructive' });
    }
    setAiLoading(false);
  };

  const suggestTags = async () => {
    if (!formData.title || !formData.content) {
      toast({ title: 'Please add title and content first', variant: 'destructive' });
      return;
    }
    
    setAiLoading(true);
    try {
      const { data } = await base44.functions.invoke('blogAI', {
        action: 'suggest_tags',
        data: {
          title: formData.title,
          content: formData.content
        }
      });
      
      if (data.success && data.suggestions) {
        setFormData(prev => ({
          ...prev,
          tags: data.suggestions.tags,
          category: data.suggestions.category || prev.category
        }));
        toast({ title: 'AI suggested tags!' });
      }
    } catch (error) {
      toast({ title: 'Error suggesting tags', variant: 'destructive' });
    }
    setAiLoading(false);
  };

  const handleSubmit = (status) => {
    const data = {
      ...formData,
      status,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      category: '',
      tags: [],
      status: 'draft'
    });
    setEditingPost(null);
  };

  const editPost = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featured_image: post.featured_image || '',
      category: post.category,
      tags: post.tags || [],
      status: post.status
    });
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Editor</h1>
          <Link to={createPageUrl('Blog')}>
            <Button variant="outline">View Blog</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex gap-3 mb-6">
                <Button onClick={generateIdeas} disabled={aiLoading} variant="outline" size="sm">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate Idea
                </Button>
                <Button onClick={writeDraft} disabled={aiLoading} variant="outline" size="sm">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Write Draft
                </Button>
                <Button onClick={suggestTags} disabled={aiLoading} variant="outline" size="sm">
                  <TagIcon className="w-4 h-4 mr-2" />
                  Suggest Tags
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Post Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white text-xl h-14"
                />

                <Input
                  placeholder="URL Slug (optional)"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white text-sm"
                />

                <Textarea
                  placeholder="Excerpt (short description)"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white min-h-[80px]"
                />

                <Input
                  placeholder="Featured Image URL"
                  value={formData.featured_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Select value={formData.category} onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product-animation">Product Animation</SelectItem>
                    <SelectItem value="architecture">Architecture</SelectItem>
                    <SelectItem value="industry-insights">Industry Insights</SelectItem>
                    <SelectItem value="case-studies">Case Studies</SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                    <SelectItem value="tips-tricks">Tips & Tricks</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button onClick={addTag} size="sm">Add</Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {formData.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm flex items-center gap-2">
                        #{tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-white">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <Textarea
                  placeholder="Content (Markdown supported)"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white min-h-[400px] font-mono text-sm"
                />

                <div className="flex gap-3">
                  <Button onClick={() => handleSubmit('draft')} variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={() => handleSubmit('published')} className="bg-cyan-500 hover:bg-cyan-600">
                    <Eye className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                  {editingPost && (
                    <>
                      <Button onClick={resetForm} variant="outline">Cancel</Button>
                      <Button onClick={() => deleteMutation.mutate(editingPost.id)} variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Posts list */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">All Posts</h2>
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => editPost(post)}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all"
                >
                  <h3 className="text-white font-semibold mb-1">{post.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className={post.status === 'published' ? 'text-green-400' : 'text-yellow-400'}>
                      {post.status}
                    </span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}