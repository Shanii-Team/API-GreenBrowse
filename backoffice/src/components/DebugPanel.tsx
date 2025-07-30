import React, { useState } from 'react';
import { Bug, Trash2, RefreshCw, Server, Database, Clock, AlertTriangle } from 'lucide-react';
import { apiService } from '../services/apiService';

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugStats, setDebugStats] = useState<any>(null);
  const [lastAction, setLastAction] = useState<string>('');

  const handleResetLogs = async () => {
    setLoading(true);
    try {
      const success = await apiService.resetLogs();
      if (success) {
        setLastAction('✅ Cache des logs réinitialisé');
        // Clear browser console
        console.clear();
      } else {
        setLastAction('❌ Échec de la réinitialisation des logs');
      }
    } catch (error) {
      setLastAction('❌ Erreur lors de la réinitialisation des logs');
    }
    setLoading(false);
  };

  const handleResetData = async () => {
    if (!window.confirm('⚠️ ATTENTION: Cette action supprimera TOUTES les données (utilisateurs, CO₂, etc.). Êtes-vous sûr ?')) {
      return;
    }
    
    setLoading(true);
    try {
      const success = await apiService.resetData();
      if (success) {
        setLastAction('✅ Toutes les données réinitialisées');
        // Force refresh de la page pour voir les changements
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setLastAction('❌ Échec de la réinitialisation des données');
      }
    } catch (error) {
      setLastAction('❌ Erreur lors de la réinitialisation des données');
    }
    setLoading(false);
  };

  const handleGetDebugStats = async () => {
    setLoading(true);
    try {
      const stats = await apiService.getDebugStats();
      setDebugStats(stats);
      setLastAction('✅ Stats de debug récupérées');
    } catch (error) {
      setLastAction('❌ Erreur lors de la récupération des stats');
    }
    setLoading(false);
  };

  const handleClearBrowserCache = () => {
    // Clear localStorage
    localStorage.clear();
    // Clear sessionStorage
    sessionStorage.clear();
    // Clear console
    console.clear();
    setLastAction('✅ Cache navigateur nettoyé');
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  const formatMemory = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          title="Ouvrir le panneau de debug"
        >
          <Bug className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Bug className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Debug Panel</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleResetLogs}
            disabled={loading}
            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Réinitialiser les logs</span>
          </button>

          <button
            onClick={handleResetData}
            disabled={loading}
            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
            <span>⚠️ Reset toutes les données</span>
          </button>

          <button
            onClick={handleGetDebugStats}
            disabled={loading}
            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            <Server className="w-5 h-5" />
            <span>Stats serveur</span>
          </button>

          <button
            onClick={handleClearBrowserCache}
            disabled={loading}
            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            <Database className="w-5 h-5" />
            <span>Vider cache navigateur</span>
          </button>
        </div>

        {/* Last Action */}
        {lastAction && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Dernière action:
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {lastAction}
            </div>
          </div>
        )}

        {/* Debug Stats */}
        {debugStats && debugStats.success && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-4 h-4" />
              Stats Serveur
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                <div className="font-medium text-slate-700 dark:text-slate-300">Uptime</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {formatUptime(debugStats.data.server.uptime)}
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                <div className="font-medium text-slate-700 dark:text-slate-300">Mémoire</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {formatMemory(debugStats.data.server.memory.used)}
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                <div className="font-medium text-slate-700 dark:text-slate-300">Utilisateurs</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {debugStats.data.data.users}
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                <div className="font-medium text-slate-700 dark:text-slate-300">Types CO₂</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {debugStats.data.data.dataTypes}
                </div>
              </div>
            </div>

            {debugStats.data.users && debugStats.data.users.length > 0 && (
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  Utilisateurs actifs ({debugStats.data.users.length})
                </h4>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {debugStats.data.users.map((user: any, index: number) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-700/50 p-2 rounded text-xs">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-slate-600 dark:text-slate-400">
                        CO₂: {user.totalCO2.toFixed(3)} kg | Types: {user.typesCount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Warning */}
        <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Mode Debug</span>
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            Ces outils sont destinés au développement et au debugging. Utilisez avec précaution en production.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;