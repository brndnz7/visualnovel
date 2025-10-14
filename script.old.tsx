import React, { useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Howl } from 'howler';
import { Heart, Settings, Play, RefreshCw, Star, Coins, Video, Sun, Moon, Volume2, VolumeX, User, ChevronsRight } from 'lucide-react';

// --- Configuration du jeu ---
const GAME_VERSION = '0.3.2'; // Version updated
const LOCAL_STORAGE_KEY = `sweetDestinySave_${GAME_VERSION}`;
const ENERGY_MAX = 5;
const ENERGY_RECHARGE_MINUTES = 10;

// --- Données du Scénario ---
const storyData = {
  "start": "scene_1",
  "scenes": {
    "scene_1": {
      "background": "classroom",
      "dialogues": [
        { "speaker": "Narrator", "text": "C'est votre premier jour à l'Université Starlight. Le campus est immense et un peu intimidant." },
        { "speaker": "Narrator", "text": "Vous entrez dans votre premier cours, cherchant une place libre." },
        { "speaker": "Mia", "text": "Salut ! Tu peux t'asseoir ici si tu veux. Je suis Mia.", "position": "left"},
        { "speaker": "Player", "text": "Oh, merci ! Je m'appelle {playerName}." }
      ],
      "choices": [
        { "text": "Lui sourire chaleureusement.", "next": "scene_2a", "effects": { "Mia": 5 } },
        { "text": "Juste hocher la tête, un peu timide.", "next": "scene_2b", "effects": { "Mia": 1 } },
        { "text": "Demander si le cours est difficile.", "next": "scene_2c", "effects": {} }
      ]
    },
    "scene_2a": { "background": "classroom", "dialogues": [{ "speaker": "Mia", "text": "Enchantée, {playerName} ! Ton sourire est super agréable.", "position": "left" }, { "speaker": "Narrator", "text": "Mia semble apprécier votre enthousiasme. Le cours commence." }], "choices": [{ "text": "Continuer", "next": "scene_3" }] },
    "scene_2b": { "background": "classroom", "dialogues": [{ "speaker": "Mia", "text": "Pas de souci. On est tous un peu perdus le premier jour.", "position": "left" }, { "speaker": "Narrator", "text": "Elle vous offre un petit sourire compréhensif. Le cours commence." }], "choices": [{ "text": "Continuer", "next": "scene_3" }] },
    "scene_2c": { "background": "classroom", "dialogues": [{ "speaker": "Mia", "text": "Haha, ça dépend du prof ! Mais on devrait s'en sortir. T'inquiète pas.", "position": "left" }, { "speaker": "Narrator", "text": "Sa réponse vous rassure un peu. Le cours commence." }], "choices": [{ "text": "Continuer", "next": "scene_3" }] },
    "scene_3": {
      "background": "hallway",
      "dialogues": [{ "speaker": "Narrator", "text": "Après le cours, vous croisez un garçon qui semble avoir fait tomber ses livres." }, { "speaker": "Alex", "text": "Oh non, pas encore...", "position": "right"}],
      "choices": [
        { "text": "L'aider à ramasser ses affaires.", "next": "scene_4a", "effects": { "Alex": 10 } },
        { "text": "L'ignorer et continuer son chemin.", "next": "scene_4b", "effects": { "Alex": -5, "Mia": -1 } },
        { "text": "Lui faire une petite blague.", "next": "scene_4c", "effects": { "Alex": 5 } }
      ]
    },
    "scene_4a": { "background": "hallway", "dialogues": [{ "speaker": "Player", "text": "Attends, je t'aide." }, { "speaker": "Alex", "text": "Oh, merci beaucoup ! C'est vraiment sympa. Je suis Alex.", "position": "right" }, { "speaker": "Player", "text": "Je suis {playerName}. Pas de problème." }, { "speaker": "Narrator", "text": "Il vous sourit, reconnaissant. Vous avez fait bonne impression." }], "choices": [{ "text": "Aller à la bibliothèque", "next": "scene_5" }] },
    "scene_4b": { "background": "hallway", "dialogues": [{ "speaker": "Narrator", "text": "Vous décidez de ne pas vous en mêler. Mia, qui a vu la scène, fronce les sourcils." }, { "speaker": "Mia", "text": "(à voix basse) Pas très cool, ça...", "position": "left" }, { "speaker": "Narrator", "text": "Vous sentez que votre image en a pris un coup." }], "choices": [{ "text": "Aller à la bibliothèque", "next": "scene_5" }] },
    "scene_4c": { "background": "hallway", "dialogues": [{ "speaker": "Player", "text": "Journée difficile ?" }, { "speaker": "Alex", "text": "Haha, on peut dire ça ! Merci. Je suis Alex.", "position": "right" }, { "speaker": "Narrator", "text": "Il semble apprécier votre humour. Il vous sourit en ramassant son dernier livre." }], "choices": [{ "text": "Aller à la bibliothèque", "next": "scene_5" }] },
    "scene_5": {
      "background": "library",
      "dialogues": [{ "speaker": "Narrator", "text": "Vous décidez de passer à la bibliothèque pour prendre de l'avance." }, { "speaker": "Narrator", "text": "L'endroit est calme et rempli de livres. Une atmosphère apaisante." }, { "speaker": "Julien", "text": "Excuse-moi, tu saurais où se trouve la section d'histoire de l'art ?", "position": "left" }],
      "choices": [
          { "text": "Lui indiquer le chemin.", "next": "scene_6a", "effects": { "Julien": 5 } },
          { "text": "Dire que vous ne savez pas.", "next": "scene_6b" }
      ]
    },
    "scene_6a": { "background": "library", "dialogues": [{ "speaker": "Player", "text": "Bien sûr, c'est juste au fond, sur la droite." }, { "speaker": "Julien", "text": "Super, merci ! Tu me sauves la vie. Je suis Julien.", "position": "left" }], "choices": [{ "text": "Aller se détendre au café", "next": "scene_cafe" }] },
    "scene_6b": { "background": "library", "dialogues": [{ "speaker": "Player", "text": "Désolé(e), je suis nouveau/nouvelle ici, je ne connais pas encore bien." }, { "speaker": "Julien", "text": "Ah, pas de problème. Merci quand même !", "position": "left" }], "choices": [{ "text": "Aller se détendre au café", "next": "scene_cafe" }] },
    "scene_cafe": {
      "background": "cafe",
      "dialogues": [
          {"speaker": "Narrator", "text": "Après ce travail studieux, vous décidez de faire une pause dans le café du campus."},
          {"speaker": "Narrator", "text": "L'odeur du café et le brouhaha ambiant vous détendent instantanément."},
          {"speaker": "Mia", "text": "Tiens, {playerName} ! On se recroise décidément partout.", "position": "left"},
          {"speaker": "Alex", "text": "Hey ! On parlait justement du cours de ce matin.", "position": "right"}
      ],
      "choices": [
          {"text": "Se joindre à eux", "next": "end_prototype", "effects": {"Mia": 2, "Alex": 2}},
          {"text": "Les saluer et prendre un café à emporter", "next": "end_prototype"}
      ]
    },
    "end_prototype": { "background": "park", "dialogues": [{ "speaker": "Narrator", "text": "Merci d'avoir joué à la démo de Sweet Destiny !" }, { "speaker": "Narrator", "text": "L'histoire continuera dans les prochaines mises à jour." }], "choices": [{ "text": "Retourner au menu principal", "next": "restart" }] }
  }
};

// --- Ressources du jeu ---
const characters = {
  'Mia': { name: 'Mia', image: 'https://tse3.mm.bing.net/th/id/OIP.1aSt7sYvye1zixc9R57IGAHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3' },
  'Alex': { name: 'Alex', image: 'https://cdn.imgbin.com/11/7/13/imgbin-visual-novel-character-protagonist-narrative-theme-others-4AfjdLDCYVZmPsccxmnNs1qiU.jpg' },
  'Julien': { name: 'Julien', image: 'https://img.itch.zone/aW1hZ2UvMTkzODIyNy8xMTM5Njc3NC5wbmc=/794x1000/HakPJ9.png' }
};

const playerAvatars = {
    'player_f_1': { image: 'https://w7.pngwing.com/pngs/800/412/png-transparent-highway-blossoms-alienworks-visual-novel-sprite-jeans-modernization-thumbnail.png' },
    'player_m_1': { image: 'https://e7.pngegg.com/pngimages/550/144/png-clipart-visual-novel-character-sprite-female-sprite-game-black-hair.png' },
};

const backgrounds = {
  'classroom': 'https://i.pinimg.com/originals/e1/5a/6a/e15a6a090b85292629aac028590b0d38.jpg',
  'hallway': 'https://c4.wallpaperflare.com/wallpaper/249/1013/317/anime-school-hallway-wallpaper-preview.jpg',
  'campus': 'https://i.pinimg.com/originals/03/79/a6/0379a633a69b724f849e7b1a13a7c6c4.jpg',
  'library': 'https://i.pinimg.com/736x/36/74/22/367422b10fd56974dba3424e52dfce0a.jpg',
  'park': 'https://i.pinimg.com/originals/a1/38/a7/a138a7b98f2b3e8e4a9040775d3369d7.jpg',
  'cafe': 'https://i.pinimg.com/originals/2c/3f/82/2c3f82e853a420b923984534f40f0c05.jpg'
};

const sounds = {
    click: new Howl({ src: ['data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+'dotOgg'] }),
    music: new Howl({ src: ['https://cdn.jsdelivr.net/gh/kewbish/FF7-music/01%20-%20Prelude.mp3'], loop: true, volume: 0.2, html5: true }),
    swoosh: new Howl({ src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA']}),
    success: new Howl({ src: ['data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQIAAAD6/z7/Pv8+/z4AAAAA/v8=']}),
    error: new Howl({ src: ['data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQIwAAABAMsA/wD/AP8A/wD/AP8A']})
};


// --- Gestion de l'état avec Zustand ---
const useGameStore = create(
  persist(
    (set, get) => ({
      gameState: 'MainMenu', // MainMenu, Naming, Customization, Playing, Settings, Shop
      playerName: '',
      playerAvatar: 'player_f_1',
      currentSceneId: storyData.start,
      relationships: { Mia: 50, Alex: 50, Julien: 50 },
      coins: 100,
      energy: ENERGY_MAX,
      lastEnergyUse: null,
      notification: null,
      settings: { theme: 'light', musicVolume: 0.2, sfxVolume: 0.5, textSpeed: 50 },

      // Actions
      setGameState: (newState) => {
        if (newState === 'Playing') sounds.swoosh.play();
        set({ gameState: newState })
      },
      setPlayerName: (name) => { if (name.trim()) set({ playerName: name.trim(), gameState: 'Customization' }); },
      setPlayerAvatar: (avatarId) => { set({ playerAvatar: avatarId, gameState: 'Playing' }); sounds.swoosh.play(); },
      startGame: () => { get().resetGameProgress(); set({ gameState: 'Naming' }); },
      continueGame: () => { if (get().playerName) { get().rechargeEnergy(); set({ gameState: 'Playing' }); } else { get().startGame(); } },
      makeChoice: (choice) => {
        const { energy, useEnergy, relationships, currentSceneId } = get();
        if (energy < 1) { get().showNotification("Pas assez d'énergie !", 'error'); return; }
        if (choice.next === 'restart') { get().setGameState('MainMenu'); return; }
        if(currentSceneId !== 'end_prototype') useEnergy();
        sounds.click.play();
        if (choice.effects) {
          const newRelationships = { ...relationships };
          for (const char in choice.effects) {
            const change = choice.effects[char];
            if (newRelationships[char] !== undefined) {
                newRelationships[char] = Math.max(0, Math.min(100, newRelationships[char] + change));
                if (change !== 0 && characters[char]) get().showNotification(`${characters[char].name} ${change > 0 ? '+' : ''}${change} ❤️`, change > 0 ? 'success' : 'warning');
            }
          }
          set({ relationships: newRelationships });
        }
        set({ currentSceneId: choice.next });
      },
      updateSettings: (newSettings) => {
        set((state) => ({ settings: { ...state.settings, ...newSettings } }));
        sounds.music.volume(get().settings.musicVolume);
        sounds.click.volume(get().settings.sfxVolume);
        sounds.swoosh.volume(get().settings.sfxVolume);
        sounds.success.volume(get().settings.sfxVolume);
        sounds.error.volume(get().settings.sfxVolume);
      },
      resetGameProgress: () => { set({ playerName: '', playerAvatar: 'player_f_1', currentSceneId: storyData.start, relationships: { Mia: 50, Alex: 50, Julien: 50 }, energy: ENERGY_MAX, lastEnergyUse: null }); },
      useEnergy: () => { set(state => ({ energy: Math.max(0, state.energy - 1), lastEnergyUse: state.energy === ENERGY_MAX ? Date.now() : state.lastEnergyUse })); },
      rechargeEnergy: () => {
          const { lastEnergyUse, energy } = get();
          if (energy >= ENERGY_MAX || !lastEnergyUse) return;
          const diffMinutes = (Date.now() - lastEnergyUse) / 60000;
          const energyToRecharge = Math.floor(diffMinutes / ENERGY_RECHARGE_MINUTES);
          if (energyToRecharge > 0) set(state => ({ energy: Math.min(ENERGY_MAX, state.energy + energyToRecharge), lastEnergyUse: Date.now() }));
      },
      addEnergy: (amount) => { set(state => ({ energy: Math.min(ENERGY_MAX, state.energy + amount) })) },
      buyTickets: (pack) => { const amount = pack === 'small' ? 5 : 15; get().addEnergy(amount); get().showNotification(`+${amount} tickets ajoutés !`, 'success'); },
      showNotification: (message, type = 'info') => {
        if (type === 'success' || type === 'info') sounds.success.play();
        if (type === 'error' || type === 'warning') sounds.error.play();
        set({ notification: { message, type, id: Date.now() } });
      },
      clearNotification: () => set({ notification: null }),
    }),
    { name: LOCAL_STORAGE_KEY, storage: createJSONStorage(() => localStorage) }
  )
);

// --- Composants UI ---

const SceneBackground = ({ backgroundId }) => {
  const bgUrl = backgrounds[backgroundId] || backgrounds['campus'];
  return (<div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 animate-fadeIn" style={{ backgroundImage: `url(${bgUrl})` }}><div className="absolute inset-0 bg-black/30"></div></div>);
};

const CharacterPortrait = ({ characterId, position, isActive }) => {
  const playerAvatarId = useGameStore(state => state.playerAvatar);
  const playerName = useGameStore(state => state.playerName);
  
  const char = useMemo(() => {
    if (characterId === 'Player') return { name: playerName, image: playerAvatars[playerAvatarId].image };
    return characters[characterId];
  }, [characterId, playerName, playerAvatarId]);

  if (!char) return null;

  const positionClasses = position === 'left' ? 'left-0 origin-bottom-left' : 'right-0 origin-bottom-right';
  const animationClass = position === 'left' ? 'animate-slideInLeft' : 'animate-slideInRight';

  return (
    <div className={`absolute bottom-0 h-[95%] w-[60%] md:w-[40%] ${positionClasses} flex items-end justify-center transition-all duration-500 ${animationClass} ${isActive ? 'scale-100 brightness-100' : 'scale-95 brightness-75'}`}>
      <img src={char.image} alt={char.name} className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" />
    </div>
  );
};

const Typewriter = ({ text, speed, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) { setDisplayedText(prev => prev + text.charAt(i)); i++; }
            else { clearInterval(intervalId); if (onComplete) onComplete(); }
        }, speed);
        return () => clearInterval(intervalId);
    }, [text, speed, onComplete]);
    return <p className="text-xl md:text-2xl text-shadow">{displayedText}<span className="animate-pulse">|</span></p>;
};

const DialogueBox = ({ dialogue, onNext, isTyping, textSpeed, playerName }) => {
    if (!dialogue) return null;
    const speakerInfo = characters[dialogue.speaker] || { name: dialogue.speaker };
    const processedText = dialogue.text.replace('{playerName}', playerName);
    return (
        <div className="absolute bottom-4 left-4 right-4 h-1/3 md:h-2/5 bg-black/70 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl flex flex-col justify-between animate-slideUp" onClick={onNext}>
            <div>
                {dialogue.speaker !== 'Narrator' && <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${dialogue.speaker === 'Player' ? 'text-pink-300' : 'text-cyan-300'} text-shadow-lg`}>{dialogue.speaker === 'Player' ? playerName : speakerInfo.name}</h3>}
                {isTyping ? <Typewriter text={processedText} speed={textSpeed} onComplete={onNext} /> : <p className="text-xl md:text-2xl text-shadow">{processedText}</p>}
            </div>
            {!isTyping && <div className="text-right text-pink-300 animate-pulse text-lg">Cliquer pour continuer...</div>}
        </div>
    );
};

const ChoiceButton = ({ choice, onChoice, index }) => (
    <button onClick={() => onChoice(choice)} className="choice-button" style={{ animationDelay: `${100 * index}ms` }}>
        {choice.text}
    </button>
);

const RelationshipHUD = () => {
    const relationships = useGameStore(state => state.relationships);
    return (
        <div className="absolute top-4 right-4 flex gap-4 bg-black/50 p-3 rounded-xl backdrop-blur-sm border border-white/20 animate-fadeIn">
            {Object.entries(relationships).map(([char, value]) => (<div key={char} className="flex items-center gap-2 text-white font-bold text-shadow"><Heart className="text-pink-400 drop-shadow-lg" size={24}/><span className="capitalize">{char}</span><span>{value}</span></div>))}
        </div>
    );
};

const EnergyHUD = () => {
    const energy = useGameStore(s => s.energy);
    const lastEnergyUse = useGameStore(s => s.lastEnergyUse);
    const addEnergy = useGameStore(s => s.addEnergy);
    const setGameState = useGameStore(s => s.setGameState);
    const showNotification = useGameStore(s => s.showNotification);
    
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (energy < ENERGY_MAX) {
            const interval = setInterval(() => { 
                const newTimeLeft = Math.max(0, (ENERGY_RECHARGE_MINUTES * 60) - (((Date.now() - (lastEnergyUse || Date.now())) / 1000) % (ENERGY_RECHARGE_MINUTES * 60)));
                setTimeLeft(newTimeLeft)
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [energy, lastEnergyUse]);

    const showAdReward = () => { showNotification("Chargement de la pub...", 'info'); setTimeout(() => { addEnergy(1); showNotification("+1 ticket obtenu !", 'success'); }, 2000); };
    const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`;
    
    return (
        <div className="absolute top-4 left-4 flex flex-col md:flex-row gap-4 items-start md:items-center bg-black/50 p-3 rounded-xl backdrop-blur-sm border border-white/20 text-white text-shadow animate-fadeIn">
            <div className="flex items-center gap-2"><Star className="text-yellow-400 drop-shadow-lg" size={24}/><span className="font-bold text-xl">{energy} / {ENERGY_MAX}</span></div>
            {energy < ENERGY_MAX && <div className="text-sm">Prochain dans : {formatTime(timeLeft)}</div>}
            <div className="flex gap-2">
                <button onClick={showAdReward} title="Regarder une pub pour 1 ticket" className="p-2 bg-pink-500/50 hover:bg-pink-500/80 rounded-full transition-colors"><Video size={20}/></button>
                <button onClick={() => setGameState('Shop')} title="Acheter des tickets" className="p-2 bg-cyan-500/50 hover:bg-cyan-500/80 rounded-full transition-colors"><Coins size={20}/></button>
            </div>
        </div>
    );
}

const Notification = () => {
    const notification = useGameStore(state => state.notification);
    const clearNotification = useGameStore(state => state.clearNotification);
    useEffect(() => { 
        if (notification) { 
            const timer = setTimeout(() => { 
                clearNotification(); 
            }, 3000); 
            return () => clearTimeout(timer); 
        } 
    }, [notification, clearNotification]);
    if (!notification) return null;
    const colors = { info: 'from-blue-500 to-cyan-500', success: 'from-green-500 to-emerald-500', warning: 'from-yellow-500 to-amber-500', error: 'from-red-500 to-rose-500' };
    return (<div className={`notification-anim fixed top-5 right-5 bg-gradient-to-r ${colors[notification.type]} text-white py-3 px-5 rounded-lg shadow-xl z-50 flex items-center gap-3`}><Heart size={20}/>{notification.message}</div>);
}

// --- Écrans du jeu ---

const MainMenu = () => {
  const startGame = useGameStore(s => s.startGame);
  const continueGame = useGameStore(s => s.continueGame);
  const setGameState = useGameStore(s => s.setGameState);
  const hasSave = useGameStore(state => !!state.playerName);
  
  useEffect(() => { 
      if (!sounds.music.playing()) {
          sounds.music.play(); 
      }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 dark:from-gray-800 dark:to-purple-900 animate-backgroundPan overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="z-10 text-center animate-fadeIn">
        <h1 className="text-6xl md:text-8xl font-bold text-white text-shadow-lg mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>Sweet Destiny</h1>
        <p className="text-xl text-white/80 mb-12 text-shadow">Une histoire dont vous êtes le héros/l'héroïne.</p>
        <div className="space-y-4 w-full max-w-xs mx-auto">
          <button onClick={startGame} className="menu-button animate-slideUp" style={{animationDelay: '200ms'}}><Play className="mr-2"/> Nouvelle Partie</button>
          {hasSave && (<button onClick={continueGame} className="menu-button animate-slideUp" style={{animationDelay: '300ms'}}><RefreshCw className="mr-2"/> Continuer</button>)}
          <button onClick={() => setGameState('Settings')} className="menu-button animate-slideUp" style={{animationDelay: '400ms'}}><Settings className="mr-2"/> Paramètres</button>
        </div>
      </div>
    </div>
  );
};

const NamingScreen = () => {
    const [name, setName] = useState('');
    const setPlayerName = useGameStore(s => s.setPlayerName);
    const setGameState = useGameStore(s => s.setGameState);
    const handleSubmit = (e) => { e.preventDefault(); setPlayerName(name); }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-gray-800 dark:to-purple-900 animate-fadeIn">
            <h2 className="text-4xl text-white text-shadow-lg mb-8 animate-slideUp">Comment vous appelez-vous ?</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4 animate-slideUp" style={{animationDelay: '200ms'}}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-xl text-center text-xl bg-white/30 text-white placeholder-white/70 border-2 border-transparent focus:border-white focus:outline-none transition-colors" placeholder="Entrez votre prénom" maxLength={15}/>
                <button type="submit" className="menu-button" disabled={!name.trim()}>Suivant <ChevronsRight className="ml-2"/></button>
                <button type="button" onClick={() => setGameState('MainMenu')} className="menu-button bg-gray-500/50 hover:bg-gray-500/80">Retour</button>
            </form>
        </div>
    )
}

const CustomizationScreen = () => {
    const setPlayerAvatar = useGameStore(s => s.setPlayerAvatar);
    const setGameState = useGameStore(s => s.setGameState);
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-200 to-indigo-300 dark:from-gray-800 dark:to-purple-900 animate-fadeIn">
            <h2 className="text-4xl text-white text-shadow-lg mb-8 animate-slideUp">Choisis ton apparence</h2>
            <div className="flex gap-8 animate-slideUp" style={{animationDelay: '200ms'}}>
                {Object.entries(playerAvatars).map(([id, { image }]) => (
                    <div key={id} onClick={() => setPlayerAvatar(id)} className="rounded-2xl overflow-hidden border-4 border-transparent hover:border-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-2xl">
                        <img src={image} alt={`Avatar ${id}`} className="w-48 h-72 object-cover"/>
                    </div>
                ))}
            </div>
             <button type="button" onClick={() => setGameState('Naming')} className="mt-8 menu-button bg-gray-500/50 hover:bg-gray-500/80 max-w-xs">Retour</button>
        </div>
    );
};

const GameScene = () => {
  const currentSceneId = useGameStore(s => s.currentSceneId);
  const makeChoice = useGameStore(s => s.makeChoice);
  const playerName = useGameStore(s => s.playerName);
  const textSpeed = useGameStore(s => s.settings.textSpeed);
  
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const scene = storyData.scenes[currentSceneId];

  useEffect(() => { 
    setDialogueIndex(0); 
    setShowChoices(false); 
    setIsTyping(true); 
  }, [currentSceneId]);

  const handleNext = useCallback(() => {
    if (isTyping) { 
        setIsTyping(false); 
        return; 
    }
    if (dialogueIndex < scene.dialogues.length - 1) { 
        setDialogueIndex(i => i + 1); 
        setIsTyping(true); 
    } else { 
        setShowChoices(true); 
    }
  }, [dialogueIndex, scene.dialogues.length, isTyping]);
  
  const activeDialogue = scene.dialogues[dialogueIndex];
  const currentSpeaker = activeDialogue ? activeDialogue.speaker : null;

  const sceneCharacters = useMemo(() => {
    const speakers = new Set(scene.dialogues.map(d => d.speaker));
    return Array.from(speakers).filter(speakerId => characters[speakerId]);
  }, [scene]);

  return (
    <div className="w-full h-full relative overflow-hidden">
        <SceneBackground backgroundId={scene.background} />
        
        {sceneCharacters.map(speakerId => (
            <CharacterPortrait 
                key={speakerId}
                characterId={speakerId}
                position={scene.dialogues.find(d => d.speaker === speakerId)?.position || 'left'}
                isActive={currentSpeaker === speakerId && currentSpeaker !== 'Player'}
            />
        ))}

        {currentSpeaker === 'Player' && (
             <CharacterPortrait
                key="Player"
                characterId="Player"
                position="left"
                isActive={true}
            />
        )}
        
        <RelationshipHUD />
        <EnergyHUD />
        { !showChoices ? <DialogueBox dialogue={activeDialogue} onNext={handleNext} isTyping={isTyping} textSpeed={textSpeed} playerName={playerName}/>
         : (<div className="absolute inset-0 flex items-center justify-center"><div className="flex flex-col gap-4 w-full max-w-md p-4">{scene.choices.map((choice, i) => (<ChoiceButton key={i} index={i} choice={choice} onChoice={makeChoice} />))}</div></div>)}
    </div>
  );
};

const SettingsScreen = () => {
    const { settings, updateSettings, setGameState, resetGameProgress } = useGameStore(s => ({ settings: s.settings, updateSettings: s.updateSettings, setGameState: s.setGameState, resetGameProgress: s.resetGameProgress }));

    const [confirmingReset, setConfirmingReset] = useState(false);
    const handleReset = () => { resetGameProgress(); setGameState('MainMenu'); }
    const toggleTheme = () => { updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' }); }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-gray-800 dark:to-purple-900 text-white animate-fadeIn">
            <h2 className="text-4xl text-shadow-lg mb-8">Paramètres</h2>
            <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-center"><label className="text-lg">Thème</label><button onClick={toggleTheme} className="p-2 rounded-full bg-white/20 hover:bg-white/40">{settings.theme === 'light' ? <Moon /> : <Sun />}</button></div>
                <div className="space-y-2"><label className="text-lg">Volume Musique</label><div className="flex items-center gap-2"><VolumeX/><input type="range" min="0" max="1" step="0.01" value={settings.musicVolume} onChange={e => updateSettings({ musicVolume: parseFloat(e.target.value)})} className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pink-400"/><Volume2/></div></div>
                <div className="space-y-2"><label className="text-lg">Volume Effets</label><div className="flex items-center gap-2"><VolumeX/><input type="range" min="0" max="1" step="0.01" value={settings.sfxVolume} onChange={e => updateSettings({ sfxVolume: parseFloat(e.target.value)})} className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pink-400"/><Volume2/></div></div>
                <div className="space-y-2"><label className="text-lg">Vitesse du texte</label><input type="range" min="10" max="100" step="10" value={110 - settings.textSpeed} onChange={e => updateSettings({ textSpeed: 110 - parseInt(e.target.value, 10)})} className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pink-400"/></div>
                {!confirmingReset ? (<button onClick={() => setConfirmingReset(true)} className="w-full p-3 bg-yellow-600/80 hover:bg-yellow-600/100 rounded-lg transition-colors font-bold">Recommencer la partie</button>) : (<div className="bg-red-500/20 p-4 rounded-lg text-center"><p className="mb-4">Êtes-vous sûr ? Votre sauvegarde sera effacée.</p><div className="flex gap-4 justify-center"><button onClick={() => setConfirmingReset(false)} className="px-4 py-2 bg-gray-500/50 hover:bg-gray-500/80 rounded-lg">Annuler</button><button onClick={handleReset} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold">Confirmer</button></div></div>)}
            </div>
            <button onClick={() => setGameState('MainMenu')} className="mt-8 menu-button bg-gray-500/50 hover:bg-gray-500/80">Retour au Menu</button>
        </div>
    )
}

const ShopScreen = () => {
    const { coins, buyTickets, setGameState } = useGameStore(s => ({ coins: s.coins, buyTickets: s.buyTickets, setGameState: s.setGameState }));

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-cyan-200 to-blue-200 dark:from-gray-700 dark:to-blue-900 text-white animate-fadeIn">
            <h2 className="text-4xl text-shadow-lg mb-2">Boutique</h2>
            <div className="flex items-center gap-2 text-2xl mb-8"><Coins className="text-yellow-400" /><span>{coins}</span></div>
            <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-xl p-6 space-y-4">
                <h3 className="text-2xl font-bold text-center mb-4">Acheter des tickets</h3>
                <div className="shop-item" onClick={() => buyTickets('small')}><div><p className="font-bold text-lg">Pack de 5 tickets</p><p className="text-sm opacity-80">Pour continuer l'aventure</p></div><span className="shop-price">100 <Coins size={16}/></span></div>
                <div className="shop-item" onClick={() => buyTickets('large')}><div><p className="font-bold text-lg">Pack de 15 tickets</p><p className="text-sm opacity-80">Le meilleur rapport qualité-prix !</p></div><span className="shop-price">250 <Coins size={16}/></span></div>
            </div>
            <button onClick={() => setGameState('Playing')} className="mt-8 menu-button bg-gray-500/50 hover:bg-gray-500/80">Retour au jeu</button>
        </div>
    );
};

// --- Composant principal de l'application ---
export default function App() {
  const gameState = useGameStore((state) => state.gameState);
  const theme = useGameStore((state) => state.settings.theme);
  const rechargeEnergy = useGameStore((state) => state.rechargeEnergy);

  useEffect(() => { 
    document.documentElement.className = theme; 
  }, [theme]);

  useEffect(() => { 
    const interval = setInterval(rechargeEnergy, 60000); 
    return () => clearInterval(interval); 
  }, [rechargeEnergy]);

  const renderGameState = () => {
    switch (gameState) {
      case 'Naming': return <NamingScreen />;
      case 'Customization': return <CustomizationScreen />;
      case 'Playing': return <GameScene />;
      case 'Settings': return <SettingsScreen />;
      case 'Shop': return <ShopScreen />;
      default: return <MainMenu />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Quicksand:wght@500;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        .text-shadow { text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }
        .text-shadow-lg { text-shadow: 2px 2px 5px rgba(0,0,0,0.6); }
        .menu-button { @apply w-full text-center bg-black/70 hover:bg-black/80 backdrop-blur-md text-white font-bold text-xl py-4 px-6 rounded-2xl border border-white/30 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center; }
        .choice-button { @apply w-full text-center bg-black/70 hover:bg-black/80 backdrop-blur-md text-white font-semibold text-lg py-4 px-6 rounded-xl border border-white/30 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300; animation: slideUp 0.5s ease-out forwards; }
        .shop-item { @apply flex justify-between items-center p-4 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors; }
        .shop-price { @apply flex items-center gap-1 font-bold px-3 py-1 bg-yellow-500/80 rounded-full; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
        .animate-slideInRight { animation: slideInRight 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
        .animate-backgroundPan { background-size: 400% 400%; animation: backgroundPan 15s ease infinite; }
        .notification-anim { animation: slideUp 0.5s ease-out, fadeIn 0.5s ease-out; }
      `}</style>
      <main className="w-screen h-screen bg-gray-900 text-white overflow-hidden select-none">
          <Notification />
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Chargement...</div>}>
              {renderGameState()}
          </Suspense>
      </main>
    </>
  );
}

