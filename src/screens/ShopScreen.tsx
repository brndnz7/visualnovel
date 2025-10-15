import React, { useState } from 'react';
import { Coins, X, Sparkles, Zap, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const ShopScreen: React.FC = () => {
  const coins = useGameStore((s) => s.coins);
  const buyTickets = useGameStore((s) => s.buyTickets);
  const goBack = useGameStore((s) => s.goBack);
  const [hoveredPack, setHoveredPack] = useState<string | null>(null);

  const shopItems = [
    {
      id: 'small',
      name: 'Pack Débutant',
      tickets: 5,
      price: 100,
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      description: 'Parfait pour continuer l\'aventure',
      badge: null,
    },
    {
      id: 'medium',
      name: 'Pack Avancé',
      tickets: 12,
      price: 220,
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      description: 'Économisez 20 pièces !',
      badge: 'POPULAIRE',
    },
    {
      id: 'large',
      name: 'Pack Premium',
      tickets: 25,
      price: 400,
      icon: Star,
      color: 'from-fuchsia-500 to-purple-500',
      description: 'Le meilleur rapport qualité-prix !',
      badge: 'MEILLEURE OFFRE',
    },
  ];

  const handlePurchase = (packId: string) => {
    const pack = shopItems.find(p => p.id === packId);
    if (!pack) return;
    
    if (coins >= pack.price) {
      buyTickets(packId as any);
    } else {
      // TODO: Show notification "Pas assez de pièces"
    }
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/backgrounds/Salon 2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Bouton fermer en haut à droite */}
      <button
        onClick={goBack}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all"
      >
        <X size={24} />
      </button>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-8 overflow-y-auto max-h-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            style={{ 
              fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            Boutique
          </h1>
          
          {/* Affichage des pièces */}
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/30">
            <Coins size={32} className="text-yellow-400" />
            <span className="text-3xl font-bold text-white">{coins}</span>
            <span className="text-xl text-white/80">pièces</span>
          </div>
        </div>

        {/* Grille des packs */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {shopItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredPack(item.id)}
              onMouseLeave={() => setHoveredPack(null)}
              className={`relative p-8 rounded-2xl backdrop-blur-md border-2 transition-all duration-300 cursor-pointer ${
                hoveredPack === item.id 
                  ? 'scale-105 border-white shadow-2xl' 
                  : 'border-white/30 hover:border-white/50'
              }`}
              style={{
                background: hoveredPack === item.id 
                  ? 'rgba(255, 255, 255, 0.15)' 
                  : 'rgba(0, 0, 0, 0.4)'
              }}
              onClick={() => handlePurchase(item.id)}
            >
              {/* Badge si présent */}
              {item.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <span className="text-xs font-bold text-white">{item.badge}</span>
                </div>
              )}

              {/* Icône */}
              <div className="flex justify-center mb-6">
                <div 
                  className={`p-6 rounded-full bg-gradient-to-br ${item.color}`}
                  style={{ boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)' }}
                >
                  <item.icon size={48} className="text-white" />
                </div>
              </div>

              {/* Nom du pack */}
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {item.name}
              </h3>

              {/* Nombre de tickets */}
              <div className="text-center mb-4">
                <span className="text-5xl font-bold text-white">{item.tickets}</span>
                <span className="text-xl text-white/80 ml-2">tickets</span>
              </div>

              {/* Description */}
              <p className="text-white/80 text-center mb-6 text-sm">
                {item.description}
              </p>

              {/* Prix */}
              <div className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-xl border border-white/30">
                <Coins size={20} className="text-yellow-400" />
                <span className="text-2xl font-bold text-white">{item.price}</span>
              </div>

              {/* Indication hover */}
              {hoveredPack === item.id && (
                <div className="mt-4 text-center">
                  <span className="text-sm text-white/90 font-semibold">
                    Cliquez pour acheter
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section info */}
        <div className="max-w-3xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-pink-500/20">
              <Sparkles size={24} className="text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Comment gagner des pièces ?
              </h3>
              <p className="text-white/80 leading-relaxed">
                Gagnez des pièces en progressant dans l'histoire, en faisant les bons choix, 
                et en complétant des objectifs. Les pièces peuvent être utilisées pour débloquer 
                des tenues exclusives et des scènes bonus !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
