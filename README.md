# 🏦 E-Bank - Digital Banking Application

Une application web complète de gestion bancaire (Digital Banking) permettant de gérer des comptes bancaires, d'effectuer des opérations financières (Versements, Retraits, Virements) et de suivre l'historique des transactions clients.

## 🏗️ Architecture du Projet

Le projet est structuré en deux parties principales (Mono-repo) :
* **`ebank-backend`** : API REST robuste développée avec Java et Spring Boot.
* **`ebank-fronend/digital-banking-web`** : Interface utilisateur dynamique et réactive développée avec Angular.

---

## 🛠️ Technologies Utilisées

### Back-end
* **Java 23** & **Spring Boot 3.5.x**
* **Spring Data JPA** & **Hibernate 6.x**
* **Base de données** : MySQL / MariaDB (v10.4+)
* **Gestionnaire de dépendances** : Maven
* **Sécurité** : Spring Security & Authentification basée sur les jetons JWT

### Front-end
* **Angular**
* **TypeScript**
* **Bootstrap / TailwindCSS** pour le design responsive
* **RxJS** & **HttpClient** pour la gestion des requêtes API

---

## 🚀 Fonctionnalités Principales

* **Gestion des Clients** : Ajout, modification, suppression et recherche de clients.
* **Gestion des Comptes** : Comptes courants (`CurrentAccount`) et comptes d'épargne (`SavingAccount`).
* **Opérations Bancaires** : 
    * 💵 Débit / Retrait (`Debit`)
    * 💰 Crédit / Versement (`Credit`)
    * 🔄 Virement de compte à compte (`Transfer`)
* **Historique & Consultation** : Visualisation en temps réel des extraits de compte et des opérations associées avec pagination.
* **Sécurité** : Sécurisation de l'accès aux fonctionnalités via un middleware d'authentification par jeton JWT.

---

## 📦 Installation et Démarrage

### 1. Prérequis
Assurez-vous d'avoir installé :
* Java Development Kit (JDK 21 ou supérieur)
* Node.js (LTS) & Angular CLI
* MySQL ou MariaDB Server
* MySQL Workbench ou tout autre client SQL

### 2. Configuration de la Base de Données
Connectez-vous à votre serveur SQL en tant que `root` et exécutez les requêtes suivantes pour initialiser la base de données et accorder les privilèges d'accès :

```sql
CREATE DATABASE IF NOT EXISTS `E-BANK` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON `E-BANK`.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;

```

### 3. Lancer le Back-end (Spring Boot)

1. Accédez au dossier back-end :
```bash
cd ebank-backend

```


2. Vérifiez la configuration dans `src/main/resources/application.properties` (URL de la BDD, identifiants `appuser` et clé secrète JWT).
3. Nettoyez et lancez l'application avec Maven :
```bash
mvn clean compile spring-boot:run

```


L'API sera disponible sur le port : `http://localhost:8085`.

### 4. Lancer le Front-end (Angular)

1. Accédez au dossier front-end :
```bash
cd ebank-fronend/digital-banking-web

```


2. Installez les dépendances du projet :
```bash
npm install

```


3. Démarrez le serveur de développement local :
```bash
ng serve

```


Ouvrez votre navigateur sur `http://localhost:4200`.

---

## 🗂️ Structure du Code Source (Aperçu)

```text
e-banking/
│
├── ebank-backend/               # Code Source de l'API REST Spring Boot
│   ├── src/main/java/           # Packages (Entities, Repositories, Services, Controllers, Mappers, DTOs)
│   ├── src/main/resources/      # Fichiers de configuration (application.properties)
│   └── pom.xml                  # Dépendances Maven
│
└── ebank-fronend/               # Application Client Front-end
    └── digital-banking-web/     # Projet Angular complet (src/app, angular.json, etc.)

```

---

## 👤 Auteur

* **Fahd ELLAHIA** - *Full Stack Developer*

```

```
