#!/bin/bash

echo "🚀 Déploiement GreenGrows API + Backoffice"
echo "=========================================="

# Arrêter les processus existants
echo "📛 Arrêt des processus existants..."
pkill -f "node server.js" || true

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Build du backoffice
echo "🏗️  Construction du backoffice..."
cd backoffice
npm install
npm run build
cd ..

# Démarrer le serveur
echo "🚀 Démarrage du serveur..."
nohup node server.js > server.log 2>&1 &

echo "✅ Déploiement terminé !"
echo ""
echo "📍 Services disponibles:"
echo "   🌐 API: http://141.95.160.10:3001/api"
echo "   📊 Backoffice: http://141.95.160.10:3001/backoffice"
echo "   📋 Health: http://141.95.160.10:3001/api/health"
echo ""
echo "📊 Logs du serveur: tail -f server.log"