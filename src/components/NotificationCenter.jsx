import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Bell, MessageSquare, CheckCircle, Upload, Receipt, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  message: MessageSquare,
  milestone: CheckCircle,
  file: Upload,
  invoice: Receipt,
};

const colorMap = {
  message: 'text-cyan-400',
  milestone: 'text-emerald-400',
  file: 'text-violet-400',
  invoice: 'text-amber-400',
};

export default function NotificationCenter({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', user?.email],
    queryFn: () => base44.entities.Notification.filter({ user_email: user.email }, '-created_date'),
    enabled: !!user?.email,
  });

  // Real-time subscription
  useEffect(() => {
    if (!user?.email) return;

    const unsubscribe = base44.entities.Notification.subscribe((event) => {
      if (event.data?.user_email === user.email) {
        queryClient.invalidateQueries({ queryKey: ['notifications', user.email] });
      }
    });

    return unsubscribe;
  }, [user?.email, queryClient]);

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId) =>
      base44.entities.Notification.update(notificationId, { read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.email] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId) => base44.entities.Notification.delete(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.email] });
    },
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    markAsReadMutation.mutate(notification.id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-400 hover:text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-12 w-96 max-h-[500px] bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-gray-400">{unreadCount} unread</span>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No notifications yet</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {notifications.map((notification) => {
                      const Icon = iconMap[notification.type] || Bell;
                      
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 mb-2 rounded-xl transition-all ${
                            notification.read
                              ? 'bg-white/[0.02] hover:bg-white/[0.05]'
                              : 'bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/15'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-white/5 ${colorMap[notification.type]}`}>
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              {notification.action_url ? (
                                <Link
                                  to={notification.action_url}
                                  onClick={() => handleNotificationClick(notification)}
                                  className="block"
                                >
                                  <h4 className="text-sm font-semibold text-white mb-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-xs text-gray-400 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  {notification.created_date && (
                                    <span className="text-xs text-gray-600 mt-1 block">
                                      {new Date(notification.created_date).toLocaleString()}
                                    </span>
                                  )}
                                </Link>
                              ) : (
                                <>
                                  <h4 className="text-sm font-semibold text-white mb-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-xs text-gray-400 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  {notification.created_date && (
                                    <span className="text-xs text-gray-600 mt-1 block">
                                      {new Date(notification.created_date).toLocaleString()}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>

                            <button
                              onClick={() => deleteNotificationMutation.mutate(notification.id)}
                              className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}