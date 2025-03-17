# GreenGrows API

API locale pour l'extension Chrome GreenGrows qui permet de suivre et d'analyser la consommation de CO2 lors de la navigation web.

## Configuration requise

- Node.js >= 18.0.0
- npm (inclus avec Node.js)

## Installation
1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```

## Démarrage du serveur

Pour démarrer le serveur en mode développement avec rechargement automatique :
```bash
npm run dev
```

Pour démarrer le serveur en mode production :
```bash
npm start
```

Le serveur démarre sur `http://127.0.0.1:3001` avec un affichage clair des endpoints disponibles :
```
================================================================================
✨ SERVEUR GREENGROWS
================================================================================
✅ API démarrée sur http://127.0.0.1:3001

📍 Endpoints disponibles :
   POST http://127.0.0.1:3001/api/co2  - Envoyer des données CO2
   GET  http://127.0.0.1:3001/api/stats - Récupérer les statistiques

📝 Format des données :
   {"type": "webpage", "co2": 0.234}
================================================================================
```

## Configuration de l'extension Chrome

Pour permettre à l'extension Chrome d'accéder à l'API locale, ajoutez les permissions suivantes dans le `manifest.json` :

```json
{
  "permissions": [
    "http://127.0.0.1:3001/",
    "http://localhost:3001/"
  ],
  "host_permissions": [
    "http://127.0.0.1:3001/*",
    "http://localhost:3001/*"
  ]
}
```

**Note importante** : Il est recommandé d'utiliser `127.0.0.1` plutôt que `localhost` pour éviter certaines restrictions de sécurité de Chrome avec les requêtes locales.

## Endpoints API

### POST /api/co2
Enregistre une nouvelle consommation de CO2.

**Request Body :**
```json
{
    "type": "webpage",     // Type de consommation (ex: webpage, video, etc.)
    "co2": 0.234          // Quantité de CO2 en grammes (nombre avec 3 décimales max)
}
```

**Réponse en cas de succès (201 Created) :**
```json
{
    "success": true,
    "data": {
        "type": "webpage",
        "co2": 0.234,
        "timestamp": "2025-03-13T21:35:37.000Z"
    }
}
```

**Réponse en cas d'erreur de validation (400 Bad Request) :**
```json
{
    "success": false,
    "error": "Les champs type et co2 sont requis"
}
```

**Réponse en cas d'erreur serveur (500 Internal Server Error) :**
```json
{
    "success": false,
    "error": "Erreur lors du traitement des données",
    "details": "Message d'erreur détaillé"
}
```

### GET /api/stats
Récupère les statistiques globales de consommation CO2.

**Réponse en cas de succès (200 OK) :**
```json
{
    "success": true,
    "data": {
        "total": 0.924,           // Total CO2 en grammes (arrondi à 3 décimales)
        "details": {              // Détails par type de consommation
            "webpage": 0.234,
            "video": 0.567,
            "image": 0.123
        }
    }
}
```

## Interface de visualisation (Backoffice)

Un dashboard web est disponible pour visualiser les statistiques en temps réel :

- Total des émissions CO2
- Répartition par type de contenu
- Graphiques d'évolution
- Mise à jour automatique toutes les 5 secondes

Pour démarrer le backoffice :
```bash
cd backoffice
npx http-server -p 8080 --cors
```

Accédez au dashboard via : `http://127.0.0.1:8080`

## Logs de debug

L'API génère des logs de debug clairs et formatés pour suivre les requêtes et les réponses :

```
================================================================================
📥 [DEBUG API 2025-03-13T21:35:37Z] POST /api/co2
Données : {
  "type": "webpage",
  "co2": 0.234
}
================================================================================

================================================================================
✅ [DEBUG API 2025-03-13T21:35:37Z] Données CO2 enregistrées
Données : {
  "success": true,
  "data": {
    "type": "webpage",
    "co2": 0.234,
    "timestamp": "2025-03-13T21:35:37Z"
  }
}
================================================================================
```

Les logs utilisent des icônes pour une meilleure lisibilité :
- 📥 : Requête reçue
- ✅ : Succès
- ❌ : Erreur
- ℹ️ : Information
- 📝 : Log général

## Validation des données

L'API inclut une validation complète des données :
- Vérification de la présence des champs requis (`type` et `co2`)
- Validation du type de données (`co2` doit être un nombre)
- Arrondi automatique à 3 décimales pour les valeurs CO2
- Gestion des erreurs avec messages explicites

## Configuration CORS

L'API est configurée pour accepter les requêtes CORS de l'extension Chrome :
- Origine : `*`
- Méthodes : `GET`, `POST`
- Headers : `Content-Type`, `Authorization`, `Accept`

## Exemple d'utilisation avec l'extension

L'extension utilise la classe `GreenGrowsAPI` pour communiquer avec l'API :

```javascript
const API_CONFIG = {
    baseUrl: 'http://127.0.0.1:3001',
    endpoints: {
        co2: '/api/co2',
        stats: '/api/stats'
    }
};

// Envoi de données CO2
await GreenGrowsAPI.sendCO2Data('webpage', 0.234);

// Récupération des statistiques
const stats = await GreenGrowsAPI.getStats();
```

## Dépendances principales

- `express`: Framework web
- `cors`: Gestion des CORS
- `body-parser`: Parsing du JSON
- `nodemon`: Rechargement automatique en développement
- `chart.js`: Visualisation des données dans le backoffice

## Scripts npm

- `npm run dev`: Démarre le serveur en mode développement avec nodemon
- `npm start`: Démarre le serveur en mode production
