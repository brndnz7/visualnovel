import React from 'react';
import { Coins } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const ShopScreen: React.FC = () => {
  const { coins, buyTickets, goBack } = useGameStore((s) => ({
    coins: s.coins,
    buyTickets: s.buyTickets,
    goBack: s.goBack,
  }));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-cyan-200 to-blue-200 dark:from-gray-700 dark:to-blue-900 text-white animate-fadeIn">
      <h2 className="text-4xl text-shadow-lg mb-2">Boutique</h2>
      <div className="flex items-center gap-2 text-2xl mb-8">
        <Coins className="text-yellow-400" />
        <span>{coins}</span>
      </div>
      <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-xl p-6 space-y-4">
        <h3 className="text-2xl font-bold text-center mb-4">Acheter des tickets</h3>
        
        <div className="shop-item" onClick={() => buyTickets('small')}>
          <div>
            <p className="font-bold text-lg">Pack de 5 tickets</p>
            <p className="text-sm opacity-80">Pour continuer l'aventure</p>
          </div>
          <span className="shop-price">
            100 <Coins size={16} />
          </span>
        </div>

        <div className="shop-item" onClick={() => buyTickets('large')}>
          <div>
            <p className="font-bold text-lg">Pack de 15 tickets</p>
            <p className="text-sm opacity-80">Le meilleur rapport qualité-prix !</p>
          </div>
          <span className="shop-price">
            250 <Coins size={16} />
          </span>
        </div>
      </div>
      <button
        onClick={goBack}
        className="mt-8 menu-button bg-gray-500/50 hover:bg-gray-500/80 max-w-xs"
      >
        Retour
      </button>
    </div>
  );
};

