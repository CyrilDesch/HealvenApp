# Healven

##### Application de suivi de course à pied
![alt text](https://i.ibb.co/pQFRTFQ/healven.jpg)

## Objectif du projet
Healven est une application mobile qui permet de garder un suivi de vos entrainements de course pour pouvoir visualiser vos performances dans le temps, de différentes façons, pour permettre de vous améliorer.
Elle vous permet d'enregistrer vos parcours de courses et les différentes mesures en lien, puis d'accéder à ces informations facilement.

##### Mesure :
- Distance (tracé sur carte)
- Temps
- Vitesse
- Calories

## Point de vue technique

L'application a été entièrement réécrite (migration Expo SDK 41 → 57) et est aujourd'hui **100 % locale** : plus de backend, plus de compte, toutes les données (profil, historique des parcours) sont stockées sur l'appareil.

- **React Native** + **Expo SDK 57** (nouvelle architecture, Hermes)
- **Expo Router** (navigation par fichiers) en **TypeScript**
- **react-native-maps** (Google Maps) pour le tracé GPS
- **AsyncStorage** pour la persistance locale (profil utilisateur + historique des parcours)
- **expo-file-system** pour la photo de profil
- **expo-location** pour le suivi GPS pendant l'enregistrement d'un parcours

### Structure

```
src/
  app/            # écrans (Expo Router) : accueil, onboarding, carte d'un parcours
  components/      # composants UI
  context/         # état applicatif (profil, historique des parcours, position GPS live)
  hooks/           # hooks (suivi GPS)
  lib/             # logique pure (calcul des calories, stockage local, style de carte)
  styles/          # styles partagés
```

### Démarrer le projet

```bash
npm install
npm run android   # build + lance l'app sur un émulateur/appareil Android
```

La carte nécessite une clé d'API Google Maps valide (Maps SDK for Android activé) dans un fichier `.env` non commité — voir `.env.example`.

### Qualité

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # expo lint
npm test             # jest
```

Une CI GitHub Actions (`.github/workflows/ci.yml`) exécute ces trois commandes sur chaque push/PR.
