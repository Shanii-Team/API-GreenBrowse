import React from 'react';
import { Droplets, TrendingUp, TrendingDown } from 'lucide-react';
import { WaterMetrics } from '../types/water';

interface WaterFootprintCardProps {
  waterMetrics: WaterMetrics;
  isDarkMode?: boolean;
}

const WaterFootprintCard: React.FC<WaterFootprintCardProps> = ({
  waterMetrics,
  isDarkMode = true
}) => {
  const progress = Math.min((waterMetrics.totalLiters / 50000) * 100, 100); // Assuming 50k target
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getWaterMaturityScore = (liters: number): string => {
    if (liters < 10000) return 'A+';
    if (liters < 20000) return 'A';
    if (liters < 30000) return 'B+';
    if (liters < 40000) return 'B';
    if (liters < 50000) return 'C';
    return 'D';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
      <h3 className="text-lg font-semibold mb-6">Water Performance</h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Water Ring Chart */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="text-blue-500" stopColor="currentColor" />
                <stop offset="100%" className="text-cyan-500" stopColor="currentColor" />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            
            {/* Progress circle with ripple effect */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="url(#waterGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {(waterMetrics.totalLiters / 1000).toFixed(1)}k L
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              vs target
            </div>
            <div className="text-lg font-bold text-blue-600 mt-2">
              {getWaterMaturityScore(waterMetrics.totalLiters)}
            </div>
          </div>
        </div>
        
        {/* Water Metrics */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-900 dark:text-white">
                {waterMetrics.totalLiters.toLocaleString()} L
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Total water footprint
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-900 dark:text-white">
                ≈ {waterMetrics.equivalences.showers} showers
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Water equivalence
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
              <div className={`flex items-center gap-1 ${
                waterMetrics.trend.isPositive ? 'text-red-600' : 'text-emerald-600'
              }`}>
                {waterMetrics.trend.isPositive ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className={`font-semibold ${
                waterMetrics.trend.isPositive ? 'text-red-600' : 'text-emerald-600'
              }`}>
                {waterMetrics.trend.isPositive ? '+' : ''}{waterMetrics.trend.value}%
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                vs mois dernier
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterFootprintCard;