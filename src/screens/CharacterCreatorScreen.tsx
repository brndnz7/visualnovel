import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { CustomCharacter, DEFAULT_CHARACTER, CHARACTER_CREATOR_OPTIONS } from '../types/characterCreator';
import { CustomCharacterDisplay } from '../components/CustomCharacterDisplay';

export const CharacterCreatorScreen: React.FC = () => {
  const customCharacter = useGameStore((s) => s.customCharacter);
  const [character, setCharacter] = useState<CustomCharacter>(customCharacter || DEFAULT_CHARACTER);
  const [activeCategory, setActiveCategory] = useState<'base' | 'hair' | 'eyes' | 'eyebrows' | 'mouth' | 'clothes' | 'accessories'>('base');
  const setCustomCharacter = useGameStore((s) => s.setCustomCharacter);
  const goBack = useGameStore((s) => s.goBack);

  const femaleOptions = CHARACTER_CREATOR_OPTIONS.female;
  const maleOptions = CHARACTER_CREATOR_OPTIONS.male;
  
  const isMale = character.gender === 'male';
  
  // Catégories différentes selon le genre
  const categories = isMale ? [
    { id: 'base' as const, name: 'Base', icon: '' },
    { id: 'hair' as const, name: 'Cheveux', icon: '' },
    { id: 'mouth' as const, name: 'Expression', icon: '' },
    { id: 'clothes' as const, name: 'Tenue', icon: '' },
    { id: 'accessories' as const, name: 'Accessoires', icon: '' },
  ] : [
    { id: 'base' as const, name: 'Visage', icon: '' },
    { id: 'hair' as const, name: 'Cheveux', icon: '' },
    { id: 'eyes' as const, name: 'Yeux', icon: '' },
    { id: 'eyebrows' as const, name: 'Sourcils', icon: '' },
    { id: 'mouth' as const, name: 'Bouche', icon: '' },
    { id: 'clothes' as const, name: 'Vêtements', icon: '' },
  ];

  const handleConfirm = () => {
    setCustomCharacter(character);
  };

  const updateCharacter = (updates: Partial<CustomCharacter>) => {
    setCharacter({ ...character, ...updates });
  };

  const renderOptions = () => {
    const options = isMale ? maleOptions : femaleOptions;
    
    switch (activeCategory) {
      case 'base':
        if (isMale) {
          return (
            <div className="text-center p-8">
              <p className="text-gray-600">Base corporelle (obligatoire)</p>
              <p className="text-sm text-gray-400 mt-2">Un seul modèle de base disponible</p>
            </div>
          );
        }
        return (
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: options.bases }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => updateCharacter({ base: num })}
                className="p-4 rounded-2xl transition-all"
                style={{
                  background: character.base === num 
                    ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                    : 'rgba(236, 72, 153, 0.1)',
                  border: `2px solid ${character.base === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                  color: character.base === num ? 'white' : '#ec4899',
                }}
              >
                Visage {num}
              </button>
            ))}
          </div>
        );

      case 'hair':
        const hairStyles = isMale ? options.hairStyles : options.hairStyles;
        const hairColors = isMale ? options.hairColors : options.hairColors;
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Style de cheveux</h4>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: hairStyles }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ hair: { ...character.hair, style: num } })}
                    className="p-3 rounded-xl transition-all text-sm font-semibold"
                    style={{
                      background: character.hair.style === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.hair.style === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.hair.style === num ? 'white' : '#ec4899',
                    }}
                  >
                    Style {num}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Couleur</h4>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: hairColors }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ hair: { ...character.hair, color: num } })}
                    className="p-3 rounded-xl transition-all text-sm font-semibold"
                    style={{
                      background: character.hair.color === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.hair.color === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.hair.color === num ? 'white' : '#ec4899',
                    }}
                  >
                    C{num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'eyes':
        const femaleEyeOptions = femaleOptions;
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Forme des yeux</h4>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: femaleEyeOptions.eyeStyles }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ eyes: { ...character.eyes, style: num } })}
                    className="p-4 rounded-xl transition-all font-semibold"
                    style={{
                      background: character.eyes.style === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.eyes.style === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.eyes.style === num ? 'white' : '#ec4899',
                    }}
                  >
                    Forme {num}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Couleur des yeux</h4>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: femaleEyeOptions.eyeColors }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ eyes: { ...character.eyes, color: num } })}
                    className="p-3 rounded-xl transition-all text-sm font-semibold"
                    style={{
                      background: character.eyes.color === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.eyes.color === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.eyes.color === num ? 'white' : '#ec4899',
                    }}
                  >
                    C{num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'eyebrows':
        if (isMale) return null; // Pas utilisé pour les hommes
        return (
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: femaleOptions.eyebrows }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => updateCharacter({ eyebrows: num })}
                className="p-4 rounded-2xl transition-all"
                style={{
                  background: character.eyebrows === num 
                    ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                    : 'rgba(236, 72, 153, 0.1)',
                  border: `2px solid ${character.eyebrows === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                  color: character.eyebrows === num ? 'white' : '#ec4899',
                }}
              >
                Sourcil {num}
              </button>
            ))}
          </div>
        );

      case 'mouth':
        const mouthLabel = isMale ? 'Expression' : 'Bouche';
        const mouthCount = isMale ? maleOptions.expressions : femaleOptions.mouths;
        const expressionNames = isMale ? [
          'Normal', 'Smile 1', 'Smile 2', 'Smile 3', 'Laugh', 
          'Surprised', 'Smirk', 'Angry 1', 'Angry 2', 'Sad', 'Sweat'
        ] : null;
        
        return (
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: mouthCount || 0 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => updateCharacter({ mouth: num })}
                className="p-4 rounded-2xl transition-all"
                style={{
                  background: character.mouth === num 
                    ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                    : 'rgba(236, 72, 153, 0.1)',
                  border: `2px solid ${character.mouth === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                  color: character.mouth === num ? 'white' : '#ec4899',
                }}
              >
                {expressionNames ? expressionNames[num - 1] : `${mouthLabel} ${num}`}
              </button>
            ))}
          </div>
        );

      case 'clothes':
        if (isMale) {
          // Pour les hommes : liste simple de tenues complètes (18 tenues)
          const outfitNames = [
            'Office 1', 'Office 2', 'Office 3', 'Office 4',
            'School 1', 'School 2', 'School 3',
            'Winter', 'P.E', 'Vest',
            'Casual 1-1', 'Casual 1-2', 'Casual 2-1', 'Casual 2-2', 'Casual 3-1', 'Casual 3-3',
            'Tanktop 1', 'Tanktop 2'
          ];
          
          return (
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: maleOptions.outfits }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => updateCharacter({ top: { style: num, color: 1 } })}
                  className="p-4 rounded-xl transition-all text-sm font-semibold"
                  style={{
                    background: character.top.style === num 
                      ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                      : 'rgba(236, 72, 153, 0.1)',
                    border: `2px solid ${character.top.style === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                    color: character.top.style === num ? 'white' : '#ec4899',
                  }}
                >
                  {outfitNames[num - 1] || `Tenue ${num}`}
                </button>
              ))}
            </div>
          );
        }
        
        // Pour les femmes : séparation haut/bas avec couleurs
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Haut</h4>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: femaleOptions.topStyles }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ top: { ...character.top, style: num } })}
                    className="p-3 rounded-xl transition-all text-sm font-semibold"
                    style={{
                      background: character.top.style === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.top.style === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.top.style === num ? 'white' : '#ec4899',
                    }}
                  >
                    Style {num}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-6 gap-2 mt-3">
                {Array.from({ length: femaleOptions.topColors }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ top: { ...character.top, color: num } })}
                    className="p-2 rounded-lg transition-all text-xs font-semibold"
                    style={{
                      background: character.top.color === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.top.color === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.top.color === num ? 'white' : '#ec4899',
                    }}
                  >
                    C{num}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Bas</h4>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: femaleOptions.bottomStyles }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ bottom: { ...character.bottom, style: num } })}
                    className="p-4 rounded-xl transition-all font-semibold"
                    style={{
                      background: character.bottom.style === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.bottom.style === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.bottom.style === num ? 'white' : '#ec4899',
                    }}
                  >
                    Style {num}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-6 gap-2 mt-3">
                {Array.from({ length: femaleOptions.bottomColors }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => updateCharacter({ bottom: { ...character.bottom, color: num } })}
                    className="p-2 rounded-lg transition-all text-xs font-semibold"
                    style={{
                      background: character.bottom.color === num 
                        ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                        : 'rgba(236, 72, 153, 0.1)',
                      border: `2px solid ${character.bottom.color === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                      color: character.bottom.color === num ? 'white' : '#ec4899',
                    }}
                  >
                    C{num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'accessories':
        if (!isMale) return null; // Seulement pour les hommes
        const accessoryNames = ['Aucun', 'Lunettes Circle', 'Lunettes Black', 'Écouteurs', 'Écouteurs Up'];
        
        return (
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: maleOptions.accessories + 1 }, (_, i) => i).map((num) => (
              <button
                key={num}
                onClick={() => updateCharacter({ accessories: num })}
                className="p-4 rounded-2xl transition-all"
                style={{
                  background: (character.accessories || 0) === num 
                    ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                    : 'rgba(236, 72, 153, 0.1)',
                  border: `2px solid ${(character.accessories || 0) === num ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                  color: (character.accessories || 0) === num ? 'white' : '#ec4899',
                }}
              >
                {accessoryNames[num] || `Accessoire ${num}`}
              </button>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col p-8 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }}
    >
      <div className="max-w-7xl w-full mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
          Créez votre personnage
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Personnalisez chaque détail de votre apparence
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Prévisualisation */}
          <div 
            className="rounded-3xl p-8 flex items-center justify-center"
            style={{
              background: 'white',
              border: '3px solid #ec4899',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.2)',
            }}
          >
            <CustomCharacterDisplay character={character} size="large" />
          </div>

          {/* Options */}
          <div className="space-y-6">
            {/* Catégories */}
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="p-4 rounded-2xl transition-all font-semibold"
                  style={{
                    background: activeCategory === cat.id 
                      ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                      : 'rgba(236, 72, 153, 0.1)',
                    border: `2px solid ${activeCategory === cat.id ? '#ec4899' : 'rgba(236, 72, 153, 0.3)'}`,
                    color: activeCategory === cat.id ? 'white' : '#ec4899',
                  }}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-sm">{cat.name}</div>
                </button>
              ))}
            </div>

            {/* Options de la catégorie active */}
            <div 
              className="rounded-3xl p-6 max-h-[500px] overflow-y-auto"
              style={{
                background: 'white',
                border: '2px solid rgba(236, 72, 153, 0.3)',
              }}
            >
              {renderOptions()}
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleConfirm}
            className="px-12 py-5 rounded-2xl font-bold text-xl text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
            }}
          >
            <div className="flex items-center gap-3">
              <Check size={24} />
              <span>Confirmer</span>
              <ChevronRight size={24} />
            </div>
          </button>

          <button
            onClick={goBack}
            className="px-8 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105"
            style={{
              background: 'rgba(156, 163, 175, 0.2)',
              color: '#6b7280',
              border: '2px solid rgba(156, 163, 175, 0.3)',
            }}
          >
            <div className="flex items-center gap-2">
              <ChevronLeft size={20} />
              <span>Retour</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

