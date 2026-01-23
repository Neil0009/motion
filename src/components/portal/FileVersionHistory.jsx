import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { 
  History, 
  Download, 
  Eye, 
  RotateCcw, 
  GitBranch, 
  Calendar, 
  User,
  Clock,
  Check,
  FileText,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FileVersionHistory({ file, allFiles, onPreview, onClose }) {
  const [selectedVersions, setSelectedVersions] = useState([]);
  const queryClient = useQueryClient();

  // Get all versions of this file
  const versions = allFiles.filter(f => 
    (f.id === file.id || 
     f.parent_file_id === file.id || 
     (file.parent_file_id && (f.id === file.parent_file_id || f.parent_file_id === file.parent_file_id)))
  ).sort((a, b) => (b.version || 1) - (a.version || 1));

  const revertMutation = useMutation({
    mutationFn: async ({ versionId }) => {
      const versionToRevert = versions.find(v => v.id === versionId);
      
      // Mark all versions as not latest
      await Promise.all(
        versions.map(v => 
          base44.entities.ProjectFile.update(v.id, { is_latest: false })
        )
      );

      // Create new version based on old one
      const newVersion = {
        ...versionToRevert,
        id: undefined,
        version: (versions[0].version || 1) + 1,
        is_latest: true,
        parent_file_id: versionToRevert.parent_file_id || versionToRevert.id,
        uploaded_by: versionToRevert.uploaded_by,
        description: `Reverted to version ${versionToRevert.version}`,
      };

      return await base44.entities.ProjectFile.create(newVersion);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['project-files']);
    },
  });

  const handleRevert = (versionId) => {
    if (confirm('Are you sure you want to revert to this version? This will create a new version based on the selected one.')) {
      revertMutation.mutate({ versionId });
    }
  };

  const toggleVersionSelect = (versionId) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      }
      if (prev.length >= 2) {
        return [prev[1], versionId];
      }
      return [...prev, versionId];
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getVersionDiff = (v1, v2) => {
    if (!v1 || !v2) return null;
    const sizeDiff = (v2.file_size || 0) - (v1.file_size || 0);
    const timeDiff = new Date(v2.created_date) - new Date(v1.created_date);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return { sizeDiff, daysDiff };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">Version History</h2>
              </div>
              <p className="text-gray-400 text-sm mt-1">{file.file_name}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{versions.length}</div>
              <div className="text-xs text-gray-500">Versions</div>
            </div>
          </div>

          {selectedVersions.length === 2 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-violet-500/10 border border-violet-500/30"
            >
              <GitBranch className="w-5 h-5 text-violet-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-violet-400">
                  Comparing versions {versions.find(v => v.id === selectedVersions[0])?.version} and {versions.find(v => v.id === selectedVersions[1])?.version}
                </p>
              </div>
              <button
                onClick={() => setSelectedVersions([])}
                className="text-sm text-gray-400 hover:text-white"
              >
                Clear
              </button>
            </motion.div>
          )}
        </div>

        {/* Version Timeline */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {versions.map((version, index) => {
              const isLatest = version.is_latest;
              const isSelected = selectedVersions.includes(version.id);
              const previousVersion = versions[index + 1];
              const diff = previousVersion ? getVersionDiff(previousVersion, version) : null;

              return (
                <motion.div
                  key={version.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {index < versions.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/30 to-transparent" />
                  )}

                  <div
                    className={`p-6 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-violet-500/10 border-violet-500/50'
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Version indicator */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isLatest 
                          ? 'bg-emerald-500/20 border-emerald-500' 
                          : 'bg-violet-500/10 border-violet-500/30'
                      }`}>
                        {isLatest ? (
                          <Check className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <span className="text-sm font-bold text-violet-400">{version.version}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Version header */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-white">
                                Version {version.version || 1}
                              </h3>
                              {isLatest && (
                                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                  Current
                                </span>
                              )}
                            </div>
                            {version.description && (
                              <p className="text-sm text-gray-400">{version.description}</p>
                            )}
                          </div>
                        </div>

                        {/* Version metadata */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-400">{formatFileSize(version.file_size)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              {new Date(version.created_date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              {new Date(version.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              {version.uploaded_by?.split('@')[0] || 'Unknown'}
                            </span>
                          </div>
                        </div>

                        {/* Diff info */}
                        {diff && (
                          <div className="flex items-center gap-4 mb-4 text-xs">
                            {diff.sizeDiff !== 0 && (
                              <span className={`flex items-center gap-1 ${
                                diff.sizeDiff > 0 ? 'text-emerald-400' : 'text-amber-400'
                              }`}>
                                <AlertCircle className="w-3 h-3" />
                                {diff.sizeDiff > 0 ? '+' : ''}{formatFileSize(Math.abs(diff.sizeDiff))}
                              </span>
                            )}
                            {diff.daysDiff > 0 && (
                              <span className="text-gray-500">
                                {diff.daysDiff} {diff.daysDiff === 1 ? 'day' : 'days'} after previous
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleVersionSelect(version.id)}
                            className={`gap-2 ${
                              isSelected ? 'bg-violet-500/20 border-violet-500/50' : ''
                            }`}
                          >
                            <GitBranch className="w-4 h-4" />
                            {isSelected ? 'Selected' : 'Compare'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onPreview(version)}
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </Button>
                          <a
                            href={version.file_url}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                          {!isLatest && (
                            <Button
                              size="sm"
                              onClick={() => handleRevert(version.id)}
                              disabled={revertMutation.isPending}
                              className="gap-2 bg-violet-500 hover:bg-violet-600"
                            >
                              <RotateCcw className="w-4 h-4" />
                              Revert
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}