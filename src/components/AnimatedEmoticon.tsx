import React, { useEffect, useState } from 'react';

interface AnimatedEmoticonProps {
  emoticonId: number; // 1 à 16
  onComplete?: () => void;
  size?: 'small' | 'medium' | 'large';
  position?: 'topleft' | 'topright' | 'center';
}

export const AnimatedEmoticon: React.FC<AnimatedEmoticonProps> = ({
  emoticonId,
  onComplete,
  size = 'medium',
  position = 'center',
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Réduire le nombre de frames pour éviter les erreurs de chargement
  // Les emoticons ont des frames de 000 à 080
  const totalFrames = 81;
  const frameDuration = 50; // ms par frame

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        const nextFrame = prev + 1;
        if (nextFrame >= totalFrames - 1) {
          setIsPlaying(false);
          // Appeler onComplete dans un setTimeout pour éviter setState pendant le render
          if (onComplete) {
            setTimeout(() => onComplete(), 0);
          }
          return totalFrames - 1;
        }
        return nextFrame;
      });
    }, frameDuration);

    return () => clearInterval(interval);
  }, [isPlaying, totalFrames, onComplete]);

  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-48 h-48',
  };

  const positionClasses = {
    topleft: 'top-20 left-20',
    topright: 'top-24 right-24',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  // Format du nom de fichier: Scene1_000.png
  const paddedFrame = frameIndex.toString().padStart(3, '0');
  const imagePath = `/emoticons/${emoticonId}/Scene1_${paddedFrame}.png`;

  return (
    <div 
      className={`absolute z-40 ${positionClasses[position]} ${sizeClasses[size]} animate-bounceIn`}
      style={{
        pointerEvents: 'none',
        animation: !isPlaying ? 'fadeOut 0.3s forwards' : undefined,
      }}
    >
      <img
        src={imagePath}
        alt="Emoticon"
        className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
        onError={(e) => {
          console.error(`Failed to load emoticon frame: ${imagePath}`);
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};

// Mapping des émotions aux IDs d'émoticônes
export const EMOTICON_MAP = {
  heart: 1,       // Coeur/amour
  happy: 2,       // Joyeux
  surprised: 3,   // Surpris
  angry: 4,       // En colère
  sad: 5,         // Triste
  sweat: 6,       // Gêné/sueur
  sparkle: 7,     // Étoiles/brillant
  confused: 8,    // Confus
  excited: 9,     // Excité
  thinking: 10,   // Réfléchit
  shocked: 11,    // Choqué
  love: 12,       // Amoureux
  embarrassed: 13,// Embarrassé
  tired: 14,      // Fatigué
  cool: 15,       // Cool
  nervous: 16,    // Nerveux
} as const;

