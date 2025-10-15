import React, { useEffect, useState } from 'react';
import { Play, Save, Settings, BookOpen, Coins, LogOut, User, ChevronDown, Image as ImageIcon, Award, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { AudioManager } from '../utils/audio';
import { AuthService } from '../services/authService';
import { CloudSaveManager } from '../components/CloudSaveManager';

export const MainMenu: React.FC = () => {
  const startGame = useGameStore((s) => s.startGame);
  const setGameState = useGameStore((s) => s.setGameState);
  const setSaveLoadMode = useGameStore((s) => s.setSaveLoadMode);
  const user = useGameStore((s) => s.user);
  const signOut = useGameStore((s) => s.signOut);
  const [mounted, setMounted] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCloudSaves, setShowCloudSaves] = useState(false);

  useEffect(() => {
    AudioManager.playMusic();
    setMounted(true);
  }, []);

  const MenuItem = ({ 
    onClick, 
    children, 
    icon: Icon,
    delay = '0ms'
  }: { 
    onClick: () => void; 
    children: string; 
    icon: any;
    delay?: string;
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group w-full max-w-md mx-auto ${!mounted ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}`}
        style={{ 
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: mounted ? delay : '0s',
        }}
      >
        <div 
          className="relative px-8 py-4 rounded-2xl transition-all duration-300"
          style={{
            background: isHovered 
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.3))'
              : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            border: `2px solid ${isHovered ? 'rgba(236, 72, 153, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
            boxShadow: isHovered 
              ? '0 8px 32px rgba(236, 72, 153, 0.4), 0 0 20px rgba(236, 72, 153, 0.3)' 
              : '0 4px 16px rgba(0, 0, 0, 0.3)',
            transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
          }}
        >
          <div className="flex items-center gap-4">
            <Icon 
              size={24} 
              className="text-white transition-transform duration-300"
              style={{
                filter: isHovered ? 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))' : 'none',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            />
            <span 
              className="font-bold text-xl text-white tracking-wide"
              style={{
                textShadow: isHovered ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none',
              }}
            >
              {children}
            </span>
          </div>
        </div>
      </button>
    );
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-black">
      {/* Header Navigation Sticky */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Dissonance
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('histoire')} className="text-white/80 hover:text-white transition-colors">
              L'Histoire
            </button>
            <button onClick={() => scrollToSection('personnages')} className="text-white/80 hover:text-white transition-colors">
              Personnages
            </button>
            <button 
              onClick={startGame}
              className="px-6 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-colors"
            >
              Jouer Maintenant
            </button>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/30 transition-all"
                >
                  <User size={20} />
                  <span>{user.displayName || user.email?.split('@')[0] || 'Joueur'}</span>
                  <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-white/30">
                    <button
                      onClick={async () => { await AuthService.signOut(); signOut(); setShowUserMenu(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-white hover:bg-white/30 transition-colors"
                    >
                      <LogOut size={18} /> Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setGameState('Auth')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/30 transition-all"
              >
                <LogIn size={20} />
                <span>Connexion</span>
              </button>
            )}
            <Twitter size={20} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
            <Instagram size={20} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
          </div>
        </nav>
      </header>

      {/* Section 1: Hero */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(/ressources/VN backgrounds FHD/Salon 1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      
      {/* Effet de distorsion subtile */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-pulse" style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
          animationDuration: '4s',
        }} />
        <div className="absolute inset-0 animate-pulse" style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
          animationDuration: '6s',
          animationDelay: '2s',
        }} />
      </div>

      {/* Particules lumineuses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Bouton compte en haut à droite */}
      <div className="absolute top-6 right-6 z-30">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <User size={20} className="text-white" />
              <span className="text-white font-semibold">{user.displayName}</span>
              <ChevronDown size={16} className="text-white" />
            </button>

            {showAccountMenu && (
              <div 
                className="absolute top-full right-0 mt-2 w-56 rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <button
                  onClick={() => {
                    setShowAccountMenu(false);
                    // TODO: Gérer le compte
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <User size={18} />
                  <span>Gérer le compte</span>
                </button>
                <button
                  onClick={async () => {
                    await AuthService.signOut();
                    signOut();
                    setShowAccountMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setGameState('Auth')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(236, 72, 153, 0.5)',
            }}
          >
            <User size={20} className="text-pink-400" />
            <span className="text-white font-semibold">Connexion</span>
          </button>
        )}
      </div>

      {/* Bouton boutique en bas à droite */}
      <button
        onClick={() => setGameState('Shop')}
        className="absolute bottom-6 right-6 z-30 p-4 rounded-full transition-all hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
        }}
      >
        <Coins size={28} className="text-white" />
      </button>

      {/* Contenu principal */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4">
        {/* Titre du jeu */}
        <div 
          className={`text-center mb-16 ${!mounted ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          style={{ transition: 'all 1s ease-out' }}
        >
          <h1
            className="text-8xl lg:text-9xl font-bold text-white mb-4"
            style={{ 
              fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 0 40px rgba(236, 72, 153, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)',
              animation: 'glow 3s ease-in-out infinite',
            }}
          >
            Dissonance
          </h1>
          <div 
            className="h-1 w-96 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.8), rgba(168,85,247,0.8), transparent)',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
            }}
          />
        </div>

        {/* Menu principal */}
        <div className="w-full space-y-4 mb-8">
          <MenuItem onClick={startGame} icon={Play} delay="100ms">
            Nouvelle Partie
          </MenuItem>
          
          <MenuItem 
            onClick={() => {
              if (user) {
                setShowCloudSaves(true);
              } else {
                setSaveLoadMode('load');
              }
            }} 
            icon={Save} 
            delay="200ms"
          >
            Charger Partie
          </MenuItem>
          
          <MenuItem onClick={() => setGameState('Settings')} icon={Settings} delay="300ms">
            Options
          </MenuItem>
          
          <MenuItem onClick={() => setGameState('ChapterSelect')} icon={BookOpen} delay="400ms">
            Chapitres
          </MenuItem>
          
          <MenuItem onClick={() => {/* TODO: Galerie */}} icon={ImageIcon} delay="500ms">
            Galerie
          </MenuItem>
          
          <MenuItem onClick={() => {/* TODO: Crédits */}} icon={Award} delay="600ms">
            Crédits
          </MenuItem>
        </div>

        {/* Version */}
        <div 
          className={`text-white/50 text-sm ${!mounted ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            transition: 'opacity 1s ease-out', 
            transitionDelay: '1s',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          <p>V1.0 • Dissonance © 2025</p>
        </div>
      </div>

      {/* Modal Sauvegardes Cloud */}
      {showCloudSaves && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 rounded-2xl p-8 max-w-4xl w-full border-2 border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowCloudSaves(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
            <CloudSaveManager mode="load" onClose={() => setShowCloudSaves(false)} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(236, 72, 153, 1));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};
