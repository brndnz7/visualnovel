import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const NamingScreen: React.FC = () => {
  const [name, setName] = useState('');
  const setPlayerName = useGameStore((s) => s.setPlayerName);
  const goBack = useGameStore((s) => s.goBack);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setPlayerName(name);
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }}
    >
      <div className="max-w-2xl w-full animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center">
          Bienvenue !
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Comment vous appelez-vous ?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-8 py-6 rounded-3xl text-center text-2xl font-semibold border-3 transition-all focus:outline-none"
              style={{
                background: 'white',
                border: '3px solid #ec4899',
                color: '#1f2937',
              }}
              placeholder="Entrez votre prénom"
              maxLength={15}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-4">
            <button 
              type="submit" 
              disabled={!name.trim()}
              className="w-full py-5 rounded-2xl font-bold text-xl text-white transition-all"
              style={{
                background: name.trim() 
                  ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                  : 'rgba(156, 163, 175, 0.3)',
                boxShadow: name.trim() 
                  ? '0 4px 20px rgba(236, 72, 153, 0.3)'
                  : 'none',
                opacity: name.trim() ? 1 : 0.5,
                cursor: name.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <span>Continuer</span>
                <ChevronRight size={24} />
              </div>
            </button>

            <button
              type="button"
              onClick={goBack}
              className="w-full py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
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
        </form>
      </div>
    </div>
  );
};
