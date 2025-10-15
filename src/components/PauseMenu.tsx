import React, { useState } from 'react';
import { Play, Save, Settings, Home } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { CloudSaveManager } from './CloudSaveManager';

interface PauseMenuProps {
  onClose: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ onClose }) => {
  const setGameState = useGameStore((s) => s.setGameState);
  const user = useGameStore((s) => s.user);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSaveManager, setShowSaveManager] = useState(false);

  const handleReturnToMenu = () => {
    setShowConfirm(true);
  };

  const confirmReturn = () => {
    setGameState('MainMenu');
  };

  const handleSave = () => {
    if (user) {
      setShowSaveManager(true);
    } else {
      useGameStore.getState().showNotification('Connectez-vous pour sauvegarder en ligne', 'warning');
    }
  };

  const handleSettings = () => {
    setGameState('Settings');
    onClose();
  };

  const PauseButton = ({ 
    onClick, 
    icon: Icon, 
    children, 
    variant = 'primary' 
  }: { 
    onClick: () => void; 
    icon: any; 
    children: string; 
    variant?: 'primary' | 'secondary' | 'danger';
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const getStyle = () => {
      if (variant === 'danger') {
        return {
          background: isHovered 
            ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' 
            : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
          boxShadow: isHovered 
            ? '0 8px 30px rgba(220, 38, 38, 0.4)' 
            : '0 4px 15px rgba(239, 68, 68, 0.2)',
        };
      } else if (variant === 'secondary') {
        return {
          background: isHovered 
            ? 'rgba(236, 72, 153, 0.15)' 
            : 'rgba(236, 72, 153, 0.08)',
          border: '2px solid rgba(236, 72, 153, 0.3)',
          boxShadow: isHovered 
            ? '0 4px 20px rgba(236, 72, 153, 0.2)' 
            : 'none',
          color: '#ec4899',
        };
      } else {
        return {
          background: isHovered 
            ? 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)' 
            : 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
          boxShadow: isHovered 
            ? '0 8px 30px rgba(236, 72, 153, 0.4)' 
            : '0 4px 15px rgba(236, 72, 153, 0.2)',
        };
      }
    };
    
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${variant === 'secondary' ? '' : 'text-white'}`}
        style={{
          ...getStyle(),
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        <div className="flex items-center justify-center gap-3">
          <Icon size={22} />
          <span>{children}</span>
        </div>
      </button>
    );
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div 
          className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 animate-slideUp"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Retour au menu ?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Votre progression non sauvegardée sera perdue.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="w-full py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)',
              }}
            >
              Annuler
            </button>
            <button
              onClick={confirmReturn}
              className="w-full py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{
                background: 'rgba(156, 163, 175, 0.2)',
                color: '#6b7280',
                border: '2px solid rgba(156, 163, 175, 0.3)',
              }}
            >
              Quitter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSaveManager) {
    return <CloudSaveManager mode="save" onClose={() => { setShowSaveManager(false); onClose(); }} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 animate-slideUp"
        style={{
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Pause
        </h1>

        <div className="space-y-4">
          <PauseButton onClick={onClose} icon={Play}>
            Continuer
          </PauseButton>

          <PauseButton onClick={handleSave} icon={Save} variant="secondary">
            Sauvegarder
          </PauseButton>

          <PauseButton onClick={handleSettings} icon={Settings} variant="secondary">
            Paramètres
          </PauseButton>

          <PauseButton onClick={handleReturnToMenu} icon={Home} variant="danger">
            Menu Principal
          </PauseButton>
        </div>
      </div>
    </div>
  );
};
