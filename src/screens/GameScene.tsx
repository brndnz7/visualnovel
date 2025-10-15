import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, Smartphone } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { SceneBackground } from '../components/SceneBackground';
import { CharacterPortrait } from '../components/CharacterPortrait';
import { DialogueBox } from '../components/DialogueBox';
import { ChoiceButton } from '../components/ChoiceButton';
import { RelationshipButton } from '../components/RelationshipButton';
import { EnergyHUD } from '../components/EnergyHUD';
import { GameControls } from '../components/GameControls';
import { DialogueHistory } from '../components/DialogueHistory';
import { PauseMenu } from '../components/PauseMenu';
import { AnimatedEmoticon, EMOTICON_MAP } from '../components/AnimatedEmoticon';
import { getAllScenes } from '../data/episodeLoader';
import charactersData from '../data/characters.json';

interface Scene {
  background: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
  dialogues: Array<{
    speaker: string;
    text: string;
    position?: 'left' | 'right';
    expression?: string;
    emoticon?: string;
  }>;
  choices: Array<{
    text: string;
    next: string;
    effects?: Record<string, number>;
    condition?: string;
    autoAdvance?: boolean;
    delay?: number;
  }>;
}

export const GameScene: React.FC = () => {
  const currentSceneId = useGameStore((s) => s.currentSceneId);
  const makeChoice = useGameStore((s) => s.makeChoice);
  const playerName = useGameStore((s) => s.playerName);
  const textSpeed = useGameStore((s) => s.settings.textSpeed);
  const isSkipMode = useGameStore((s) => s.isSkipMode);
  const isAutoMode = useGameStore((s) => s.isAutoMode);
  const addToHistory = useGameStore((s) => s.addToHistory);
  const checkCondition = useGameStore((s) => s.checkCondition);
  const setGameState = useGameStore((s) => s.setGameState);
  const openPhone = useGameStore((s) => s.openPhone);
  const phoneConversations = useGameStore((s) => s.phoneConversations);

  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [activeEmoticon, setActiveEmoticon] = useState<number | null>(null);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  // Charger toutes les scènes (épisodes 1, 2, 3)
  const allScenes = useMemo(() => getAllScenes() as unknown as Record<string, Scene>, []);
  const scene = allScenes[currentSceneId];

  // Effect pour rediriger si scène introuvable (AVANT le return conditionnel)
  useEffect(() => {
    if (!scene && currentSceneId !== 'main_menu') {
      console.error(`Scène introuvable: ${currentSceneId}`);
      setGameState('MainMenu');
    }
  }, [scene, currentSceneId, setGameState]);

  useEffect(() => {
    if (!scene) return;
    setDialogueIndex(0);
    setShowChoices(false);
    
    // Effet de fondu entrant si la scène le demande
    if (scene?.fadeIn) {
      setFadeOpacity(0);
      setTimeout(() => setFadeOpacity(1), 50);
    } else {
      // Réinitialiser l'opacité pour les scènes normales
      setFadeOpacity(1);
    }
  }, [currentSceneId, scene]);

  // Définir les variables avant les useEffects qui les utilisent
  const activeDialogue = scene?.dialogues[dialogueIndex];
  const currentSpeaker = activeDialogue ? activeDialogue.speaker : null;

  // Afficher l'émoticône si le dialogue en a une
  useEffect(() => {
    if (activeDialogue && activeDialogue.emoticon) {
      const emoticonName = activeDialogue.emoticon as keyof typeof EMOTICON_MAP;
      const emoticonId = EMOTICON_MAP[emoticonName];
      if (emoticonId) {
        setActiveEmoticon(emoticonId);
        // L'émoticône disparaîtra automatiquement après l'animation
        setTimeout(() => setActiveEmoticon(null), 5000);
      }
    }
  }, [activeDialogue]);

  const handleNext = useCallback(() => {
    if (!scene) return;
    if (dialogueIndex < scene.dialogues.length - 1) {
      setDialogueIndex((i) => i + 1);
    } else {
      setShowChoices(true);
      // Désactiver le skip mode quand on arrive aux choix
      if (isSkipMode) {
        useGameStore.getState().toggleSkipMode();
      }
    }
  }, [dialogueIndex, scene, isSkipMode]);

  // Ajouter le dialogue actuel à l'historique
  useEffect(() => {
    if (scene && scene.dialogues[dialogueIndex]) {
      addToHistory(currentSceneId, scene.dialogues[dialogueIndex]);
    }
  }, [currentSceneId, dialogueIndex, scene, addToHistory]);

  // Trouver tous les personnages dans la scène
  const sceneCharacters = useMemo(() => {
    if (!scene) return [];
    const speakers = new Set(scene.dialogues.map((d) => d.speaker));
    return Array.from(speakers).filter((speakerId) => charactersData[speakerId as keyof typeof charactersData]);
  }, [scene]);

  // Filtrer les choix selon les conditions
  const availableChoices = useMemo(() => {
    if (!scene) return [];
    return scene.choices.filter((choice) => {
      if (!choice.condition) return true;
      return checkCondition(choice.condition);
    });
  }, [scene, checkCondition]);

  // Mode Auto : avancer automatiquement
  useEffect(() => {
    if (isAutoMode && !showChoices && activeDialogue) {
      // Calculer le temps nécessaire pour afficher tout le texte + pause de 3 secondes
      const textLength = activeDialogue.text.length;
      const typingDuration = textLength * textSpeed;
      const pauseDuration = 3000; // 3 secondes de pause après la fin
      const totalDuration = typingDuration + pauseDuration;
      
      const timer = setTimeout(() => {
        handleNext();
      }, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [isAutoMode, dialogueIndex, showChoices, activeDialogue, textSpeed, handleNext]);

  // Auto-avancement pour les transitions entre épisodes
  useEffect(() => {
    if (showChoices && availableChoices.length > 0) {
      const autoChoice = availableChoices.find(c => c.autoAdvance);
      if (autoChoice) {
        const delay = autoChoice.delay || 3000;
        
        // Fondu sortant si la scène le demande
        if (scene?.fadeOut) {
          const fadeOutTimer = setTimeout(() => {
            setFadeOpacity(0);
          }, delay - 1500); // Commence le fondu 1.5s avant la transition
          
          const transitionTimer = setTimeout(() => {
            makeChoice(autoChoice);
          }, delay);
          
          return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(transitionTimer);
          };
        } else {
          const timer = setTimeout(() => {
            makeChoice(autoChoice);
          }, delay);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [showChoices, availableChoices, makeChoice, scene]);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showHistory || showPause) return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          if (showChoices && availableChoices.length === 1) {
            makeChoice(availableChoices[0]);
          } else if (!showChoices) {
            handleNext();
          }
          break;
        case 'Escape':
          setShowPause(true);
          break;
        case 'h':
        case 'H':
          setShowHistory(true);
          break;
        case 's':
        case 'S':
          useGameStore.getState().toggleSkipMode();
          break;
        case 'a':
        case 'A':
          useGameStore.getState().toggleAutoMode();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          if (showChoices) {
            const choiceIndex = parseInt(e.key) - 1;
            if (availableChoices[choiceIndex]) {
              makeChoice(availableChoices[choiceIndex]);
            }
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showChoices, availableChoices, handleNext, makeChoice, showHistory, showPause]);

  // Vérification finale : afficher un message si pas de scène
  if (!scene) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-900 to-purple-900">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* Couche de fondu noir */}
      <div 
        className="absolute inset-0 bg-black z-50 pointer-events-none transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: fadeOpacity === 0 ? 1 : 0 }}
      />
      
      {/* Contenu de la scène */}
      <div 
        className="w-full h-full relative overflow-hidden transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: fadeOpacity }}
      >
        <SceneBackground backgroundId={scene.background} />

      {/* Logique d'affichage des personnages */}
      {(() => {
        // Si le joueur parle, l'afficher seul au centre
        if (currentSpeaker === 'Player') {
          return <CharacterPortrait key="Player" characterId="Player" position="center" isActive={true} />;
        }
        
        // Si un autre personnage parle
        if (sceneCharacters.length === 1) {
          // Un seul personnage : joueur à gauche, personnage à droite
          return (
            <>
              <CharacterPortrait key="Player" characterId="Player" position="left" isActive={false} />
              <CharacterPortrait
                key={sceneCharacters[0]}
                characterId={sceneCharacters[0]}
                position="right"
                isActive={currentSpeaker === sceneCharacters[0]}
                expression={activeDialogue?.speaker === sceneCharacters[0] ? activeDialogue.expression : 'neutral'}
              />
            </>
          );
        }
        
        // Plusieurs personnages : afficher selon leur position définie
        return sceneCharacters.map((speakerId) => {
          const dialogueWithChar = scene.dialogues.find((d) => d.speaker === speakerId);
          const position = dialogueWithChar?.position || 'left';
          return (
            <CharacterPortrait
              key={speakerId}
              characterId={speakerId}
              position={position as 'left' | 'right' | 'center'}
              isActive={currentSpeaker === speakerId}
              expression={activeDialogue?.speaker === speakerId ? activeDialogue.expression : 'neutral'}
            />
          );
        });
      })()}

      {/* Émoticône animée - à côté de la tête du personnage */}
      {activeEmoticon && (
        <AnimatedEmoticon
          emoticonId={activeEmoticon}
          onComplete={() => setActiveEmoticon(null)}
          size="medium"
          position={currentSpeaker === 'Player' || sceneCharacters.length === 0 ? "center" : "topright"}
        />
      )}

      {/* Bouton Pause */}
      <button
        onClick={() => setShowPause(true)}
        className="absolute top-4 left-4 p-3 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/30 transition-all hover:scale-110 z-20"
        title="Menu Pause (Échap)"
      >
        <Menu size={24} className="text-white" />
      </button>

      {/* Bouton Téléphone */}
      {phoneConversations && phoneConversations.length > 0 && (
        <button
          onClick={() => openPhone()}
          className="absolute top-4 left-20 p-3 backdrop-blur-md rounded-full border border-white/30 transition-all hover:scale-110 z-20"
          style={{
            background: phoneConversations.some(c => c.unread && c.unread > 0)
              ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
              : 'rgba(0, 0, 0, 0.6)',
          }}
          title="Messages"
        >
          <Smartphone size={24} className="text-white" />
          {phoneConversations.some(c => c.unread && c.unread > 0) && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {phoneConversations.reduce((acc, c) => acc + (c.unread || 0), 0)}
            </span>
          )}
        </button>
      )}

      <RelationshipHUD />
      <EnergyHUD />
      <GameControls onShowHistory={() => setShowHistory(true)} />

      {/* Dialogue ou choix */}
      {!showChoices ? (
        <DialogueBox
          dialogue={activeDialogue}
          onNext={handleNext}
          textSpeed={textSpeed}
          playerName={playerName}
          isSkipMode={isSkipMode}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col gap-4 w-full max-w-md p-4">
            {availableChoices
              .filter(choice => !choice.autoAdvance) // Ne pas afficher les choix auto
              .map((choice, i) => (
                <ChoiceButton key={i} index={i} choice={choice} onChoice={makeChoice} />
              ))}
          </div>
        </div>
      )}

      {/* Historique des dialogues */}
      {showHistory && <DialogueHistory onClose={() => setShowHistory(false)} />}

      {/* Menu Pause */}
      {showPause && <PauseMenu onClose={() => setShowPause(false)} />}
      </div>
    </div>
  );
};

