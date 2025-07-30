const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001; // Port configuré dans le client GreenGrowsAPI
const host = process.env.NODE_ENV === 'production' ? '141.95.160.10' : '0.0.0.0'; // VPS en prod, toutes interfaces en dev

// --- CORRECTION SONARQUBE ---
// Désactive l'en-tête 'X-Powered-By: Express' pour des raisons de sécurité.
// Cela évite de révéler facilement la technologie utilisée par le serveur (fingerprinting).
app.disable('x-powered-by');
// --- FIN CORRECTION ---

// Configuration CORS étendue pour Flutter
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: false,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Servir les fichiers statiques du backoffice
app.use('/backoffice', express.static('backoffice/dist'));

// Servir le backoffice simple en HTML
app.use('/dashboard', express.static('./', { index: 'backoffice-simple.html' }));

// Route pour servir le backoffice (SPA routing)
app.get('/backoffice/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'backoffice/dist/index.html'));
});

// Route simple pour dashboard de test
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'backoffice-simple.html'));
});

// Stockage des données multi-utilisateurs
// Structure: users[userId] = { totalCO2: number, details: {}, profile: {}, lastActivity: Date }
let users = {};
let totalCO2 = 0; // Total global pour compatibilité
let details = {}; // Détails globaux pour compatibilité

// Fonction utilitaire pour obtenir ou créer un utilisateur
function getOrCreateUser(userId) {
    if (!userId) {
        userId = 'anonymous';
    }
    
    if (!users[userId]) {
        users[userId] = {
            id: userId,
            totalCO2: 0,
            details: {},
            profile: {
                name: userId === 'anonymous' ? 'Utilisateur Anonyme' : `Utilisateur ${userId}`,
                createdAt: new Date().toISOString(),
                deviceInfo: null
            },
            lastActivity: new Date().toISOString(),
            sessions: []
        };
        debugLog('info', `Nouvel utilisateur créé: ${userId}`);
    }
    
    return users[userId];
}

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

// Route de test de connectivité
app.get('/api/health', (req, res) => {
    debugLog('info', 'Health check requested');
    res.json({
        success: true,
        message: 'GreenGrows API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Route pour recevoir les données de consommation CO2
app.post('/api/co2', (req, res) => {
    try {
        const { type, co2, userId, deviceInfo } = req.body;

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

        // Obtenir ou créer l'utilisateur
        const user = getOrCreateUser(userId);
        user.lastActivity = new Date().toISOString();
        
        // Mettre à jour les informations de l'appareil si fournies
        if (deviceInfo) {
            user.profile.deviceInfo = deviceInfo;
        }

        // Mise à jour des statistiques utilisateur
        const roundedCO2 = Math.round(co2 * 1000) / 1000;
        user.totalCO2 += roundedCO2;
        
        if (!user.details[type]) {
            user.details[type] = 0;
        }
        user.details[type] += roundedCO2;

        // Mise à jour des statistiques globales (pour compatibilité)
        totalCO2 += roundedCO2;
        if (!details[type]) {
            details[type] = 0;
        }
        details[type] += roundedCO2;

        debugLog('info', 'Statistiques mises à jour', {
            userId: user.id,
            userTotal: Math.round(user.totalCO2 * 1000) / 1000,
            globalTotal: Math.round(totalCO2 * 1000) / 1000,
            type: type,
            co2Added: roundedCO2
        });

        const response = {
            success: true,
            data: {
                userId: user.id,
                type,
                co2: roundedCO2,
                userTotal: Math.round(user.totalCO2 * 1000) / 1000,
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

// Route pour obtenir la liste des utilisateurs
app.get('/api/users', (req, res) => {
    try {
        const usersList = Object.values(users).map(user => ({
            id: user.id,
            profile: user.profile,
            totalCO2: Math.round(user.totalCO2 * 1000) / 1000,
            lastActivity: user.lastActivity,
            typesCount: Object.keys(user.details).length
        }));

        const response = {
            success: true,
            data: {
                users: usersList,
                totalUsers: usersList.length,
                globalTotal: Math.round(totalCO2 * 1000) / 1000
            }
        };

        debugLog('success', 'Liste des utilisateurs récupérée', { count: usersList.length });
        res.json(response);

    } catch (error) {
        debugLog('error', 'Erreur serveur', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des utilisateurs',
            details: error.message
        });
    }
});

// Route pour obtenir les statistiques d'un utilisateur spécifique
app.get('/api/users/:userId/stats', (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!users[userId]) {
            return res.status(404).json({
                success: false,
                error: 'Utilisateur non trouvé'
            });
        }

        const user = users[userId];
        const stats = {
            success: true,
            data: {
                userId: user.id,
                profile: user.profile,
                total: Math.round(user.totalCO2 * 1000) / 1000,
                details: Object.fromEntries(
                    Object.entries(user.details).map(([key, value]) => [
                        key,
                        Math.round(value * 1000) / 1000
                    ])
                ),
                lastActivity: user.lastActivity
            }
        };

        debugLog('success', `Statistiques utilisateur ${userId} récupérées`, stats);
        res.json(stats);

    } catch (error) {
        debugLog('error', 'Erreur serveur', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des statistiques utilisateur',
            details: error.message
        });
    }
});

// Route pour mettre à jour le profil d'un utilisateur
app.put('/api/users/:userId/profile', (req, res) => {
    try {
        const { userId } = req.params;
        const { name, deviceInfo } = req.body;
        
        const user = getOrCreateUser(userId);
        
        if (name) {
            user.profile.name = name;
        }
        
        if (deviceInfo) {
            user.profile.deviceInfo = deviceInfo;
        }
        
        user.lastActivity = new Date().toISOString();

        const response = {
            success: true,
            data: {
                userId: user.id,
                profile: user.profile,
                updated: new Date().toISOString()
            }
        };

        debugLog('success', `Profil utilisateur ${userId} mis à jour`, response);
        res.json(response);

    } catch (error) {
        debugLog('error', 'Erreur serveur', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la mise à jour du profil utilisateur',
            details: error.message
        });
    }
});

// Route pour supprimer un utilisateur
app.delete('/api/users/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!users[userId]) {
            return res.status(404).json({
                success: false,
                error: 'Utilisateur non trouvé'
            });
        }

        // Soustraire les données de l'utilisateur du total global
        const user = users[userId];
        totalCO2 -= user.totalCO2;
        
        Object.entries(user.details).forEach(([type, value]) => {
            details[type] -= value;
            if (details[type] <= 0) {
                delete details[type];
            }
        });

        delete users[userId];

        const response = {
            success: true,
            data: {
                userId,
                deleted: new Date().toISOString(),
                remainingUsers: Object.keys(users).length
            }
        };

        debugLog('success', `Utilisateur ${userId} supprimé`, response);
        res.json(response);

    } catch (error) {
        debugLog('error', 'Erreur serveur', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la suppression de l\'utilisateur',
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
