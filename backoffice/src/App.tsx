import React, { useState, useEffect } from 'react';
import { Leaf, Moon, Sun, Settings, Menu, Download, FileText, Users, BarChart3, Truck, FileCheck, Zap, Droplets } from 'lucide-react';
import { Shield } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import ConfigPanel from './components/ConfigPanel';
import EmissionsSection from './components/EmissionsSection';
import EngagementSection from './components/EngagementSection';
import SuppliersSection from './components/SuppliersSection';
import ComplianceSection from './components/ComplianceSection';
import ReportsSection from './components/ReportsSection';
import ApiSection from './components/ApiSection';
import EnvironmentalImpactSection from './components/EnvironmentalImpactSection';
import SecuritySection from './components/SecuritySection';
import NotificationSystem from './components/NotificationSystem';
import WaterImpactSection from './components/WaterImpactSection';
import UsersSection from './components/UsersSection';
import { useTranslation } from './hooks/useTranslation';
import { useTheme } from './hooks/useTheme';
import { useNotifications } from './hooks/useNotifications';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [configPanelOpen, setConfigPanelOpen] = useState(false);
  
  const { currentLanguage, changeLanguage } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Force re-render when language changes
  useEffect(() => {
    console.log('🔄 App re-rendering with language:', currentLanguage);
  }, [currentLanguage]);

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: 'overview' },
    { id: 'users', icon: Users, label: 'users-management' },
    { id: 'environmental-impact', icon: Leaf, label: 'environmental-impact' },
    { id: 'water-impact', icon: Droplets, label: 'water-impact' },
    { id: 'emissions', icon: Zap, label: 'emissions' },
    { id: 'engagement', icon: Users, label: 'engagement' },
    { id: 'suppliers', icon: Truck, label: 'suppliers' },
    { id: 'compliance', icon: FileCheck, label: 'compliance' },
    { id: 'security', icon: Shield, label: 'security' },
    { id: 'reports', icon: FileText, label: 'reports' },
    { id: 'api', icon: Settings, label: 'api-integration' }
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    if (window.innerWidth <= 968) {
      setSidebarOpen(false);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Dashboard />;
      case 'users':
        return <UsersSection />;
      case 'environmental-impact':
        return <EnvironmentalImpactSection />;
      case 'water-impact':
        return <WaterImpactSection />;
      case 'emissions':
        return <EmissionsSection />;
      case 'engagement':
        return <EngagementSection />;
      case 'suppliers':
        return <SuppliersSection />;
      case 'compliance':
        return <ComplianceSection />;
      case 'security':
        return <SecuritySection />;
      case 'reports':
        return <ReportsSection />;
      case 'api':
        return <ApiSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-900'
    }`}>
      <Navigation
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        currentLanguage={currentLanguage}
        changeLanguage={changeLanguage}
        onConfigToggle={() => setConfigPanelOpen(!configPanelOpen)}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <Sidebar
        items={sidebarItems}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        isDarkMode={isDarkMode}
      />
      
      <main className="ml-0 lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-6">
          {renderActiveSection()}
        </div>
      </main>
      
      <ConfigPanel
        isOpen={configPanelOpen}
        onClose={() => setConfigPanelOpen(false)}
        isDarkMode={isDarkMode}
      />
      
      <NotificationSystem
        notifications={notifications}
        onRemove={removeNotification}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;