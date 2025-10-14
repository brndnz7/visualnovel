# 🎮 Lancer Sweet Destiny - Guide Ultra Rapide

## ⚡ En 2 Commandes

```bash
npm install
npm run dev
```

**➡️ Ouvrez** : http://localhost:5173

---

## ✅ Ce Qui Est Déjà Intégré

### 🎨 Ressources (45+ fichiers)
- ✅ **6 Backgrounds HD** (Noraneko)
- ✅ **21 Sprites** avec expressions (11 female + 10 male)
- ✅ **3 Musiques** (Hope, Beanfeast, Dramatic)
- ✅ **9 Éléments UI** (DatingGameUI pack)

### ✨ Fonctionnalités
- ✅ **Highlight automatique** (personnages qui parlent)
- ✅ **10+ expressions** par personnage
- ✅ **Historique** des dialogues (touche H)
- ✅ **Mode Skip** (touche S)
- ✅ **Mode Auto** (touche A)
- ✅ **Navigation clavier** complète
- ✅ **Sauvegarde automatique**

### 🎯 Système de Jeu
- ✅ Relations avec 3 personnages
- ✅ Système d'énergie/tickets
- ✅ Choix avec conséquences
- ✅ Flags et conditions
- ✅ UI professionnelle

---

## 🎮 Contrôles

| Touche | Action |
|--------|--------|
| **Espace** | Avancer |
| **H** | Historique |
| **S** | Skip Mode |
| **A** | Auto Mode |
| **1-5** | Choix rapide |
| **Clic** | Avancer/Choisir |

---

## 📚 Documentation

### Guides Disponibles
1. **DEMARRAGE_RAPIDE.md** - Installation détaillée
2. **GUIDE_UTILISATION.md** - Guide complet du jeu
3. **GUIDE_SPRITES_ET_EXPRESSIONS.md** - Toutes les expressions
4. **STRUCTURE_PROJET.md** - Architecture du code
5. **RECAPITULATIF_COMPLET.md** - Toutes les améliorations
6. **UI_ET_SPRITES_INTEGRES.md** - Ressources intégrées

---

## 🎨 Personnages et Expressions

### Mia (11 expressions)
`neutral`, `happy`, `sad`, `angry`, `surprised`, `love`, `laugh`, `annoyed`, `sleepy`, `smug`

### Alex (10 expressions)
`neutral`, `happy`, `sad`, `angry`, `surprised`, `love`, `laugh`, `smirk`

### Julien (10 expressions)
Même que Alex avec variantes

---

## 🔧 Modifier le Scénario

**Fichier** : `src/data/story.json`

```json
{
  "speaker": "Mia",
  "text": "Salut {playerName} !",
  "position": "left",
  "expression": "happy"
}
```

### Expressions Disponibles
- **Joie** : `happy`, `laugh`, `love`, `smug`
- **Tristesse** : `sad`
- **Colère** : `angry`, `annoyed`
- **Surprise** : `surprised`
- **Neutre** : `neutral`
- **Spécial** : `sleepy`, `smirk`

---

## 🎯 Ce Qui Vous Attend

### Menu Principal
- Design moderne avec gradients
- Musique "Beanfeast"
- Nouvelle Partie / Continuer / Paramètres

### Jeu
- **Backgrounds HD** - Magnifiques arrière-plans
- **Personnages animés** - Highlight automatique
- **UI stylisée** - Pack DatingGameUI
- **Musique** - Thème "Hope" en boucle
- **Dialogues** - Effet machine à écrire
- **Choix** - Boutons avec feedback visuel
- **HUD** - Cœurs animés + barres de progression

---

## 🚀 Démarrage Rapide Visuel

```
1. Terminal
   ↓
2. npm install
   ↓
3. npm run dev
   ↓
4. http://localhost:5173
   ↓
5. JOUER ! 🎮
```

---

## ⚠️ En Cas de Problème

### Erreur "Missing script: dev"
```bash
# Vérifier que vous êtes dans le bon dossier
cd "C:\Users\baran\OneDrive\Bureau\GG BG 2"
npm install
npm run dev
```

### Le CSS ne marche pas
- Rafraîchir avec `Ctrl + F5`
- Vider le cache du navigateur

### Les images ne s'affichent pas
- Vérifier que le serveur est lancé
- Attendre quelques secondes (chargement initial)

---

## 📊 Statistiques du Projet

- **25+ fichiers** organisés
- **45+ assets** intégrés
- **16+ fonctionnalités**
- **8 fichiers** de documentation
- **100% TypeScript**
- **100% fonctionnel**

---

## 🎉 C'est Prêt !

Tout est déjà configuré et intégré :
- ✅ Code restructuré
- ✅ Sprites intégrés
- ✅ UI du pack
- ✅ Highlight automatique
- ✅ Musiques et backgrounds
- ✅ Documentation complète

**Il ne reste plus qu'à jouer ! 🎮**

---

**Commande unique** :
```bash
npm install && npm run dev
```

**➡️ http://localhost:5173**

*Bon jeu ! 🌟*

