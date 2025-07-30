import React, { useState } from 'react';
import { 
  FileCheck, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Eye,
  Settings,
  BarChart3
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const ComplianceSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState('quarter');
  const [viewMode, setViewMode] = useState('overview');
  const { translate } = useTranslation();

  const timeframes = [
    { id: 'month', label: translate('month') },
    { id: 'quarter', label: translate('quarter') },
    { id: 'year', label: translate('year') }
  ];

  const viewModes = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'calendar', label: 'Calendrier' },
    { id: 'audit', label: 'Audit' }
  ];

  // Métriques principales de conformité
  const complianceMetrics = [
    {
      title: 'CONFORMITÉ ESRS',
      value: '89%',
      change: 5,
      isPositive: true,
      subtitle: 'vs trimestre dernier',
      icon: FileCheck,
      color: 'from-emerald-500 to-teal-500',
      status: 'good'
    },
    {
      title: 'PRÉPARATION CSRD',
      value: '92%',
      change: 8,
      isPositive: true,
      subtitle: 'vs trimestre dernier',
      icon: CheckCircle,
      color: 'from-blue-500 to-cyan-500',
      status: 'excellent'
    },
    {
      title: 'STATUT AUDIT',
      value: '100%',
      change: 0,
      isPositive: true,
      subtitle: 'Complété',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      status: 'complete'
    }
  ];

  // Progrès de conformité détaillé
  const complianceProgress = [
    {
      id: 'esrs-e1',
      title: 'ESRS E1',
      subtitle: 'Reporting climatique',
      progress: 100,
      status: 'conforme',
      icon: FileCheck,
      color: 'emerald'
    },
    {
      id: 'scope-123',
      title: 'Scope 1,2,3',
      subtitle: 'Émissions carbone',
      progress: 92,
      status: 'conforme',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'double-materiality',
      title: 'Double Matérialité',
      subtitle: 'Analyse d\'impact',
      progress: 78,
      status: 'en-cours',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      id: 'csrd-2025',
      title: 'CSRD 2025',
      subtitle: 'Préparation',
      progress: 100,
      status: 'prêt',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      id: 'audit-esg',
      title: 'Audit ESG',
      subtitle: 'Vérification externe',
      progress: 100,
      status: 'complété',
      icon: Eye,
      color: 'purple'
    }
  ];

  // Données pour le graphique en barres du calendrier de conformité
  const complianceCalendarData = [
    { name: 'ESRS E1', progress: 100, color: '#10b981' },
    { name: 'Scope 1,2,3', progress: 92, color: '#3b82f6' },
    { name: 'Double Matérialité', progress: 78, color: '#f59e0b' },
    { name: 'CSRD 2025', progress: 100, color: '#8b5cf6' },
    { name: 'Audit ESG', progress: 100, color: '#10b981' }
  ];

  // Échéances importantes
  const upcomingDeadlines = [
    {
      title: 'Rapport ESRS E1',
      date: '2024-12-31',
      status: 'en-cours',
      priority: 'high',
      completion: 89
    },
    {
      title: 'Audit externe',
      date: '2025-01-15',
      status: 'planifié',
      priority: 'medium',
      completion: 45
    },
    {
      title: 'Certification ISO 14001',
      date: '2025-02-28',
      status: 'en-attente',
      priority: 'low',
      completion: 23
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conforme':
      case 'complété':
      case 'prêt':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'en-cours':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'en-attente':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
      case 'planifié':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'from-emerald-500 to-teal-600';
    if (progress >= 70) return 'from-blue-500 to-cyan-600';
    if (progress >= 50) return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {translate('compliance-title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {translate('compliance-subtitle')}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Sélecteur de vue */}
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  viewMode === mode.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Sélecteur de période */}
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
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {complianceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  metric.status === 'excellent' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                  metric.status === 'good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }`}>
                  {metric.status === 'excellent' ? 'Excellent' : 
                   metric.status === 'good' ? 'Bon' : 'Complété'}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {metric.title}
                </p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metric.value}
                </div>
                
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {metric.change > 0 && (
                    <>
                      {metric.isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>+{metric.change}% {metric.subtitle}</span>
                    </>
                  )}
                  {metric.change === 0 && (
                    <span className="text-slate-600 dark:text-slate-400">{metric.subtitle}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vue d'ensemble */}
      {viewMode === 'overview' && (
        <>
          {/* Progrès de Conformité */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Progrès de Conformité</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {complianceProgress.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status === 'conforme' ? 'Conforme' :
                           item.status === 'en-cours' ? 'En cours' :
                           item.status === 'prêt' ? 'Prêt' :
                           item.status === 'complété' ? 'Complété' : item.status}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{item.progress}%</span>
                      </div>
                      
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(item.progress)} transition-all duration-1000`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Échéances importantes */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Échéances importantes</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                <Calendar className="w-4 h-4" />
                Planifier
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-slate-900 dark:text-white">{deadline.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                        {deadline.priority === 'high' ? 'Priorité élevée' :
                         deadline.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {new Date(deadline.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deadline.status)}`}>
                      {deadline.status === 'en-cours' ? 'En cours' :
                       deadline.status === 'planifié' ? 'Planifié' : 'En attente'}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {deadline.completion}%
                      </div>
                      <div className="w-24 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(deadline.completion)} transition-all duration-500`}
                          style={{ width: `${deadline.completion}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Vue Calendrier */}
      {viewMode === 'calendar' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-6">Calendrier de Conformité</h3>
          
          <div className="relative h-96">
            <svg viewBox="0 0 800 350" className="w-full h-full">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map((line) => (
                <line
                  key={line}
                  x1="80"
                  y1={50 + line * 50}
                  x2="750"
                  y2={50 + line * 50}
                  stroke="rgba(148, 163, 184, 0.1)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Y-axis labels */}
              {[100, 80, 60, 40, 20, 0].map((value, index) => (
                <text
                  key={index}
                  x="70"
                  y={55 + index * 50}
                  textAnchor="end"
                  className="text-xs fill-slate-500 dark:fill-slate-400"
                >
                  {value}%
                </text>
              ))}
              
              {/* Bars */}
              {complianceCalendarData.map((item, index) => {
                const barHeight = (item.progress / 100) * 250;
                const x = 120 + index * 120;
                const y = 300 - barHeight;
                
                return (
                  <g key={index}>
                    <rect
                      x={x}
                      y={y}
                      width="80"
                      height={barHeight}
                      fill={item.color}
                      rx="6"
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                    <text
                      x={x + 40}
                      y="330"
                      textAnchor="middle"
                      className="text-xs fill-slate-500 dark:fill-slate-400"
                    >
                      {item.name}
                    </text>
                    <text
                      x={x + 40}
                      y={y - 8}
                      textAnchor="middle"
                      className="text-sm fill-slate-700 dark:fill-slate-300 font-medium"
                    >
                      {item.progress}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Vue Audit */}
      {viewMode === 'audit' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Audit et Vérification</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200">
                <Eye className="w-4 h-4" />
                Voir détails
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                <Download className="w-4 h-4" />
                Télécharger rapport
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">Audit ESG</h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Complété - 100%</p>
                </div>
              </div>
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                Audit externe réalisé par un organisme certifié. Tous les critères ESG ont été validés.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Certification ISO</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">En cours - 78%</p>
                </div>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Processus de certification ISO 14001 en cours. Documentation en phase de finalisation.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100">Vérification CSRD</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Planifié - Q1 2025</p>
                </div>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Vérification externe des données CSRD prévue pour le premier trimestre 2025.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceSection;