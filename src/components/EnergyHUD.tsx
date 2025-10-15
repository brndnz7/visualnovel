import React from 'react';
import { Zap, ShoppingCart } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const EnergyHUD: React.FC = () => {
  const setGameState = useGameStore((s) => s.setGameState);

  return (
    <div className="absolute bottom-6 left-6 flex items-center gap-3 backdrop-blur-md px-5 py-3 rounded-2xl animate-fadeIn z-50 border-2"
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(236, 72, 153, 0.5)',
        boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
      }}
    >
      <div className="flex items-center gap-2">
        <Zap className="text-pink-400" size={20} fill="#f9a8d4" />
        <span className="font-bold text-2xl text-white">
          ∞
        </span>
      </div>
      
      {/* Bouton Shop */}
      <div className="pl-2 border-l-2 border-white/30">
        <button
          onClick={() => setGameState('Shop')}
          title="Boutique"
          className="p-2 rounded-lg transition-all hover:scale-110 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.4)',
          }}
        >
          <ShoppingCart size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};
