import React, { useState } from 'react';
import { Play, Loader2, Database } from 'lucide-react';
import { apiService } from '../services/apiService';

const TestDataGenerator: React.FC = () => {
  const [generating, setGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  const testDataSets = [
    { type: 'webpage', co2: 0.123, userId: 'demo-user-1', deviceInfo: { platform: 'chrome-extension', version: '1.0.0' } },
    { type: 'video', co2: 0.456, userId: 'demo-user-2', deviceInfo: { platform: 'flutter', version: '3.0.0' } },
    { type: 'image', co2: 0.089, userId: 'demo-user-1', deviceInfo: { platform: 'chrome-extension', version: '1.0.0' } },
    { type: 'script', co2: 0.234, userId: 'demo-user-3', deviceInfo: { platform: 'flutter', version: '3.0.0' } },
    { type: 'api', co2: 0.067, userId: 'demo-user-2', deviceInfo: { platform: 'chrome-extension', version: '1.0.0' } },
  ];

  const generateTestData = async () => {
    setGenerating(true);
    try {
      // Send multiple test data points
      for (const data of testDataSets) {
        await apiService.postCO2DataWithUser(data);
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setLastGenerated(new Date().toLocaleTimeString());
      console.log('✅ Test data sent successfully');
    } catch (error) {
      console.error('❌ Error generating test data:', error);
    } finally {
      setTimeout(() => setGenerating(false), 1000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Générateur de données de test</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Envoie des données CO₂ factices pour tester l'affichage
            </p>
          </div>
        </div>
        
        <button
          onClick={generateTestData}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Génération...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Générer des données</span>
            </>
          )}
        </button>
      </div>

      {lastGenerated && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            ✅ Dernières données générées à {lastGenerated}
          </p>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          💡 Ce bouton envoie {testDataSets.length} entrées de test avec différents types de données et utilisateurs pour simuler l'activité de l'extension et de l'application Flutter.
        </p>
      </div>
    </div>
  );
};

export default TestDataGenerator;