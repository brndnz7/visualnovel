import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Notification: React.FC = () => {
  const notification = useGameStore((state) => state.notification);
  const clearNotification = useGameStore((state) => state.clearNotification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  const colors = {
    info: { gradient: 'from-blue-500 to-cyan-500', shadow: 'rgba(59, 130, 246, 0.5)' },
    success: { gradient: 'from-pink-500 to-rose-500', shadow: 'rgba(236, 72, 153, 0.5)' },
    warning: { gradient: 'from-orange-500 to-red-500', shadow: 'rgba(249, 115, 22, 0.5)' },
    error: { gradient: 'from-red-600 to-rose-600', shadow: 'rgba(220, 38, 38, 0.5)' },
  };

  return (
    <div
      className={`notification-anim fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${
        colors[notification.type].gradient
      } text-white py-4 px-8 rounded-2xl z-[60] flex items-center gap-3 min-w-[320px] justify-center`}
      style={{
        boxShadow: `0 10px 40px ${colors[notification.type].shadow}, 0 4px 20px rgba(0,0,0,0.2)`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Heart size={24} fill="white" />
      <span className="font-bold text-lg">{notification.message}</span>
    </div>
  );
};

