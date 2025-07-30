import React, { useState } from 'react';
import { 
  Leaf, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Users, 
  Target, 
  ShoppingCart,
  Download,
  Upload,
  Calendar,
  Filter,
  Search,
  Eye,
  Vote,
  Trophy,
  Clock,
  Camera,
  Play,
  Heart,
  Share2,
  Plus,
  CheckCircle,
  AlertTriangle,
  Zap,
  Trees,
  Waves,
  Mountain,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Settings
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const EnvironmentalImpactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('carbon-balance');
  const [selectedProject, setSelectedProject] = useState('all');
  const [timeframe, setTimeframe] = useState('12months');
  const { translate } = useTranslation();

  const tabs = [
    { id: 'carbon-balance', label: translate('carbon-balance'), icon: BarChart3 },
    { id: 'projects', label: translate('ecological-projects'), icon: Trees },
    { id: 'engagement', label: translate('employee-engagement-tab'), icon: Users }
  ];

  const timeframes = [
    { id: '3months', label: '3 mois' },
    { id: '6months', label: '6 mois' },
    { id: '12months', label: '12 mois' },
    { id: '24months', label: '2 ans' }
  ];

  // Données de balance carbone
  const carbonData = {
    currentEmissions: 2847,
    quotasPurchased: 1500,
    quotasNeeded: 1347,
    averageCost: 32,
    neutralityGap: 1347,
    status: 'warning' // 'good', 'warning', 'critical'
  };

  const monthlyEmissions = [
    { month: 'Jan', emissions: 2950, quotas: 1200 },
    { month: 'Fév', emissions: 2890, quotas: 1300 },
    { month: 'Mar', emissions: 2920, quotas: 1250 },
    { month: 'Avr', emissions: 2880, quotas: 1400 },
    { month: 'Mai', emissions: 2860, quotas: 1350 },
    { month: 'Jun', emissions: 2840, quotas: 1450 },
    { month: 'Jul', emissions: 2820, quotas: 1400 },
    { month: 'Aoû', emissions: 2800, quotas: 1500 },
    { month: 'Sep', emissions: 2870, quotas: 1480 },
    { month: 'Oct', emissions: 2850, quotas: 1520 },
    { month: 'Nov', emissions: 2847, quotas: 1500 },
    { month: 'Déc', emissions: 2830, quotas: 1600 }
  ];

  // Projets écologiques
  const ecologicalProjects = [
    {
      id: 'amazon-forest',
      name: 'Préservation Amazonie',
      type: 'forest',
      location: { lat: -3.4653, lng: -62.2159, country: 'Brésil' },
      area: 2500,
      co2Impact: 12500,
      investment: 75000,
      participation: 89,
      status: 'active',
      images: 4,
      videos: 2,
      description: 'Protection de 2,500 hectares de forêt amazonienne'
    },
    {
      id: 'coral-restoration',
      name: 'Restauration Corallienne',
      type: 'coral',
      location: { lat: 21.3099, lng: -157.8581, country: 'Hawaï' },
      area: 150,
      co2Impact: 800,
      investment: 45000,
      participation: 67,
      status: 'active',
      images: 8,
      videos: 3,
      description: 'Restauration de récifs coralliens dans le Pacifique'
    },
    {
      id: 'mangrove-senegal',
      name: 'Mangroves du Sénégal',
      type: 'mangrove',
      location: { lat: 14.4974, lng: -14.4524, country: 'Sénégal' },
      area: 800,
      co2Impact: 4200,
      investment: 35000,
      participation: 78,
      status: 'active',
      images: 6,
      videos: 1,
      description: 'Protection et restauration des mangroves côtières'
    },
    {
      id: 'reforestation-france',
      name: 'Reforestation France',
      type: 'forest',
      location: { lat: 45.8566, lng: 6.0639, country: 'France' },
      area: 450,
      co2Impact: 2250,
      investment: 28000,
      participation: 94,
      status: 'completed',
      images: 12,
      videos: 4,
      description: 'Reforestation dans les Alpes françaises'
    }
  ];

  // Données d'engagement des employés
  const employeeEngagement = {
    totalEmployees: 245,
    activeParticipants: 187,
    volunteerHours: 1240,
    monthlyTarget: 1500,
    topContributors: [
      { name: 'Utilisateur A***', hours: 45, projects: 3, greencoins: 4500 },
      { name: 'Utilisateur B***', hours: 38, projects: 2, greencoins: 3800 },
      { name: 'Utilisateur C***', hours: 35, projects: 4, greencoins: 3500 },
      { name: 'Utilisateur D***', hours: 32, projects: 2, greencoins: 3200 },
      { name: 'Utilisateur E***', hours: 28, projects: 3, greencoins: 2800 }
    ]
  };

  // Projets à voter
  const votingProjects = [
    {
      id: 'ocean-cleanup',
      name: 'Nettoyage Océan Pacifique',
      description: 'Participation au projet de nettoyage des déchets plastiques',
      investment: 50000,
      impact: 'Retrait de 10 tonnes de plastique',
      votes: 156,
      totalVotes: 245,
      deadline: '2024-12-15'
    },
    {
      id: 'solar-farm',
      name: 'Ferme Solaire Communautaire',
      description: 'Investissement dans une ferme solaire locale',
      investment: 85000,
      impact: '500 MWh d\'énergie propre/an',
      votes: 134,
      totalVotes: 245,
      deadline: '2024-12-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
      case 'warning':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-slate-600 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'forest':
        return Trees;
      case 'coral':
        return Waves;
      case 'mangrove':
        return Mountain;
      default:
        return Globe;
    }
  };

  const getProjectColor = (type: string) => {
    switch (type) {
      case 'forest':
        return 'from-emerald-500 to-green-600';
      case 'coral':
        return 'from-blue-500 to-cyan-600';
      case 'mangrove':
        return 'from-teal-500 to-emerald-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const handlePurchaseQuotas = () => {
    console.log('Achat de quotas carbone pour équilibrer');
  };

  const handleExportData = () => {
    console.log('Export des données carbone');
  };

  const handleJoinProject = (projectId: string) => {
    console.log(`Rejoindre le projet: ${projectId}`);
  };

  const handleVote = (projectId: string) => {
    console.log(`Voter pour le projet: ${projectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {translate('environmental-impact')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {translate('environmental-subtitle')}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            {translate('export')}
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
            <Plus className="w-4 h-4" />
            {translate('propose-action')}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Balance Carbone Tab */}
      {activeTab === 'carbon-balance' && (
        <div className="space-y-6">
          {/* KPIs Balance Carbone */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Conseils IA personnalisés */}
            <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Recommandations IA Personnalisées
                  </h3>
                  <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <p><strong>Optimisation immédiate :</strong> Réduisez vos émissions de 12% en achetant 850 tCO₂e de quotas forestiers (coût estimé : 27,200€)</p>
                    <p><strong>Impact potentiel :</strong> Investir dans le projet Mangroves du Sénégal pourrait compenser 15% de vos émissions annuelles</p>
                    <p><strong>Engagement équipe :</strong> 89% de participation aux projets écologiques - lancez un défi "Zéro déchet" pour maintenir la dynamique</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(carbonData.status)}`}>
                  {carbonData.status === 'warning' ? 'Attention' : 'Bon'}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  ÉMISSIONS ACTUELLES
                </p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {carbonData.currentEmissions.toLocaleString()} <span className="text-lg font-medium text-slate-500">tCO₂e</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  QUOTAS ACHETÉS
                </p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {carbonData.quotasPurchased.toLocaleString()} <span className="text-lg font-medium text-slate-500">tCO₂e</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Coût moyen: {carbonData.averageCost}€/tCO₂e
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  ÉCART NEUTRALITÉ
                </p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {carbonData.neutralityGap.toLocaleString()} <span className="text-lg font-medium text-slate-500">tCO₂e</span>
                </div>
                <button
                  onClick={handlePurchaseQuotas}
                  className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                >
                  Acheter pour équilibrer
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                  COÛT ÉQUILIBRAGE
                </p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {(carbonData.neutralityGap * carbonData.averageCost).toLocaleString()}€
                </div>
                <div className="text-sm text-emerald-600">
                  Économie vs marché: -8%
                </div>
              </div>
            </div>
          </div>

          {/* Graphique évolution 12 mois */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Évolution Balance Carbone (12 mois)</h3>
              <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setTimeframe(tf.id)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                      timeframe === tf.id
                        ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative h-80">
              <svg viewBox="0 0 800 300" className="w-full h-full">
                <defs>
                  <linearGradient id="emissionsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="quotasGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((line) => (
                  <line
                    key={line}
                    x1="80"
                    y1={50 + line * 40}
                    x2="750"
                    y2={50 + line * 40}
                    stroke="rgba(148, 163, 184, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Y-axis labels */}
                {[3000, 2800, 2600, 2400, 2200, 2000].map((value, index) => (
                  <text
                    key={index}
                    x="70"
                    y={55 + index * 40}
                    textAnchor="end"
                    className="text-xs fill-slate-500 dark:fill-slate-400"
                  >
                    {value}
                  </text>
                ))}
                
                {/* Emissions line */}
                <path
                  d={`M 80 ${250 - ((monthlyEmissions[0].emissions - 2000) / 1000) * 200} ${monthlyEmissions.slice(1).map((point, index) => 
                    `L ${80 + (index + 1) * 55} ${250 - ((point.emissions - 2000) / 1000) * 200}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Quotas line */}
                <path
                  d={`M 80 ${250 - ((monthlyEmissions[0].quotas - 1000) / 1000) * 200} ${monthlyEmissions.slice(1).map((point, index) => 
                    `L ${80 + (index + 1) * 55} ${250 - ((point.quotas - 1000) / 1000) * 200}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Data points */}
                {monthlyEmissions.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={80 + index * 55}
                      cy={250 - ((point.emissions - 2000) / 1000) * 200}
                      r="4"
                      fill="#ef4444"
                    />
                    <circle
                      cx={80 + index * 55}
                      cy={250 - ((point.quotas - 1000) / 1000) * 200}
                      r="4"
                      fill="#10b981"
                    />
                  </g>
                ))}
                
                {/* X-axis labels */}
                {monthlyEmissions.map((point, index) => (
                  <text
                    key={index}
                    x={80 + index * 55}
                    y="280"
                    textAnchor="middle"
                    className="text-xs fill-slate-500 dark:fill-slate-400"
                  >
                    {point.month}
                  </text>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-2">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Émissions (tCO₂e)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quotas (tCO₂e)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projets Écologiques Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Conseils IA pour les projets */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Trees className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                  🌱 Conseils IA - Projets Écologiques
                </h3>
                <div className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
                  <p><strong>Diversification recommandée :</strong> Ajoutez un projet océanique pour équilibrer votre portfolio (actuellement 60% forêts, 40% autres)</p>
                  <p><strong>ROI optimal :</strong> Le projet Coraux Hawaï offre le meilleur ratio impact/coût (5.3 tCO₂e/€)</p>
                  <p><strong>Géolocalisation :</strong> Considérez un projet européen pour réduire les coûts de monitoring (-25%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Métriques globales des projets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Trees className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {ecologicalProjects.reduce((sum, p) => sum + p.area, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Hectares protégés</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {ecologicalProjects.reduce((sum, p) => sum + p.co2Impact, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">tCO₂e évitées</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {(ecologicalProjects.reduce((sum, p) => sum + p.investment, 0) / 1000).toFixed(0)}k€
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Investis</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {Math.round(ecologicalProjects.reduce((sum, p) => sum + p.participation, 0) / ecologicalProjects.length)}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Participation moy.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Carte des projets */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Cartographie des Projets Actifs</h3>
            
            <div className="relative bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl h-96 overflow-hidden">
              {/* Simulation de carte monde */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-400 dark:text-slate-500">
                  <Globe className="w-24 h-24 mx-auto mb-4" />
                  <p className="text-center">Carte interactive des projets</p>
                </div>
              </div>
              
              {/* Marqueurs de projets */}
              {ecologicalProjects.map((project, index) => {
                const Icon = getProjectIcon(project.type);
                return (
                  <div
                    key={project.id}
                    className={`absolute w-8 h-8 bg-gradient-to-br ${getProjectColor(project.type)} rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`
                    }}
                    title={project.name}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Liste des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ecologicalProjects.map((project) => {
              const Icon = getProjectIcon(project.type);
              return (
                <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getProjectColor(project.type)} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{project.location.country}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {project.name}
                  </h4>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {project.area.toLocaleString()} ha
                      </div>
                      <div className="text-xs text-slate-500">Surface protégée</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {project.co2Impact.toLocaleString()} tCO₂e
                      </div>
                      <div className="text-xs text-slate-500">Impact carbone</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Participation: </span>
                      <span className="font-semibold text-slate-900 dark:text-white">{project.participation}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{project.images}</span>
                      <Play className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{project.videos}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJoinProject(project.id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Rejoindre
                    </button>
                    <button className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Projets à voter */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Projets à Voter</h3>
            
            <div className="space-y-4">
              {votingProjects.map((project) => (
                <div key={project.id} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {project.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">Investissement: </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {project.investment.toLocaleString()}€
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">Impact: </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {project.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        Échéance: {new Date(project.deadline).toLocaleDateString('fr-FR')}
                      </div>
                      <button
                        onClick={() => handleVote(project.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                      >
                        <Vote className="w-4 h-4" />
                        Voter
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Votes</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {project.votes}/{project.totalVotes} ({Math.round((project.votes / project.totalVotes) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                        style={{ width: `${(project.votes / project.totalVotes) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Engagement Collaborateurs Tab */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          {/* Conseils IA pour l'engagement */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  👥 Stratégies IA - Engagement Collaborateurs
                </h3>
                <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                  <p><strong>Motivation optimale :</strong> Lancez un challenge "1000h bénévolat" avec récompenses GreenCoins pour atteindre l'objectif mensuel</p>
                  <p><strong>Rétention prédite :</strong> 94% de probabilité d'atteindre 200 participants actifs d'ici fin d'année</p>
                  <p><strong>Gamification :</strong> Ajoutez des badges "Éco-Champion" pour augmenter l'engagement de 15%</p>
                </div>
              </div>
            </div>
          </div>

          {/* KPIs Engagement */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {employeeEngagement.activeParticipants}/{employeeEngagement.totalEmployees}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Participants actifs</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"
                  style={{ width: `${(employeeEngagement.activeParticipants / employeeEngagement.totalEmployees) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {employeeEngagement.volunteerHours.toLocaleString()}h
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Bénévolat ce mois</div>
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Objectif: {employeeEngagement.monthlyTarget}h
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {Math.round((employeeEngagement.volunteerHours / employeeEngagement.monthlyTarget) * 100)}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Objectif atteint</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
                  style={{ width: `${Math.min((employeeEngagement.volunteerHours / employeeEngagement.monthlyTarget) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {employeeEngagement.topContributors.reduce((sum, c) => sum + c.greencoins, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">GreenCoins distribués</div>
                </div>
              </div>
            </div>
          </div>

          {/* Classement des contributeurs */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Top Contributeurs du Mois</h3>
            
            <div className="space-y-4">
              {employeeEngagement.topContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-600' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800' :
                    'bg-gradient-to-br from-slate-500 to-slate-700'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {contributor.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {contributor.projects} projets • {contributor.hours}h bénévolat
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">
                      {contributor.greencoins.toLocaleString()} GC
                    </div>
                    <div className="text-xs text-slate-500">GreenCoins</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                Rejoindre un projet
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-4">
                Découvrez les initiatives disponibles et contribuez à l'impact environnemental
              </p>
              <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                Voir les projets
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Mon impact
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                Consultez votre tableau de bord personnel et vos contributions
              </p>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Voir mon profil
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Proposer une action
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                Soumettez vos idées d'initiatives environnementales
              </p>
              <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors">
                Proposer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentalImpactSection;