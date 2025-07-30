import React, { useState } from 'react';
import { Zap, Droplets, ToggleLeft, ToggleRight } from 'lucide-react';
import { CombinedMetrics } from '../types/water';

interface CombinedCO2WaterWidgetProps {
  metrics: CombinedMetrics;
}

const CombinedCO2WaterWidget: React.FC<CombinedCO2WaterWidgetProps> = ({ metrics }) => {
  const [showWater, setShowWater] = useState(false);

  const toggleView = () => {
    setShowWater(!showWater);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
      {/* Toggle Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Environmental Impact</h3>
        <button
          onClick={toggleView}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
        >
          <Zap className={`w-4 h-4 transition-colors duration-200 ${!showWater ? 'text-emerald-600' : 'text-slate-400'}`} />
          {showWater ? (
            <ToggleRight className="w-5 h-5 text-blue-600" />
          ) : (
            <ToggleLeft className="w-5 h-5 text-slate-400" />
          )}
          <Droplets className={`w-4 h-4 transition-colors duration-200 ${showWater ? 'text-blue-600' : 'text-slate-400'}`} />
        </button>
      </div>

      {/* Animated Content */}
      <div className="relative overflow-hidden">
        <div 
          className={`transition-transform duration-500 ease-in-out ${
            showWater ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Carbon View */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metrics.carbon.totalEmissions.toLocaleString()} tCO₂e
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Carbon footprint
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {metrics.carbon.intensity} kg/€
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Carbon intensity
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className={`text-lg font-bold ${
                  metrics.carbon.trend.isPositive ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {metrics.carbon.trend.isPositive ? '+' : ''}{metrics.carbon.trend.value}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  vs last month
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Water View */}
        <div 
          className={`absolute top-0 w-full transition-transform duration-500 ease-in-out ${
            showWater ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {(metrics.water.totalLiters / 1000).toFixed(1)}k L
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Water footprint
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  ≈ {metrics.water.equivalences.showers}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Équivalents douches
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className={`text-lg font-bold ${
                  metrics.water.trend.isPositive ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {metrics.water.trend.isPositive ? '+' : ''}{metrics.water.trend.value}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  vs last month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedCO2WaterWidget;