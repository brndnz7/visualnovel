import React, { useEffect, Suspense } from 'react';
import { useGameStore } from './store/gameStore';
import { MainMenu } from './screens/MainMenu';
import { NamingScreen } from './screens/NamingScreen';
import { CustomizationScreen } from './screens/CustomizationScreen';
import { GenderSelectionScreen } from './screens/GenderSelectionScreen';
import { CharacterCreatorScreen } from './screens/CharacterCreatorScreen';
import { GameScene } from './screens/GameScene';
import { SettingsScreen } from './screens/SettingsScreen';
import { ShopScreen } from './screens/ShopScreen';
import { ChapterSelect } from './screens/ChapterSelect';
import { SaveLoadScreen } from './screens/SaveLoadScreen';
import { Notification } from './components/Notification';
import { Phone } from './components/Phone';
import { OrientationWarning } from './components/OrientationWarning';
import './styles/global.css';

const App: React.FC = () => {
  const gameState = useGameStore((state) => state.gameState);
  const saveLoadMode = useGameStore((state) => state.saveLoadMode);
  const theme = useGameStore((state) => state.settings.theme);
  const rechargeEnergy = useGameStore((state) => state.rechargeEnergy);
  const showPhone = useGameStore((state) => state.showPhone);
  const activePhoneConversation = useGameStore((state) => state.activePhoneConversation);
  const closePhone = useGameStore((state) => state.closePhone);

  // Appliquer le thème
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Recharger l'énergie périodiquement
  useEffect(() => {
    const interval = setInterval(rechargeEnergy, 60000); // Chaque minute
    return () => clearInterval(interval);
  }, [rechargeEnergy]);

  // Rendu de l'écran actuel
  const renderGameState = () => {
    switch (gameState) {
      case 'Naming':
        return <NamingScreen />;
      case 'Customization':
        return <CustomizationScreen />;
      case 'GenderSelection':
        return <GenderSelectionScreen />;
      case 'CharacterCreator':
        return <CharacterCreatorScreen />;
      case 'Playing':
        return <GameScene />;
      case 'Settings':
        return <SettingsScreen />;
      case 'Shop':
        return <ShopScreen />;
      case 'ChapterSelect':
        return <ChapterSelect />;
      case 'SaveLoad':
        return <SaveLoadScreen mode={saveLoadMode} />;
      default:
        return <MainMenu />;
    }
  };

  return (
    <main className="w-screen h-screen bg-gray-900 text-white overflow-hidden select-none">
      <OrientationWarning />
      <Notification />
      {showPhone && <Phone onClose={closePhone} conversationId={activePhoneConversation || undefined} />}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
            <div className="text-4xl text-white text-shadow-lg animate-pulse">
              Chargement...
            </div>
          </div>
        }
      >
        {renderGameState()}
      </Suspense>
    </main>
  );
};

export default App;

