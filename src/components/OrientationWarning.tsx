import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export const OrientationWarning: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Vérifier si c'est mobile ET en mode portrait
      const isMobile = window.innerWidth < 1024;
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && isPortraitMode);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="text-center text-white p-8 max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="animate-spin-slow">
            <RotateCcw size={80} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          Rotation requise
        </h1>
        
        <p className="text-xl mb-6">
          Pour une meilleure expérience de jeu, veuillez tourner votre appareil en mode paysage.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-24 border-4 border-white rounded-lg"></div>
          <div className="text-2xl">→</div>
          <div className="w-24 h-16 border-4 border-white rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

