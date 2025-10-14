import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, goBack, resetGameProgress } = useGameStore((s) => ({
    settings: s.settings,
    updateSettings: s.updateSettings,
    goBack: s.goBack,
    resetGameProgress: s.resetGameProgress,
  }));

  const [confirmingReset, setConfirmingReset] = useState(false);

  const handleReset = () => {
    resetGameProgress();
    useGameStore.setState({ gameState: 'MainMenu', navigationStack: [] });
  };

  return (
    <div 
      className="w-full h-full flex flex-col p-8 md:p-12 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }}
    >
      {/* En-tête avec bouton retour */}
      <div className="flex items-center mb-12">
        <button
          onClick={goBack}
          className="p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: 'rgba(236, 72, 153, 0.1)',
          }}
        >
          <ChevronLeft size={28} className="text-pink-500" />
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 ml-4">
          Settings
        </h1>
      </div>

      <div className="max-w-3xl mx-auto w-full space-y-10">
        {/* Display Mode */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Display</h2>
          <div className="flex gap-4">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className="flex-1 py-4 rounded-2xl font-bold text-lg transition-all"
              style={{
                background: settings.theme === 'light' 
                  ? 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' 
                  : 'rgba(255, 255, 255, 0.5)',
                color: settings.theme === 'light' ? 'white' : '#6b7280',
                border: settings.theme === 'light' ? 'none' : '2px solid rgba(0,0,0,0.1)',
                boxShadow: settings.theme === 'light' 
                  ? '0 4px 20px rgba(236, 72, 153, 0.3)' 
                  : 'none',
              }}
            >
              Window
            </button>
            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className="flex-1 py-4 rounded-2xl font-bold text-lg transition-all"
              style={{
                background: settings.theme === 'dark' 
                  ? 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' 
                  : 'rgba(255, 255, 255, 0.5)',
                color: settings.theme === 'dark' ? 'white' : '#6b7280',
                border: settings.theme === 'dark' ? 'none' : '2px solid rgba(0,0,0,0.1)',
                boxShadow: settings.theme === 'dark' 
                  ? '0 4px 20px rgba(236, 72, 153, 0.3)' 
                  : 'none',
              }}
            >
              Fullscreen
            </button>
          </div>
        </div>

        {/* Music Volume */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Music Volume</h2>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.musicVolume * 100}
              onChange={(e) => updateSettings({ musicVolume: parseFloat(e.target.value) / 100 })}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${settings.musicVolume * 100}%, #e5e7eb ${settings.musicVolume * 100}%, #e5e7eb 100%)`,
              }}
            />
            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #ec4899;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(236, 72, 153, 0.4);
              }
              input[type="range"]::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #ec4899;
                cursor: pointer;
                border: none;
                box-shadow: 0 2px 10px rgba(236, 72, 153, 0.4);
              }
            `}</style>
          </div>
        </div>

        {/* Sound Volume */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Sound Volume</h2>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.sfxVolume * 100}
              onChange={(e) => updateSettings({ sfxVolume: parseFloat(e.target.value) / 100 })}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${settings.sfxVolume * 100}%, #e5e7eb ${settings.sfxVolume * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
          
          {/* Mute All Button */}
          <button
            onClick={() => updateSettings({ musicVolume: 0, sfxVolume: 0 })}
            className="px-8 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '2px solid rgba(236, 72, 153, 0.3)',
              color: '#6b7280',
            }}
          >
            Mute all
          </button>
        </div>

        {/* Text Speed */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Text Speed</h2>
          <div className="relative">
            <input
              type="range"
              min="10"
              max="100"
              value={settings.textSpeed}
              onChange={(e) => updateSettings({ textSpeed: parseInt(e.target.value) })}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${((settings.textSpeed - 10) / 90) * 100}%, #e5e7eb ${((settings.textSpeed - 10) / 90) * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
        </div>

        {/* Reset Progress */}
        <div className="space-y-4 pt-6 border-t-2 border-pink-200">
          <h2 className="text-2xl font-bold text-gray-800">Reset Progress</h2>
          {!confirmingReset ? (
            <button
              onClick={() => setConfirmingReset(true)}
              className="px-8 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid rgba(239, 68, 68, 0.3)',
                color: '#dc2626',
              }}
            >
              Reset All Data
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmingReset(false)}
                className="flex-1 px-6 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105"
                style={{
                  background: 'rgba(156, 163, 175, 0.2)',
                  border: '2px solid rgba(156, 163, 175, 0.3)',
                  color: '#6b7280',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
                }}
              >
                Confirm Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
