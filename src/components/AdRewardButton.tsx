import React, { useState } from 'react';
import { Zap, Play, AlertCircle } from 'lucide-react';
import { CrazyGamesService } from '../services/crazyGamesService';
import { useGameStore } from '../store/gameStore';

interface AdRewardButtonProps {
  energyReward?: number;
  disabled?: boolean;
}

export const AdRewardButton: React.FC<AdRewardButtonProps> = ({ 
  energyReward = 5,
  disabled = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const showNotification = useGameStore((s) => s.showNotification);
  const rechargeEnergy = useGameStore((s) => s.rechargeEnergy);

  const handleWatchAd = () => {
    setIsLoading(true);

    CrazyGamesService.showRewardedAd(
      // onComplete - Pub terminée avec succès
      () => {
        setIsLoading(false);
        // Donner l'énergie
        for (let i = 0; i < energyReward; i++) {
          setTimeout(() => {
            rechargeEnergy();
          }, i * 100);
        }
        showNotification(`+${energyReward} Énergie ! Merci d'avoir regardé la pub 🎬`, 'success');
      },
      // onError - Erreur
      (error) => {
        setIsLoading(false);
        showNotification(`Erreur: ${error}`, 'error');
      }
    );
  };

  return (
    <div className="relative">
      <button
        onClick={handleWatchAd}
        disabled={disabled || isLoading}
        className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 relative overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
        }}
      >
        {/* Effet de brillance animé */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          style={{ width: '50%' }}
        />

        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span>Chargement...</span>
          </>
        ) : (
          <>
            <Play size={20} fill="white" />
            <Zap size={20} />
            <span>Regarder une pub (+{energyReward} ⚡)</span>
          </>
        )}
      </button>

      {/* Badge mode dev */}
      {CrazyGamesService.isInDevMode() && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
          <AlertCircle size={12} />
          DEV
        </div>
      )}
    </div>
  );
};

