// Script de test pour vérifier la connectivité API
const http = require('http');

const API_HOST = '141.95.160.10';
const API_PORT = 3002;

console.log('🧪 Test de connectivité API GreenGrows');
console.log(`📡 Tentative de connexion à http://${API_HOST}:${API_PORT}`);

// Test 1: Health check
function testHealth() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: API_HOST,
            port: API_PORT,
            path: '/api/health',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`✅ Health check: ${res.statusCode} - ${data}`);
                resolve({ status: res.statusCode, data: JSON.parse(data) });
            });
        });

        req.on('error', (error) => {
            console.log(`❌ Health check failed: ${error.message}`);
            reject(error);
        });

        req.setTimeout(5000, () => {
            console.log('⏰ Health check timeout');
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.end();
    });
}

// Test 2: Stats endpoint
function testStats() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: API_HOST,
            port: API_PORT,
            path: '/api/stats',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`✅ Stats check: ${res.statusCode} - ${data}`);
                resolve({ status: res.statusCode, data: JSON.parse(data) });
            });
        });

        req.on('error', (error) => {
            console.log(`❌ Stats check failed: ${error.message}`);
            reject(error);
        });

        req.setTimeout(5000, () => {
            console.log('⏰ Stats check timeout');
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.end();
    });
}

// Test 3: POST CO2 data with user
function testPostCO2() {
    return new Promise((resolve, reject) => {
        const testData = JSON.stringify({
            type: 'test',
            co2: 0.123,
            userId: 'test-user-1',
            deviceInfo: { platform: 'test', version: '1.0.0' }
        });

        const options = {
            hostname: API_HOST,
            port: API_PORT,
            path: '/api/co2',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(testData)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`✅ POST CO2 test: ${res.statusCode} - ${data}`);
                resolve({ status: res.statusCode, data: JSON.parse(data) });
            });
        });

        req.on('error', (error) => {
            console.log(`❌ POST CO2 test failed: ${error.message}`);
            reject(error);
        });

        req.setTimeout(5000, () => {
            console.log('⏰ POST CO2 test timeout');
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.write(testData);
        req.end();
    });
}

// Test 4: GET users list
function testUsers() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: API_HOST,
            port: API_PORT,
            path: '/api/users',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`✅ Users list: ${res.statusCode} - ${data}`);
                resolve({ status: res.statusCode, data: JSON.parse(data) });
            });
        });

        req.on('error', (error) => {
            console.log(`❌ Users list failed: ${error.message}`);
            reject(error);
        });

        req.setTimeout(5000, () => {
            console.log('⏰ Users list timeout');
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.end();
    });
}

// Test 5: POST more CO2 data with different user
function testPostCO2SecondUser() {
    return new Promise((resolve, reject) => {
        const testData = JSON.stringify({
            type: 'webpage',
            co2: 0.456,
            userId: 'test-user-2',
            deviceInfo: { platform: 'flutter', version: '3.0.0' }
        });

        const options = {
            hostname: API_HOST,
            port: API_PORT,
            path: '/api/co2',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(testData)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`✅ POST CO2 User 2: ${res.statusCode} - ${data}`);
                resolve({ status: res.statusCode, data: JSON.parse(data) });
            });
        });

        req.on('error', (error) => {
            console.log(`❌ POST CO2 User 2 failed: ${error.message}`);
            reject(error);
        });

        req.setTimeout(5000, () => {
            console.log('⏰ POST CO2 User 2 timeout');
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.write(testData);
        req.end();
    });
}

// Exécuter tous les tests
async function runTests() {
    console.log('\n🚀 Démarrage des tests...\n');
    
    try {
        await testHealth();
    } catch (error) {
        console.log('❌ Test health échoué');
    }

    try {
        await testStats();
    } catch (error) {
        console.log('❌ Test stats échoué');
    }

    try {
        await testPostCO2();
    } catch (error) {
        console.log('❌ Test POST CO2 échoué');
    }

    try {
        await testPostCO2SecondUser();
    } catch (error) {
        console.log('❌ Test POST CO2 User 2 échoué');
    }

    // Test users list après POST
    try {
        console.log('\n👥 Vérification de la liste des utilisateurs...');
        await testUsers();
    } catch (error) {
        console.log('❌ Test users list échoué');
    }

    // Test stats après POST
    try {
        console.log('\n🔄 Vérification des stats après POST...');
        await testStats();
    } catch (error) {
        console.log('❌ Vérification stats échoué');
    }

    console.log('\n✅ Tests multi-utilisateurs terminés');
}

runTests();