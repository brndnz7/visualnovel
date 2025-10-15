import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { AuthService } from '../services/authService';
import { useGameStore } from '../store/gameStore';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setUser = useGameStore((s) => s.setUser);
  const setGameState = useGameStore((s) => s.setGameState);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const user = await AuthService.signInWithGoogle();
      setUser({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Joueur',
        photoURL: user.photoURL || undefined
      });
      setGameState('MainMenu');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user;
      if (isLogin) {
        user = await AuthService.signInWithEmail(email, password);
      } else {
        if (!displayName.trim()) {
          setError('Veuillez entrer un nom d\'utilisateur');
          setLoading(false);
          return;
        }
        user = await AuthService.signUpWithEmail(email, password, displayName);
      }

      setUser({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || displayName || 'Joueur',
        photoURL: user.photoURL || undefined
      });
      setGameState('MainMenu');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipAuth = () => {
    // Créer un utilisateur invité temporaire
    setUser(null);
    setGameState('MainMenu');
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/backgrounds/Cafeteria 3.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/70" />
      {/* Grille de fond */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(236,72,153,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(236,72,153,0.08) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Glows */}
      <div className="absolute w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl -top-32 -left-32 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute w-[400px] h-[400px] bg-purple-400/25 rounded-full blur-3xl top-20 right-10 animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Dissonance
          </h1>
          <p className="text-gray-300 text-lg">
            {isLogin ? 'Connexion à votre compte' : 'Créer un compte'}
          </p>
        </div>

        {/* Carte d'authentification */}
        <div className="backdrop-blur-md rounded-2xl p-8 border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Bouton Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full p-4 rounded-xl font-semibold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 100%)',
              boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)',
            }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Connexion...' : 'Continuer avec Google'}
          </button>

          {/* Séparateur */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-300">Ou</span>
            </div>
          </div>

          {/* Formulaire Email */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 rounded-xl font-semibold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
              }}
            >
              {loading ? 'Chargement...' : (isLogin ? (
                <span className="flex items-center justify-center gap-2">
                  <LogIn size={20} />
                  Se connecter
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus size={20} />
                  Créer un compte
                </span>
              ))}
            </button>
          </form>

          {/* Basculer entre connexion et inscription */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors"
            >
              {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
          </div>

          {/* Option pour continuer sans compte */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <button
              onClick={handleSkipAuth}
              className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              Continuer sans compte (sauvegardes locales uniquement)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

