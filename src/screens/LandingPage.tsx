import React, { useEffect, useState } from 'react';
import { Play, Heart, Sparkles, Users, Save, BookOpen, Image as ImageIcon, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { AudioManager } from '../utils/audio';

export const LandingPage: React.FC = () => {
  const setGameState = useGameStore((s) => s.setGameState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    AudioManager.playMusic();
    setMounted(true);
  }, []);

  return (
    <div 
      className="w-full h-full overflow-y-auto"
      style={{
        backgroundImage: 'url(/backgrounds/Pasillo 2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.4 + Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className={`text-center ${!mounted ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{ transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <h1
              className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white mb-6"
              style={{ 
                fontFamily: "'Quicksand', sans-serif",
                textShadow: '0 0 60px rgba(236, 72, 153, 1), 0 0 30px rgba(255, 255, 255, 0.8)',
                animation: 'glow 4s ease-in-out infinite',
              }}
            >
              Dissonance
            </h1>
            
            <div 
              className="h-2 w-[600px] max-w-full mx-auto rounded-full mb-12"
              style={{
                background: 'linear-gradient(90deg, transparent, #ec4899, #a855f7, #ec4899, transparent)',
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)',
              }}
            />

            <p className="text-4xl md:text-5xl text-white mb-6 font-bold">
              Vivez une histoire où vos choix comptent
            </p>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Un visual novel romantique et mystérieux où chaque décision façonne votre destin et vos relations
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => setGameState('MainMenu')}
                className="group relative px-12 py-5 rounded-2xl font-bold text-2xl text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #db2777)',
                  boxShadow: '0 10px 40px rgba(236, 72, 153, 0.6)',
                }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6, #ec4899)',
                    boxShadow: '0 0 40px rgba(236, 72, 153, 1)',
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <Play size={28} />
                  Commencer l'aventure
                </span>
              </button>

              <button
                onClick={() => {/* Scroll to features */}}
                className="px-10 py-5 rounded-2xl font-semibold text-xl text-white transition-all hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                En savoir plus
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4" style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(20px)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Une expérience unique
            </h2>
            <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
              Plongez dans un univers riche où chaque choix a des conséquences
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Relations Dynamiques",
                  desc: "Développez des liens profonds avec Mia, Alex et Julien. Vos interactions influencent l'histoire et débloquent des scènes exclusives.",
                  color: "#ec4899"
                },
                {
                  icon: Sparkles,
                  title: "Personnalisation Totale",
                  desc: "Créez votre personnage unique avec des centaines d'options : apparence, personnalité, style vestimentaire.",
                  color: "#a855f7"
                },
                {
                  icon: BookOpen,
                  title: "Histoire Ramifiée",
                  desc: "4 épisodes captivants avec des embranchements multiples. Vos choix mènent à différentes fins et révélations.",
                  color: "#3b82f6"
                },
                {
                  icon: Save,
                  title: "Sauvegardes Cloud",
                  desc: "Synchronisez votre progression et jouez sur n'importe quel appareil. Vos choix vous suivent partout.",
                  color: "#10b981"
                },
                {
                  icon: ImageIcon,
                  title: "Galerie d'Art",
                  desc: "Débloquez des illustrations spéciales et des CG romantiques selon vos relations et vos choix.",
                  color: "#f59e0b"
                },
                {
                  icon: Users,
                  title: "Multiples Fins",
                  desc: "Explorez différents parcours et découvrez toutes les fins possibles avec chaque personnage.",
                  color: "#ef4444"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${feature.color}40`,
                  }}
                >
                  <feature.icon size={48} className="mb-4" style={{ color: feature.color }} />
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personnages Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
              Rencontrez vos destins
            </h2>
            <p className="text-xl text-white/80 text-center mb-16">
              Trois personnages, trois histoires, des connexions inoubliables
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Mia", desc: "Mystérieuse et passionnée", trait: "La rêveuse" },
                { name: "Alex", desc: "Charismatique et protecteur", trait: "Le rebelle" },
                { name: "Julien", desc: "Intelligent et attentionné", trait: "L'érudit" }
              ].map((char, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl transition-all hover:scale-105"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(236, 72, 153, 0.3)',
                    minHeight: '400px',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60" />
                  <div className="relative p-8 h-full flex flex-col justify-end">
                    <h3 className="text-4xl font-bold text-white mb-2">{char.name}</h3>
                    <p className="text-pink-300 text-lg font-semibold mb-2">{char.trait}</p>
                    <p className="text-white/80 text-lg">{char.desc}</p>
                    <div className="mt-4 flex gap-2">
                      <Star size={20} className="text-yellow-400 fill-yellow-400" />
                      <Star size={20} className="text-yellow-400 fill-yellow-400" />
                      <Star size={20} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-32 px-4" style={{ background: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-2xl text-white/90 mb-12">
              Votre histoire commence maintenant. Chaque choix vous appartient.
            </p>

            <button
              onClick={() => setGameState('MainMenu')}
              className="group relative px-16 py-6 rounded-2xl font-bold text-3xl text-white transition-all hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #db2777)',
                boxShadow: '0 20px 60px rgba(236, 72, 153, 0.6)',
              }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #f472b6, #ec4899)',
                  boxShadow: '0 0 60px rgba(236, 72, 153, 1)',
                }}
              />
              <span className="relative flex items-center gap-4">
                <Play size={36} />
                Jouer maintenant
              </span>
            </button>

            <p className="mt-8 text-white/60">
              Gratuit • Aucune installation requise
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center text-white/50" style={{ background: 'rgba(0, 0, 0, 0.9)' }}>
          <p>V1.0 • Dissonance © 2025 • Tous droits réservés</p>
        </footer>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 30px rgba(236, 72, 153, 1));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(236, 72, 153, 1.5));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px) translateX(20px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

