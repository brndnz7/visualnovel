import React, { useState, useEffect } from 'react';
import backgroundsData from '../data/backgrounds.json';

interface SceneBackgroundProps {
  backgroundId: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ backgroundId }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentBg, setCurrentBg] = useState('');
  const bgUrl = backgroundsData[backgroundId as keyof typeof backgroundsData] || backgroundsData.campus;

  useEffect(() => {
    setLoaded(false);
    
    // Précharger l'image
    const img = new Image();
    img.src = bgUrl;
    img.onload = () => {
      setCurrentBg(bgUrl);
      setLoaded(true);
    };
    img.onerror = () => {
      setCurrentBg(bgUrl); // Charger quand même
      setLoaded(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [bgUrl]);

  return (
    <>
      {/* Placeholder pendant le chargement */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 animate-pulse" />
      )}
      
      {/* Background réel */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${loaded ? 'opacity-100 animate-fadeIn' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${currentBg})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </>
  );
};

