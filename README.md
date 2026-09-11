# ReactDex - Constructeur de Decks Pokémon

**ReactDex** est une application web React moderne permettant aux dresseurs Pokémon d'explorer les cartes officielles du JCC Pokémon (TCG) et de concevoir, organiser et gérer leurs propres decks de cartes.

Ce projet s'appuie sur l'API officielle [TCGdex](https://tcgdex.dev).

---

## ⚡ Fonctionnalités

- **Exploration & Recherche** :
  - Recherche instantanée de cartes Pokémon par nom avec débogage et debounce.
  - Filtre par extension (Set de Base, Jungle, Épée et Bouclier, etc.).
  - Pagination fluide et affichage en grille avec aperçu haute qualité.

- **Détails des cartes** :
  - Fiche détaillée complète : PV, Types élémentaires avec badges colorés, Niveau/Stage.
  - Attaques complètes (coûts en énergie, points de dégâts, effets spéciaux).
  - Faiblesses, Résistances, Coût de retraite, Illustrateur et Rareté.
  - Bouton d'ajout direct à un deck au choix avec retour interactif.

- **Constructeur & Gestionnaire de Decks** :
  - Création de nouveaux decks personnalisés.
  - Aperçu visuel des cartes empilées pour chaque deck.
  - Détail du deck avec décompte par type (Total, Pokémon, Dresseurs, Énergies).
  - Ajout de cartes via recherche intégrée en modale et retrait de cartes.
  - Suppression de decks.

- **Comptes Dresseurs & Persistance** :
  - Inscription et Connexion avec validation.
  - Persistance de la session active et des données en `localStorage`.
  - Déconnexion accessible depuis l'en-tête.

---

## 🚀 Installation & Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Tester la conformité du code
npm run lint

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

---

## 👥 Auteurs
- Oujid Karim
- Descorsiers Nicolas

