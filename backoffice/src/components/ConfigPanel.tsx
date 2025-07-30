import React from 'react';
import { X, Palette, Settings, Bell, RefreshCw } from 'lucide-react';

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ isOpen, onClose, isDarkMode }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-80 transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        } border-l shadow-xl`}
      >
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Configuration
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Theme Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold">Thème</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border-2 border-emerald-500 cursor-pointer" />
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg cursor-pointer" />
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg cursor-pointer" />
              </div>
            </div>
            
            {/* Dashboard Settings */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold">Paramètres du Tableau de Bord</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Afficher la Performance Carbone',
                  'Afficher l\'Engagement',
                  'Afficher l\'Écosystème Greenbrows',
                  'Afficher la Conformité',
                  'Afficher le Classement'
                ].map((setting, index) => (
                  <label key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                    <span className="text-sm">{setting}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Notifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Alertes d\'émissions',
                  'Alertes de conformité',
                  'Alertes d\'engagement'
                ].map((notification, index) => (
                  <label key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                    <span className="text-sm">{notification}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Data Refresh */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold">Actualisation des Données</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Temps réel',
                  'Toutes les heures',
                  'Quotidiennement'
                ].map((option, index) => (
                  <label key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                    <input type="radio" name="refresh" defaultChecked={index === 0} className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Save Button */}
            <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
              Enregistrer les Paramètres
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigPanel;