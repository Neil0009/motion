import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { FileText, Download, Image, Video, File, Calendar, User } from 'lucide-react';

const fileIcons = {
  'image/': Image,
  'video/': Video,
  'application/pdf': FileText,
};

const categoryColors = {
  reference: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  deliverable: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  review: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
  final: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  other: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

export default function ProjectFiles({ projectId, user }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: files = [], isLoading } = useQuery({
    queryKey: ['project-files', projectId],
    queryFn: () => base44.entities.ProjectFile.filter({ project_id: projectId }, '-created_date'),
  });

  const filteredFiles = selectedCategory === 'all'
    ? files
    : files.filter(f => f.category === selectedCategory);

  const getFileIcon = (fileType) => {
    for (const [key, Icon] of Object.entries(fileIcons)) {
      if (fileType?.startsWith(key)) return Icon;
    }
    return File;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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
      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'reference', 'deliverable', 'review', 'final', 'other'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filteredFiles.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No files yet</h3>
          <p className="text-gray-500">Files will appear here as they're uploaded.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFiles.map((file, index) => {
            const FileIcon = getFileIcon(file.file_type);
            
            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10">
                    <FileIcon className="w-8 h-8 text-cyan-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="text-lg font-semibold text-white truncate">
                        {file.file_name}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${categoryColors[file.category]}`}>
                        {file.category}
                      </span>
                    </div>

                    {file.description && (
                      <p className="text-gray-400 text-sm mb-3">{file.description}</p>
                    )}

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>{formatFileSize(file.file_size)}</span>
                      {file.created_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(file.created_date).toLocaleDateString()}
                        </div>
                      )}
                      {file.uploaded_by && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {file.uploaded_by.split('@')[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  <a
                    href={file.file_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 transition-all"
                  >
                    <Download className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}