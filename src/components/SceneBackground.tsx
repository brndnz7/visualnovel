import React from 'react';
import backgroundsData from '../data/backgrounds.json';

interface SceneBackgroundProps {
  backgroundId: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ backgroundId }) => {
  const bgUrl = backgroundsData[backgroundId as keyof typeof backgroundsData] || backgroundsData.campus;

  return (
    <div 
      className="absolute inset-0 bg-cover bg-center transition-all duration-1000 animate-fadeIn" 
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

