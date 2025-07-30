import React from 'react';
import { Droplets, TrendingDown, ShowerHead as Shower, Waves } from 'lucide-react';

interface WaterSavingsCardProps {
  savedLiters: number;
  trend: number;
  equivalences: {
    showers: number;
    bottles: number;
    swimmingPools: number;
  };
}

const WaterSavingsCard: React.FC<WaterSavingsCardProps> = ({
  savedLiters,
  trend,
  equivalences
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          WATER SAVINGS
        </span>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <Droplets className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
          {(savedLiters / 1000).toFixed(1)}k L
        </div>
        
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
          <TrendingDown className="w-4 h-4" />
          <span>{trend}% vs last month</span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Shower className="w-4 h-4 text-blue-500" />
            <span>≈ {equivalences.showers} showers saved</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Waves className="w-4 h-4 text-cyan-500" />
            <span>≈ {equivalences.bottles.toLocaleString()} bottles saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterSavingsCard;