import React from 'react';
import { Activity, TrendingUp, Clock, Globe } from 'lucide-react';
import { useCO2Data } from '../hooks/useCO2Data';
import { useUsers } from '../hooks/useUsers';
import { formatNumber } from '../utils/formatNumber';

const RealTimeStats: React.FC = () => {
  const { data: co2Data, loading: co2Loading, error: co2Error, hasRealData, isConnected } = useCO2Data();
  const { users, totalUsers, globalTotal, loading: usersLoading } = useUsers();

  const loading = co2Loading || usersLoading;

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calcul des statistiques en temps réel
  const totalSessions = users.reduce((acc, user) => acc + (user.typesCount || 0), 0);
  const averageCO2PerUser = totalUsers > 0 ? globalTotal / totalUsers : 0;
  const mostActiveUser = users.length > 0 ? users.reduce((prev, current) => 
    (prev.totalCO2 > current.totalCO2) ? prev : current
  ) : null;

  const stats = [
    {
      label: 'CO₂ Total Collecté',
      value: formatNumber(globalTotal || co2Data.total, 'co2'),
      icon: Globe,
      color: 'from-red-500 to-orange-500',
      trend: hasRealData ? 'up' : 'neutral'
    },
    {
      label: 'Utilisateurs Actifs',
      value: totalUsers.toString(),
      icon: Activity,
      color: 'from-blue-500 to-purple-600',
      trend: totalUsers > 0 ? 'up' : 'neutral'
    },
    {
      label: 'Sessions Totales',
      value: totalSessions.toString(),
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      trend: totalSessions > 0 ? 'up' : 'neutral'
    },
    {
      label: 'Moyenne/Utilisateur',
      value: formatNumber(averageCO2PerUser, 'co2'),
      icon: Clock,
      color: 'from-purple-500 to-pink-600',
      trend: averageCO2PerUser > 0 ? 'up' : 'neutral'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Statistiques en Temps Réel</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              {stat.trend === 'up' && (
                <TrendingUp className="w-4 h-4 text-green-500" />
              )}
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Utilisateur le plus actif */}
      {mostActiveUser && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                Utilisateur le plus actif: {mostActiveUser.profile.name}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {formatNumber(mostActiveUser.totalCO2, 'co2')} générés
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message d'état des données */}
      <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
        <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
          {hasRealData ? (
            <span className="text-green-600 dark:text-green-400">
              ✓ Données réelles de l'extension collectées
            </span>
          ) : (
            <span className="text-amber-600 dark:text-amber-400">
              ⚠ En attente de données de l'extension Chrome
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeStats;