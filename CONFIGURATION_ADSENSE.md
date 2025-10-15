# 💰 CONFIGURATION GOOGLE ADSENSE - DISSONANCE

**Date** : 15 Octobre 2025

---

## ✅ C'EST QUOI ?

Google AdSense = **Publicités qui fonctionnent en hébergement solo** (Firebase, Netlify, etc.)

- ✅ Marche sur **N'IMPORTE QUEL** hébergement
- ✅ Pubs récompensées (les joueurs gagnent de l'énergie)
- ✅ Tu gagnes de l'argent à chaque pub regardée
- ✅ CPM : 2-5$ (revenu par 1000 vues)

---

## 🚀 ÉTAPES POUR ACTIVER LES VRAIES PUBS

### **1. Créer un compte Google AdSense (GRATUIT)**

1. Va sur https://www.google.com/adsense/
2. Clique sur "Commencer"
3. Connecte-toi avec ton compte Google
4. Remplis les infos :
   - **URL de ton site** : `https://dissonance-game.web.app`
   - **Pays** : France (ou ton pays)
   - **Accepte les conditions**

### **2. Attendre la validation (1-2 jours)**

Google va vérifier ton site. Critères :
- Site actif et fonctionnel ✅ (tu l'as !)
- Contenu original ✅ (ton VN)
- Pas de contenu illégal ✅

### **3. Récupérer ton ID Client**

Une fois approuvé, tu reçois un ID comme :
```
ca-pub-1234567890123456
```

### **4. Ajouter l'ID dans ton projet**

Ouvre ton fichier `.env` et ajoute :
```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-TON_ID_ICI
```

Exemple :
```bash
VITE_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
```

### **5. Rebuild et deploy**

```bash
npm run build
firebase deploy
```

**C'EST FAIT ! Les pubs sont actives ! 🎉**

---

## 💡 EN ATTENDANT LA VALIDATION

**MODE DEV ACTIF :**
- Les pubs sont **simulées** (compteur 3 secondes)
- Ça marche quand même (donne de l'énergie)
- Parfait pour tester

**Dès que tu auras ton ID AdSense :**
- Les VRAIES pubs s'afficheront
- Tu commenceras à gagner de l'argent

---

## 📊 COMMENT ÇA MARCHE DANS TON JEU

### **Système d'énergie :**
- Énergie max : **10**
- Recharge : **1 énergie / 10 minutes**
- **OU** regarde une pub : **+5 énergie instantanément**

### **Bouton pub :**
- Apparaît quand énergie < 10
- Icône Play verte
- Tooltip "Regarder une pub (+5 ⚡)"

### **Flow joueur :**
1. Joueur n'a plus d'énergie
2. Clique sur le bouton pub vert
3. Regarde la pub (15-30 secondes)
4. Gagne +5 énergie
5. Continue à jouer !

---

## 💰 REVENUS ESTIMÉS

### **Exemple : 1000 joueurs/mois**

Hypothèses :
- 50% des joueurs regardent des pubs
- Chaque joueur regarde 3 pubs/session
- 2 sessions/mois

**Calcul :**
- 1000 joueurs × 50% × 3 pubs × 2 sessions = **3000 vues de pub/mois**
- 3000 vues × CPM de 3$ / 1000 = **9$ / mois**

### **Exemple : 10 000 joueurs/mois**

- 30 000 vues de pub/mois
- **90$ / mois** 💰

### **Exemple : 100 000 joueurs/mois**

- 300 000 vues de pub/mois
- **900$ / mois** 💰💰💰

---

## 🔧 CONFIGURATION TECHNIQUE

### **Fichiers modifiés :**

1. **`src/services/adSenseService.ts`** - Service Google AdSense
2. **`src/components/AdRewardButton.tsx`** - Bouton pour regarder une pub
3. **`src/components/EnergyHUD.tsx`** - Affichage énergie + bouton pub
4. **`src/App.tsx`** - Initialisation AdSense
5. **`src/config/game.ts`** - Énergie limitée (10 max)

### **Variables d'environnement (.env) :**

```bash
# Firebase (déjà configuré)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Google AdSense (à ajouter quand tu l'as)
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

---

## ❓ FAQ

**Q : C'est gratuit Google AdSense ?**
**R :** OUI ! Inscription et utilisation 100% gratuites.

**Q : Combien de temps pour être approuvé ?**
**R :** 1-2 jours généralement (parfois 1 semaine max).

**Q : Je peux tester avant d'être approuvé ?**
**R :** OUI ! Le mode dev simule les pubs (déjà actif).

**Q : Ça marche sur Firebase Hosting ?**
**R :** OUI ! AdSense marche sur TOUS les hébergements.

**Q : Je dois payer quelque chose ?**
**R :** NON ! Google te PAIE (tu gagnes de l'argent).

**Q : Comment je reçois l'argent ?**
**R :** Virement bancaire mensuel (dès 100$ de gains).

**Q : Les pubs sont invasives ?**
**R :** NON ! Le joueur CHOISIT de regarder une pub pour gagner de l'énergie.

---

## 🎯 RÉSUMÉ

**ACTUELLEMENT :**
- ✅ Code AdSense intégré
- ✅ Bouton pub actif
- ✅ Mode dev (pubs simulées)
- ✅ Système énergie fonctionnel

**POUR ACTIVER LES VRAIES PUBS :**
1. Crée un compte AdSense (5 min)
2. Attends validation (1-2 jours)
3. Ajoute ton ID dans `.env`
4. Rebuild + deploy
5. **TU GAGNES DE L'ARGENT ! 💰**

---

## 🚀 NEXT STEPS

1. **Crée ton compte AdSense MAINTENANT** : https://www.google.com/adsense/
2. Teste ton jeu en mode dev (pubs simulées marchent déjà)
3. Dès validation, ajoute ton ID
4. Deploy et profite ! 🎉

---

**TON JEU EST PRÊT À ÊTRE MONÉTISÉ ! 💸**

---

**Développé avec 💖 par l'équipe Dissonance**  
**Version 0.1.0 - Octobre 2025**

