import React, { useState } from 'react';
import { ChevronLeft, User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import avatarsData from '../data/avatars.json';

export const CustomizationScreen: React.FC = () => {
  const setPlayerAvatar = useGameStore((s) => s.setPlayerAvatar);
  const setGameState = useGameStore((s) => s.setGameState);
  const goBack = useGameStore((s) => s.goBack);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedAvatar) {
      setPlayerAvatar(selectedAvatar);
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      }}
    >
      <div className="max-w-2xl w-full animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center">
          Créez votre personnage
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Créez un personnage unique qui vous ressemble !
        </p>

        {/* Option de création personnalisée */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <button
              onClick={() => setGameState('GenderSelection')}
              className="relative w-full px-12 py-8 rounded-3xl font-bold text-2xl transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                border: '3px solid rgba(0, 0, 0, 0.1)',
                color: '#1f2937',
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <User size={64} className="text-gray-700" />
                <span>Créer mon personnage</span>
                <span className="text-sm text-gray-500 font-normal">Personnalisez votre apparence</span>
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={goBack}
            className="w-full max-w-md py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
            style={{
              background: 'rgba(156, 163, 175, 0.2)',
              color: '#6b7280',
              border: '2px solid rgba(156, 163, 175, 0.3)',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <ChevronLeft size={20} />
              <span>Retour</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
