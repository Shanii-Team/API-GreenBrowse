import React, { useState } from 'react';
import { 
  Chrome, 
  Smartphone, 
  Server, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Activity,
  Zap,
  Users,
  BarChart3,
  Settings,
  Key,
  Shield,
  Globe,
  Database,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Download,
  Upload,
  Eye,
  Code
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const ApiSection: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('status');
  const { translate } = useTranslation();

  const tabs = [
    { id: 'status', label: translate('service-status'), icon: Activity },
    { id: 'usage', label: translate('api-usage-tab'), icon: BarChart3 },
    { id: 'security', label: translate('security-tab'), icon: Shield },
    { id: 'documentation', label: translate('documentation-tab'), icon: Code }
  ];

  // Services status data
  const services = [
    {
      id: 'browser-extension',
      title: 'Extension Navigateur',
      status: 'connected',
      statusText: 'Connecté',
      value: '2,847',
      description: 'Mesure en temps réel de l\'empreinte carbone numérique',
      icon: Chrome,
      color: 'from-blue-500 to-cyan-600',
      lastSync: '2024-11-15 14:30'
    },
    {
      id: 'mobile-app',
      title: 'Application Mobile',
      status: 'connected',
      statusText: 'Connecté',
      value: '1,245',
      description: 'Suivi Ikigai et conseils personnalisés',
      icon: Smartphone,
      color: 'from-purple-500 to-pink-600',
      lastSync: '2024-11-15 14:25'
    },
    {
      id: 'api-usage',
      title: 'Utilisation API',
      status: 'high',
      statusText: 'Élevé',
      value: '45.7k',
      description: 'Données synchronisées en temps réel',
      icon: Server,
      color: 'from-emerald-500 to-teal-600',
      lastSync: '2024-11-15 14:35'
    }
  ];

  // API Usage metrics
  const apiMetrics = [
    {
      title: 'REQUÊTES TOTALES',
      value: '2.4M',
      change: 12.5,
      isPositive: true,
      subtitle: 'ce mois',
      icon: Database,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'TEMPS DE RÉPONSE',
      value: '145ms',
      change: 8.3,
      isPositive: true,
      subtitle: 'moyenne',
      icon: Clock,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'TAUX DE SUCCÈS',
      value: '99.8%',
      change: 0.2,
      isPositive: true,
      subtitle: 'disponibilité',
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'DONNÉES SYNC',
      value: '156GB',
      change: 23.1,
      isPositive: true,
      subtitle: 'ce mois',
      icon: RefreshCw,
      color: 'from-orange-500 to-red-500'
    }
  ];

  // API Endpoints
  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/emissions',
      description: 'Récupérer les données d\'émissions',
      usage: '45.2k',
      status: 'active'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/data/sync',
      description: 'Synchroniser les données',
      usage: '23.8k',
      status: 'active'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/engagement',
      description: 'Données d\'engagement',
      usage: '18.5k',
      status: 'active'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/suppliers',
      description: 'Informations fournisseurs',
      usage: '12.3k',
      status: 'active'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/reports/generate',
      description: 'Générer un rapport',
      usage: '8.7k',
      status: 'maintenance'
    }
  ];

  // Security metrics
  const securityMetrics = [
    {
      title: 'Clés API actives',
      value: '12',
      status: 'good',
      description: 'Toutes les clés sont sécurisées'
    },
    {
      title: 'Tentatives d\'intrusion',
      value: '0',
      status: 'excellent',
      description: 'Aucune tentative détectée'
    },
    {
      title: 'Certificats SSL',
      value: '100%',
      status: 'good',
      description: 'Tous les certificats sont valides'
    },
    {
      title: 'Conformité RGPD',
      value: '100%',
      status: 'excellent',
      description: 'Entièrement conforme'
    }
  ];

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'text-emerald-500';
      case 'high':
        return 'text-amber-500';
      case 'maintenance':
        return 'text-orange-500';
      case 'disconnected':
        return 'text-red-500';
      default:
        return 'text-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <Wifi className="w-4 h-4" />;
      case 'high':
        return <TrendingUp className="w-4 h-4" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'POST':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'PUT':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'DELETE':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  const getSecurityStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
      case 'good':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'warning':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-slate-600 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {translate('api-integration-title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {translate('api-subtitle')}
          </p>
        </div>
        
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
          <span>{translate('sync-data')}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                selectedTab === tab.id
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

      {/* Status Tab */}
      {selectedTab === 'status' && (
        <div className="space-y-6">
          {/* Services Status */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold">Statut des Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.id} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 ${getStatusColor(service.status)}`}>
                        {getStatusIcon(service.status)}
                        <span className="text-sm font-medium">{service.statusText}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    
                    <div className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-3">
                      {service.value}
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {service.description}
                    </p>

                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Dernière sync: {service.lastSync}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Usage Tab */}
      {selectedTab === 'usage' && (
        <div className="space-y-6">
          {/* API Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {metric.title}
                    </p>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {metric.value}
                    </div>
                    
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      metric.isPositive ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {metric.isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4 rotate-180" />
                      )}
                      <span>{metric.change > 0 ? '+' : ''}{metric.change}% {metric.subtitle}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* API Endpoints */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Endpoints API les plus utilisés</h3>
            
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <div>
                      <div className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                        {endpoint.endpoint}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {endpoint.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {endpoint.usage}
                      </div>
                      <div className="text-xs text-slate-500">requêtes</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      endpoint.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {selectedTab === 'security' && (
        <div className="space-y-6">
          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSecurityStatusColor(metric.status)}`}>
                    {metric.status === 'excellent' ? 'Excellent' : 
                     metric.status === 'good' ? 'Bon' : 
                     metric.status === 'warning' ? 'Attention' : 'Critique'}
                  </div>
                </div>
                
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {metric.title}
                </h3>
                
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {metric.value}
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* API Keys Management */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Gestion des clés API</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                <Key className="w-4 h-4" />
                Nouvelle clé
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Production API Key', created: '2024-01-15', lastUsed: '2024-11-15', status: 'active' },
                { name: 'Development API Key', created: '2024-03-20', lastUsed: '2024-11-14', status: 'active' },
                { name: 'Mobile App Key', created: '2024-06-10', lastUsed: '2024-11-15', status: 'active' }
              ].map((key, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{key.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Créée le {key.created} • Dernière utilisation: {key.lastUsed}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-xs font-medium">
                      Active
                    </span>
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documentation Tab */}
      {selectedTab === 'documentation' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Documentation API</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Guide de démarrage',
                  description: 'Premiers pas avec l\'API Greenbrows',
                  icon: Globe,
                  color: 'from-blue-500 to-cyan-600'
                },
                {
                  title: 'Référence API',
                  description: 'Documentation complète des endpoints',
                  icon: Code,
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  title: 'Exemples de code',
                  description: 'Exemples d\'intégration en différents langages',
                  icon: Settings,
                  color: 'from-emerald-500 to-teal-600'
                },
                {
                  title: 'SDK JavaScript',
                  description: 'Bibliothèque officielle JavaScript',
                  icon: Download,
                  color: 'from-amber-500 to-orange-600'
                },
                {
                  title: 'Webhooks',
                  description: 'Configuration des notifications temps réel',
                  icon: Zap,
                  color: 'from-red-500 to-pink-600'
                },
                {
                  title: 'Support',
                  description: 'Assistance technique et communauté',
                  icon: Users,
                  color: 'from-indigo-500 to-purple-600'
                }
              ].map((doc, index) => {
                const Icon = doc.icon;
                return (
                  <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                    <div className={`w-12 h-12 bg-gradient-to-br ${doc.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {doc.title}
                    </h4>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {doc.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiSection;