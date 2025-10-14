import React, { useMemo, useState } from 'react';
import { User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { CustomCharacterDisplay } from './CustomCharacterDisplay';
import charactersData from '../data/characters.json';
import avatarsData from '../data/avatars.json';

interface CharacterPortraitProps {
  characterId: string;
  position?: 'left' | 'right' | 'center';
  isActive?: boolean;
  expression?: string;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ 
  characterId, 
  position = 'left', 
  isActive = true,
  expression = 'neutral'
}) => {
  const [imageError, setImageError] = useState(false);
  const playerAvatarId = useGameStore((state) => state.playerAvatar);
  const playerName = useGameStore((state) => state.playerName);
  const customCharacter = useGameStore((state) => state.customCharacter);

  const character = useMemo(() => {
    // Si c'est le joueur
    if (characterId === 'Player') {
      // Si le joueur a un personnage personnalisé
      if (playerAvatarId === 'custom' && customCharacter) {
        return {
          name: playerName,
          image: null,
          isCustom: true,
        };
      }
      
      const avatar = avatarsData[playerAvatarId as keyof typeof avatarsData];
      return {
        name: playerName,
        image: avatar?.image || null,
        isCustom: false,
      };
    }

    // Si c'est un personnage du jeu
    const char = charactersData[characterId as keyof typeof charactersData];
    if (char) {
      // Utiliser l'expression spécifiée ou neutral par défaut
      const expressionKey = expression as keyof typeof char.images;
      return {
        name: char.name,
        image: char.images[expressionKey] || char.images.neutral,
        isCustom: false,
      };
    }

    return null;
  }, [characterId, playerName, playerAvatarId, customCharacter, expression]);

  if (!character) return null;

  const positionClasses = position === 'center'
    ? 'left-1/2 -translate-x-1/2 origin-bottom'
    : position === 'left' 
      ? 'left-0 origin-bottom-left' 
      : 'right-0 origin-bottom-right';
  const animationClass = position === 'center'
    ? 'animate-slideUp'
    : position === 'left' 
      ? 'animate-slideInLeft' 
      : 'animate-slideInRight';

  // Style de highlight amélioré (inspiré de AutoHighlight)
  const highlightStyle = isActive 
    ? {
        filter: 'brightness(1.08) saturate(1.2)',
        transform: 'scale(1.0) translateY(0)',
      }
    : {
        filter: 'brightness(0.75) saturate(0.7)',
        transform: 'scale(0.98) translateY(4px)',
      };

  return (
    <div
      className={`absolute bottom-0 h-[95%] w-[60%] md:w-[40%] ${positionClasses} flex items-end justify-center ${animationClass}`}
      style={{
        transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
    >
      {character.isCustom && customCharacter ? (
        <div style={highlightStyle}>
          <CustomCharacterDisplay character={customCharacter} size="large" />
        </div>
      ) : imageError || !character.image ? (
        <div 
          className="h-full w-full flex items-center justify-center rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.2) 100%)',
            ...highlightStyle,
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <User size={120} className="text-pink-400 opacity-60" />
            <p className="text-pink-600 font-bold text-xl">{character.name}</p>
          </div>
        </div>
      ) : (
        <img
          src={character.image}
          alt={character.name}
          onError={() => setImageError(true)}
          className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
          style={highlightStyle}
        />
      )}
    </div>
  );
};

