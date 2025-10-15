import React, { useState } from 'react';
import { X, Volume2, VolumeX, Sun, Moon, Trash2, AlertTriangle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const SettingsScreen: React.FC = () => {
  const settings = useGameStore((s) => s.settings);
  const updateSettings = useGameStore((s) => s.updateSettings);
  const goBack = useGameStore((s) => s.goBack);
  const resetGameProgress = useGameStore((s) => s.resetGameProgress);
  
  const [confirmingReset, setConfirmingReset] = useState(false);

  const handleReset = () => {
    resetGameProgress();
    useGameStore.setState({ gameState: 'MainMenu', navigationStack: [] });
    setConfirmingReset(false);
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/backgrounds/Pasillo 1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Bouton fermer */}
      <button
        onClick={goBack}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all"
      >
        <X size={24} />
      </button>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-4xl px-6 py-8 overflow-y-auto max-h-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-7xl font-bold text-white mb-4"
            style={{ 
              fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            Paramètres
          </h1>
          <div className="h-1 w-48 mx-auto rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent" 
            style={{ boxShadow: '0 2px 10px rgba(236, 72, 153, 0.5)' }}
          />
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Thème */}
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {settings.theme === 'dark' ? <Moon size={28} /> : <Sun size={28} />}
              Apparence
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`p-6 rounded-xl font-bold text-lg transition-all ${
                  settings.theme === 'light'
                    ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-2xl scale-105'
                    : 'bg-white/20 text-white/60 hover:bg-white/30'
                }`}
              >
                <Sun size={32} className="mx-auto mb-2" />
                Clair
              </button>

              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`p-6 rounded-xl font-bold text-lg transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl scale-105'
                    : 'bg-white/20 text-white/60 hover:bg-white/30'
                }`}
              >
                <Moon size={32} className="mx-auto mb-2" />
                Sombre
              </button>
            </div>
          </div>

          {/* Volume Musique */}
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {settings.musicVolume > 0 ? <Volume2 size={28} /> : <VolumeX size={28} />}
              Volume Musique
            </h2>
            
            <div className="flex items-center gap-4">
              <VolumeX size={20} className="text-white/60" />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.musicVolume}
                onChange={(e) => updateSettings({ musicVolume: Number(e.target.value) })}
                className="flex-1 h-3 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0.8) ${settings.musicVolume}%, rgba(255, 255, 255, 0.2) ${settings.musicVolume}%, rgba(255, 255, 255, 0.2) 100%)`
                }}
              />
              <Volume2 size={20} className="text-white/60" />
              <span className="text-white font-bold w-12 text-right">{settings.musicVolume}%</span>
            </div>
          </div>

          {/* Volume Effets Sonores */}
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {settings.sfxVolume > 0 ? <Volume2 size={28} /> : <VolumeX size={28} />}
              Volume Effets Sonores
            </h2>
            
            <div className="flex items-center gap-4">
              <VolumeX size={20} className="text-white/60" />
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sfxVolume}
                onChange={(e) => updateSettings({ sfxVolume: Number(e.target.value) })}
                className="flex-1 h-3 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0.8) ${settings.sfxVolume}%, rgba(255, 255, 255, 0.2) ${settings.sfxVolume}%, rgba(255, 255, 255, 0.2) 100%)`
                }}
              />
              <Volume2 size={20} className="text-white/60" />
              <span className="text-white font-bold w-12 text-right">{settings.sfxVolume}%</span>
            </div>
          </div>

          {/* Vitesse du texte */}
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              Vitesse du Texte
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              {['slow', 'normal', 'fast'].map((speed) => (
                <button
                  key={speed}
                  onClick={() => updateSettings({ textSpeed: speed as any })}
                  className={`p-4 rounded-xl font-semibold text-lg transition-all ${
                    settings.textSpeed === speed
                      ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-xl scale-105'
                      : 'bg-white/20 text-white/60 hover:bg-white/30'
                  }`}
                >
                  {speed === 'slow' && 'Lent'}
                  {speed === 'normal' && 'Normal'}
                  {speed === 'fast' && 'Rapide'}
                </button>
              ))}
            </div>
          </div>

          {/* Zone dangereuse */}
          <div className="p-8 bg-red-900/30 backdrop-blur-md rounded-2xl border-2 border-red-500/50">
            <h2 className="text-2xl font-bold text-red-300 mb-4 flex items-center gap-3">
              <AlertTriangle size={28} />
              Zone Dangereuse
            </h2>
            
            <p className="text-white/80 mb-6">
              Cette action supprimera toute votre progression, vos sauvegardes et vos personnalisations.
              Cette action est irréversible !
            </p>

            {!confirmingReset ? (
              <button
                onClick={() => setConfirmingReset(true)}
                className="w-full p-4 rounded-xl font-bold text-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border-2 border-red-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Réinitialiser le Jeu
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-red-200 font-bold text-center">
                  Êtes-vous sûr(e) ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConfirmingReset(false)}
                    className="p-3 rounded-xl font-semibold bg-white/20 hover:bg-white/30 text-white transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-3 rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white transition-all"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
