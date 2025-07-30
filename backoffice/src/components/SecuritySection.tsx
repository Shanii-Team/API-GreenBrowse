import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Users, 
  Database, 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Download,
  Upload,
  Settings,
  Key,
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  Award,
  Brain,
  Cpu,
  Server,
  Wifi,
  Smartphone,
  Calendar
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const SecuritySection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const { translate } = useTranslation();

  const tabs = [
    { id: 'overview', label: translate('overview'), icon: Shield },
    { id: 'rgpd', label: 'RGPD', icon: Lock },
    { id: 'ai-act', label: 'IA Act EU', icon: Brain },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  // Métriques de sécurité principales
  const securityMetrics = [
    {
      title: 'CONFORMITÉ RGPD',
      value: '100%',
      status: 'excellent',
      description: 'Entièrement conforme aux réglementations',
      icon: Lock,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'IA ACT EU',
      value: '98%',
      status: 'excellent',
      description: 'Conforme aux exigences européennes IA',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'SÉCURITÉ DONNÉES',
      value: '99.9%',
      status: 'excellent',
      description: 'Chiffrement et protection avancée',
      icon: Database,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'AUDITS SÉCURITÉ',
      value: '12/12',
      status: 'excellent',
      description: 'Tous les audits réussis cette année',
      icon: CheckCircle,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  // Données RGPD
  const rgpdCompliance = [
    {
      category: 'Consentement',
      status: 'conforme',
      score: 100,
      description: 'Mécanismes de consentement explicite et révocable',
      lastAudit: '2024-11-10'
    },
    {
      category: 'Droit à l\'oubli',
      status: 'conforme',
      score: 100,
      description: 'Suppression automatique des données sur demande',
      lastAudit: '2024-11-08'
    },
    {
      category: 'Portabilité',
      status: 'conforme',
      score: 98,
      description: 'Export des données personnelles en format standard',
      lastAudit: '2024-11-05'
    },
    {
      category: 'Minimisation',
      status: 'conforme',
      score: 100,
      description: 'Collecte limitée aux données nécessaires',
      lastAudit: '2024-11-12'
    },
    {
      category: 'Transparence',
      status: 'conforme',
      score: 100,
      description: 'Politique de confidentialité claire et accessible',
      lastAudit: '2024-11-15'
    }
  ];

  // Conformité IA Act EU
  const aiActCompliance = [
    {
      category: 'Systèmes IA à Haut Risque',
      status: 'conforme',
      score: 100,
      description: 'Classification et évaluation des risques IA',
      measures: ['Évaluation des risques', 'Documentation technique', 'Surveillance humaine']
    },
    {
      category: 'Transparence IA',
      status: 'conforme',
      score: 98,
      description: 'Information des utilisateurs sur l\'usage de l\'IA',
      measures: ['Notifications IA', 'Explications algorithmes', 'Droits utilisateurs']
    },
    {
      category: 'Gouvernance IA',
      status: 'conforme',
      score: 96,
      description: 'Cadre de gouvernance et responsabilité IA',
      measures: ['Comité IA', 'Processus validation', 'Formation équipes']
    },
    {
      category: 'Biais et Équité',
      status: 'conforme',
      score: 94,
      description: 'Prévention des biais discriminatoires',
      measures: ['Tests de biais', 'Datasets diversifiés', 'Monitoring continu']
    }
  ];

  // Certifications et audits
  const certifications = [
    {
      name: 'ISO 27001',
      status: 'active',
      validUntil: '2025-06-30',
      description: 'Management de la sécurité de l\'information',
      issuer: 'Bureau Veritas'
    },
    {
      name: 'SOC 2 Type II',
      status: 'active',
      validUntil: '2025-03-15',
      description: 'Contrôles de sécurité et disponibilité',
      issuer: 'PwC'
    },
    {
      name: 'GDPR Compliance',
      status: 'active',
      validUntil: '2025-12-31',
      description: 'Conformité RGPD certifiée',
      issuer: 'CNIL'
    },
    {
      name: 'AI Ethics Certification',
      status: 'pending',
      validUntil: '2025-09-30',
      description: 'Certification éthique IA européenne',
      issuer: 'EU AI Board'
    }
  ];

  // Mesures de sécurité techniques
  const securityMeasures = [
    {
      category: 'Chiffrement',
      measures: [
        'AES-256 pour les données au repos',
        'TLS 1.3 pour les données en transit',
        'Chiffrement end-to-end pour les communications'
      ]
    },
    {
      category: 'Authentification',
      measures: [
        'Authentification multi-facteurs (MFA)',
        'Single Sign-On (SSO) sécurisé',
        'Gestion des sessions avancée'
      ]
    },
    {
      category: 'Monitoring',
      measures: [
        'Surveillance 24/7 des accès',
        'Détection d\'anomalies par IA',
        'Logs d\'audit complets'
      ]
    },
    {
      category: 'Sauvegarde',
      measures: [
        'Sauvegardes automatiques quotidiennes',
        'Réplication géographique',
        'Tests de restauration mensuels'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'conforme':
      case 'active':
        return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
      case 'good':
      case 'pending':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'warning':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-slate-600 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'Excellent';
      case 'conforme':
        return 'Conforme';
      case 'active':
        return 'Actif';
      case 'pending':
        return 'En cours';
      case 'good':
        return 'Bon';
      case 'warning':
        return 'Attention';
      case 'critical':
        return 'Critique';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {translate('security-compliance')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {translate('security-subtitle')}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200">
            <Download className="w-4 h-4" />
            Rapport sécurité
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
            <Shield className="w-4 h-4" />
            Audit sécurité
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Vue d'ensemble */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Métriques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {getStatusText(metric.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {metric.title}
                    </p>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {metric.value}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {metric.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mesures de sécurité techniques */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Mesures de Sécurité Techniques</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityMeasures.map((category, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    {category.category}
                  </h4>
                  <ul className="space-y-2">
                    {category.measures.map((measure, measureIndex) => (
                      <li key={measureIndex} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Statut des certifications */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Certifications Actives</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{cert.name}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{cert.description}</div>
                      <div className="text-xs text-slate-500">Par {cert.issuer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                      {getStatusText(cert.status)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Valide jusqu'au {new Date(cert.validUntil).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RGPD Tab */}
      {selectedTab === 'rgpd' && (
        <div className="space-y-6">
          {/* Conseils IA RGPD */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🤖 Recommandations IA - Conformité RGPD
                </h3>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <p><strong>Optimisation détectée :</strong> Automatisez la suppression des données après 24 mois d'inactivité (gain de conformité +2%)</p>
                  <p><strong>Audit préventif :</strong> Planifiez une révision des consentements utilisateurs avant mars 2025</p>
                  <p><strong>Formation équipe :</strong> 3 nouveaux employés nécessitent une formation RGPD dans les 30 jours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Conformité RGPD Détaillée</h3>
            
            <div className="space-y-4">
              {rgpdCompliance.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {item.category}
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.score}%
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Dernier audit: {new Date(item.lastAudit).toLocaleDateString('fr-FR')}</span>
                    <div className="w-32 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions RGPD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                Registre des Traitements
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-4">
                Documentation complète de tous les traitements de données
              </p>
              <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                Consulter
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Gestion des Consentements
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                Suivi et gestion des consentements utilisateurs
              </p>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Gérer
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Analyse d'Impact
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                Évaluations d'impact sur la protection des données
              </p>
              <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors">
                Analyser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IA Act EU Tab */}
      {selectedTab === 'ai-act' && (
        <div className="space-y-6">
          {/* Conseils IA pour IA Act */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  🧠 Conformité IA Act EU - Recommandations
                </h3>
                <div className="space-y-2 text-sm text-indigo-800 dark:text-indigo-200">
                  <p><strong>Classification IA :</strong> Vos algorithmes de recommandation sont classés "risque limité" - documentation à jour</p>
                  <p><strong>Transparence :</strong> Ajoutez des explications utilisateur pour les décisions automatisées (+2% conformité)</p>
                  <p><strong>Gouvernance :</strong> Nommez un responsable IA pour superviser la conformité réglementaire</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Conformité IA Act Européen</h3>
            
            <div className="space-y-6">
              {aiActCompliance.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {item.category}
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.score}%
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-white">Mesures mises en place :</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {item.measures.map((measure, measureIndex) => (
                        <div key={measureIndex} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          {measure}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Systèmes IA utilisés */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Systèmes IA Déployés</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Recommandations Carbone',
                  risk: 'Limité',
                  purpose: 'Conseils personnalisés réduction CO2',
                  status: 'Actif'
                },
                {
                  name: 'Analyse Prédictive',
                  risk: 'Minimal',
                  purpose: 'Prévision tendances émissions',
                  status: 'Actif'
                },
                {
                  name: 'Détection Anomalies',
                  risk: 'Limité',
                  purpose: 'Surveillance données environnementales',
                  status: 'Actif'
                },
                {
                  name: 'Chatbot Support',
                  risk: 'Minimal',
                  purpose: 'Assistance utilisateur automatisée',
                  status: 'Test'
                }
              ].map((system, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{system.name}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      system.risk === 'Minimal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      Risque {system.risk}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{system.purpose}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      system.status === 'Actif' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {system.status}
                    </span>
                    <button className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                      Voir détails →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Certifications Tab */}
      {selectedTab === 'certifications' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Certifications et Audits</h3>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {cert.description}
                        </p>
                        <div className="text-xs text-slate-500">
                          Délivré par {cert.issuer}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getStatusColor(cert.status)}`}>
                        {getStatusText(cert.status)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Valide jusqu'au
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {new Date(cert.validUntil).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                      Voir certificat
                    </button>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      Télécharger
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prochains audits */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Prochains Audits Planifiés</h3>
            
            <div className="space-y-4">
              {[
                {
                  type: 'Audit RGPD',
                  date: '2024-12-15',
                  auditor: 'CNIL',
                  scope: 'Conformité réglementaire complète'
                },
                {
                  type: 'Audit Sécurité ISO 27001',
                  date: '2025-01-20',
                  auditor: 'Bureau Veritas',
                  scope: 'Renouvellement certification'
                },
                {
                  type: 'Évaluation IA Act',
                  date: '2025-02-10',
                  auditor: 'EU AI Board',
                  scope: 'Première certification IA éthique'
                }
              ].map((audit, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{audit.type}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{audit.scope}</div>
                      <div className="text-xs text-slate-500">Par {audit.auditor}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {new Date(audit.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-xs text-slate-500">
                      Dans {Math.ceil((new Date(audit.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;