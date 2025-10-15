import React, { useEffect, useState } from 'react';
import { Play, RefreshCw, Settings, BookOpen, Save, Heart, Coins, Info, LogOut, Users, Sparkles } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { AudioManager } from '../utils/audio';
import { AuthService } from '../services/authService';
import { CloudSaveManager } from '../components/CloudSaveManager';

export const MainMenu: React.FC = () => {
  const startGame = useGameStore((s) => s.startGame);
  const continueGame = useGameStore((s) => s.continueGame);
  const setGameState = useGameStore((s) => s.setGameState);
  const setSaveLoadMode = useGameStore((s) => s.setSaveLoadMode);
  const user = useGameStore((s) => s.user);
  const signOut = useGameStore((s) => s.signOut);
  const hasSave = useGameStore((state) => !!state.playerName);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCloudSaves, setShowCloudSaves] = useState(false);

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
            ? (isHovered ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' : 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)')
            : (isHovered ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.22)'),
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
            className="text-white transition-transform duration-200" 
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          <span 
            className={`text-white font-bold transition-all duration-200 ${isPrimary ? 'text-xl' : 'text-lg'}`}
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
        background: 'linear-gradient(135deg, #3b0764 0%, #701a75 30%, #be185d 60%, #db2777 100%)',
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
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-purple-900/20 to-pink-900/30" />

      {/* Effets lumineux gaming */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl -top-32 -left-32 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[400px] h-[400px] bg-purple-400/25 rounded-full blur-3xl top-20 right-10 animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute w-[600px] h-[600px] bg-fuchsia-400/20 rounded-full blur-3xl -bottom-40 left-1/3 animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }} />
      </div>
      
      {/* Contenu principal */}
      <div className="z-10 w-full max-w-7xl">
        {/* Hero Section - Centré */}
        <div className="text-center mb-12">
          <div className={`${!mounted ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'} transition-all duration-1000`}>
            <h1
              className="text-7xl lg:text-9xl font-bold text-white drop-shadow-2xl mb-6"
              style={{ 
                fontFamily: "'Quicksand', sans-serif",
                textShadow: '0 2px 20px rgba(255, 255, 255, 0.4)',
              }}
            >
              Dissonance
            </h1>
            <div 
              className="h-1.5 w-96 mx-auto rounded-full mb-8"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.7), rgba(219,39,119,0.9), rgba(236,72,153,0.7), transparent)',
                boxShadow: '0 2px 15px rgba(236, 72, 153, 0.5)',
              }}
            />
            <p className="text-3xl lg:text-4xl text-white mb-4 font-bold tracking-wide">
              Une histoire dont vous êtes le héros
            </p>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Créez votre personnage, développez des relations uniques et faites des choix qui changeront votre destinée
            </p>
          </div>
        </div>

        {/* Grille de fonctionnalités */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Heart size={28} className="text-pink-300" />
              <h3 className="text-xl font-bold text-white">Relations</h3>
            </div>
            <p className="text-white/80">
              Développez des liens avec Mia, Alex et Julien. Chaque choix influence vos relations !
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={28} className="text-purple-300" />
              <h3 className="text-xl font-bold text-white">Personnalisation</h3>
            </div>
            <p className="text-white/80">
              Créez votre personnage unique avec des centaines d'options de customisation
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Save size={28} className="text-blue-300" />
              <h3 className="text-xl font-bold text-white">Sauvegardes Cloud</h3>
            </div>
            <p className="text-white/80">
              Synchronisez vos progrès et jouez sur plusieurs appareils
            </p>
          </div>
        </div>

        {/* Boutons d'action principaux */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8 max-w-4xl mx-auto">
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
            onClick={() => {
              if (user) {
                setShowCloudSaves(true);
              } else {
                setSaveLoadMode('load');
              }
            }}
            delay="350ms"
            icon={Save}
            variant="secondary"
          >
            Charger
          </MenuButton>
        </div>

        {/* Boutons secondaires */}
        <div className="flex gap-4 justify-center items-center flex-wrap mb-8">
          <button 
            className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-white border-2 border-white/30"
            onClick={() => setGameState('ChapterSelect')}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <BookOpen size={20} />
            <span>Chapitres</span>
          </button>

          <button 
            className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-white border-2 border-white/30"
            onClick={() => setGameState('Settings')}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Settings size={20} />
            <span>Paramètres</span>
          </button>

          <button 
            className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-white border-2 border-white/30"
            onClick={() => setGameState('Shop')}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Coins size={20} />
            <span>Boutique</span>
          </button>

          {user && (
            <button 
              className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-white border-2 border-red-400/40"
              onClick={async () => {
                await AuthService.signOut();
                signOut();
              }}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          )}
        </div>

        {/* Infos utilisateur */}
        {user && (
          <div className="text-center mb-6">
            <div className="inline-block px-6 py-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
              <p className="text-sm text-white/70">Connecté en tant que</p>
              <p className="text-white font-semibold text-lg">{user.displayName}</p>
            </div>
          </div>
        )}

        {/* Version */}
        <div 
          className={`text-center text-white/50 text-sm ${!mounted ? 'opacity-0' : 'opacity-100'}`}
          style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '800ms' }}
        >
          <p>Version 1.0.0 • Dissonance © 2025</p>
        </div>
      </div>


      {/* Modal Sauvegardes Cloud */}
      {showCloudSaves && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-4xl w-full border-2 border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            <CloudSaveManager mode="load" onClose={() => setShowCloudSaves(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

