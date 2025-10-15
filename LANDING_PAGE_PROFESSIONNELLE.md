# 🎮 Landing Page Professionnelle - Dissonance

## ✅ Implémentation Complète

### 🎯 Objectif
Créer une page d'accueil immersive et professionnelle qui capte l'attention des joueurs dès leur arrivée, présente l'univers du jeu, les personnages principaux, et incite à commencer l'histoire.

---

## 📋 Structure de la Page

### Section 0 : Header Navigation (Sticky)
**Position :** Fixe en haut de la page
**Contenu :**
- Logo "Dissonance" (cliquable, retour en haut)
- Navigation : "L'Histoire", "Personnages", "Jouer Maintenant"
- Menu utilisateur (connexion / compte)
- Icônes réseaux sociaux (Twitter, Instagram)

**Caractéristiques :**
- Semi-transparent avec effet `backdrop-blur`
- Devient opaque avec ombre lors du défilement
- Transition fluide

---

### Section 1 : Hero - "Bienvenue à Starlight University"
**Background :** `/ressources/VN backgrounds FHD/Salon 1.png`
**Effet :** Parallax avec `background-attachment: fixed`

**Contenu :**
```
BIENVENUE À STARLIGHT UNIVERSITY

Vos études, vos amitiés, vos amours...
Et si tout était déjà écrit ?
Ou si vous aviez le pouvoir de tout réécrire ?

[BOUTON: COMMENCER L'HISTOIRE]
```

**Éléments visuels :**
- Superposition dégradée (gradient noir)
- Titre gigantesque avec ombre portée
- Bouton CTA proéminent avec hover effect
- Icône de défilement animée en bas

---

### Section 2 : La Fissure - "Une Anomalie s'est Éveillée"
**Background :** `/ressources/VN backgrounds FHD/Pasillo 2.png` (FOND PRINCIPAL DEMANDÉ)
**Effet :** Parallax avec overlay sombre

**Contenu :**
```
UNE ANOMALIE S'EST ÉVEILLÉE.

"L'Université Starlight n'est pas une école comme les autres.
Construite sur un secret ancien, ses murs abritent une puissance
qui déforme la réalité et tisse le destin de ses étudiants.
Vous êtes sur le point de la découvrir."
```

**Caractéristiques :**
- Titre en rose/pink (#ec4899)
- Texte narratif grand et immersif
- Ambiance mystérieuse

---

### Section 3 : Personnages - "Trois Destins. Une Seule Vérité."
**Background :** Gradient noir/violet (`from-black via-purple-950/20 to-black`)

**Contenu :**
Trois cartes interactives pour :

#### 1. Mia
- Citation : "Et si on rendait le monde un peu plus joyeux ?"
- Bio (révélée au hover) : "L'âme du groupe, son énergie cache un lourd héritage familial lié aux secrets de l'université."

#### 2. Alex
- Citation : "Le chaos, c'est juste une autre forme de création."
- Bio : "Un artiste talentueux dont la créativité semble attirer la chance et le malheur. Est-il une source ou une victime de l'anomalie ?"

#### 3. Julien
- Citation : "Chaque problème a une solution logique. Il suffit de la trouver."
- Bio : "Un esprit brillant qui refuse de croire au surnaturel, mais dont les recherches sur les 'improbabilités statistiques' du campus le rapprochent dangereusement de la vérité."

**Interactivité :**
- Hover : Zoom léger, bordure blanche, background plus clair
- Affichage de la biographie au survol
- Animations fluides

---

### Section 4 : Mécaniques - "Tissez Votre Propre Histoire"
**Background :** `/ressources/VN backgrounds FHD/Cafeteria 1.png`
**Effet :** Parallax avec overlay noir (`bg-black/80`)

**Contenu :**
Trois features avec icônes :

1. **❤️ Des choix qui comptent**
   - "Vos décisions changent radicalement le cours de l'histoire et la fin que vous obtiendrez."

2. **⚡ Influencez le Destin**
   - "Utilisez votre pouvoir pour protéger, manipuler ou observer. Mais chaque action a un prix."

3. **👥 Des Relations Profondes**
   - "Créez des liens puissants avec des personnages complexes dont le futur dépend de vous."

**Style :**
- Icônes grandes (64px) en rose
- Texte centré, lisible
- Espacement généreux

---

### Section 5 : Call-to-Action Final
**Background :** `/ressources/VN backgrounds FHD/Salon 3.png`
**Effet :** Parallax avec overlay sombre

**Contenu :**
```
L'HISTOIRE EST ÉCRITE.
LA FIN VOUS APPARTIENT.

"Plongez dans un thriller narratif où vos choix forgent votre destinée
et celle de ceux qui vous entourent. L'Université Starlight vous attend."

[BOUTONS]
- NOUVELLE PARTIE (gradient rose/violet)
- CONTINUER (si sauvegarde existe)
- CHARGER (accès aux sauvegardes)

[BOUTONS SECONDAIRES]
- Chapitres
- Options
- Boutique
```

**Caractéristiques :**
- Boutons principaux très grands avec effets hover
- Boutons secondaires plus discrets avec `backdrop-blur`
- Version du jeu affichée

---

### Section 6 : Footer
**Background :** Noir avec bordure supérieure

**Contenu :**
- Icônes réseaux sociaux
- Copyright : "V1.0 • Dissonance © 2025 • Tous droits réservés"
- Liens : Contact, Support

---

## 🎨 Design System

### Couleurs Principales
- **Rose principal :** `#ec4899` (pink-500)
- **Rose hover :** `#be185d` (pink-700)
- **Violet :** `#a855f7` (purple-600)
- **Blanc transparent :** `rgba(255, 255, 255, 0.1)` à `0.3`
- **Noir overlay :** `rgba(0, 0, 0, 0.6)` à `0.8`

### Typographie
- **Font principale :** 'Quicksand', sans-serif
- **Tailles :**
  - Titre hero : `text-6xl md:text-8xl` (96px)
  - Titre section : `text-5xl md:text-7xl` (72px)
  - Sous-titre : `text-2xl md:text-3xl` (30px)
  - Texte : `text-xl md:text-2xl` (24px)

### Effets
- **Text Shadow :** `0 4px 20px rgba(0,0,0,0.8)`
- **Backdrop Blur :** `backdrop-blur-md` / `backdrop-blur-lg`
- **Transitions :** `transition-all duration-300`
- **Hover Scale :** `transform hover:scale-105`

---

## 🚀 Fonctionnalités Implémentées

### ✅ Navigation Fluide
- Scroll smooth vers les sections
- Header sticky avec changement d'apparence
- Indicateur de défilement (chevron animé)

### ✅ Interactivité
- Cartes personnages avec hover effects
- Boutons avec transformations
- Menu utilisateur dropdown
- Modal sauvegardes cloud

### ✅ Responsive
- Mobile-first approach
- Grid adaptatif (1 colonne mobile, 3 desktop)
- Textes redimensionnés selon viewport
- Navigation cachée sur mobile (à compléter avec menu burger)

### ✅ Authentification
- Bouton connexion pour invités
- Menu compte pour utilisateurs connectés
- Intégration Firebase Auth

---

## 📁 Fichiers Modifiés

### 1. `src/screens/MainMenu.tsx`
- **Réécriture complète** avec structure scrollable
- 5 sections principales + header + footer
- Intégration authentification et sauvegardes
- Animations et effets visuels

### 2. `src/store/gameStore.ts`
- GameState initial : `'Auth'`
- Gestion utilisateur Firebase

### 3. `src/config/game.ts`
- Types `GameState` mis à jour

### 4. `src/App.tsx`
- Suppression de `LandingPage` séparée
- Tout intégré dans `MainMenu`

---

## 🎯 Points Forts

1. **✅ Pas de néons** - Design sobre avec rose/violet
2. **✅ Fond Pasillo 2** - Utilisé dans la section "Fissure"
3. **✅ Scrollable** - Navigation fluide entre sections
4. **✅ Professionnelle** - Inspirée d'Amour Sucré NewGen
5. **✅ Immersive** - Parallax, animations, effets visuels
6. **✅ Informative** - Histoire, personnages, mécaniques expliqués
7. **✅ Conversion** - Multiples CTA pour commencer à jouer

---

## 🔄 Améliorations Futures Possibles

### Images Personnages
- Remplacer les emojis 👤 par de vraies illustrations
- Sprites de Mia, Alex, Julien

### Menu Mobile
- Burger menu pour navigation sur petit écran
- Bottom navigation alternative

### Animations Avancées
- Particles.js pour effet étoiles
- Animations GSAP pour transitions
- Scroll reveal pour apparition progressive

### Vidéo Hero
- Remplacer background statique par vidéo loop du campus

### Localisation
- Support multilingue (EN/FR)
- Détection automatique de la langue

---

## 💡 Utilisation

### Démarrage
```bash
npm run dev
```

### Navigation
- **Page d'authentification** → Se connecter ou continuer en invité
- **MainMenu (Landing Page)** → Scroll pour découvrir
- **Bouton "Jouer Maintenant"** → Lance le jeu
- **Sections** → Navigation via header ou scroll

### Chemins des Images
Tous les backgrounds sont dans :
```
/ressources/VN backgrounds FHD/
├── Salon 1.png (Hero)
├── Pasillo 2.png (Fissure) ← PRINCIPAL
├── Cafeteria 1.png (Mécaniques)
└── Salon 3.png (CTA Final)
```

---

## 🎉 Résultat Final

Une **landing page professionnelle et immersive** qui :
- ✅ Présente l'univers de Starlight University
- ✅ Intrigue avec le mystère de l'anomalie
- ✅ Présente les 3 personnages principaux
- ✅ Explique les mécaniques de jeu
- ✅ Incite à jouer avec des CTA clairs
- ✅ Utilise le fond Pasillo 2 comme demandé
- ✅ Pas de néons, design sobre et élégant

**Le joueur peut maintenant comprendre le jeu avant même de commencer !** 🚀

