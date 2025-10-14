import React from 'react';
import { CustomCharacter } from '../types/characterCreator';

interface CustomCharacterDisplayProps {
  character: CustomCharacter;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const CustomCharacterDisplay: React.FC<CustomCharacterDisplayProps> = ({ 
  character, 
  size = 'medium',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-64 h-96',
    medium: 'w-96 h-[600px]',
    large: 'w-[500px] h-[800px]',
  };

  const isMale = character.gender === 'male';

  // Mapping pour les cheveux masculins - 12 styles au total
  const maleHairMapping: Record<number, Record<number, string>> = {
    // Style 1 - série 0001s
    1: { 1: '0001s_0000s_0000_Brown', 2: '0001s_0000s_0001_Silver', 3: '0001s_0000s_0002_red', 4: '0001s_0000s_0003_Dark', 5: '0001s_0000s_0004_Blond' },
    // Styles 2-8 - série 0002s
    2: { 1: '0002s_0000s_0000_Brown', 2: '0002s_0000s_0001_Silver', 3: '0002s_0000s_0002_red', 4: '0002s_0000s_0003_Dark', 5: '0002s_0000s_0004_Blond' },
    3: { 1: '0002s_0001s_0000_Brown', 2: '0002s_0001s_0001_Silver', 3: '0002s_0001s_0002_red', 4: '0002s_0001s_0003_Dark', 5: '0002s_0001s_0004_Blond' },
    4: { 1: '0002s_0002s_0000_Brown', 2: '0002s_0002s_0001_Silver', 3: '0002s_0002s_0002_red', 4: '0002s_0002s_0003_Dark', 5: '0002s_0002s_0004_Blond' },
    5: { 1: '0002s_0003s_0000_Brown', 2: '0002s_0003s_0001_Silver', 3: '0002s_0003s_0002_red', 4: '0002s_0003s_0003_Black', 5: '0002s_0003s_0004_Blond' },
    6: { 1: '0002s_0004s_0000_Brown', 2: '0002s_0004s_0001_Silver', 3: '0002s_0004s_0002_red', 4: '0002s_0004s_0003_Dark', 5: '0002s_0004s_0004_Blond' },
    7: { 1: '0002s_0005s_0000_Brown', 2: '0002s_0005s_0001_Silver', 3: '0002s_0005s_0002_red', 4: '0002s_0005s_0003_Dark', 5: '0002s_0005s_0004_Blond' },
    8: { 1: '0002s_0006s_0000_Brown', 2: '0002s_0006s_0001_Silver', 3: '0002s_0006s_0002_Blond', 4: '0002s_0006s_0003_Red', 5: '0002s_0006s_0004_Dark' },
    // Styles 9-12 - série 0005s
    9: { 1: '0005s_0000s_0000_Brown', 2: '0005s_0000s_0001_Silver', 3: '0005s_0000s_0002_red', 4: '0005s_0000s_0003_black', 5: '0005s_0000s_0004_Blond' },
    10: { 1: '0005s_0001s_0000_Brown', 2: '0005s_0001s_0001_Silver', 3: '0005s_0001s_0002_Blond', 4: '0005s_0001s_0003_red', 5: '0005s_0001s_0004_Dark' },
    11: { 1: '0005s_0002s_0000_Brown', 2: '0005s_0002s_0001_Silver', 3: '0005s_0002s_0002_Red', 4: '0005s_0002s_0003_dark', 5: '0005s_0002s_0004_Blond' },
    12: { 1: '0005s_0003s_0000_Brown', 2: '0005s_0003s_0001_Silver', 3: '0005s_0003s_0002_Red', 4: '0005s_0003s_0003_Dark', 5: '0005s_0003s_0004_Blond' },
  };

  // Mapping pour les expressions masculines
  const maleExpressionMapping: Record<number, string> = {
    1: '0003s_0010_Normal',
    2: '0003s_0009_Smile-1',
    3: '0003s_0008_Smile-2',
    4: '0003s_0007_Smile-3',
    5: '0003s_0006_Laugh',
    6: '0003s_0005_Surprised',
    7: '0003s_0004_Smirk',
    8: '0003s_0003_Angry-1',
    9: '0003s_0002_Angry-2',
    10: '0003s_0001_Sad',
    11: '0003s_0000_sweat',
  };

  // Mapping pour les tenues masculines - 18 tenues
  const maleOutfitMapping: Record<number, string> = {
    1: '0004s_0017_Office-1',
    2: '0004s_0016_Office-2',
    3: '0004s_0015_Office-3',
    4: '0004s_0014_Office-4',
    5: '0004s_0013_School-Uniform-1',
    6: '0004s_0012_School-Uniform-2',
    7: '0004s_0011_School-Uniform-3',
    8: '0004s_0010_winter',
    9: '0004s_0009_P.E-Uniform',
    10: '0004s_0008_Vest',
    11: '0004s_0007_Casual-1-1',
    12: '0004s_0006_Casual-1-2',
    13: '0004s_0005_Casual-2-1',
    14: '0004s_0004_Casual-2-2',
    15: '0004s_0003_Casual-3-1',
    16: '0004s_0002_Casual-3-3',
    17: '0004s_0001_Tanktop-1',
    18: '0004s_0000_Tanktop-2',
  };

  // Mapping pour les accessoires masculins
  const maleAccessoryMapping: Record<number, string> = {
    1: '0000s_0000_Circle-Glasses-Copy',
    2: '0000s_0001_Black-Glasses-Copy',
    3: '0001_Headphones',
    4: '0000_Headphones-Up',
  };

  const getImagePath = (category: string, ...args: number[]): string => {
    if (isMale) {
      switch (category) {
        case 'base':
          return `/character-creator/male/Sutemo-Mature-Males_0002_Base-Body.png`;
        case 'hair':
          const hairCode = maleHairMapping[args[0]]?.[args[1]];
          return hairCode ? `/character-creator/male/Sutemo-Mature-Males_${hairCode}.png` : '';
        case 'expression':
          const exprCode = maleExpressionMapping[args[0]];
          return exprCode ? `/character-creator/male/Sutemo-Mature-Males_${exprCode}.png` : '';
        case 'outfit':
          const outfitCode = maleOutfitMapping[args[0]];
          return outfitCode ? `/character-creator/male/Sutemo-Mature-Males_${outfitCode}.png` : '';
        case 'accessory':
          if (args[0] === 0) return ''; // Pas d'accessoires
          const accCode = maleAccessoryMapping[args[0]];
          return accCode ? `/character-creator/male/Sutemo-Mature-Males_${accCode}.png` : '';
        default:
          return '';
      }
    }
    
    // Pour les femmes (code original)
    switch (category) {
      case 'base':
        return `/character-creator/Base/base${args[0]}.png`;
      case 'hair':
        return `/character-creator/Hair/hair${args[0]}_${args[1]}.png`;
      case 'eyes':
        return `/character-creator/Eyes/eyes${args[0]}_${args[1]}.png`;
      case 'eyebrows':
        return `/character-creator/Eyebrows/eyebrows${args[0]}_1.png`;
      case 'mouth':
        return `/character-creator/Mouth/mouth${args[0]}_1.png`;
      case 'top':
        return `/character-creator/Tops/top${args[0]}_${args[1]}.png`;
      case 'bottom':
        return `/character-creator/Bottoms/bottom${args[0]}_${args[1]}.png`;
      default:
        return '';
    }
  };

  if (isMale) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        {/* Base Body - Couche de base */}
        <img
          src={getImagePath('base', character.base)}
          alt="Base"
          className="absolute inset-0 w-full h-full object-contain"
        />
        
        {/* Outfit (tenue complète) - Utilise scale() pour agrandir au-delà de 100% */}
        <img
          src={getImagePath('outfit', character.top.style)}
          alt="Outfit"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            transform: 'scale(1.10) translateY(11%)',  // scale(1.3) = 130%, translateY pour descendre
            transformOrigin: 'top center'              // Point d'origine en haut au centre
          }}
        />
        
        {/* Expression - Plus petit et plus bas */}
        <img
          src={getImagePath('expression', character.mouth)}
          alt="Expression"
          className="absolute object-contain"
          style={{
            top: '20%',
            left: '32%',
            width: '35%',
            height: '35%'
          }}
        />
        
        {/* Hair (Coupe) - Un poil plus petit et plus bas */}
        <img
          src={getImagePath('hair', character.hair.style, character.hair.color)}
          alt="Hair"
          className="absolute object-contain"
          style={{
            top: '10%',
            left: '22%',
            width: '56%',
            height: '40%'
          }}
        />
        
        {/* Accessories - Ajuster aussi */}
        {character.accessories && character.accessories > 0 && (
          <img
            src={getImagePath('accessory', character.accessories)}
            alt="Accessory"
            className="absolute object-contain"
            style={{
              top: '19%',
              left: '30%',
              width: '40%',
              height: '28%'
            }}
          />
        )}
      </div>
    );
  }
  
  // Affichage pour personnage féminin
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Base */}
      <img
        src={getImagePath('base', character.base)}
        alt="Base"
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Bottom (pantalon/jupe) */}
      <img
        src={getImagePath('bottom', character.bottom.style, character.bottom.color)}
        alt="Bottom"
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Top (haut) */}
      <img
        src={getImagePath('top', character.top.style, character.top.color)}
        alt="Top"
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Eyebrows */}
      <img
        src={getImagePath('eyebrows', character.eyebrows)}
        alt="Eyebrows"
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Eyes */}
      <img
        src={getImagePath('eyes', character.eyes.style, character.eyes.color)}
        alt="Eyes"
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Mouth */}
      <img
        src={getImagePath('mouth', character.mouth)}
        alt="Mouth"
        className="absolute inset-0 w-full h-full object-contain"
      />
      
      {/* Hair (en dernier pour être au-dessus) */}
      <img
        src={getImagePath('hair', character.hair.style, character.hair.color)}
        alt="Hair"
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
};

