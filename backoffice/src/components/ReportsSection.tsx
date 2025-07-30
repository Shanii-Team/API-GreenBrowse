import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Globe, 
  FileText, 
  Users, 
  Truck, 
  Download, 
  Share2, 
  Plus,
  Calendar,
  Filter,
  Search,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const ReportsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { translate } = useTranslation();

  const categories = [
    { id: 'all', label: translate('all-reports') },
    { id: 'environmental', label: translate('environmental') },
    { id: 'social', label: translate('social') },
    { id: 'governance', label: translate('governance') },
    { id: 'compliance', label: translate('compliance') }
  ];

  const reports = [
    {
      id: 'monthly',
      title: 'Rapport Mensuel',
      description: 'Analyse détaillée des performances carbone et des indicateurs clés du mois',
      icon: TrendingUp,
      category: 'environmental',
      color: 'from-blue-500 to-indigo-600',
      lastGenerated: '2024-11-15',
      status: 'available',
      size: '2.4 MB'
    },
    {
      id: 'quarterly',
      title: 'Rapport Trimestriel',
      description: 'Analyse complète des performances environnementales pour le trimestre',
      icon: BarChart3,
      category: 'environmental',
      color: 'from-purple-500 to-indigo-600',
      lastGenerated: '2024-10-31',
      status: 'available',
      size: '5.8 MB'
    },
    {
      id: 'esg-annual',
      title: 'Rapport Annuel ESG',
      description: 'Rapport complet sur les performances environnementales, sociales et de gouvernance',
      icon: Globe,
      category: 'governance',
      color: 'from-emerald-500 to-teal-600',
      lastGenerated: '2024-01-15',
      status: 'available',
      size: '12.3 MB'
    },
    {
      id: 'compliance',
      title: 'Rapport de Conformité',
      description: 'Documentation complète pour la conformité réglementaire ESRS et CSRD',
      icon: FileText,
      category: 'compliance',
      color: 'from-amber-500 to-orange-600',
      lastGenerated: '2024-11-10',
      status: 'available',
      size: '8.7 MB'
    },
    {
      id: 'engagement',
      title: 'Rapport d\'Engagement',
      description: 'Analyse des initiatives et résultats du programme d\'engagement collaborateur',
      icon: Users,
      category: 'social',
      color: 'from-pink-500 to-rose-600',
      lastGenerated: '2024-11-12',
      status: 'available',
      size: '4.2 MB'
    },
    {
      id: 'suppliers',
      title: 'Rapport Fournisseurs',
      description: 'Évaluation de la performance carbone de la chaîne d\'approvisionnement',
      icon: Truck,
      category: 'environmental',
      color: 'from-cyan-500 to-blue-600',
      lastGenerated: '2024-11-08',
      status: 'generating',
      size: '6.1 MB'
    }
  ];

  const recentActivity = [
    {
      action: 'Rapport Mensuel généré',
      user: 'Marie Dubois',
      time: '2024-11-15 14:30',
      type: 'generated'
    },
    {
      action: 'Rapport de Conformité partagé',
      user: 'Thomas Martin',
      time: '2024-11-14 09:15',
      type: 'shared'
    },
    {
      action: 'Rapport Trimestriel téléchargé',
      user: 'Sophie Laurent',
      time: '2024-11-13 16:45',
      type: 'downloaded'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'generating':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4" />;
      case 'generating':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleDownload = (reportId: string) => {
    // Simulate download
    console.log(`Downloading report: ${reportId}`);
  };

  const handleShare = (reportId: string) => {
    // Simulate share
    console.log(`Sharing report: ${reportId}`);
  };

  const handleGenerateReport = () => {
    // Simulate report generation
    console.log('Generating new report...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {translate('reports-title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {translate('reports-subtitle')}
          </p>
        </div>
        
        <button 
          onClick={handleGenerateReport}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          {translate('generate-report')}
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un rapport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${report.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {getStatusIcon(report.status)}
                  <span>
                    {report.status === 'available' ? 'Disponible' :
                     report.status === 'generating' ? 'En cours' : 'Erreur'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {report.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {report.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Dernière génération</span>
                    <span>{new Date(report.lastGenerated).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taille</span>
                    <span>{report.size}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleDownload(report.id)}
                    disabled={report.status !== 'available'}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      report.status === 'available'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                  
                  <button
                    onClick={() => handleShare(report.id)}
                    disabled={report.status !== 'available'}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      report.status === 'available'
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-6">Activité récente</h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'generated' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                activity.type === 'shared' ? 'bg-blue-100 dark:bg-blue-900/30' :
                'bg-purple-100 dark:bg-purple-900/30'
              }`}>
                {activity.type === 'generated' ? (
                  <Plus className={`w-5 h-5 ${
                    activity.type === 'generated' ? 'text-emerald-600' : 'text-blue-600'
                  }`} />
                ) : activity.type === 'shared' ? (
                  <Share2 className="w-5 h-5 text-blue-600" />
                ) : (
                  <Download className="w-5 h-5 text-purple-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-slate-900 dark:text-white">
                  {activity.action}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  par {activity.user} • {new Date(activity.time).toLocaleString('fr-FR')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">24</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Rapports générés</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">156</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Téléchargements</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">89</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Partages</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">342</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Consultations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;