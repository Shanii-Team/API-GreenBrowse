import React from 'react';
import { TrendingUp, TrendingDown, DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
  icon: LucideIcon;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color
}) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </div>
        
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingDown className="w-4 h-4" />
          ) : (
            <TrendingUp className="w-4 h-4" />
          )}
          <span>{change}% vs mois dernier</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;