import React, { useState } from 'react';
import { Play, Save, Settings, Home, X } from 'lucide-react';
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

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        {/* Menu principal */}
        <div 
          className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-xl border-2 animate-slideUp"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'rgba(236, 72, 153, 0.5)',
            boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Titre */}
          <h2 
            className="text-4xl font-bold text-white text-center mb-2"
            style={{ 
              fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 2px 15px rgba(255, 255, 255, 0.3)',
            }}
          >
            Menu Pause
          </h2>
          <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-8" 
            style={{ boxShadow: '0 2px 10px rgba(236, 72, 153, 0.5)' }}
          />

          {/* Boutons */}
          <div className="space-y-4">
            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)',
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <Play size={22} />
                <span>Reprendre</span>
              </div>
            </button>

            <button
              onClick={handleSave}
              className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <Save size={22} />
                <span>Sauvegarder</span>
              </div>
            </button>

            <button
              onClick={handleSettings}
              className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <Settings size={22} />
                <span>Paramètres</span>
              </div>
            </button>

            <button
              onClick={handleReturnToMenu}
              className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <Home size={22} />
                <span>Retour au menu</span>
              </div>
            </button>
          </div>
        </div>

        {/* Confirmation retour menu */}
        {showConfirm && (
          <div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setShowConfirm(false)}
          >
            <div 
              className="p-8 rounded-2xl backdrop-blur-xl border-2 max-w-md"
              style={{
                background: 'rgba(0, 0, 0, 0.9)',
                borderColor: 'rgba(239, 68, 68, 0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                Retour au menu principal ?
              </h3>
              <p className="text-white/80 text-center mb-6">
                Votre progression non sauvegardée sera perdue.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmReturn}
                  className="flex-1 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-all"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manager de sauvegarde cloud */}
        {showSaveManager && user && (
          <div className="absolute inset-0 z-50">
            <CloudSaveManager mode="save" onClose={() => setShowSaveManager(false)} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
