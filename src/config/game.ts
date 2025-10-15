// Configuration globale du jeu
export const GAME_CONFIG = {
  VERSION: '1.0.0',
  ENERGY_MAX: 999999, // Énergie illimitée
  ENERGY_RECHARGE_MINUTES: 10,
  DEFAULT_TEXT_SPEED: 30,
  DEFAULT_MUSIC_VOLUME: 0.2,
  DEFAULT_SFX_VOLUME: 0.5,
} as const;

export const LOCAL_STORAGE_KEY = `sweetDestinySave_${GAME_CONFIG.VERSION}`;

export type GameState = 'Landing' | 'Auth' | 'MainMenu' | 'Naming' | 'Customization' | 'GenderSelection' | 'CharacterCreator' | 'Playing' | 'Settings' | 'Shop' | 'ChapterSelect' | 'SaveLoad';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type CharacterExpression = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'love';

