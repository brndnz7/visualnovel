import React, { useState, useEffect } from 'react';
import { Star, Video, ShoppingCart } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { GAME_CONFIG } from '../config/game';

export const EnergyHUD: React.FC = () => {
  const energy = useGameStore((s) => s.energy);
  const lastEnergyUse = useGameStore((s) => s.lastEnergyUse);
  const addEnergy = useGameStore((s) => s.addEnergy);
  const setGameState = useGameStore((s) => s.setGameState);
  const showNotification = useGameStore((s) => s.showNotification);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (energy < GAME_CONFIG.ENERGY_MAX) {
      const interval = setInterval(() => {
        const newTimeLeft = Math.max(
          0,
          GAME_CONFIG.ENERGY_RECHARGE_MINUTES * 60 -
            (((Date.now() - (lastEnergyUse || Date.now())) / 1000) %
              (GAME_CONFIG.ENERGY_RECHARGE_MINUTES * 60))
        );
        setTimeLeft(newTimeLeft);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [energy, lastEnergyUse]);

  const showAdReward = () => {
    showNotification('Visionnage de la publicité...', 'info');
    setTimeout(() => {
      addEnergy(10);
      showNotification('+10 énergie obtenue !', 'success');
    }, 1500);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(s % 60)
      .toString()
      .padStart(2, '0')}`;

  return (
    <div className="absolute bottom-6 left-6 flex items-center gap-3 backdrop-blur-sm px-5 py-3 rounded-2xl animate-fadeIn z-50"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        border: '2px solid rgba(236, 72, 153, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center gap-2">
        <Star className="text-pink-500" size={20} fill="#ec4899" />
        <span className="font-bold text-lg text-gray-800">
          {energy} / {GAME_CONFIG.ENERGY_MAX}
        </span>
      </div>
      {energy < GAME_CONFIG.ENERGY_MAX && (
        <div className="text-sm text-gray-500 pl-2 border-l-2 border-gray-200">
          ⏱ {formatTime(timeLeft)}
        </div>
      )}
      <div className="flex gap-2 pl-2 border-l-2 border-gray-200">
        <button
          onClick={showAdReward}
          title="Regarder une pub pour +10 énergie"
          className="p-2 rounded-lg transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
          }}
        >
          <Video size={18} className="text-white" />
        </button>
        <button
          onClick={() => setGameState('Shop')}
          title="Acheter de l'énergie"
          className="p-2 rounded-lg transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.3)',
          }}
        >
          <ShoppingCart size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};
