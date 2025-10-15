import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { charactersData } from '../data/characters';

export const RelationshipButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const relationships = useGameStore((s) => s.relationships);

  const getRelationshipColor = (value: number) => {
    if (value >= 80) return { from: '#ec4899', to: '#db2777', text: 'Amoureux' };
    if (value >= 60) return { from: '#f472b6', to: '#ec4899', text: 'Très proche' };
    if (value >= 40) return { from: '#fbbf24', to: '#f59e0b', text: 'Ami' };
    if (value >= 20) return { from: '#60a5fa', to: '#3b82f6', text: 'Connaissance' };
    return { from: '#9ca3af', to: '#6b7280', text: 'Distant' };
  };

  return (
    <>
      {/* Bouton rond */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-6 right-6 p-4 rounded-full backdrop-blur-md border-2 transition-all hover:scale-110 z-50 animate-fadeIn"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderColor: 'rgba(236, 72, 153, 0.5)',
          boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
        }}
      >
        <Heart size={24} className="text-pink-400" fill={isOpen ? '#f9a8d4' : 'none'} />
      </button>

      {/* Panel des relations */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl p-8 rounded-3xl backdrop-blur-xl border-2 animate-slideUp"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              borderColor: 'rgba(236, 72, 153, 0.5)',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Titre */}
            <h2 className="text-4xl font-bold text-white text-center mb-8"
              style={{ 
                fontFamily: "'Quicksand', sans-serif",
                textShadow: '0 2px 15px rgba(255, 255, 255, 0.3)',
              }}
            >
              Relations
            </h2>
            <div className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-8" 
              style={{ boxShadow: '0 2px 10px rgba(236, 72, 153, 0.5)' }}
            />

            {/* Liste des relations */}
            <div className="space-y-6">
              {Object.entries(relationships).map(([charId, value], index) => {
                const char = charactersData[charId as keyof typeof charactersData];
                if (!char) return null;
                const colors = getRelationshipColor(value);

                return (
                  <div 
                    key={charId}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 animate-slideUp"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Nom et statut */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                            boxShadow: `0 2px 10px ${colors.from}40`,
                          }}
                        >
                          <span className="text-2xl">
                            {charId === 'Mia' ? '🌸' : charId === 'Alex' ? '🎨' : '💻'}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{char.name}</h3>
                          <p className="text-sm text-white/70">{colors.text}</p>
                        </div>
                      </div>
                      <span className="text-3xl font-bold text-white">{value}</span>
                    </div>

                    {/* Barre de progression */}
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full"
                        style={{
                          width: `${value}%`,
                          background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                          boxShadow: `0 0 15px ${colors.from}80`,
                          animation: 'growWidth 1s ease-out',
                          animationDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>

                    {/* Citations ou description */}
                    {value >= 80 && (
                      <p className="mt-3 text-pink-300 text-sm italic">
                        "{char.name} est tombé(e) amoureux/amoureuse de vous !"
                      </p>
                    )}
                    {value >= 60 && value < 80 && (
                      <p className="mt-3 text-white/70 text-sm italic">
                        "{char.name} vous considère comme quelqu'un de très spécial."
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes growWidth {
          from {
            width: 0%;
          }
        }

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
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

