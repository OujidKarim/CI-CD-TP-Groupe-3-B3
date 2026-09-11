# ReactDex - Constructeur de Decks Pokémon

[![CI - ReactDex Pipeline](https://github.com/OujidKarim/CI-CD-TP-Groupe-3-B3/actions/workflows/ci.yml/badge.svg)](https://github.com/OujidKarim/CI-CD-TP-Groupe-3-B3/actions/workflows/ci.yml)
[![CD - ReactDex Deployment](https://github.com/OujidKarim/CI-CD-TP-Groupe-3-B3/actions/workflows/cd.yml/badge.svg)](https://github.com/OujidKarim/CI-CD-TP-Groupe-3-B3/actions/workflows/cd.yml)

Application web React (Vite) permettant d'explorer les cartes Pokémon via l'API [TCGdex](https://tcgdex.dev) et de construire ses propres decks.

---

## ⚡ Pipelines CI/CD GitHub Actions

Les workflows d'intégration et de déploiement continus sont séparés conformément aux bonnes pratiques DevOps :

### 1. Intégration Continue (CI - `.github/workflows/ci.yml`)
- **Gestion du cache** : Cache npm natif via `actions/setup-node@v4`.
- **Audit des dépendances** : Analyse des vulnérabilités de sécurité avec `npm audit`.
- **Qualité du code** : Vérification statique du code via `npm run lint` (ESLint).
- **Service externe & Tests automatisés** :
  - Démarrage et test de connectivité d'un conteneur de service Redis (`services: redis:alpine`).
  - Tests automatisés Node.js (`npm test`) validant la logique métier et la communication avec l'API externe TCGdex.
- **Création d'artefacts** : Build de l'application (`npm run build`) et archivage de l'artefact `dist/` avec `actions/upload-artifact@v4`.

### 2. Déploiement Continu (CD - `.github/workflows/cd.yml`)
- **Build & Push Docker Hub** : Construction multi-stage Docker et publication sur le registre Docker Hub (`docker/build-push-action@v6`).
- **Stratégie multi-environnements et branches dédiées** :
  - **Développement** (branche `develop`) : Déploiement automatique sur conteneur `reactdex-dev` (port 3001).
  - **Pre-production** (branche `staging`) : Déploiement sur conteneur `reactdex-staging` (port 3002) après 1 heure (géré via la règle de protection `Wait timer: 60m` de l'environnement GitHub).
  - **Production** (branche `main`) : Déploiement sur conteneur `reactdex-prod` (port 3000) soumis à validation manuelle (via `workflow_dispatch` ou approbation par reviewers).

### 3. Configuration des Secrets GitHub Actions
Configurer les secrets suivants dans **Settings > Secrets and variables > Actions** :
- `DOCKERHUB_USERNAME` : Identifiant Docker Hub
- `DOCKERHUB_TOKEN` : Token d'accès Docker Hub
- `SSH_HOST` : `13.140.135.144`
- `SSH_USER` : `admin`
- `SSH_PORT` : `2203`
- `SSH_PRIVATE_KEY` : Clé privée OpenSSH fournie pour le groupe

---

## 🚀 Installation & Démarrage Local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Lancer la vérification du code (Linter)
npm run lint

# Lancer les tests automatisés
npm test

# Compiler pour la production
npm run build
```

---

## 👥 Groupe 3 CICD
- Oujid Karim
- Parfait Evans
