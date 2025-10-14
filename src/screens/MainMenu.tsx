import React, { useEffect, useState } from 'react';
import { Play, RefreshCw, Settings, BookOpen, Save, Heart, Coins, Info } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { AudioManager } from '../utils/audio';

export const MainMenu: React.FC = () => {
  const startGame = useGameStore((s) => s.startGame);
  const continueGame = useGameStore((s) => s.continueGame);
  const setGameState = useGameStore((s) => s.setGameState);
  const setSaveLoadMode = useGameStore((s) => s.setSaveLoadMode);
  const hasSave = useGameStore((state) => !!state.playerName);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    AudioManager.playMusic();
    setMounted(true);
  }, []);

  const MenuButton = ({ 
    onClick, 
    delay, 
    children, 
    icon: Icon,
    id,
    variant = 'primary'
  }: { 
    onClick: () => void; 
    delay: string; 
    children: string; 
    icon: any;
    id: string;
    variant?: 'primary' | 'secondary';
  }) => {
    const isHovered = hoveredButton === id;
    
    const isPrimary = variant === 'primary';
    
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHoveredButton(id)}
        onMouseLeave={() => setHoveredButton(null)}
        className={`relative w-full group overflow-hidden ${!mounted ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: mounted ? delay : '0s',
          minHeight: isPrimary ? '70px' : '60px',
          borderRadius: isPrimary ? '20px' : '16px',
          background: isPrimary 
            ? (isHovered ? 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)' : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)')
            : (isHovered ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.18)'),
          border: isPrimary ? '2px solid rgba(255, 255, 255, 0.35)' : '2px solid rgba(255, 255, 255, 0.35)',
          boxShadow: isHovered 
            ? (isPrimary ? '0 8px 30px rgba(0, 0, 0, 0.2)' : '0 6px 24px rgba(15, 23, 42, 0.35)')
            : (isPrimary ? '0 4px 15px rgba(0, 0, 0, 0.1)' : '0 2px 12px rgba(15, 23, 42, 0.25)'),
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        <div className="relative flex items-center justify-center gap-3 h-full py-4 px-6">
          <Icon 
            size={isPrimary ? 24 : 20} 
            className={`${isPrimary ? 'text-gray-800' : 'text-white'} transition-transform duration-200`} 
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          <span 
            className={`${isPrimary ? 'text-gray-800' : 'text-white'} font-bold transition-all duration-200 ${isPrimary ? 'text-xl' : 'text-lg'}`}
            style={{
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            {children}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-8 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)',
      }}
    >
      {/* Pattern géométrique en arrière-plan */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Overlay doux */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-slate-900/30 to-purple-900/40" />

      {/* Effets lumineux subtils */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl -top-32 -left-32 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/12 rounded-full blur-3xl top-20 right-10 animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute w-[600px] h-[600px] bg-rose-500/12 rounded-full blur-3xl -bottom-40 left-1/3 animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }} />
      </div>
      
      {/* Contenu principal */}
      <div className="z-10 flex gap-8 items-center justify-center w-full max-w-7xl">
        {/* Section gauche - Logo et info */}
        <div className="flex-1 text-center lg:text-left">
          <div className={`${!mounted ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'} transition-all duration-1000`}>
            <h1
              className="text-6xl lg:text-8xl font-bold text-white drop-shadow-2xl mb-6"
              style={{ 
                fontFamily: "'Quicksand', sans-serif",
                textShadow: '0 2px 10px rgba(255, 255, 255, 0.25)',
              }}
            >
              Dissonance
            </h1>
            <div 
              className="h-1.5 w-80 mx-auto lg:mx-0 rounded-full mb-6"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.5), rgba(219,39,119,0.7), rgba(236,72,153,0.5), transparent)',
                boxShadow: '0 2px 10px rgba(236, 72, 153, 0.3)',
              }}
            />
            <p className="text-2xl lg:text-3xl text-white mb-4 font-semibold tracking-wide">
              Une histoire dont vous êtes le héros
            </p>
            <p className="text-lg text-white/80 mb-8">
              Vivez une aventure romantique inoubliable
            </p>

            {/* Boutons secondaires simplifiés */}
            <div className="flex gap-3 justify-center lg:justify-start flex-wrap mt-8">
              <button 
                className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-white border-2 border-white/30"
                onClick={() => setGameState('Shop')}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Coins size={20} />
                <span>Boutique</span>
              </button>
              
              <button 
                className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-white border-2 border-white/30"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Heart size={20} />
                <span>Soutenir</span>
              </button>

              <button 
                className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-white border-2 border-white/30"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Info size={20} />
                <span>À propos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section droite - Menu boutons */}
        <div className="w-full max-w-md space-y-5">
          <MenuButton
            id="new-game"
            onClick={startGame}
            delay="200ms"
            icon={Play}
          >
            Nouvelle Partie
          </MenuButton>

          {hasSave && (
            <MenuButton
              id="continue"
              onClick={continueGame}
              delay="300ms"
              icon={RefreshCw}
            >
              Continuer
            </MenuButton>
          )}

          <MenuButton
            id="load"
            onClick={() => setSaveLoadMode('load')}
            delay="350ms"
            icon={Save}
            variant="secondary"
          >
            Charger
          </MenuButton>

          <MenuButton
            id="chapters"
            onClick={() => setGameState('ChapterSelect')}
            delay="375ms"
            icon={BookOpen}
            variant="secondary"
          >
            Chapitres
          </MenuButton>

          <MenuButton
            id="settings"
            onClick={() => setGameState('Settings')}
            delay="400ms"
            icon={Settings}
            variant="secondary"
          >
            Paramètres
          </MenuButton>

          {/* Version */}
          <div 
            className={`mt-8 text-white/50 text-sm ${!mounted ? 'opacity-0' : 'opacity-100'}`}
            style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '800ms' }}
          >
            <p>Version 1.0.0 • Sweet Destiny © 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

