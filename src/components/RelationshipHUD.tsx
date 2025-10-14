import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart } from 'lucide-react';

export const RelationshipHUD: React.FC = () => {
  const relationships = useGameStore((state) => state.relationships);

  return (
    <div className="absolute top-6 right-6 flex flex-col gap-3 animate-fadeIn">
      {Object.entries(relationships).map(([char, value]) => {
        return (
          <div
            key={char}
            className="relative flex items-center gap-3 backdrop-blur-sm px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(236, 72, 153, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Heart 
              size={20} 
              className="text-pink-500"
              fill={value >= 60 ? '#ec4899' : 'none'}
            />
            
            <span className="capitalize text-gray-800 font-bold min-w-[60px] text-base">
              {char}
            </span>
            
            <div className="flex items-center gap-2">
              {/* Barre de progression moderne */}
              <div className="relative w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* Barre de progression */}
                <div 
                  className="h-full transition-all duration-700 ease-out rounded-full"
                  style={{
                    width: `${value}%`,
                    background: value >= 80 
                      ? 'linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #fbbf24 100%)'
                      : value >= 50
                      ? 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)'
                      : 'linear-gradient(90deg, #9ca3af 0%, #d1d5db 100%)',
                  }}
                />
              </div>
              
              <span className="text-gray-800 font-bold text-sm min-w-[30px] text-right">
                {value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
