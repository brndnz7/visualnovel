import React from 'react';
import { useGameStore } from '../store/gameStore';
import { User, UserCircle, ChevronLeft } from 'lucide-react';
import { AudioManager } from '../utils/audio';
import { DEFAULT_CHARACTER, DEFAULT_MALE_CHARACTER } from '../types/characterCreator';

export const GenderSelectionScreen: React.FC = () => {
  const setGameState = useGameStore((state) => state.setGameState);
  const setCustomCharacter = useGameStore((state) => state.setCustomCharacter);
  const goBack = useGameStore((state) => state.goBack);

  const handleGenderSelect = (gender: 'female' | 'male') => {
    AudioManager.play('click');
    if (gender === 'female') {
      setCustomCharacter(DEFAULT_CHARACTER);
    } else {
      setCustomCharacter(DEFAULT_MALE_CHARACTER);
    }
    setGameState('CharacterCreator');
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-8 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }}
    >
      <div className="max-w-4xl w-full animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 text-center">
          Choisissez votre genre
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Quel personnage veux-tu créer ?
        </p>

        <div className="grid md:grid-cols-2 gap-8 animate-slideUp">
          {/* Option Féminin */}
          <button
            onClick={() => handleGenderSelect('female')}
            className="group relative bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 p-12 rounded-3xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 border-4 border-white/20"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <User size={80} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white">Féminin</h2>
              <p className="text-white/80 text-center">
                Crée un personnage féminin avec des options de personnalisation complètes
              </p>
            </div>
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </button>

          {/* Option Masculin - Désactivée */}
          <div className="relative">
            <button
              disabled
              className="group relative p-12 rounded-3xl shadow-2xl border-4 border-white/20 opacity-50 cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
              }}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <UserCircle size={80} className="text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white">Masculin</h2>
                <p className="text-white/80 text-center">
                  Bientôt disponible
                </p>
              </div>
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/80 px-6 py-3 rounded-full">
                <span className="text-white font-bold text-lg">En développement</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={goBack}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-700 rounded-full font-bold text-lg hover:bg-gray-300 transition-colors duration-300"
          >
            <ChevronLeft size={24} />
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};


