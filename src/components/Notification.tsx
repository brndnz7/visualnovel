import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Notification: React.FC = () => {
  const notification = useGameStore((s) => s.notification);
  const clearNotification = useGameStore((s) => s.clearNotification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  // Déterminer l'icône et le style selon le type
  const isRelationship = notification.message.includes('+') || notification.message.includes('-');
  
  const config = {
    success: {
      icon: isRelationship ? Heart : CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-100',
      border: 'border-green-400/50',
    },
    warning: {
      icon: isRelationship ? TrendingDown : AlertCircle,
      gradient: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-100',
      border: 'border-yellow-400/50',
    },
    error: {
      icon: XCircle,
      gradient: 'from-red-500 to-rose-500',
      iconColor: 'text-red-100',
      border: 'border-red-400/50',
    },
    info: {
      icon: Info,
      gradient: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-100',
      border: 'border-blue-400/50',
    },
  };

  const { icon: Icon, gradient, iconColor, border } = config[notification.type || 'info'];

  return (
    <div 
      className="fixed top-6 right-6 z-[100] animate-slideDown"
      style={{
        animation: 'slideDown 0.4s ease-out',
      }}
    >
      <div 
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-xl border-2 ${border} shadow-2xl max-w-md`}
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.8))`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Icône */}
        <div className={`p-3 rounded-full bg-gradient-to-br ${gradient}`}>
          <Icon size={24} className={iconColor} />
        </div>

        {/* Message */}
        <p className="text-white font-semibold text-lg flex-1">
          {notification.message}
        </p>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};
