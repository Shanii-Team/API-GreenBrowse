const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Port configuré dans le client GreenGrowsAPI
const host = '141.95.160.10'; // Adresse VPS

// Configuration CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Stockage des données
let totalCO2 = 0;
let details = {};

// Fonction de debug avec formatage amélioré
function debugLog(type, message, data = null) {
    const timestamp = new Date().toISOString();
    let icon = '📝';
    switch (type) {
        case 'success': icon = '✅'; break;
        case 'error': icon = '❌'; break;
        case 'info': icon = 'ℹ️'; break;
        case 'request': icon = '📥'; break;
        case 'response': icon = '📤'; break;
    }
    
    console.log('\n' + '-'.repeat(80));
    console.log(`${icon} [DEBUG API ${timestamp}] ${message}`);
    if (data) {
        console.log('Données :', JSON.stringify(data, null, 2));
    }
    console.log('-'.repeat(80) + '\n');
}

// Middleware de logging des requêtes
app.use((req, res, next) => {
    debugLog('request', `${req.method} ${req.path}`, req.body);
    next();
});

// Route pour recevoir les données de consommation CO2
app.post('/api/co2', (req, res) => {
    try {
        const { type, co2 } = req.body;

        // Validation des données
        if (type === undefined || co2 === undefined) {
            const error = { message: 'Les champs type et co2 sont requis' };
            debugLog('error', 'Validation échouée', error);
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        if (typeof co2 !== 'number' || isNaN(co2)) {
            const error = { message: 'La valeur CO2 doit être un nombre' };
            debugLog('error', 'Validation échouée', error);
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        // Mise à jour des statistiques
        const roundedCO2 = Math.round(co2 * 1000) / 1000;
        totalCO2 += roundedCO2;
        if (!details[type]) {
            details[type] = 0;
        }
        details[type] += roundedCO2;

        debugLog('info', 'Statistiques mises à jour', {
            total: Math.round(totalCO2 * 1000) / 1000,
            details: Object.fromEntries(
                Object.entries(details).map(([key, value]) => [
                    key,
                    Math.round(value * 1000) / 1000
                ])
            )
        });
        
        const response = {
            success: true,
            data: {
                type,
                co2: roundedCO2,
                timestamp: new Date().toISOString()
            }
        };

        debugLog('success', 'Données CO2 enregistrées', response);
        res.status(201).json(response);

    } catch (error) {
        debugLog('error', 'Erreur serveur', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Erreur lors du traitement des données',
            details: error.message
        });
    }
});

// Route pour obtenir les statistiques
app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            success: true,
            data: {
                total: Math.round(totalCO2 * 1000) / 1000,
                details: Object.fromEntries(
                    Object.entries(details).map(([key, value]) => [
                        key,
                        Math.round(value * 1000) / 1000
                    ])
                )
            }
        };

        debugLog('success', 'Statistiques récupérées', stats);
        res.json(stats);

    } catch (error) {
        debugLog('error', 'Erreur serveur', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des statistiques',
            details: error.message
        });
    }
});

// Gestion du démarrage du serveur
const server = app.listen(port, host)
    .on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`\n❌ [ERROR API] Le port ${port} est déjà utilisé. Veuillez libérer ce port avant de démarrer le serveur GreenGrows.\n`);
        } else {
            console.error('\n❌ [ERROR API] Erreur de démarrage:', error, '\n');
        }
        process.exit(1);
    })
    .on('listening', () => {
        console.log('\n' + '='.repeat(80));
        console.log('✨ SERVEUR GREENGROWS');
        console.log('='.repeat(80));
        console.log(`✅ API démarrée sur http://${host}:${port}`);
        console.log('\n📍 Endpoints disponibles :');
        console.log(`   POST http://${host}:${port}/api/co2  - Envoyer des données CO2`);
        console.log(`   GET  http://${host}:${port}/api/stats - Récupérer les statistiques`);
        console.log('\n📝 Format des données :');
        console.log('   {"type": "webpage", "co2": 0.234}');
        console.log('='.repeat(80) + '\n');
    });
