import React, { useState } from 'react';
import { AlertTriangle, Zap, Droplets, Save } from 'lucide-react';

const AlertThresholds: React.FC = () => {
  const [thresholds, setThresholds] = useState({
    co2: 3000,
    energy: 50000,
    water: 10000
  });

  const handleThresholdChange = (type: string, value: number) => {
    setThresholds(prev => ({ ...prev, [type]: value }));
  };

  const handleSave = (type: string) => {
    // Simulate save action
    console.log(`Saving ${type} threshold:`, thresholds[type as keyof typeof thresholds]);
  };

  const thresholdItems = [
    {
      id: 'co2',
      icon: AlertTriangle,
      title: 'Émissions CO2',
      unit: 'tCO₂e',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'energy',
      icon: Zap,
      title: 'Consommation Énergétique',
      unit: 'kWh',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'water',
      icon: Droplets,
      title: 'Utilisation d\'Eau',
      unit: 'm³',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Seuils d'Alerte</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {thresholdItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={thresholds[item.id as keyof typeof thresholds]}
                    onChange={(e) => handleThresholdChange(item.id, Number(e.target.value))}
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="text-sm text-slate-500 dark:text-slate-400 min-w-max">
                    {item.unit}
                  </span>
                </div>
                
                <button
                  onClick={() => handleSave(item.id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertThresholds;