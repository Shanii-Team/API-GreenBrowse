import { useState, useEffect, useCallback } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  fr: {
    // Navigation et sections
    overview: 'Vue d\'ensemble',
    'environmental-impact': 'Impact Env.',
    'water-impact': 'Impact Hydrique',
    emissions: 'Émissions',
    engagement: 'Engagement',
    suppliers: 'Fournisseurs',
    compliance: 'Conformité',
    security: 'Sécurité',
    reports: 'Rapports',
    'api-integration': 'Intégration API',
    configure: 'Configurer',

    // Dashboard
    'carbon-dashboard-title': 'Tableau de bord Impact Carbone',
    'carbon-performance': 'Performance Carbone',
    'employee-engagement': 'Engagement Collaborateurs',
    'greenbrows-ecosystem': 'Écosystème Greenbrows',
    'total-emissions': 'ÉMISSIONS TOTALES',
    'carbon-intensity': 'INTENSITÉ CARBONE',
    'potential-savings': 'ÉCONOMIES POTENTIELLES',
    'vs-target': 'vs objectif',
    'active-users': 'Utilisateurs actifs',
    'emissions-totales': 'Émissions totales',
    'conformite': 'Conformité',
    'score-esg': 'Score ESG',
    'utilisateurs': 'Utilisateurs',
    'green-coins': 'Green Coins',
    'defis-completes': 'Défis complétés',

    // Temps
    'today': 'Aujourd\'hui',
    'week': 'Semaine',
    'month': 'Mois',
    'quarter': 'Trimestre',
    'year': 'Année',
    'vs-last-month': 'vs mois dernier',

    // Emissions
    'emissions-analysis': 'Analyse des Émissions',
    'scope1-emissions': 'ÉMISSIONS SCOPE 1',
    'scope2-emissions': 'ÉMISSIONS SCOPE 2',
    'scope3-emissions': 'ÉMISSIONS SCOPE 3',
    'emissions-by-source': 'Émissions par source',
    'emissions-trend': 'Tendance des émissions (12 mois)',
    'energy': 'Énergie',
    'transport': 'Transport',
    'production': 'Production',
    'offices': 'Bureaux',

    // Engagement
    'executive-dashboard': 'Tableau de Bord Exécutif - Engagement',
    'strategic-view': 'Vue stratégique des indicateurs d\'engagement des employés',

    // Suppliers
    'supplier-management': 'Gestion des Fournisseurs',
    'supplier-performance': 'Suivi de la performance carbone et conformité de la chaîne d\'approvisionnement',
    'suppliers': 'Fournisseurs',
    'compliant': 'CONFORMES',
    'supplier-emissions': 'ÉMISSIONS FOURNISSEURS',

    // Compliance
    'compliance-title': 'Conformité',
    'compliance-subtitle': 'Suivi de la conformité réglementaire et des standards ESG',

    // Security
    'security-compliance': 'Sécurité & Conformité',
    'security-subtitle': 'Respect des normes RGPD, IA Act EU et certifications sécurité',

    // Reports
    'reports-title': 'Rapports',
    'reports-subtitle': 'Génération et gestion des rapports de performance ESG',
    'generate-report': 'Générer un rapport',
    'all-reports': 'Tous les rapports',
    'environmental': 'Environnemental',
    'social': 'Social',
    'governance': 'Gouvernance',

    // API Integration
    'api-integration-title': 'Intégration API Greenbrows',
    'api-subtitle': 'Gestion et monitoring des services API et intégrations',
    'sync-data': 'Synchroniser les données',
    'service-status': 'Statut des Services',
    'api-usage-tab': 'Utilisation API',
    'security-tab': 'Sécurité',
    'documentation-tab': 'Documentation',

    // Environmental Impact
    'environmental-impact': 'Impact Environnemental',
    'environmental-subtitle': 'Suivi en temps réel de votre empreinte carbone et projets écologiques',
    'carbon-balance': 'Balance Carbone',
    'ecological-projects': 'Projets Écologiques',
    'employee-engagement-tab': 'Engagement Collaborateurs',
    'export': 'Exporter',
    'propose-action': 'Proposer une action',
    'water-savings': 'ÉCONOMIES D\'EAU',
    
    // Water Impact translations
    'water-impact-title': 'Tableau de Bord Impact Hydrique',
    'water-impact-subtitle': 'Suivi en temps réel de votre empreinte hydrique numérique',
    'water-footprint': 'EMPREINTE HYDRIQUE',
    'water-performance': 'Performance Hydrique',
    'water-usage-trend': 'Tendance d\'Utilisation de l\'Eau',
    'water-usage-breakdown': 'Répartition de l\'Utilisation de l\'Eau',
    'water-usage-by-department': 'Utilisation de l\'Eau par Département',
    'water-usage-per-employee': 'Utilisation de l\'Eau par Employé par Département',
    'device-manufacturing': 'Fabrication d\'Appareils',
    'data-centers': 'Centres de Données',
    'streaming-media': 'Streaming et Médias',
    'water-equivalences': 'Équivalences Hydriques',
    'showers': 'douches',
    'water-bottles': 'bouteilles d\'eau',
    'swimming-pools': 'piscines',
    'ai-optimization-recommendations': 'Recommandations d\'Optimisation IA',
    'optimize-streaming-quality': 'Optimiser la Qualité de Streaming',
    'data-center-efficiency': 'Efficacité des Centres de Données',
    'device-lifecycle-extension': 'Extension du Cycle de Vie des Appareils',
    'reduce-default-video-quality': 'Réduire la qualité vidéo par défaut à 720p pour les réunions internes',
    'migrate-water-efficient-cloud': 'Migrer vers des fournisseurs cloud économes en eau',
    'extend-laptop-replacement-cycle': 'Étendre le cycle de remplacement des ordinateurs portables de 3 à 4 ans',
    'high-priority': 'Priorité Élevée',
    'medium-priority': 'Priorité Moyenne',
    'low-priority': 'Priorité Faible',
    'implement': 'Implémenter',
    'learn-more': 'En Savoir Plus',
    'total-usage': 'Utilisation Totale',
    'per-employee': 'Par Employé',
    'trend': 'Tendance',
    'equivalence': 'Équivalence',
    'employees': 'employés',
    'export-report': 'Exporter le Rapport',
    'overview': 'Vue d\'ensemble',
    'breakdown': 'Répartition',
    'departments': 'Départements',
    'total-liters': 'Litres Totaux',
    'vs-last-month': 'vs mois dernier',
    'shower-equivalents': 'Équivalents douches',
    'industry-benchmark': 'Référence industrie',
    'below-sector-average': 'en dessous de la moyenne du secteur',
    'ai-water-optimization': 'Optimisation Hydrique IA',
    'immediate-impact': 'Impact immédiat',
    'cloud-optimization': 'Optimisation cloud',
    'device-lifecycle': 'Cycle de vie des appareils',
    'manufacturing-water-footprint': 'empreinte hydrique de fabrication'
  },
  en: {
    // Navigation and sections
    overview: 'Overview',
    'environmental-impact': 'Environmental Impact',
    'water-impact': 'Water Impact',
    emissions: 'Emissions',
    engagement: 'Engagement',
    suppliers: 'Suppliers',
    compliance: 'Compliance',
    security: 'Security',
    reports: 'Reports',
    'api-integration': 'API Integration',
    configure: 'Configure',

    // Dashboard
    'carbon-dashboard-title': 'Carbon Impact Dashboard',
    'carbon-performance': 'Carbon Performance',
    'employee-engagement': 'Employee Engagement',
    'greenbrows-ecosystem': 'Greenbrows Ecosystem',
    'total-emissions': 'TOTAL EMISSIONS',
    'carbon-intensity': 'CARBON INTENSITY',
    'potential-savings': 'POTENTIAL SAVINGS',
    'vs-target': 'vs target',
    'active-users': 'Active users',
    'emissions-totales': 'Total emissions',
    'conformite': 'Compliance',
    'score-esg': 'ESG Score',
    'utilisateurs': 'Users',
    'green-coins': 'Green Coins',
    'defis-completes': 'Completed challenges',

    // Time
    'today': 'Today',
    'week': 'Week',
    'month': 'Month',
    'quarter': 'Quarter',
    'year': 'Year',
    'vs-last-month': 'vs last month',

    // Emissions
    'emissions-analysis': 'Emissions Analysis',
    'scope1-emissions': 'SCOPE 1 EMISSIONS',
    'scope2-emissions': 'SCOPE 2 EMISSIONS',
    'scope3-emissions': 'SCOPE 3 EMISSIONS',
    'emissions-by-source': 'Emissions by Source',
    'emissions-trend': 'Emissions Trend (12 months)',
    'energy': 'Energy',
    'transport': 'Transport',
    'production': 'Production',
    'offices': 'Offices',

    // Engagement
    'executive-dashboard': 'Executive Dashboard - Engagement',
    'strategic-view': 'Strategic view of employee engagement indicators',

    // Suppliers
    'supplier-management': 'Supplier Management',
    'supplier-performance': 'Carbon performance tracking and supply chain compliance',
    'suppliers': 'SUPPLIERS',
    'compliant': 'COMPLIANT',
    'supplier-emissions': 'SUPPLIER EMISSIONS',

    // Compliance
    'compliance-title': 'Compliance',
    'compliance-subtitle': 'Regulatory compliance and ESG standards tracking',

    // Security
    'security-compliance': 'Security & Compliance',
    'security-subtitle': 'GDPR, EU AI Act compliance and security certifications',

    // Reports
    'reports-title': 'Reports',
    'reports-subtitle': 'ESG performance report generation and management',
    'generate-report': 'Generate report',
    'all-reports': 'All reports',
    'environmental': 'Environmental',
    'social': 'Social',
    'governance': 'Governance',

    // API Integration
    'api-integration-title': 'Greenbrows API Integration',
    'api-subtitle': 'API services management and monitoring',
    'sync-data': 'Synchronize data',
    'service-status': 'Service Status',
    'api-usage-tab': 'API Usage',
    'security-tab': 'Security',
    'documentation-tab': 'Documentation',

    // Environmental Impact
    'environmental-impact': 'Environmental Impact',
    'environmental-subtitle': 'Real-time tracking of your carbon footprint and ecological projects',
    'carbon-balance': 'Carbon Balance',
    'ecological-projects': 'Ecological Projects',
    'employee-engagement-tab': 'Employee Engagement',
    'export': 'Export',
    'propose-action': 'Propose action',
    'water-savings': 'WATER SAVINGS',
    
    // Water Impact translations
    'water-impact-title': 'Water Impact Dashboard',
    'water-impact-subtitle': 'Real-time tracking of your digital water footprint',
    'water-footprint': 'WATER FOOTPRINT',
    'water-performance': 'Water Performance',
    'water-usage-trend': 'Water Usage Trend',
    'water-usage-breakdown': 'Water Usage Breakdown',
    'water-usage-by-department': 'Water Usage by Department',
    'water-usage-per-employee': 'Water Usage per Employee by Department',
    'device-manufacturing': 'Device Manufacturing',
    'data-centers': 'Data Centers',
    'streaming-media': 'Streaming & Media',
    'water-equivalences': 'Water Equivalences',
    'showers': 'showers',
    'water-bottles': 'water bottles',
    'swimming-pools': 'swimming pools',
    'ai-optimization-recommendations': 'AI Optimization Recommendations',
    'optimize-streaming-quality': 'Optimize Streaming Quality',
    'data-center-efficiency': 'Data Center Efficiency',
    'device-lifecycle-extension': 'Device Lifecycle Extension',
    'reduce-default-video-quality': 'Reduce default video quality to 720p for internal meetings',
    'migrate-water-efficient-cloud': 'Migrate to water-efficient cloud providers',
    'extend-laptop-replacement-cycle': 'Extend laptop replacement cycle from 3 to 4 years',
    'high-priority': 'High Priority',
    'medium-priority': 'Medium Priority',
    'low-priority': 'Low Priority',
    'implement': 'Implement',
    'learn-more': 'Learn More',
    'total-usage': 'Total Usage',
    'per-employee': 'Per Employee',
    'trend': 'Trend',
    'equivalence': 'Equivalence',
    'employees': 'employees',
    'export-report': 'Export Report',
    'overview': 'Overview',
    'breakdown': 'Breakdown',
    'departments': 'Departments',
    'total-liters': 'Total Liters',
    'vs-last-month': 'vs last month',
    'shower-equivalents': 'Shower equivalents',
    'industry-benchmark': 'Industry benchmark',
    'below-sector-average': 'below sector average',
    'ai-water-optimization': 'AI Water Optimization',
    'immediate-impact': 'Immediate impact',
    'cloud-optimization': 'Cloud optimization',
    'device-lifecycle': 'Device lifecycle',
    'manufacturing-water-footprint': 'manufacturing water footprint'
  },
  es: {
    // Navigation and sections
    overview: 'Resumen',
    'environmental-impact': 'Impacto Ambiental',
    'water-impact': 'Impacto Hídrico',
    emissions: 'Emisiones',
    engagement: 'Compromiso',
    suppliers: 'Proveedores',
    compliance: 'Cumplimiento',
    security: 'Seguridad',
    reports: 'Informes',
    'api-integration': 'Integración API',
    configure: 'Configurar',

    // Dashboard
    'carbon-dashboard-title': 'Panel de Impacto de Carbono',
    'carbon-performance': 'Rendimiento de Carbono',
    'employee-engagement': 'Compromiso de Empleados',
    'greenbrows-ecosystem': 'Ecosistema Greenbrows',
    'total-emissions': 'EMISIONES TOTALES',
    'carbon-intensity': 'INTENSIDAD DE CARBONO',
    'potential-savings': 'AHORROS POTENCIALES',
    'vs-target': 'vs objetivo',
    'active-users': 'Usuarios activos',
    'emissions-totales': 'Emisiones totales',
    'conformite': 'Cumplimiento',
    'score-esg': 'Puntuación ESG',
    'utilisateurs': 'Usuarios',
    'green-coins': 'Green Coins',
    'defis-completes': 'Desafíos completados',

    // Time
    'today': 'Hoy',
    'week': 'Semana',
    'month': 'Mes',
    'quarter': 'Trimestre',
    'year': 'Año',
    'vs-last-month': 'vs mes pasado',

    // Emissions
    'emissions-analysis': 'Análisis de Emisiones',
    'scope1-emissions': 'EMISIONES ALCANCE 1',
    'scope2-emissions': 'EMISIONES ALCANCE 2',
    'scope3-emissions': 'EMISIONES ALCANCE 3',
    'emissions-by-source': 'Emisiones por Fuente',
    'emissions-trend': 'Tendencia de Emisiones (12 meses)',
    'energy': 'Energía',
    'transport': 'Transporte',
    'production': 'Producción',
    'offices': 'Oficinas',

    // Engagement
    'executive-dashboard': 'Panel Ejecutivo - Compromiso',
    'strategic-view': 'Vista estratégica de indicadores de compromiso de empleados',

    // Suppliers
    'supplier-management': 'Gestión de Proveedores',
    'supplier-performance': 'Seguimiento del rendimiento de carbono y cumplimiento de la cadena de suministro',
    'suppliers': 'PROVEEDORES',
    'compliant': 'CONFORME',
    'supplier-emissions': 'EMISIONES DE PROVEEDORES',

    // Compliance
    'compliance-title': 'Cumplimiento',
    'compliance-subtitle': 'Seguimiento del cumplimiento regulatorio y estándares ESG',

    // Security
    'security-compliance': 'Seguridad y Cumplimiento',
    'security-subtitle': 'Cumplimiento RGPD, Ley de IA de la UE y certificaciones de seguridad',

    // Reports
    'reports-title': 'Informes',
    'reports-subtitle': 'Generación y gestión de informes de rendimiento ESG',
    'generate-report': 'Generar informe',
    'all-reports': 'Todos los informes',
    'environmental': 'Ambiental',
    'social': 'Social',
    'governance': 'Gobernanza',

    // API Integration
    'api-integration-title': 'Integración API Greenbrows',
    'api-subtitle': 'Gestión y monitoreo de servicios API',
    'sync-data': 'Sincronizar datos',
    'service-status': 'Estado del Servicio',
    'api-usage-tab': 'Uso de API',
    'security-tab': 'Seguridad',
    'documentation-tab': 'Documentación',

    // Environmental Impact
    'environmental-impact': 'Impacto Ambiental',
    'environmental-subtitle': 'Seguimiento en tiempo real de su huella de carbono y proyectos ecológicos',
    'carbon-balance': 'Balance de Carbono',
    'ecological-projects': 'Proyectos Ecológicos',
    'employee-engagement-tab': 'Compromiso de Empleados',
    'export': 'Exportar',
    'propose-action': 'Proponer acción',
    'water-savings': 'AHORROS DE AGUA',
    
    // Water Impact translations
    'water-impact-title': 'Panel de Impacto Hídrico',
    'water-impact-subtitle': 'Seguimiento en tiempo real de su huella hídrica digital',
    'water-footprint': 'HUELLA HÍDRICA',
    'water-performance': 'Rendimiento Hídrico',
    'water-usage-trend': 'Tendencia de Uso de Agua',
    'water-usage-breakdown': 'Desglose de Uso de Agua',
    'water-usage-by-department': 'Uso de Agua por Departamento',
    'water-usage-per-employee': 'Uso de Agua por Empleado por Departamento',
    'device-manufacturing': 'Fabricación de Dispositivos',
    'data-centers': 'Centros de Datos',
    'streaming-media': 'Streaming y Medios',
    'water-equivalences': 'Equivalencias de Agua',
    'showers': 'duchas',
    'water-bottles': 'botellas de agua',
    'swimming-pools': 'piscinas',
    'ai-optimization-recommendations': 'Recomendaciones de Optimización IA',
    'optimize-streaming-quality': 'Optimizar Calidad de Streaming',
    'data-center-efficiency': 'Eficiencia del Centro de Datos',
    'device-lifecycle-extension': 'Extensión del Ciclo de Vida del Dispositivo',
    'reduce-default-video-quality': 'Reducir calidad de video predeterminada a 720p para reuniones internas',
    'migrate-water-efficient-cloud': 'Migrar a proveedores de nube eficientes en agua',
    'extend-laptop-replacement-cycle': 'Extender ciclo de reemplazo de portátiles de 3 a 4 años',
    'high-priority': 'Prioridad Alta',
    'medium-priority': 'Prioridad Media',
    'low-priority': 'Prioridad Baja',
    'implement': 'Implementar',
    'learn-more': 'Saber Más',
    'total-usage': 'Uso Total',
    'per-employee': 'Por Empleado',
    'trend': 'Tendencia',
    'equivalence': 'Equivalencia',
    'employees': 'empleados',
    'export-report': 'Exportar Informe',
    'overview': 'Resumen',
    'breakdown': 'Desglose',
    'departments': 'Departamentos',
    'total-liters': 'Litros Totales',
    'vs-last-month': 'vs mes pasado',
    'shower-equivalents': 'Equivalentes de ducha',
    'industry-benchmark': 'Referencia de la industria',
    'below-sector-average': 'por debajo del promedio del sector',
    'ai-water-optimization': 'Optimización de Agua IA',
    'immediate-impact': 'Impacto inmediato',
    'cloud-optimization': 'Optimización en la nube',
    'device-lifecycle': 'Ciclo de vida del dispositivo',
    'manufacturing-water-footprint': 'huella hídrica de fabricación'
  }
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'fr';
    }
    return 'fr';
  });

  // Force re-render counter to trigger component updates
  const [, forceUpdate] = useState(0);

  const changeLanguage = useCallback((language: string) => {
    console.log('🌍 Changing language from', currentLanguage, 'to', language);
    setCurrentLanguage(language);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      console.log('💾 Language saved to localStorage:', language);
    }
    
    // Force all components to re-render with new language
    forceUpdate(prev => prev + 1);
  }, [currentLanguage]);

  const translate = useCallback((key: string) => {
    const translation = translations[currentLanguage]?.[key] || translations['fr']?.[key] || key;
    
    if (translation === key && key !== 'fr' && key !== 'en' && key !== 'es') {
      console.warn(`⚠️ Missing translation for key: "${key}" in language: ${currentLanguage}`);
    }
    
    return translation;
  }, [currentLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', currentLanguage);
      console.log('💾 Language persisted:', currentLanguage);
    }
  }, [currentLanguage]);

  return {
    currentLanguage,
    translations: translations[currentLanguage],
    changeLanguage,
    translate
  };
};