import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GAME_CONFIG, LOCAL_STORAGE_KEY, NotificationType, GameState } from '../config/game';
import { AudioManager } from '../utils/audio';
import { CustomCharacter } from '../types/characterCreator';
import { PhoneConversation, PhoneMessage } from '../types/phone';
import charactersData from '../data/characters.json';
import storyData from '../data/story.json';

// Ré-export GameState depuis config/game pour les services
export type { GameState } from '../config/game';

// Type pour l'utilisateur
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

// Types pour le store
interface Dialogue {
  speaker: string;
  text: string;
  position?: 'left' | 'right';
  expression?: string;
}

interface Choice {
  text: string;
  next: string;
  effects?: Record<string, number>;
  condition?: string; // Pour les choix conditionnels
}

interface GameStoreState {
  // Authentification
  user: User | null;
  
  // État du jeu
  gameState: GameState;
  navigationStack: GameState[];
  saveLoadMode: 'save' | 'load';
  playerName: string;
  playerAvatar: string;
  customCharacter: CustomCharacter | null;
  currentSceneId: string;
  
  // Système de relations
  relationships: Record<string, number>;
  
  // Système de flags pour conditions avancées
  flags: Record<string, boolean | number | string>;
  
  // Ressources
  coins: number;
  energy: number;
  lastEnergyUse: number | null;
  
  // Historique des dialogues
  dialogueHistory: Array<{ sceneId: string; dialogue: Dialogue }>;
  
  // Système de téléphone
  phoneConversations: PhoneConversation[];
  showPhone: boolean;
  activePhoneConversation: string | null;
  
  // UI State
  notification: { message: string; type: NotificationType; id: number } | null;
  isSkipMode: boolean;
  isAutoMode: boolean;
  
  // Paramètres
  settings: {
    theme: 'light' | 'dark';
    musicVolume: number;
    sfxVolume: number;
    textSpeed: number;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  signOut: () => void;
  setGameState: (newState: GameState) => void;
  goBack: () => void;
  setSaveLoadMode: (mode: 'save' | 'load') => void;
  setPlayerName: (name: string) => void;
  setPlayerAvatar: (avatarId: string) => void;
  setCustomCharacter: (character: CustomCharacter) => void;
  setCurrentScene: (sceneId: string) => void;
  startGame: () => void;
  continueGame: () => void;
  makeChoice: (choice: Choice) => void;
  updateSettings: (newSettings: Partial<GameStoreState['settings']>) => void;
  resetGameProgress: () => void;
  
  // Énergie
  useEnergy: () => void;
  rechargeEnergy: () => void;
  addEnergy: (amount: number) => void;
  
  // Flags
  setFlag: (key: string, value: boolean | number | string) => void;
  getFlag: (key: string) => boolean | number | string | undefined;
  checkCondition: (condition: string) => boolean;
  
  // Historique
  addToHistory: (sceneId: string, dialogue: Dialogue) => void;
  clearHistory: () => void;
  
  // Modes de jeu
  toggleSkipMode: () => void;
  toggleAutoMode: () => void;
  
  // Notifications
  showNotification: (message: string, type?: NotificationType) => void;
  clearNotification: () => void;
  
  // Téléphone
  openPhone: (conversationId?: string) => void;
  closePhone: () => void;
  addPhoneMessage: (conversationId: string, message: PhoneMessage) => void;
  createPhoneConversation: (conversation: PhoneConversation) => void;
  markConversationRead: (conversationId: string) => void;
  initializeTestConversations: () => void;
  
  // Boutique
  buyTickets: (pack: 'small' | 'large') => void;
}

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      // État initial
      user: null,
      gameState: 'Landing',
      navigationStack: [],
      saveLoadMode: 'save',
      playerName: '',
      playerAvatar: 'player_f_1',
      customCharacter: null,
      currentSceneId: storyData.start,
      relationships: { Mia: 50, Alex: 50, Julien: 50 },
      flags: {},
      coins: 100,
      energy: 999999, // Énergie illimitée
      lastEnergyUse: null,
      dialogueHistory: [],
      phoneConversations: [],
      showPhone: false,
      activePhoneConversation: null,
      notification: null,
      isSkipMode: false,
      isAutoMode: false,
      settings: {
        theme: 'light',
        musicVolume: GAME_CONFIG.DEFAULT_MUSIC_VOLUME,
        sfxVolume: GAME_CONFIG.DEFAULT_SFX_VOLUME,
        textSpeed: GAME_CONFIG.DEFAULT_TEXT_SPEED,
      },

      // Actions
      setUser: (user) => set({ user }),
      
      signOut: () => {
        set({ 
          user: null,
          gameState: 'Auth',
          playerName: '',
          currentSceneId: storyData.start,
          relationships: { Mia: 50, Alex: 50, Julien: 50 },
          flags: {},
          coins: 100,
          energy: 999999, // Énergie illimitée
          dialogueHistory: [],
          phoneConversations: [],
        });
      },
      
      setGameState: (newState) => {
        if (newState === 'Playing') {
          AudioManager.play('swoosh');
        }
        set((state) => {
          // Ajouter l'état actuel au stack avant de changer
          const newStack = [...state.navigationStack];
          // Ne pas ajouter si on revient au menu principal ou si c'est le même état
          if (state.gameState !== 'MainMenu' && state.gameState !== newState) {
            newStack.push(state.gameState);
            // Limiter la taille du stack à 10 éléments
            if (newStack.length > 10) {
              newStack.shift();
            }
          }
          return { 
            navigationStack: newStack,
            gameState: newState 
          };
        });
      },

      goBack: () => {
        set((state) => {
          const newStack = [...state.navigationStack];
          const previousState = newStack.pop();
          
          if (previousState) {
            return {
              navigationStack: newStack,
              gameState: previousState,
            };
          }
          // Si pas d'état précédent, retourner au menu
          return {
            navigationStack: [],
            gameState: 'MainMenu',
          };
        });
      },

      setPlayerName: (name) => {
        if (name.trim()) {
          set({ playerName: name.trim(), gameState: 'Customization' });
        }
      },

      setPlayerAvatar: (avatarId) => {
        set({ playerAvatar: avatarId, gameState: 'Playing' });
        AudioManager.play('swoosh');
        // Initialiser des conversations test
        get().initializeTestConversations();
      },

      setCustomCharacter: (character) => {
        set({ customCharacter: character, playerAvatar: 'custom', gameState: 'Playing' });
        AudioManager.play('swoosh');
        // Initialiser des conversations test
        get().initializeTestConversations();
      },

      setCurrentScene: (sceneId) => {
        set({ currentSceneId: sceneId });
      },

      setSaveLoadMode: (mode) => {
        set({ saveLoadMode: mode, gameState: 'SaveLoad' });
      },

      startGame: () => {
        get().resetGameProgress();
        set({ gameState: 'Naming' });
      },

      continueGame: () => {
        if (get().playerName) {
          get().rechargeEnergy();
          set({ gameState: 'Playing' });
        } else {
          get().startGame();
        }
      },

      makeChoice: (choice) => {
        const { energy, useEnergy, relationships, currentSceneId } = get();
        
        // Vérifier les conditions du choix
        if (choice.condition && !get().checkCondition(choice.condition)) {
          return; // Le choix n'est pas disponible
        }
        
        // Vérifier l'énergie
        if (energy < 1) {
          get().showNotification("Pas assez d'énergie !", 'error');
          return;
        }
        
        // Gérer le retour au menu
        if (choice.next === 'restart') {
          get().setGameState('MainMenu');
          return;
        }
        
        // Consommer l'énergie (sauf pour la scène de fin)
        if (currentSceneId !== 'end_episode_1') {
          useEnergy();
        }
        
        AudioManager.play('click');
        
        // Appliquer les effets sur les relations
        if (choice.effects) {
          const newRelationships = { ...relationships };
          for (const char in choice.effects) {
            const change = choice.effects[char];
            if (newRelationships[char] !== undefined) {
              newRelationships[char] = Math.max(0, Math.min(100, newRelationships[char] + change));
              
              // Notification de changement de relation améliorée
              if (change !== 0 && charactersData[char as keyof typeof charactersData]) {
                const characterName = charactersData[char as keyof typeof charactersData].name;
                const newValue = newRelationships[char];
                
                // Messages personnalisés selon le niveau et le changement
                let message = '';
                let emoji = '';
                
                if (change > 0) {
                  if (change >= 10) {
                    emoji = '';
                    message = `${characterName} est vraiment touché(e) ! +${change}`;
                  } else if (change >= 5) {
                    emoji = '';
                    message = `${characterName} apprécie beaucoup ! +${change}`;
                  } else {
                    emoji = '';
                    message = `${characterName} +${change}`;
                  }
                  
                  // Messages spéciaux pour les paliers
                  if (newValue >= 80 && newValue - change < 80) {
                    message = `${characterName} est tombé(e) amoureux/amoureuse !`;
                  } else if (newValue >= 60 && newValue - change < 60) {
                    message = `${characterName} vous aime beaucoup !`;
                  }
                } else {
                  if (change <= -10) {
                    emoji = '';
                    message = `${characterName} est très déçu(e)... ${change}`;
                  } else if (change <= -5) {
                    emoji = '';
                    message = `${characterName} est un peu blessé(e)... ${change}`;
                  } else {
                    emoji = '';
                    message = `${characterName} ${change}`;
                  }
                }
                
                get().showNotification(
                  `${emoji} ${message}`,
                  change > 0 ? 'success' : 'warning'
                );
              }
            }
          }
          set({ relationships: newRelationships });
        }
        
        // Changer de scène
        set({ currentSceneId: choice.next });
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
        
        const settings = get().settings;
        AudioManager.updateMusicVolume(settings.musicVolume);
        AudioManager.updateAllSFXVolume(settings.sfxVolume);
      },

      resetGameProgress: () => {
        set({
          playerName: '',
          playerAvatar: 'player_f_1',
          customCharacter: null,
          currentSceneId: storyData.start,
          relationships: { Mia: 50, Alex: 50, Julien: 50 },
          flags: {},
          energy: 999999, // Énergie illimitée
          lastEnergyUse: null,
          dialogueHistory: [],
          isSkipMode: false,
          isAutoMode: false,
        });
      },

      // Gestion de l'énergie
      useEnergy: () => {
        set((state) => ({
          energy: Math.max(0, state.energy - 1),
          lastEnergyUse: state.energy === GAME_CONFIG.ENERGY_MAX ? Date.now() : state.lastEnergyUse,
        }));
      },

      rechargeEnergy: () => {
        const { lastEnergyUse, energy } = get();
        if (energy >= GAME_CONFIG.ENERGY_MAX || !lastEnergyUse) return;
        
        const diffMinutes = (Date.now() - lastEnergyUse) / 60000;
        const energyToRecharge = Math.floor(diffMinutes / GAME_CONFIG.ENERGY_RECHARGE_MINUTES);
        
        if (energyToRecharge > 0) {
          set((state) => ({
            energy: Math.min(GAME_CONFIG.ENERGY_MAX, state.energy + energyToRecharge),
            lastEnergyUse: Date.now(),
          }));
        }
      },

      addEnergy: (amount) => {
        set((state) => ({
          energy: Math.min(GAME_CONFIG.ENERGY_MAX, state.energy + amount),
        }));
      },

      // Système de flags
      setFlag: (key, value) => {
        set((state) => ({
          flags: { ...state.flags, [key]: value },
        }));
      },

      getFlag: (key) => {
        return get().flags[key];
      },

      checkCondition: (condition) => {
        // Évaluer une condition simple (ex: "Mia > 60" ou "flag:met_julien")
        const { relationships, flags } = get();
        
        // Condition sur relation
        const relationMatch = condition.match(/(\w+)\s*([><]=?|==)\s*(\d+)/);
        if (relationMatch) {
          const [, char, operator, value] = relationMatch;
          const charValue = relationships[char] || 0;
          const targetValue = parseInt(value, 10);
          
          switch (operator) {
            case '>': return charValue > targetValue;
            case '>=': return charValue >= targetValue;
            case '<': return charValue < targetValue;
            case '<=': return charValue <= targetValue;
            case '==': return charValue === targetValue;
            default: return false;
          }
        }
        
        // Condition sur flag
        const flagMatch = condition.match(/flag:(\w+)/);
        if (flagMatch) {
          const flagKey = flagMatch[1];
          return !!flags[flagKey];
        }
        
        return true;
      },

      // Historique des dialogues
      addToHistory: (sceneId, dialogue) => {
        set((state) => ({
          dialogueHistory: [...state.dialogueHistory, { sceneId, dialogue }].slice(-100), // Garder les 100 derniers
        }));
      },

      clearHistory: () => {
        set({ dialogueHistory: [] });
      },

      // Modes de jeu
      toggleSkipMode: () => {
        set((state) => ({ isSkipMode: !state.isSkipMode, isAutoMode: false }));
      },

      toggleAutoMode: () => {
        set((state) => ({ isAutoMode: !state.isAutoMode, isSkipMode: false }));
      },

      // Notifications
      showNotification: (message, type = 'info') => {
        if (type === 'success' || type === 'info') {
          AudioManager.play('success');
        }
        if (type === 'error' || type === 'warning') {
          AudioManager.play('error');
        }
        set({ notification: { message, type, id: Date.now() } });
      },

      clearNotification: () => {
        set({ notification: null });
      },

      // Téléphone
      openPhone: (conversationId) => {
        set({ 
          showPhone: true,
          activePhoneConversation: conversationId || null,
        });
      },

      closePhone: () => {
        set({ showPhone: false, activePhoneConversation: null });
      },

      addPhoneMessage: (conversationId, message) => {
        set((state) => ({
          phoneConversations: state.phoneConversations.map((conv) =>
            conv.id === conversationId
              ? { ...conv, messages: [...conv.messages, message] }
              : conv
          ),
        }));
      },

      createPhoneConversation: (conversation) => {
        set((state) => ({
          phoneConversations: [...state.phoneConversations, conversation],
        }));
      },

      markConversationRead: (conversationId) => {
        set((state) => ({
          phoneConversations: state.phoneConversations.map((conv) =>
            conv.id === conversationId ? { ...conv, unread: 0 } : conv
          ),
        }));
      },

      initializeTestConversations: () => {
        // Créer des conversations de test si elles n'existent pas déjà
        const state = get();
        if (state.phoneConversations.length === 0) {
          const testConversations: PhoneConversation[] = [
            {
              id: 'conv_mia',
              contactId: 'mia',
              contactName: 'Mia',
              contactIcon: '/phone/icons/vanessa.png',
              messages: [
                {
                  id: 'msg_1',
                  sender: 'Mia',
                  text: 'Hey ! Comment ça va ?',
                  timestamp: Date.now() - 3600000,
                },
                {
                  id: 'msg_2',
                  sender: 'Mia',
                  text: 'On se voit ce soir pour le projet ?',
                  timestamp: Date.now() - 1800000,
                },
              ],
              unread: 2,
            },
          ];
          set({ phoneConversations: testConversations });
        }
      },

      // Boutique
      buyTickets: (pack) => {
        const amount = pack === 'small' ? 5 : 15;
        get().addEnergy(amount);
        get().showNotification(`+${amount} tickets ajoutés !`, 'success');
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

