import React from 'react';
import { ChevronLeft, Play, CheckCircle } from 'lucide-react';
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
      className="w-full h-full flex flex-col p-8 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }}
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-bold text-gray-800">
            Chapitres
          </h1>
          <button
            onClick={goBack}
            className="px-6 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EPISODES.map((episode) => {
            const status = getEpisodeStatus(episode);
            
            return (
              <button
                key={episode.id}
                onClick={() => startEpisode(episode)}
                className="group relative overflow-hidden rounded-3xl transition-all hover:scale-105"
                style={{
                  background: 'white',
                  border: '3px solid #ec4899',
                  boxShadow: '0 10px 40px rgba(236, 72, 153, 0.2)',
                }}
              >
                {/* Thumbnail */}
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${episode.thumbnail})`,
                    filter: 'brightness(0.9)',
                  }}
                >
                  {status === 'completed' && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                      <CheckCircle size={24} />
                    </div>
                  )}
                  {status === 'inprogress' && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white p-2 rounded-full">
                      <Play size={24} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {episode.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {episode.description}
                  </p>
                  
                  <div 
                    className="py-3 px-6 rounded-xl font-semibold text-white transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    }}
                  >
                    {status === 'completed' ? 'Rejouer' : status === 'inprogress' ? 'Continuer' : 'Commencer'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-6 rounded-3xl" style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
          <p className="text-center text-gray-600">
            💡 <strong>Astuce :</strong> Chaque épisode reprend automatiquement votre dernière sauvegarde si vous avez déjà progressé !
          </p>
        </div>
      </div>
    </div>
  );
};
