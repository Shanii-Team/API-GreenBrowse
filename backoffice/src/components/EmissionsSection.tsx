import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Truck, Factory, Building, Cpu } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const EmissionsSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState('month');
  const { translate } = useTranslation();

  const timeframes = [
    { id: 'today', label: translate('today') },
    { id: 'week', label: translate('week') },
    { id: 'month', label: translate('month') },
    { id: 'quarter', label: translate('quarter') }
  ];

  const scopeData = [
    {
      scope: translate('scope1-emissions'),
      value: '847',
      unit: 'tCO₂e',
      change: 3.2,
      isPositive: false,
      icon: Factory,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      scope: translate('scope2-emissions'),
      value: '1,245',
      unit: 'tCO₂e',
      change: 6.8,
      isPositive: false,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      scope: translate('scope3-emissions'),
      value: '2,943',
      unit: 'tCO₂e',
      change: 2.3,
      isPositive: true,
      icon: Truck,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const emissionsBySource = [
    { name: translate('energy'), value: 35, color: '#10b981' },
    { name: translate('transport'), value: 25, color: '#3b82f6' },
    { name: translate('production'), value: 20, color: '#8b5cf6' },
    { name: translate('offices'), value: 12, color: '#fb923c' },
    { name: 'IT', value: 8, color: '#f59e0b' }
  ];

  const monthlyData = [
    { month: 'Jan', value: 3200 },
    { month: 'Fév', value: 3100 },
    { month: 'Mar', value: 3050 },
    { month: 'Avr', value: 3000 },
    { month: 'Mai', value: 2950 },
    { month: 'Jun', value: 2900 },
    { month: 'Jul', value: 2850 },
    { month: 'Aoû', value: 2800 },
    { month: 'Sep', value: 2750 },
    { month: 'Oct', value: 2720 },
    { month: 'Nov', value: 2700 },
    { month: 'Déc', value: 2680 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {translate('emissions-analysis')}
        </h1>
        
        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                timeframe === tf.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scope Emissions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scopeData.map((scope, index) => {
          const Icon = scope.icon;
          return (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${scope.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {scope.scope}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {scope.value} <span className="text-lg font-medium text-slate-500">{scope.unit}</span>
                </div>
                
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  scope.isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {scope.isPositive ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                  <span>{scope.change}% {translate('vs-last-month')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emissions by Source Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6">{translate('emissions-by-source')}</h3>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Donut Chart */}
          <div className="relative w-80 h-80">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              <defs>
                {emissionsBySource.map((item, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={item.color} />
                    <stop offset="100%" stopColor={item.color} stopOpacity="0.8" />
                  </linearGradient>
                ))}
              </defs>
              
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(148, 163, 184, 0.1)"
                strokeWidth="20"
              />
              
              {/* Data segments */}
              {emissionsBySource.map((item, index) => {
                const total = emissionsBySource.reduce((sum, item) => sum + item.value, 0);
                const percentage = (item.value / total) * 100;
                const circumference = 2 * Math.PI * 80;
                const strokeDasharray = circumference;
                const strokeDashoffset = circumference - (percentage / 100) * circumference;
                
                // Calculate rotation for each segment
                const previousPercentages = emissionsBySource.slice(0, index).reduce((sum, item) => sum + item.value, 0);
                const rotation = (previousPercentages / total) * 360;
                
                return (
                  <circle
                    key={index}
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="20"
                    strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
                    strokeDashoffset={0}
                    transform={`rotate(${rotation} 100 100)`}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                );
              })}
              
              {/* Center circle */}
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="currentColor"
                className="text-slate-900 dark:text-slate-800"
              />
            </svg>
          </div>
          
          {/* Legend */}
          <div className="flex-1 space-y-4">
            {emissionsBySource.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emissions Trend Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6">{translate('emissions-trend')}</h3>
        
        <div className="relative h-80">
          <svg viewBox="0 0 800 300" className="w-full h-full">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
            {[3200, 3100, 3000, 2900, 2800, 2700].map((value, index) => (
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
            
            {/* Line path */}
            <path
              d={`M 80 ${50 + ((3200 - monthlyData[0].value) / 500) * 40} ${monthlyData.map((point, index) => 
                `L ${80 + (index + 1) * 55} ${50 + ((3200 - point.value) / 500) * 40}`
              ).join(' ')}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />
            
            {/* Area fill */}
            <path
              d={`M 80 250 L 80 ${50 + ((3200 - monthlyData[0].value) / 500) * 40} ${monthlyData.map((point, index) => 
                `L ${80 + (index + 1) * 55} ${50 + ((3200 - point.value) / 500) * 40}`
              ).join(' ')} L 750 250 Z`}
              fill="url(#areaGradient)"
            />
            
            {/* Data points */}
            {monthlyData.map((point, index) => (
              <circle
                key={index}
                cx={80 + (index + 1) * 55}
                cy={50 + ((3200 - point.value) / 500) * 40}
                r="4"
                fill="#10b981"
                className="drop-shadow-sm"
              />
            ))}
            
            {/* X-axis labels */}
            {monthlyData.map((point, index) => (
              <text
                key={index}
                x={80 + (index + 1) * 55}
                y="280"
                textAnchor="middle"
                className="text-xs fill-slate-500 dark:fill-slate-400"
              >
                {point.month}
              </text>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Émissions (tCO₂e)</span>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">INTENSITÉ</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">12.4 kg/€</p>
            </div>
          </div>
          <div className="text-sm text-emerald-600 font-medium">↓ 8.7% vs mois dernier</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">NUMÉRIQUE</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">156 tCO₂e</p>
            </div>
          </div>
          <div className="text-sm text-red-600 font-medium">↑ 12.3% vs mois dernier</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">PRODUCTION</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">1,847 tCO₂e</p>
            </div>
          </div>
          <div className="text-sm text-emerald-600 font-medium">↓ 5.1% vs mois dernier</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">LOGISTIQUE</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">743 tCO₂e</p>
            </div>
          </div>
          <div className="text-sm text-red-600 font-medium">↑ 3.2% vs mois dernier</div>
        </div>
      </div>
    </div>
  );
};

export default EmissionsSection;