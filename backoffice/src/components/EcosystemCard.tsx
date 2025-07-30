import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface EcosystemCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}

const EcosystemCard: React.FC<EcosystemCardProps> = ({
  icon: Icon,
  title,
  value,
  description
}) => {
  return (
    <div className="group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-slate-200 dark:border-slate-600">
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
        {value}
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default EcosystemCard;