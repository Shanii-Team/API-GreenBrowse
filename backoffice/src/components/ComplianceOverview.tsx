import React from 'react';
import { FileCheck, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const ComplianceOverview: React.FC = () => {
  const complianceItems = [
    {
      title: 'ESRS E1',
      subtitle: 'Reporting climatique',
      status: 'complete',
      progress: 100
    },
    {
      title: 'Scope 1,2,3',
      subtitle: 'Émissions carbone',
      status: 'complete',
      progress: 92
    },
    {
      title: 'Double Matérialité',
      subtitle: 'Analyse d\'impact',
      status: 'pending',
      progress: 78
    },
    {
      title: 'CSRD 2025',
      subtitle: 'Préparation',
      status: 'complete',
      progress: 100
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-emerald-500';
      case 'pending':
        return 'bg-amber-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Conformité & Rapports</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceItems.map((item, index) => (
          <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              {getStatusIcon(item.status)}
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {item.subtitle}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Progrès</span>
                <span className="font-medium text-slate-900 dark:text-white">{item.progress}%</span>
              </div>
              
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(item.status)}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceOverview;