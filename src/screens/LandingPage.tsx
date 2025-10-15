import React, { useEffect, useState } from 'react';
import { Play, ChevronDown, Twitter, Instagram, Heart, Zap, Users } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { AudioManager } from '../utils/audio';

export const LandingPage: React.FC = () => {
  const setGameState = useGameStore((s) => s.setGameState);
  const [scrolled, setScrolled] = useState(false);
  const [activeChar, setActiveChar] = useState<number | null>(null);

  useEffect(() => {
    AudioManager.playMusic();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-black">
      {/* Header Navigation Sticky */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Dissonance
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('histoire')} className="text-white/80 hover:text-white transition-colors">
              L'Histoire
            </button>
            <button onClick={() => scrollToSection('personnages')} className="text-white/80 hover:text-white transition-colors">
              Personnages
            </button>
            <button 
              onClick={() => setGameState('MainMenu')}
              className="px-6 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-colors"
            >
              Jouer Maintenant
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Twitter size={20} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
            <Instagram size={20} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
          </div>
        </nav>
      </header>

      {/* Section 1: Hero */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(/ressources/VN backgrounds FHD/Salon 1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in"
            style={{ 
              fontFamily: "'Quicksand', sans-serif",
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            BIENVENUE À STARLIGHT UNIVERSITY
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 mb-4">
            Vos études, vos amitiés, vos amours...
          </p>
          
          <p className="text-xl md:text-2xl text-white/80 mb-6">
            Et si tout était déjà écrit ?
          </p>

          <p className="text-2xl md:text-3xl text-pink-400 mb-12 font-semibold">
            Ou si vous aviez le pouvoir de tout réécrire ?
          </p>

          <button
            onClick={() => setGameState('MainMenu')}
            className="group relative px-12 py-5 bg-pink-600 hover:bg-pink-700 text-white text-xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl"
          >
            <span className="flex items-center gap-3">
              <Play size={24} />
              COMMENCER L'HISTOIRE
            </span>
          </button>
        </div>

        <button 
          onClick={() => scrollToSection('fissure')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={40} className="text-white/60" />
        </button>
      </section>

      {/* Section 2: La Fissure */}
      <section 
        id="fissure"
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(/ressources/VN backgrounds FHD/Pasillo 2.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold text-pink-500 mb-8">
              UNE ANOMALIE S'EST ÉVEILLÉE.
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              L'Université Starlight n'est pas une école comme les autres. Construite sur un secret ancien, 
              ses murs abritent une puissance qui déforme la réalité et tisse le destin de ses étudiants. 
              Vous êtes sur le point de la découvrir.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Personnages */}
      <section id="personnages" className="relative py-32 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-6">
            TROIS DESTINS. UNE SEULE VÉRITÉ.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                name: "Mia",
                quote: "Et si on rendait le monde un peu plus joyeux ?",
                bio: "L'âme du groupe, son énergie cache un lourd héritage familial lié aux secrets de l'université.",
                color: "from-pink-600 to-rose-600"
              },
              {
                name: "Alex",
                quote: "Le chaos, c'est juste une autre forme de création.",
                bio: "Un artiste talentueux dont la créativité semble attirer la chance et le malheur. Est-il une source ou une victime de l'anomalie ?",
                color: "from-purple-600 to-indigo-600"
              },
              {
                name: "Julien",
                quote: "Chaque problème a une solution logique. Il suffit de la trouver.",
                bio: "Un esprit brillant qui refuse de croire au surnaturel, mais dont les recherches sur les 'improbabilités statistiques' du campus le rapprochent dangereusement de la vérité.",
                color: "from-blue-600 to-cyan-600"
              }
            ].map((char, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveChar(i)}
                onMouseLeave={() => setActiveChar(null)}
                className={`relative p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer ${
                  activeChar === i 
                    ? 'scale-105 border-white shadow-2xl' 
                    : 'border-white/20 hover:border-white/40'
                }`}
                style={{
                  background: activeChar === i 
                    ? `linear-gradient(135deg, ${char.color.split(' ')[1].replace('to-', 'rgba(')}80, ${char.color.split(' ')[2].replace('-', ', 0.5)')}` 
                    : 'rgba(0, 0, 0, 0.6)'
                }}
              >
                <div className="h-64 bg-gradient-to-b from-white/10 to-transparent rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-3">{char.name}</h3>
                <p className="text-lg text-pink-300 italic mb-4">"{char.quote}"</p>
                
                {activeChar === i && (
                  <p className="text-white/80 text-sm leading-relaxed animate-fade-in">
                    {char.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Mécaniques */}
      <section 
        className="relative py-32"
        style={{
          backgroundImage: `url(/ressources/VN backgrounds FHD/Cafeteria 1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
            TISSEZ VOTRE PROPRE HISTOIRE
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Des choix qui comptent",
                desc: "Vos décisions changent radicalement le cours de l'histoire et la fin que vous obtiendrez."
              },
              {
                icon: Zap,
                title: "Influencez le Destin",
                desc: "Utilisez votre pouvoir pour protéger, manipuler ou observer. Mais chaque action a un prix."
              },
              {
                icon: Users,
                title: "Des Relations Profondes",
                desc: "Créez des liens puissants avec des personnages complexes dont le futur dépend de vous."
              }
            ].map((feature, i) => (
              <div key={i} className="text-center p-8">
                <feature.icon size={64} className="mx-auto mb-6 text-pink-500" />
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA Final */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(/ressources/VN backgrounds FHD/Salon 3.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
            L'HISTOIRE EST ÉCRITE.<br />LA FIN VOUS APPARTIENT.
          </h2>
          
          <p className="text-2xl text-white/90 mb-12 leading-relaxed">
            Plongez dans un thriller narratif où vos choix forgent votre destinée et celle de ceux qui vous entourent. 
            L'Université Starlight vous attend.
          </p>

          <button
            onClick={() => setGameState('MainMenu')}
            className="px-16 py-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-2xl font-bold rounded-xl transition-all transform hover:scale-110 shadow-2xl"
          >
            <span className="flex items-center gap-4">
              <Play size={32} />
              COMMENCER L'HISTOIRE
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Twitter size={24} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Instagram size={24} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
            </div>
            
            <p className="text-white/60 text-sm">
              V1.0 • Dissonance © 2025 • Tous droits réservés
            </p>
            
            <div className="flex gap-6">
              <button className="text-white/60 hover:text-white text-sm transition-colors">Contact</button>
              <button className="text-white/60 hover:text-white text-sm transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

