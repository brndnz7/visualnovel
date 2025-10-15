import React, { useState } from 'react';
import { Play, Zap } from 'lucide-react';
import { AdSenseService } from '../services/adSenseService';
import { useGameStore } from '../store/gameStore';

interface AdRewardButtonProps {
  energyReward?: number;
}

export const AdRewardButton: React.FC<AdRewardButtonProps> = ({ 
  energyReward = 5 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const showNotification = useGameStore((s) => s.showNotification);
  const addEnergy = useGameStore((s) => s.addEnergy);

  const handleWatchAd = () => {
    setIsLoading(true);

    AdSenseService.showRewardedAd(
      // onComplete - Pub terminée avec succès
      () => {
        setIsLoading(false);
        addEnergy(energyReward);
        showNotification(`+${energyReward} Énergie ! Merci d'avoir regardé la pub 💰`, 'success');
      },
      // onError - Erreur
      (error) => {
        setIsLoading(false);
        showNotification(error || 'Erreur lors de la pub', 'warning');
      }
    );
  };

  return (
    <button
      onClick={handleWatchAd}
      disabled={isLoading}
      title={`Regarder une pub pour +${energyReward} énergie`}
      className="p-2 rounded-lg transition-all hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative group"
      style={{
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        boxShadow: '0 2px 10px rgba(16, 185, 129, 0.4)',
      }}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-[18px] w-[18px] border-b-2 border-white" />
      ) : (
        <Play size={18} className="text-white" fill="white" />
      )}
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Regarder une pub (+{energyReward} <Zap size={12} className="inline" />)
      </div>
    </button>
  );
};

