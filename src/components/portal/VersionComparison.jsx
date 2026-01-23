import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  GitCompare, 
  Calendar, 
  User, 
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VersionComparison({ version1, version2, onClose }) {
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const isImage1 = version1.file_type?.startsWith('image/');
  const isImage2 = version2.file_type?.startsWith('image/');

  const sizeDiff = (version2.file_size || 0) - (version1.file_size || 0);
  const timeDiff = new Date(version2.created_date) - new Date(version1.created_date);
  const daysDiff = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));

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
        className="relative max-w-7xl w-full bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
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
                <GitCompare className="w-6 h-6 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">Version Comparison</h2>
              </div>
              <p className="text-gray-400 text-sm mt-1">{version1.file_name}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs text-gray-500 mb-1">Time Difference</div>
              <div className="text-lg font-semibold text-white">
                {daysDiff} {daysDiff === 1 ? 'day' : 'days'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs text-gray-500 mb-1">Size Difference</div>
              <div className={`text-lg font-semibold ${
                sizeDiff > 0 ? 'text-emerald-400' : sizeDiff < 0 ? 'text-amber-400' : 'text-white'
              }`}>
                {sizeDiff > 0 ? '+' : ''}{formatFileSize(Math.abs(sizeDiff))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs text-gray-500 mb-1">Version Jump</div>
              <div className="text-lg font-semibold text-white">
                v{version1.version} → v{version2.version}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Version 1 */}
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Version {version1.version}
                    {timeDiff < 0 && (
                      <span className="ml-2 text-xs text-gray-500">(Newer)</span>
                    )}
                  </h3>
                  <a
                    href={version1.file_url}
                    download
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
                
                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">{formatFileSize(version1.file_size)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">
                      {new Date(version1.created_date).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">
                      {version1.uploaded_by?.split('@')[0] || 'Unknown'}
                    </span>
                  </div>
                  {version1.description && (
                    <p className="text-sm text-gray-400 italic mt-2">{version1.description}</p>
                  )}
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                {isImage1 ? (
                  <img
                    src={version1.file_url}
                    alt={`Version ${version1.version}`}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Preview not available</p>
                      <a
                        href={version1.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-400 hover:text-cyan-300 mt-2 inline-block"
                      >
                        Open in new tab
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Version 2 */}
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Version {version2.version}
                    {timeDiff > 0 && (
                      <span className="ml-2 text-xs text-gray-500">(Newer)</span>
                    )}
                  </h3>
                  <a
                    href={version2.file_url}
                    download
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
                
                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">{formatFileSize(version2.file_size)}</span>
                    {sizeDiff !== 0 && (
                      <span className={`text-xs ${
                        sizeDiff > 0 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        ({sizeDiff > 0 ? '+' : ''}{formatFileSize(Math.abs(sizeDiff))})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">
                      {new Date(version2.created_date).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">
                      {version2.uploaded_by?.split('@')[0] || 'Unknown'}
                    </span>
                  </div>
                  {version2.description && (
                    <p className="text-sm text-gray-400 italic mt-2">{version2.description}</p>
                  )}
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
                {isImage2 ? (
                  <img
                    src={version2.file_url}
                    alt={`Version ${version2.version}`}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Preview not available</p>
                      <a
                        href={version2.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-400 hover:text-cyan-300 mt-2 inline-block"
                      >
                        Open in new tab
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="mt-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-violet-400 mb-1">Change Summary</h4>
                <p className="text-sm text-gray-400">
                  Version {version2.version} was uploaded {daysDiff} {daysDiff === 1 ? 'day' : 'days'} 
                  {timeDiff > 0 ? ' after' : ' before'} version {version1.version}
                  {sizeDiff !== 0 && (
                    <>
                      {' '}with a file size {sizeDiff > 0 ? 'increase' : 'decrease'} of {formatFileSize(Math.abs(sizeDiff))}
                    </>
                  )}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}