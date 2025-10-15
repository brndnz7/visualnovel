# 🚀 Déploiement sur Firebase Hosting - Dissonance

## Pourquoi Firebase Hosting ?

✅ **Tout sur Firebase** : Auth + Firestore + Hosting = cohérence totale  
✅ **SSL gratuit automatique** (HTTPS)  
✅ **CDN mondial** ultra-rapide  
✅ **Déploiement en une commande**  
✅ **Pas de configuration de variables d'environnement** (déjà configuré via `.env`)  
✅ **Domaine personnalisé gratuit** (`.web.app` et `.firebaseapp.com`)

---

## 📋 Prérequis

1. ✅ Projet Firebase créé (`dissonance-game`)
2. ✅ Authentication activée
3. ✅ Firestore créé
4. ✅ Firebase CLI installé (`npm install -g firebase-tools`)
5. ✅ Fichiers de config créés (`firebase.json`, `.firebaserc`)

---

## 🔐 Étape 1 : Connexion à Firebase

**Dans ton terminal** :

```bash
firebase login
```

- Une fenêtre de navigateur s'ouvre
- Connecte-toi avec le même compte Google que pour Firebase Console
- Autorise Firebase CLI

**Vérification** :
```bash
firebase projects:list
```
Tu devrais voir `dissonance-game` dans la liste.

---

## 🏗️ Étape 2 : Build du projet

**Avant de déployer, il faut compiler le projet :**

```bash
npm run build
```

**Ce que ça fait** :
- Compile TypeScript → JavaScript
- Bundle tous les fichiers avec Vite
- Optimise les assets
- Crée le dossier `dist/` (c'est ce dossier qui sera déployé)

**Vérification** :
- Un dossier `dist/` devrait apparaître
- Contient `index.html`, `assets/`, etc.

---

## 🚀 Étape 3 : Premier déploiement

**Commande magique :**

```bash
firebase deploy --only hosting
```

**Ce qui se passe** :
1. Firebase compresse les fichiers de `dist/`
2. Upload vers Firebase Hosting
3. Configuration du CDN
4. Activation SSL automatique
5. URL de déploiement affichée

**Sortie attendue :**
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/dissonance-game/overview
Hosting URL: https://dissonance-game.web.app
```

**🎉 Ton site est en ligne !**

---

## 🌐 URLs disponibles

Après déploiement, tu as **2 URLs** :

1. **URL principale** : `https://dissonance-game.web.app`
2. **URL alternative** : `https://dissonance-game.firebaseapp.com`

Les deux pointent vers le même site.

---

## 🔄 Déploiements suivants

**À chaque mise à jour du code :**

```bash
# 1. Build
npm run build

# 2. Deploy
firebase deploy --only hosting
```

**Raccourci (un seul script) :**

Ajoute dans `package.json` :
```json
"scripts": {
  "deploy": "npm run build && firebase deploy --only hosting"
}
```

Puis :
```bash
npm run deploy
```

---

## ⚙️ Configuration Firebase Hosting

### Fichier `firebase.json`

```json
{
  "hosting": {
    "public": "dist",              // Dossier à déployer
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",            // Toutes les routes
        "destination": "/index.html" // Redirigent vers index.html (SPA)
      }
    ],
    "headers": [                   // Cache des assets
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000" // 1 an
          }
        ]
      }
    ]
  }
}
```

### Fichier `.firebaserc`

```json
{
  "projects": {
    "default": "dissonance-game"   // Ton projet Firebase
  }
}
```

---

## 🎨 Domaine personnalisé (optionnel)

Tu veux `dissonance-game.com` au lieu de `.web.app` ?

### Dans Firebase Console :

1. **Hosting** → **Add custom domain**
2. Entre ton nom de domaine
3. Firebase te donne des enregistrements DNS
4. Configure chez ton registrar (OVH, Namecheap, etc.)
5. Attends 24h max

**Firebase s'occupe de tout** :
- ✅ SSL automatique
- ✅ Renouvellement automatique
- ✅ Redirection www → non-www (ou inverse)

---

## 📊 Avantages vs Netlify

| Feature | Firebase Hosting | Netlify |
|---------|------------------|---------|
| **Auth + DB intégrés** | ✅ Tout sur Firebase | ❌ Services séparés |
| **Déploiement** | `firebase deploy` | Git push auto |
| **Variables d'env** | ❌ Pas besoin (`.env` local) | ✅ Interface web |
| **SSL** | ✅ Auto | ✅ Auto |
| **CDN** | ✅ Google CDN | ✅ CDN Netlify |
| **Prix gratuit** | 10 GB/mois | 100 GB/mois |
| **Limite build** | Illimité (local) | 300 min/mois |

**Verdict** : Firebase Hosting est **parfait** pour ton cas car tout est déjà sur Firebase !

---

## 🔍 Monitoring et Analytics

### Dans Firebase Console :

**Hosting** → **Usage**
- Nombre de requêtes
- Bande passante utilisée
- Pays des visiteurs

**Analytics** (si activé)
- Utilisateurs actifs
- Pages vues
- Durée de session

---

## 🐛 Dépannage

### Erreur : "Firebase CLI not found"
```bash
npm install -g firebase-tools
```

### Erreur : "Not authorized"
```bash
firebase login --reauth
```

### Erreur : "Build failed"
- Vérifie que `npm run build` fonctionne localement
- Regarde les erreurs TypeScript

### Erreur : "Permission denied"
- Vérifie que tu es connecté au bon compte Google
- Le compte doit être propriétaire du projet Firebase

### Site vide / erreur 404
- Vérifie que `dist/` contient `index.html`
- Vérifie `firebase.json` → `"public": "dist"`

---

## 🔐 Sécurité

### Variables d'environnement

**Important** : Firebase Hosting est **statique**, donc :

❌ **Ne PAS** mettre de secrets côté client  
✅ **OK** : Clés Firebase publiques (API Key, etc.)  
✅ **OK** : Les règles Firestore protègent les données

**Pourquoi les clés Firebase sont publiques ?**
- Firebase utilise des **règles de sécurité** côté serveur
- Même si quelqu'un voit ta clé API, il ne peut rien faire sans authentification
- Les règles Firestore empêchent l'accès non autorisé

### Règles Firestore (rappel)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /saves/{saveId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

## 📱 Preview avant déploiement

**Tester localement le build de production :**

```bash
npm run build
npx vite preview
```

Ouvre `http://localhost:4173` pour tester.

**Preview sur Firebase Hosting :**

```bash
firebase hosting:channel:deploy preview
```

Tu obtiens une URL temporaire pour tester avant le vrai déploiement.

---

## 🔄 Rollback (revenir en arrière)

**Si un déploiement a un bug :**

1. **Firebase Console** → **Hosting** → **Releases**
2. Clique sur une version précédente
3. **Rollback**

Ou en ligne de commande :
```bash
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL TARGET_SITE_ID:live
```

---

## 📝 Workflow complet

### Développement quotidien

```bash
# 1. Développer
npm run dev

# 2. Tester les changements
# ... coder ...

# 3. Build local
npm run build

# 4. Preview local
npx vite preview

# 5. Si OK, déployer
firebase deploy --only hosting

# 6. Tester en production
# Ouvrir https://dissonance-game.web.app
```

### Avec Git

```bash
# 1. Commit
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main

# 2. Build et deploy
npm run build
firebase deploy --only hosting
```

---

## 🎯 Commandes utiles

```bash
# Voir les sites actifs
firebase hosting:sites:list

# Voir l'historique des déploiements
firebase hosting:channel:list

# Supprimer un channel preview
firebase hosting:channel:delete CHANNEL_ID

# Voir les logs
firebase hosting:logs

# Version de Firebase CLI
firebase --version
```

---

## 💰 Quotas gratuits Firebase

**Plan Spark (gratuit) :**
- **Hosting** : 10 GB stockage + 360 MB/jour transfert
- **Firestore** : 1 GB stockage + 50k lectures/jour + 20k écritures/jour
- **Authentication** : Illimité

**Largement suffisant** pour un jeu indie avec quelques milliers de joueurs !

**Upgrade Blaze (pay-as-you-go)** seulement si :
- \> 100k joueurs actifs/mois
- \> 10 GB hosting/mois

---

## ✅ Checklist finale

- [ ] `firebase login` fait
- [ ] `.env` créé avec les vraies clés
- [ ] `npm run build` passe sans erreur
- [ ] `firebase.json` et `.firebaserc` présents
- [ ] Domaine autorisé dans Firebase Auth
- [ ] Premier déploiement : `firebase deploy --only hosting`
- [ ] Site accessible sur `https://dissonance-game.web.app`
- [ ] Test de connexion Google fonctionne
- [ ] Test de sauvegarde/chargement fonctionne

---

## 🎮 C'est tout !

Ton jeu est maintenant **100% hébergé sur Firebase** :
- ✅ Auth
- ✅ Database (Firestore)
- ✅ Hosting

**Une seule plateforme, aucune configuration complexe !**

---

**Créé le** : 15 octobre 2025  
**Plateforme** : Firebase Hosting + Authentication + Firestore  
**URL production** : https://dissonance-game.web.app  

🔥 **Let's go !**

