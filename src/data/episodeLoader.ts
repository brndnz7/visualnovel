// Système de chargement d'épisodes
import episode3 from './episodes/episode3.json';
import episode4 from './episodes/episode4.json';
import storyData from './story.json';

export interface Episode {
  id: string;
  title: string;
  description: string;
  startScene: string;
  scenes: Record<string, any>;
}

// Fonction pour combiner tous les épisodes
export function getAllScenes() {
  // Épisode 1 et 2 sont dans story.json
  const episode1And2Scenes = storyData.scenes;
  
  // Épisode 3
  const episode3Scenes = episode3.scenes;
  
  // Épisode 4
  const episode4Scenes = episode4.scenes;
  
  // Combiner tous les épisodes
  return {
    ...episode1And2Scenes,
    ...episode3Scenes,
    ...episode4Scenes,
  };
}

// Liste de tous les épisodes pour la sélection de chapitres
export const EPISODES = [
  {
    id: 'episode1',
    title: 'L\'Annonce',
    description: 'Votre aventure commence à l\'Université Starlight',
    startScene: storyData.start,
    thumbnail: '/backgrounds/school_entrance.jpg',
  },
  {
    id: 'episode2',
    title: 'Le Festival des Étoiles Filantes',
    description: 'Une soirée magique qui révèle vos sentiments',
    startScene: 'ep2_scene_1_annonce',
    thumbnail: '/backgrounds/festival.jpg',
  },
  {
    id: 'episode3',
    title: episode3.title,
    description: episode3.description,
    startScene: episode3.startScene,
    thumbnail: '/backgrounds/school_hallway.jpg',
  },
  {
    id: 'episode4',
    title: episode4.title,
    description: episode4.description,
    startScene: episode4.startScene,
    thumbnail: '/backgrounds/bedroom_morning.jpg',
  },
];

// Fonction pour obtenir un épisode par ID
export function getEpisodeById(episodeId: string): Episode | null {
  switch (episodeId) {
    case 'episode1':
    case 'episode2':
      return {
        id: episodeId,
        title: EPISODES.find(e => e.id === episodeId)?.title || '',
        description: EPISODES.find(e => e.id === episodeId)?.description || '',
        startScene: EPISODES.find(e => e.id === episodeId)?.startScene || '',
        scenes: storyData.scenes,
      };
    case 'episode3':
      return episode3 as Episode;
    case 'episode4':
      return episode4 as Episode;
    default:
      return null;
  }
}

