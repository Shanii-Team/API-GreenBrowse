import React, { useState } from 'react';
import { Chrome, Smartphone, Server, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useCO2Data } from '../hooks/useCO2Data';

const ApiIntegration: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const { data: co2Data, loading, error, isConnected, hasRealData, refresh } = useCO2Data();

  const totalCO2 = co2Data.total || 0;
  const totalCO2Display = totalCO2 < 1 ? `${(totalCO2 * 1000).toFixed(0)} gCO₂e` : `${totalCO2.toFixed(3)} kgCO₂e`;

  const services = [
    {
      icon: Chrome,
      title: 'Extension Navigateur',
      status: hasRealData ? 'connected' : isConnected ? 'waiting' : 'disconnected',
      value: loading ? 'Loading...' : hasRealData ? totalCO2Display : 'En attente de données',
      description: hasRealData ? 'Données reçues de l\'extension' : 'Mesure en temps réel de l\'empreinte carbone numérique'
    },
    {
      icon: Server,
      title: 'API GreenGrows',
      status: isConnected ? 'connected' : 'disconnected',
      value: loading ? 'Loading...' : `${Object.keys(co2Data.details || {}).length} types`,
      description: isConnected ? 'Serveur API opérationnel' : 'Erreur de connexion au serveur'
    },
    {
      icon: Smartphone,
      title: 'Application Flutter',
      status: hasRealData ? 'connected' : isConnected ? 'waiting' : 'disconnected',
      value: loading ? 'Loading...' : hasRealData ? `${Object.values(co2Data.details || {}).length} entrées` : 'En attente',
      description: hasRealData ? 'Données reçues de l\'application' : (error || 'Auto-refresh toutes les 5 secondes')
    }
  ];

  const handleSync = async () => {
    setSyncing(true);
    await refresh();
    setTimeout(() => setSyncing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-emerald-500';
      case 'waiting':
        return 'text-amber-500';
      case 'active':
        return 'text-blue-500';
      case 'error':
        return 'text-red-500';
      case 'disconnected':
        return 'text-gray-500';
      default:
        return 'text-red-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-4 h-4" />;
      case 'waiting':
        return <RefreshCw className="w-4 h-4 animate-pulse" />;
      case 'active':
        return <Wifi className="w-4 h-4" />;
      case 'error':
      case 'disconnected':
        return <WifiOff className="w-4 h-4" />;
      default:
        return <WifiOff className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Server className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Intégration API</h2>
        </div>
        
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>Synchroniser</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 ${getStatusColor(service.status)}`}>
                  {getStatusIcon(service.status)}
                  <span className="text-sm font-medium capitalize">{service.status}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {service.title}
              </h3>
              
              <div className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
                {service.value}
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApiIntegration;