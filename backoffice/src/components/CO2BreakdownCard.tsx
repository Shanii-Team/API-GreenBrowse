import React from 'react';
import { BarChart3, Globe, Zap } from 'lucide-react';

interface CO2BreakdownCardProps {
  details: Record<string, number>;
  total: number;
  loading?: boolean;
}

const CO2BreakdownCard: React.FC<CO2BreakdownCardProps> = ({ details, total, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Répartition des émissions CO₂</h2>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  const sortedDetails = Object.entries(details)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Show top 5 categories

  if (sortedDetails.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Répartition des émissions CO₂</h2>
        </div>
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucune donnée disponible</p>
          <p className="text-sm">Les données apparaîtront lors de l'utilisation de l'extension</p>
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'webpage':
      case 'website':
        return <Globe className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case 'webpage':
        return 'Pages web';
      case 'website':
        return 'Sites web';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Répartition des émissions CO₂</h2>
      </div>

      <div className="space-y-4">
        {sortedDetails.map(([type, value], index) => {
          const percentage = total > 0 ? (value / total) * 100 : 0;
          const displayValue = value < 1 ? `${(value * 1000).toFixed(0)} g` : `${value.toFixed(3)} kg`;
          
          return (
            <div key={type} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                    {getIcon(type)}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {getTypeLabel(type)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {displayValue}CO₂e
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(percentage, 2)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {Object.keys(details).length > 5 && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            +{Object.keys(details).length - 5} autres catégories
          </p>
        </div>
      )}
    </div>
  );
};

export default CO2BreakdownCard;