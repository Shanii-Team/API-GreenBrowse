import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Trophy, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Award,
  BarChart3,
  PieChart,
  Calendar,
  Send,
  Play,
  Settings
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const EngagementSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState('quarter');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('overview');
  const { translate } = useTranslation();

  const timeframes = [
    { id: 'month', label: translate('month') },
    { id: 'quarter', label: translate('quarter') },
    { id: 'year', label: translate('year') }
  ];

  const departments = [
    { id: 'all', label: 'Tous les départements' },
    { id: 'tech', label: 'Technologie' },
    { id: 'sales', label: 'Commercial' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'hr', label: 'RH' },
    { id: 'finance', label: 'Finance' }
  ];

  const viewModes = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'departments', label: 'Par département', icon: PieChart },
    { id: 'actions', label: 'Plan d\'action', icon: Target }
  ];

  // KPIs principaux
  const mainKPIs = [
    {
      title: 'Score d\'engagement global',
      value: '7.8',
      unit: '/10',
      change: 0.3,
      isPositive: true,
      target: 8.5,
      icon: Trophy,
      color: 'from-emerald-500 to-teal-500',
      status: 'good'
    },
    {
      title: 'Participation aux défis',
      value: '85%',
      change: 12,
      isPositive: true,
      target: 90,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      status: 'excellent'
    },
    {
      title: 'Rétention des talents',
      value: '92%',
      change: -2.1,
      isPositive: false,
      target: 95,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      status: 'warning'
    },
    {
      title: 'GreenCoins distribués',
      value: '2.4M',
      change: 31,
      isPositive: true,
      target: 3000000,
      icon: Award,
      color: 'from-orange-500 to-red-500',
      status: 'good'
    }
  ];

  // Données par département
  const departmentData = [
    {
      name: 'Technologie',
      engagement: 8.2,
      participation: 92,
      greencoins: 850000,
      employees: 145,
      trend: 'up',
      change: 0.4,
      status: 'excellent'
    },
    {
      name: 'Commercial',
      engagement: 7.9,
      participation: 88,
      greencoins: 720000,
      employees: 89,
      trend: 'up',
      change: 0.2,
      status: 'good'
    },
    {
      name: 'Marketing',
      engagement: 8.1,
      participation: 91,
      greencoins: 650000,
      employees: 67,
      trend: 'up',
      change: 0.5,
      status: 'excellent'
    },
    {
      name: 'RH',
      engagement: 7.5,
      participation: 78,
      greencoins: 420000,
      employees: 34,
      trend: 'down',
      change: -0.3,
      status: 'warning'
    },
    {
      name: 'Finance',
      engagement: 7.2,
      participation: 74,
      greencoins: 380000,
      employees: 28,
      trend: 'down',
      change: -0.1,
      status: 'critical'
    }
  ];

  // Tendances trimestrielles
  const quarterlyTrends = [
    { quarter: 'Q1 2024', engagement: 7.2, participation: 78, retention: 94 },
    { quarter: 'Q2 2024', engagement: 7.5, participation: 82, retention: 93 },
    { quarter: 'Q3 2024', engagement: 7.6, participation: 85, retention: 92 },
    { quarter: 'Q4 2024', engagement: 7.8, participation: 85, retention: 92 }
  ];

  // Défis actifs et recommandations
  const activeChallenges = [
    {
      id: 1,
      title: 'Défi Mobilité Verte',
      participants: 234,
      completion: 67,
      impact: 'high',
      status: 'active',
      endDate: '2024-12-31'
    },
    {
      id: 2,
      title: 'Économie d\'Énergie',
      participants: 189,
      completion: 45,
      impact: 'medium',
      status: 'active',
      endDate: '2024-12-15'
    },
    {
      id: 3,
      title: 'Zéro Déchet Bureau',
      participants: 156,
      completion: 78,
      impact: 'high',
      status: 'ending',
      endDate: '2024-11-30'
    }
  ];

  const recommendations = [
    {
      priority: 'high',
      department: 'Finance',
      issue: 'Engagement faible (7.2/10)',
      action: 'Lancer un défi spécifique Finance avec récompenses attractives',
      impact: 'Augmentation estimée de 0.8 points',
      timeline: '2 semaines'
    },
    {
      priority: 'medium',
      department: 'RH',
      issue: 'Participation en baisse (-0.3)',
      action: 'Organiser des sessions de sensibilisation personnalisées',
      impact: 'Stabilisation et amélioration progressive',
      timeline: '1 mois'
    },
    {
      priority: 'low',
      department: 'Global',
      issue: 'Rétention en légère baisse',
      action: 'Renforcer le programme de reconnaissance',
      impact: 'Amélioration de 2-3% de la rétention',
      timeline: '3 mois'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'warning': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec contrôles */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {translate('executive-dashboard')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {translate('strategic-view')}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
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

          {/* Sélecteur de vue */}
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            {viewModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    viewMode === mode.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          const progressPercentage = typeof kpi.target === 'number' ? 
            (parseFloat(kpi.value.replace('%', '').replace('M', '000000')) / kpi.target) * 100 : 
            (parseFloat(kpi.value) / kpi.target) * 100;

          return (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                  {kpi.status === 'excellent' ? 'Excellent' : 
                   kpi.status === 'good' ? 'Bon' : 
                   kpi.status === 'warning' ? 'Attention' : 'Critique'}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {kpi.title}
                </p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {kpi.value}<span className="text-lg font-medium text-slate-500">{kpi.unit}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    kpi.isPositive ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {kpi.isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{kpi.change > 0 ? '+' : ''}{kpi.change}%</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Objectif: {kpi.target}{kpi.unit}
                  </div>
                </div>

                {/* Barre de progression vers l'objectif */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${kpi.color} transition-all duration-1000`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vue d'ensemble */}
      {viewMode === 'overview' && (
        <>
          {/* Tendances trimestrielles */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Évolution trimestrielle</h3>
            
            <div className="relative h-80">
              <svg viewBox="0 0 800 300" className="w-full h-full">
                <defs>
                  <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="participationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
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
                {[10, 9, 8, 7, 6, 5].map((value, index) => (
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
                
                {/* Engagement line */}
                <path
                  d={`M 150 ${250 - (quarterlyTrends[0].engagement - 5) * 40} ${quarterlyTrends.slice(1).map((point, index) => 
                    `L ${150 + (index + 1) * 150} ${250 - (point.engagement - 5) * 40}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Participation line */}
                <path
                  d={`M 150 ${250 - (quarterlyTrends[0].participation - 70) * 4} ${quarterlyTrends.slice(1).map((point, index) => 
                    `L ${150 + (index + 1) * 150} ${250 - (point.participation - 70) * 4}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {quarterlyTrends.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={150 + index * 150}
                      cy={250 - (point.engagement - 5) * 40}
                      r="4"
                      fill="#10b981"
                    />
                    <circle
                      cx={150 + index * 150}
                      cy={250 - (point.participation - 70) * 4}
                      r="4"
                      fill="#3b82f6"
                    />
                  </g>
                ))}
                
                {/* X-axis labels */}
                {quarterlyTrends.map((point, index) => (
                  <text
                    key={index}
                    x={150 + index * 150}
                    y="280"
                    textAnchor="middle"
                    className="text-xs fill-slate-500 dark:fill-slate-400"
                  >
                    {point.quarter}
                  </text>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-2">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Engagement (/10)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Participation (%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Défis actifs */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Défis en cours</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                <Play className="w-4 h-4" />
                Lancer un défi
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeChallenges.map((challenge) => (
                <div key={challenge.id} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{challenge.title}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      challenge.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {challenge.status === 'active' ? 'Actif' : 'Se termine'}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Participants</span>
                      <span className="font-medium">{challenge.participants}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Progression</span>
                        <span className="font-medium">{challenge.completion}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                          style={{ width: `${challenge.completion}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Impact</span>
                      <span className={`font-medium ${
                        challenge.impact === 'high' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {challenge.impact === 'high' ? 'Élevé' : 'Moyen'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Vue par département */}
      {viewMode === 'departments' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold mb-6">Performance par département</h3>
          
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{dept.name}</h4>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(dept.status)}`}>
                      {dept.status === 'excellent' ? 'Excellent' : 
                       dept.status === 'good' ? 'Bon' : 
                       dept.status === 'warning' ? 'Attention' : 'Critique'}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {dept.employees} employés
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{dept.engagement}/10</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Engagement</div>
                    <div className={`flex items-center justify-center gap-1 text-sm font-medium mt-1 ${
                      dept.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {dept.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {dept.change > 0 ? '+' : ''}{dept.change}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{dept.participation}%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Participation</div>
                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 transition-all duration-500"
                        style={{ width: `${dept.participation}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {(dept.greencoins / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">GreenCoins</div>
                    <div className="text-xs text-emerald-600 mt-1">
                      {Math.round(dept.greencoins / dept.employees)} par employé
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                      <Settings className="w-4 h-4 inline mr-2" />
                      Actions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plan d'action */}
      {viewMode === 'actions' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Recommandations prioritaires</h3>
            
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority === 'high' ? 'Priorité élevée' : 
                         rec.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                      </div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {rec.department}
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {rec.timeline}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Problème identifié</h4>
                      <p className="text-slate-600 dark:text-slate-400">{rec.issue}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Action recommandée</h4>
                      <p className="text-slate-600 dark:text-slate-400">{rec.action}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Impact attendu</h4>
                      <p className="text-emerald-600 dark:text-emerald-400">{rec.impact}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Approuver
                    </button>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Planifier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Actions rapides</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl border border-emerald-200 dark:border-emerald-700 hover:shadow-lg transition-all duration-200">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-emerald-900 dark:text-emerald-100">Lancer un défi</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">Créer un nouveau défi</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-200">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-blue-900 dark:text-blue-100">Envoyer message</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Communication ciblée</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-200">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-purple-900 dark:text-purple-100">Récompenser</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Distribuer GreenCoins</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementSection;