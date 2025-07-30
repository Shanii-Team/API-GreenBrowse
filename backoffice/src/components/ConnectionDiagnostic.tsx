import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { apiConfig } from '../services/apiConfig';

interface ConnectionTest {
  url: string;
  success: boolean;
  error?: string;
}

const ConnectionDiagnostic: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<ConnectionTest[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const runDiagnostic = async () => {
    setTesting(true);
    try {
      const testResults = await apiConfig.testConnections();
      setResults(testResults);
    } catch (error) {
      console.error('❌ Diagnostic failed:', error);
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  const successfulConnection = results.find(r => r.success);
  const hasConnection = results.some(r => r.success);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            hasConnection 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-red-500 to-pink-600'
          }`}>
            {hasConnection ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Diagnostic de connexion API</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {hasConnection ? '✅ Connexion établie' : '❌ Problème de connexion détecté'}
            </p>
          </div>
        </div>
        
        <button
          onClick={runDiagnostic}
          disabled={testing}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
          <span>Test connexion</span>
        </button>
      </div>

      {successfulConnection && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            ✅ <strong>Connexion active :</strong> {successfulConnection.url}
          </p>
        </div>
      )}

      {!hasConnection && results.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-300">
            ❌ <strong>Aucune connexion disponible.</strong> Vérifiez que votre serveur API est démarré.
          </p>
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {showDetails ? '▼ Masquer les détails' : '▶ Afficher les détails du diagnostic'}
        </button>
      </div>

      {showDetails && (
        <div className="space-y-2">
          <h3 className="font-medium text-slate-700 dark:text-slate-300">Résultats des tests :</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                result.success
                  ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {result.success ? (
                  <Wifi className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
                <code className="text-sm font-mono">{result.url}</code>
              </div>
              <span className={`text-sm font-medium ${
                result.success
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {result.success ? 'OK' : result.error}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong>Environnement détecté :</strong><br/>
          - URL actuelle : {window.location.href}<br/>
          - Protocole : {window.location.protocol}<br/>
          - API configurée : {apiConfig.getBaseUrl()}
        </p>
      </div>
    </div>
  );
};

export default ConnectionDiagnostic;