# Système d'Authentification et Sauvegarde Cloud - Dissonance

## 📋 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Configuration Firebase](#configuration-firebase)
3. [Architecture du système](#architecture-du-système)
4. [Fonctionnalités](#fonctionnalités)
5. [Utilisation](#utilisation)

---

## 🎯 Vue d'ensemble

Le jeu Dissonance intègre maintenant un système complet d'authentification et de sauvegarde en ligne utilisant **Firebase** (Google). Les joueurs peuvent :

- ✅ Se connecter avec Google (OAuth)
- ✅ Créer un compte avec email/mot de passe
- ✅ Sauvegarder leur progression en ligne (5 slots)
- ✅ Synchroniser leurs parties entre appareils
- ✅ Continuer sans compte (sauvegardes locales uniquement)

---

## 🔧 Configuration Firebase

### Étape 1 : Créer un projet Firebase

1. **Aller sur Firebase Console**
   - Ouvrir https://console.firebase.google.com/
   - Se connecter avec un compte Google

2. **Créer un nouveau projet**
   - Cliquer sur "Ajouter un projet"
   - Nom du projet : `dissonance-game` (ou autre)
   - Désactiver Google Analytics (optionnel)
   - Cliquer sur "Créer le projet"

### Étape 2 : Activer l'authentification

1. **Dans Firebase Console**
   - Menu latéral → **Authentication** (Authentification)
   - Onglet **Sign-in method** (Méthode de connexion)

2. **Activer Google**
   - Cliquer sur **Google**
   - Activer le fournisseur
   - Email du projet : utiliser votre email
   - Enregistrer

3. **Activer Email/Password**
   - Cliquer sur **Email/Password**
   - Activer "Email/Password"
   - Enregistrer

### Étape 3 : Créer une application Web

1. **Ajouter une application**
   - Dans la page d'accueil du projet
   - Cliquer sur l'icône **</>** (Web)
   - Nom de l'app : `Dissonance Web`
   - **NE PAS** cocher "Firebase Hosting"
   - Cliquer sur "Enregistrer l'application"

2. **Copier la configuration**
   - Firebase affiche un objet `firebaseConfig`
   - **COPIER TOUTES CES VALEURS** (on en aura besoin)

```javascript
// Exemple de configuration (NE PAS utiliser ces valeurs !)
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Étape 4 : Activer Firestore Database

1. **Créer la base de données**
   - Menu latéral → **Firestore Database**
   - Cliquer sur "Créer une base de données"
   - Mode : **Mode test** (pour commencer)
   - Région : choisir la plus proche (europe-west1 pour l'Europe)
   - Cliquer sur "Activer"

2. **Configurer les règles de sécurité**
   - Onglet **Règles**
   - Remplacer par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour les sauvegardes
    match /saves/{saveId} {
      // Un utilisateur peut lire/écrire SEULEMENT ses propres sauvegardes
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
      // Permet de créer une nouvelle sauvegarde
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

   - Cliquer sur "Publier"

### Étape 5 : Configurer le projet local

1. **Créer le fichier `.env`**
   - À la racine du projet (même niveau que `package.json`)
   - Créer un fichier nommé `.env`

2. **Ajouter les clés Firebase**

```env
# Configuration Firebase
# Remplacer par VOS propres valeurs depuis Firebase Console

VITE_FIREBASE_API_KEY=AIzaSyC...votre_clé
VITE_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-projet
VITE_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. **Redémarrer le serveur de développement**
   ```bash
   npm run dev
   ```

### Étape 6 : Configurer les domaines autorisés

1. **Dans Firebase Console**
   - **Authentication** → **Settings** → **Authorized domains**

2. **Ajouter vos domaines**
   - `localhost` (déjà présent)
   - Votre domaine de production (ex: `votre-site.netlify.app`)

---

## 🏗️ Architecture du système

### Fichiers créés

```
src/
├── config/
│   └── firebase.ts                 # Configuration Firebase
├── services/
│   ├── authService.ts              # Service d'authentification
│   └── saveService.ts              # Service de sauvegarde cloud
├── screens/
│   └── AuthScreen.tsx              # Écran de connexion/inscription
├── components/
│   ├── CloudSaveManager.tsx        # Gestionnaire de sauvegardes cloud
│   └── PauseMenu.tsx               # Modifié pour intégrer sauvegarde
└── store/
    └── gameStore.ts                # Modifié pour gérer l'utilisateur
```

### Technologies utilisées

- **Firebase Authentication** : Gestion des comptes utilisateurs
- **Firebase Firestore** : Base de données NoSQL pour les sauvegardes
- **Zustand** : Store local pour l'état du jeu
- **React** : Interface utilisateur

---

## ⚙️ Fonctionnalités

### 1. Authentification

#### Connexion avec Google
```typescript
// Service automatique via popup OAuth
await AuthService.signInWithGoogle();
```

**Avantages :**
- ✅ Connexion en un clic
- ✅ Pas de mot de passe à retenir
- ✅ Avatar et nom automatiques

#### Connexion Email/Mot de passe
```typescript
await AuthService.signInWithEmail(email, password);
```

**Inscription :**
```typescript
await AuthService.signUpWithEmail(email, password, displayName);
```

**Sécurité :**
- Mot de passe minimum 6 caractères
- Hashage automatique par Firebase
- Gestion des erreurs (email déjà utilisé, etc.)

### 2. Système de sauvegarde cloud

#### 5 Slots de sauvegarde
- Chaque utilisateur a 5 emplacements
- Identification : `userId_slot_0` à `userId_slot_4`

#### Données sauvegardées
```typescript
interface CloudSave {
  id: string;                    // userId_slot_X
  userId: string;                // UID Firebase
  slotNumber: number;            // 0-4
  saveName: string;              // Nom personnalisé
  gameData: {
    currentSceneId: string;
    relationships: Record<string, number>;
    flags: Record<string, any>;
    coins: number;
    energy: number;
    playerName: string;
    customCharacter: CustomCharacter;
    dialogueHistory: Dialogue[];
    phoneConversations: PhoneConversation[];
  };
  timestamp: Date;               // Date de sauvegarde
  episodeTitle?: string;         // "Épisode 1 : L'Annonce"
  sceneTitle?: string;           // ID de la scène
}
```

#### Sauvegarder une partie
1. Pendant le jeu, appuyer sur **Échap** ou cliquer sur Menu
2. Cliquer sur **Sauvegarder**
3. Choisir un slot (ou écraser une sauvegarde existante)
4. (Optionnel) Donner un nom à la sauvegarde
5. Confirmer

#### Charger une partie
1. Menu principal → **Charger**
2. Sélectionner un slot
3. La partie reprend exactement où elle s'est arrêtée

### 3. Synchronisation multi-appareils

Les sauvegardes sont stockées sur Firebase Firestore, donc :
- ✅ Jouer sur PC, continuer sur mobile
- ✅ Partager sa progression entre navigateurs
- ✅ Sauvegardes sécurisées (pas de perte de données)

---

## 📖 Utilisation

### Premier lancement

1. **Écran d'authentification**
   - S'affiche au démarrage du jeu
   - 3 options :
     - Connexion avec Google
     - Email/Mot de passe
     - Continuer sans compte

2. **Connexion avec Google (recommandé)**
   - Cliquer sur "Continuer avec Google"
   - Popup d'autorisation Google
   - Sélectionner un compte
   - Redirection automatique vers le menu

3. **Création de compte email**
   - Cliquer sur "Pas encore de compte ? S'inscrire"
   - Remplir : nom, email, mot de passe (6+ caractères)
   - Cliquer sur "Créer un compte"

### Pendant le jeu

#### Sauvegarder
```
Jeu en cours → Pause (Échap) → Sauvegarder → Choisir slot → Confirmer
```

#### Charger
```
Menu principal → Charger → Sélectionner slot → Charger
```

#### Déconnexion
```
Menu principal → Déconnexion (bouton rouge en bas à gauche)
```

### Mode hors ligne (sans compte)

- Cliquer sur "Continuer sans compte"
- Les sauvegardes sont stockées **localement** (localStorage)
- ⚠️ **Attention** : effacer les données du navigateur = perte de progression
- Pas de synchronisation entre appareils

---

## 🔒 Sécurité

### Règles Firestore

Les règles configurées garantissent que :
- ❌ Un utilisateur ne peut PAS voir les sauvegardes des autres
- ✅ Chaque utilisateur ne peut modifier que ses propres données
- ✅ Impossible de tricher ou de modifier l'`userId`

### Gestion des erreurs

Le système gère automatiquement :
- Email déjà utilisé
- Mot de passe trop faible
- Erreurs réseau
- Popup bloquée par le navigateur

Messages traduits en français pour l'utilisateur.

---

## 🚀 Déploiement

### Netlify

1. **Configurer les variables d'environnement**
   - Netlify Dashboard → Site Settings → Environment Variables
   - Ajouter chaque variable `VITE_FIREBASE_*`

2. **Build settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Domaine autorisé**
   - Firebase Console → Authentication → Authorized domains
   - Ajouter `votre-site.netlify.app`

### Autres plateformes (Vercel, Render, etc.)

Même principe :
1. Configurer les variables d'environnement
2. Autoriser le domaine dans Firebase
3. Build et deploy

---

## 🎮 Flux utilisateur complet

```
┌─────────────────────────────────────────────────┐
│  Lancement du jeu                               │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Écran d'authentification                       │
│  - Connexion Google                             │
│  - Email/Password                               │
│  - Continuer sans compte                        │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Menu principal                                 │
│  - Nouvelle partie                              │
│  - Charger (si connecté)                        │
│  - Paramètres                                   │
│  - Déconnexion (si connecté)                    │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Jeu en cours                                   │
│  Appuyer sur Échap                              │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Menu Pause                                     │
│  - Continuer                                    │
│  - Sauvegarder (ouvre CloudSaveManager)         │
│  - Paramètres                                   │
│  - Menu principal                               │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  CloudSaveManager                               │
│  - 5 slots de sauvegarde                        │
│  - Sauvegarder / Charger / Supprimer            │
│  - Info : utilisateur connecté                  │
└─────────────────────────────────────────────────┘
```

---

## 📊 Structure Firestore

```
firestore
└── saves (collection)
    ├── userId1_slot_0 (document)
    │   ├── userId: "userId1"
    │   ├── slotNumber: 0
    │   ├── saveName: "Ma première partie"
    │   ├── gameData: { ... }
    │   ├── timestamp: Timestamp
    │   ├── episodeTitle: "Épisode 1"
    │   └── sceneTitle: "scene_1_annonce"
    │
    ├── userId1_slot_1 (document)
    └── userId2_slot_0 (document)
```

---

## ❓ Dépannage

### Erreur : "API key not valid"
**Cause** : Vous utilisez les clés de démonstration
**Solution** : Configurer Firebase et créer le fichier `.env` (voir Étape 5)

### Erreur : "Popup blocked"
**Cause** : Le navigateur bloque la popup Google
**Solution** : Autoriser les popups pour ce site

### Erreur : "Email already in use"
**Cause** : Un compte existe déjà avec cet email
**Solution** : Se connecter au lieu de s'inscrire

### Erreur : "Permission denied" (Firestore)
**Cause** : Règles de sécurité mal configurées
**Solution** : Vérifier les règles Firestore (Étape 4.2)

### Sauvegarde ne se charge pas
**Vérifier** :
1. Connexion internet
2. Utilisateur bien connecté
3. Console navigateur pour voir les erreurs

---

## 🎨 Personnalisation

### Modifier le nombre de slots

```typescript
// src/components/CloudSaveManager.tsx
const TOTAL_SLOTS = 10; // Au lieu de 5
```

### Changer les couleurs de l'écran d'auth

```typescript
// src/screens/AuthScreen.tsx
// Modifier les couleurs dans les styles inline
```

### Ajouter d'autres méthodes de connexion

Firebase supporte aussi :
- Facebook
- Twitter
- GitHub
- Apple
- Anonyme

Documentation : https://firebase.google.com/docs/auth

---

## 📝 Notes importantes

1. **Mode Test Firestore** : Les données sont accessibles pendant 30 jours. Après, passer en mode Production avec règles strictes.

2. **Quotas Firebase** : Plan gratuit (Spark)
   - 50 000 lectures/jour
   - 20 000 écritures/jour
   - Largement suffisant pour un jeu indie

3. **Sécurité** : Ne JAMAIS commit le fichier `.env` sur GitHub
   - Déjà dans `.gitignore`
   - Utiliser les variables d'environnement en production

4. **Backup** : Firebase fait des backups automatiques, mais c'est mieux d'exporter régulièrement vos données.

---

## ✅ Checklist de déploiement

- [ ] Projet Firebase créé
- [ ] Authentication activée (Google + Email/Password)
- [ ] Firestore créé avec règles de sécurité
- [ ] Fichier `.env` créé localement
- [ ] Variables d'environnement configurées sur Netlify
- [ ] Domaine autorisé dans Firebase
- [ ] Test de connexion Google
- [ ] Test de sauvegarde/chargement
- [ ] Test sur différents appareils

---

**Créé le** : 15 octobre 2025  
**Système** : Firebase Authentication + Firestore  
**Sauvegardes** : 5 slots par utilisateur  
**Synchronisation** : Multi-appareils  

🎮 **Bon jeu !**

