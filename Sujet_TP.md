Project
Exercice

Créer et tester un projet Node.js à l’aide de GitHub Actions et d’un workflow basé sur un modèle.

Déboguer un test ayant échoué à l’aide du journal GitHub Actions

Personnaliser votre workflow avec GitHub Actions.

    Le sujet choisi doit être communiqué au début du TP.
    À la fin du TP chaque groupe présentera son projet.
    Expliquer les choix effectués dans son workflow.
    Le nom du projet et les informations sur le dépôt GitHub.

Eléments obligatoires du workflow

    Audit des dépendances
    Qualité du code
    Gestion du cache
    Tests automatisés
    Utilisation d'un service externe
    Création d'artefacts
    Prévoir 2 environnements (ex: développement , pre-production, production)
    Build l'image Docker
    Déploiement de l'image Docker sur le registre Docker Hub
    Déploiement de l'application sur l'environnement de développement
    Déploiement de l'application sur l'environnement de pre-production après 1h
    Déploiement de l'application sur l'environnement de production manuellement
    Pour les déploiements sur les différents environnements, prévoir des branches spécifiques (ex: develop pour développement, staging pour pre-production, main pour production)
    Ajout des badges de statut du workflow GitHub Actions
    Bien séparer les CI et les CD

group03

Dernière rotation : 11/09/2026 11:34

SSH_HOST=13.140.135.144
SSH_USER=admin
SSH_PORT=2203
SSH_PRIVATE_KEY=
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACA2n+HdMkh41osyTPBrO1kzpr2WNFXrYSYMZeKRH34cLwAAALBeZ+W6Xmfl
ugAAAAtzc2gtZWQyNTUxOQAAACA2n+HdMkh41osyTPBrO1kzpr2WNFXrYSYMZeKRH34cLw
AAAEBm2MwbR7O/qP6bZeC8pXNYDbQNsNVYWtqOTki+8N8IQzaf4d0ySHjWizJM8Gs7WTOm
vZY0VethJgxl4pEffhwvAAAALWdyb3VwMDNAY29vbGlmeS12cHMtcm90YXRlZC0yMDI2LT
A5LTExXzExMzQzMg==
-----END OPENSSH PRIVATE KEY-----

group03

Dernière rotation : 11/09/2026 11:34

ssh -p 2203 admin@13.140.135.144

Mot de passe : 1wyrblw1WdH836okn4fy