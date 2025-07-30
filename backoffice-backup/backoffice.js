// Configuration de l'API
const API_CONFIG = {
    baseUrl: 'http://3.143.235.117:3001',
    endpoints: {
        co2: '/api/co2',
        stats: '/api/stats'
    }
};

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que Chart.js est bien chargé
    if (typeof Chart === 'undefined') {
        console.error('Chart.js n\'est pas chargé correctement');
        return;
    }

    try {
        // Configuration globale des graphiques
        Chart.defaults.color = '#ffffff';
        Chart.defaults.font.family = 'Inter';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;

        // Variables pour stocker les graphiques
        let co2Chart, typeChart, sitesChart;
        let currentData = null;

        // Fonction pour récupérer les données de l'API
        async function fetchAPIData() {
            try {
                const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.stats}`);
                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.error || 'Erreur lors de la récupération des données');
                }

                return result.data;
            } catch (error) {
                console.error('Erreur API:', error);
                return null;
            }
        }

        // Fonction pour mettre à jour les statistiques
        function updateStats(data) {
            if (!data) return;

            // Mettre à jour les cartes de statistiques
            document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = 
                data.total.toFixed(3) + ' g';
            
            const nbTypes = Object.keys(data.details).length;
            document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = 
                nbTypes.toString();
            
            // Calculer le pourcentage de pages web vs autres types
            const webpagePercent = data.details.webpage 
                ? Math.round((data.details.webpage / data.total) * 100) 
                : 0;
            document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = 
                webpagePercent + '%';

            // Mettre à jour les graphiques
            updateCharts(data);
        }

        // Fonction pour mettre à jour les graphiques
        function updateCharts(data) {
            if (!data) return;

            // Données pour le graphique des types de contenu
            const typeData = {
                labels: Object.keys(data.details),
                data: Object.values(data.details)
            };
            
            // Mettre à jour les graphiques
            updateTypeChart(typeData);
        }

        // Traiter les données des types de contenu
        function processContentTypes(data) {
            return {
                labels: Object.keys(data.details),
                data: Object.values(data.details)
            };
        }

        // Initialiser les graphiques
        function initializeCharts() {
            // Graphique des émissions CO2
            const co2Ctx = document.getElementById('co2Chart').getContext('2d');
            co2Chart = new Chart(co2Ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Émissions CO2 (g)',
                        data: [],
                        borderColor: '#4CAF50',
                        tension: 0.4
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Émissions CO2 au fil du temps'
                        }
                    }
                }
            });

            // Graphique des types de contenu
            const typeCtx = document.getElementById('typeChart').getContext('2d');
            typeChart = new Chart(typeCtx, {
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            '#4CAF50',
                            '#2196F3',
                            '#FFC107',
                            '#9C27B0'
                        ]
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Répartition par type'
                        }
                    }
                }
            });

            // Graphique des sites les plus visités
            const sitesCtx = document.getElementById('sitesChart').getContext('2d');
            sitesChart = new Chart(sitesCtx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Consommation CO2 (g)',
                        data: [],
                        backgroundColor: '#2196F3'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Consommation par type'
                        }
                    }
                }
            });
        }

        // Mettre à jour le graphique des types
        function updateTypeChart(data) {
            if (!typeChart || !data) return;

            typeChart.data.labels = data.labels;
            typeChart.data.datasets[0].data = data.data;
            typeChart.update();
        }

        // Initialiser les graphiques
        initializeCharts();

        // Fonction pour mettre à jour les données périodiquement
        async function updateData() {
            const data = await fetchAPIData();
            if (data) {
                updateStats(data);
            }
        }

        // Mettre à jour les données immédiatement et toutes les 5 secondes
        updateData();
        setInterval(updateData, 5000);

        // Écouter les changements de période
        document.getElementById('timeRange').addEventListener('change', updateData);

    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
});
