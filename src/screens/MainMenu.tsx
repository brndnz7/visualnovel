import React, { useEffect, useState } from 'react';
import { Play, Save, Settings, BookOpen, Coins, LogOut, User, ChevronDown, RefreshCw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { AudioManager } from '../utils/audio';
import { AuthService } from '../services/authService';
import { CloudSaveManager } from '../components/CloudSaveManager';
import { GAME_CONFIG } from '../config/game';

export const MainMenu: React.FC = () => {
  const startGame = useGameStore((s) => s.startGame);
  const continueGame = useGameStore((s) => s.continueGame);
  const setGameState = useGameStore((s) => s.setGameState);
  const setSaveLoadMode = useGameStore((s) => s.setSaveLoadMode);
  const user = useGameStore((s) => s.user);
  const signOut = useGameStore((s) => s.signOut);
  const hasSave = useGameStore((s) => !!s.currentSceneId);
  
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCloudSaves, setShowCloudSaves] = useState(false);

  useEffect(() => {
    AudioManager.playMusic();
    setMounted(true);
  }, []);

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/backgrounds/Pasillo 2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Contenu principal */}
      <div className="z-10 w-full max-w-6xl px-4 py-8">
        {/* Header avec menu utilisateur */}
        <div className="absolute top-4 right-4 z-20">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold hover:bg-white/30 transition-all"
            >
              <User size={20} />
              <span>{user?.displayName || user?.email?.split('@')[0] || 'Joueur'}</span>
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
        </div>

        {/* Hero Section - Centré */}
        <div className="text-center mb-16 mt-24">
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
            <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Bienvenue {user?.displayName || 'Joueur'} ! Prêt à continuer votre aventure ?
            </p>
          </div>
        </div>

        {/* Boutons d'action principaux */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12 max-w-5xl mx-auto">
          <button
            onClick={startGame}
            className="px-16 py-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-2xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl"
          >
            <span className="flex items-center gap-4">
              <Play size={32} />
              NOUVELLE PARTIE
            </span>
          </button>

          {hasSave && (
            <button
              onClick={continueGame}
              className="px-12 py-5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl border-2 border-white/30"
            >
              <span className="flex items-center gap-3">
                <RefreshCw size={24} />
                CONTINUER
              </span>
            </button>
          )}

          <button
            onClick={() => {
              if (user) {
                setShowCloudSaves(true);
              } else {
                setSaveLoadMode('load');
              }
            }}
            className="px-12 py-5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl border-2 border-white/30"
          >
            <span className="flex items-center gap-3">
              <Save size={24} />
              CHARGER
            </span>
          </button>
        </div>

        {/* Boutons secondaires */}
        <div className="flex gap-4 justify-center items-center flex-wrap mb-12">
          <button 
            className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-semibold text-white border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md"
            onClick={() => setGameState('ChapterSelect')}
          >
            <BookOpen size={20} />
            <span>Chapitres</span>
          </button>

          <button 
            className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-semibold text-white border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md"
            onClick={() => setGameState('Settings')}
          >
            <Settings size={20} />
            <span>Options</span>
          </button>

          <button 
            className="px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center gap-2 font-semibold text-white border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md"
            onClick={() => setGameState('Shop')}
          >
            <Coins size={20} />
            <span>Boutique</span>
          </button>
        </div>

        {/* Version */}
        <div 
          className={`text-center text-white/50 text-sm ${!mounted ? 'opacity-0' : 'opacity-100'}`}
          style={{ transition: 'opacity 0.5s ease-out', transitionDelay: '800ms' }}
        >
          <p>Version {GAME_CONFIG.VERSION} • Dissonance © 2025</p>
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
