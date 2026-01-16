import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileComments from './FileComments';

export default function FilePreview({ file, user, onClose }) {
  const isImage = file.file_type?.startsWith('image/');
  const isPDF = file.file_type === 'application/pdf';
  const isVideo = file.file_type?.startsWith('video/');

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
        className="relative max-w-6xl w-full bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{file.file_name}</h3>
            <p className="text-sm text-gray-400">{file.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={file.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
            </a>
            <a
              href={file.file_url}
              download
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5 text-gray-400" />
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-auto grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isImage && (
              <img
                src={file.file_url}
                alt={file.file_name}
                className="w-full h-auto rounded-xl"
              />
            )}

            {isPDF && (
              <iframe
                src={file.file_url}
                className="w-full h-[60vh] rounded-xl bg-white"
                title={file.file_name}
              />
            )}

            {isVideo && (
              <video
                src={file.file_url}
                controls
                className="w-full h-auto rounded-xl"
              />
            )}

            {!isImage && !isPDF && !isVideo && (
              <div className="text-center py-20">
                <p className="text-gray-400 mb-4">Preview not available for this file type</p>
                <Button
                  onClick={() => window.open(file.file_url, '_blank')}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black"
                >
                  Open File
                </Button>
              </div>
            )}
          </div>

          {/* Comments sidebar */}
          <div className="lg:col-span-1">
            <FileComments file={file} user={user} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}