import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { getTextSizeClass } from '../utils/formatNumber';

interface RingMetric {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface RingChartProps {
  title: string;
  centerValue: string;
  centerLabel: string;
  progress: number;
  color?: string;
  metrics: RingMetric[];
}

const RingChart: React.FC<RingChartProps> = ({
  title,
  centerValue,
  centerLabel,
  progress,
  color = 'from-emerald-500 to-teal-500',
  metrics
}) => {
  const { translate } = useTranslation();
  
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
      <h3 className="text-lg font-semibold mb-6">{translate(title.toLowerCase().replace(/\s+/g, '-'))}</h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Ring Chart */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="text-emerald-500" stopColor="currentColor" />
                <stop offset="100%" className="text-teal-500" stopColor="currentColor" />
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
            
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke={`url(#gradient-${title})`}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className={`${getTextSizeClass(centerValue)} font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent text-center leading-tight max-w-full break-words`}>
              {centerValue}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {centerLabel}
            </div>
          </div>
        </div>
        
        {/* Metrics */}
        <div className="flex-1 space-y-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {translate(metric.value.toLowerCase().replace(/\s+/g, '-')) !== metric.value.toLowerCase().replace(/\s+/g, '-') ? translate(metric.value.toLowerCase().replace(/\s+/g, '-')) : metric.value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {translate(metric.label.toLowerCase().replace(/\s+/g, '-')) !== metric.label.toLowerCase().replace(/\s+/g, '-') ? translate(metric.label.toLowerCase().replace(/\s+/g, '-')) : metric.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RingChart;