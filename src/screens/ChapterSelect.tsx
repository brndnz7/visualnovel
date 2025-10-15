import React, { useState } from 'react';
import { X, Play, CheckCircle, Lock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { EPISODES } from '../data/episodeLoader';
import { SaveManager } from '../utils/saveManager';

interface Episode {
  id: string;
  title: string;
  description: string;
  startScene: string;
  thumbnail: string;
}

export const ChapterSelect: React.FC = () => {
  const setGameState = useGameStore((s) => s.setGameState);
  const setCurrentScene = useGameStore((s) => s.setCurrentScene);
  const goBack = useGameStore((s) => s.goBack);
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);

  const startEpisode = (episode: Episode) => {
    // Chercher une sauvegarde qui correspond à cet épisode
    const saves = SaveManager.getAllSaves();
    const episodeSave = saves.find(save => 
      save && save.currentSceneId.startsWith(episode.startScene.split('_')[0])
    );
    
    if (episodeSave) {
      // Charger la sauvegarde de l'épisode si elle existe
      useGameStore.setState({
        playerName: episodeSave.playerName,
        playerAvatar: episodeSave.playerAvatar,
        customCharacter: episodeSave.customCharacter || null,
        currentSceneId: episodeSave.currentSceneId,
        relationships: episodeSave.relationships,
        energy: episodeSave.energy,
        flags: episodeSave.flags,
        gameState: 'Playing',
      });
    } else {
      // Sinon, commencer l'épisode depuis le début
      setCurrentScene(episode.startScene);
      setGameState('Playing');
    }
  };

  const getEpisodeStatus = (episode: Episode): 'available' | 'inprogress' | 'completed' => {
    const saves = SaveManager.getAllSaves();
    const hasProgress = saves.some(save => 
      save && save.currentSceneId.startsWith(episode.startScene.split('_')[0])
    );
    
    const isCompleted = saves.some(save =>
      save && save.currentSceneId === `end_${episode.id}`
    );
    
    return isCompleted ? 'completed' : hasProgress ? 'inprogress' : 'available';
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/backgrounds/Cafeteria 2.png")',
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
      <div className="relative z-10 w-full max-w-7xl px-6 py-8 overflow-y-auto max-h-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-7xl font-bold text-white mb-4"
            style={{ 
              fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            Chapitres
          </h1>
          <div className="h-1 w-48 mx-auto rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent" 
            style={{ boxShadow: '0 2px 10px rgba(236, 72, 153, 0.5)' }}
          />
          <p className="text-white/80 mt-4 text-lg">
            Choisissez votre chapitre et plongez dans l'aventure
          </p>
        </div>

        {/* Grille des épisodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {EPISODES.map((episode) => {
            const status = getEpisodeStatus(episode);
            
            return (
              <div
                key={episode.id}
                onMouseEnter={() => setHoveredEpisode(episode.id)}
                onMouseLeave={() => setHoveredEpisode(null)}
                onClick={() => startEpisode(episode)}
                className={`relative overflow-hidden rounded-2xl backdrop-blur-md border-2 transition-all duration-300 cursor-pointer ${
                  hoveredEpisode === episode.id 
                    ? 'scale-105 border-white shadow-2xl' 
                    : 'border-white/30 hover:border-white/50'
                }`}
                style={{
                  background: hoveredEpisode === episode.id 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'rgba(0, 0, 0, 0.4)'
                }}
              >
                {/* Thumbnail */}
                <div 
                  className="h-56 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${episode.thumbnail})`,
                  }}
                >
                  {/* Gradient overlay sur l'image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Badge statut */}
                  {status === 'completed' && (
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-green-500/90 backdrop-blur-sm">
                      <CheckCircle size={24} className="text-white" />
                    </div>
                  )}
                  {status === 'inprogress' && (
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-yellow-500/90 backdrop-blur-sm">
                      <Play size={24} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {episode.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {episode.description}
                  </p>
                  
                  {/* Bouton */}
                  <button 
                    className="w-full py-3 px-6 rounded-xl font-semibold transition-all"
                    style={{
                      background: status === 'completed'
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : status === 'inprogress'
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                        : 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                      color: 'white',
                    }}
                  >
                    {status === 'completed' ? '✓ Rejouer' : status === 'inprogress' ? '▶ Continuer' : '▶ Commencer'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info box */}
        <div className="max-w-3xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30">
          <p className="text-center text-white/90">
            💡 <strong>Astuce :</strong> Chaque chapitre reprend automatiquement votre dernière sauvegarde si vous avez déjà progressé !
          </p>
        </div>
      </div>
    </div>
  );
};
