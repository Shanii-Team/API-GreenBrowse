import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  CheckCircle, 
  AlertTriangle,
  Building,
  Zap,
  Factory,
  Globe,
  Filter,
  Search,
  Download,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const SuppliersSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState('quarter');
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { translate } = useTranslation();

  const timeframes = [
    { id: 'month', label: translate('month') },
    { id: 'quarter', label: translate('quarter') },
    { id: 'year', label: translate('year') }
  ];

  const filterLevels = [
    { id: 'all', label: 'Tous' },
    { id: 'a', label: 'Niveau A' },
    { id: 'b', label: 'Niveau B' },
    { id: 'c', label: 'Niveau C' }
  ];

  // Métriques principales
  const mainMetrics = [
    {
      title: translate('suppliers'),
      value: '142',
      change: 8,
      isPositive: true,
      subtitle: 'vs trimestre dernier',
      icon: Truck,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: translate('compliant'),
      value: '87%',
      change: 5.2,
      isPositive: true,
      subtitle: 'vs trimestre dernier',
      icon: CheckCircle,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: translate('supplier-emissions'),
      value: '1,842 tCO₂e',
      change: 3.7,
      isPositive: false,
      subtitle: 'vs trimestre dernier',
      icon: Factory,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // Données de performance des fournisseurs
  const performanceData = [
    { name: 'EcoTech', score: 95, category: 'Technologie' },
    { name: 'GreenLog', score: 89, category: 'Logistique' },
    { name: 'RenewP', score: 82, category: 'Énergie' },
    { name: 'CleanM', score: 78, category: 'Matériaux' },
    { name: 'GlobalS', score: 65, category: 'Divers' },
    { name: 'BioMat', score: 88, category: 'Matériaux' },
    { name: 'SolarE', score: 92, category: 'Énergie' }
  ];

  // Liste des fournisseurs
  const suppliersData = [
    {
      name: 'EcoTech Solutions',
      category: 'Technologie',
      carbonScore: 'A+',
      compliance: 98,
      status: 'conforme',
      emissions: 45,
      employees: 250,
      contract: '2025-12-31'
    },
    {
      name: 'GreenLogistics',
      category: 'Logistique',
      carbonScore: 'A',
      compliance: 92,
      status: 'conforme',
      emissions: 156,
      employees: 180,
      contract: '2024-06-30'
    },
    {
      name: 'RenewPower',
      category: 'Énergie',
      carbonScore: 'A-',
      compliance: 88,
      status: 'amélioration-nécessaire',
      emissions: 89,
      employees: 320,
      contract: '2025-03-15'
    },
    {
      name: 'CleanMaterials',
      category: 'Matériaux',
      carbonScore: 'B+',
      compliance: 78,
      status: 'amélioration-nécessaire',
      emissions: 234,
      employees: 145,
      contract: '2024-09-30'
    },
    {
      name: 'GlobalSupplies',
      category: 'Divers',
      carbonScore: 'C',
      compliance: 62,
      status: 'non-conforme',
      emissions: 387,
      employees: 95,
      contract: '2024-12-31'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conforme':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'amélioration-nécessaire':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'non-conforme':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  const getScoreColor = (score: string) => {
    if (score.startsWith('A')) return 'text-emerald-600 font-bold';
    if (score.startsWith('B')) return 'text-amber-600 font-bold';
    if (score.startsWith('C')) return 'text-red-600 font-bold';
    return 'text-slate-600 font-bold';
  };

  const filteredSuppliers = suppliersData.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterLevel === 'all') return matchesSearch;
    
    const level = supplier.carbonScore.charAt(0).toLowerCase();
    return matchesSearch && level === filterLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
           {translate('supplier-management')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
           {translate('supplier-performance')}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Filtres de niveau */}
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            {filterLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setFilterLevel(level.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  filterLevel === level.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {level.label}
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
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
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
                  {metric.isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{metric.change > 0 ? '+' : ''}{metric.change}% {metric.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance des Fournisseurs - Graphique */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6">Performance des Fournisseurs</h3>
        
        <div className="relative h-80">
          <svg viewBox="0 0 800 300" className="w-full h-full">
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
            {[100, 80, 60, 40, 20, 0].map((value, index) => (
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
            
            {/* Bars */}
            {performanceData.map((supplier, index) => {
              const barHeight = (supplier.score / 100) * 200;
              const x = 100 + index * 90;
              const y = 250 - barHeight;
              
              return (
                <g key={index}>
                  <rect
                    x={x}
                    y={y}
                    width="60"
                    height={barHeight}
                    fill="#10b981"
                    rx="4"
                    className="hover:fill-emerald-600 transition-colors duration-200"
                  />
                  <text
                    x={x + 30}
                    y="280"
                    textAnchor="middle"
                    className="text-xs fill-slate-500 dark:fill-slate-400"
                  >
                    {supplier.name}
                  </text>
                  <text
                    x={x + 30}
                    y={y - 5}
                    textAnchor="middle"
                    className="text-xs fill-slate-700 dark:fill-slate-300 font-medium"
                  >
                    {supplier.score}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Liste des Fournisseurs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h3 className="text-xl font-semibold">Liste des Fournisseurs</h3>
          
          <div className="flex gap-3">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un fournisseur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Fournisseur</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Catégorie</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Score Carbone</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Conformité</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{supplier.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{supplier.employees} employés</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-700 dark:text-slate-300">{supplier.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getScoreColor(supplier.carbonScore)}>{supplier.carbonScore}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{supplier.compliance}%</span>
                      <div className="w-16 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                          style={{ width: `${supplier.compliance}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(supplier.status)}`}>
                      {supplier.status === 'conforme' ? 'Conforme' :
                       supplier.status === 'amélioration-nécessaire' ? 'Amélioration nécessaire' : 'Non conforme'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-8">
            <div className="text-slate-500 dark:text-slate-400">
              Aucun fournisseur trouvé pour les critères sélectionnés
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersSection;