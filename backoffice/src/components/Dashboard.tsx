import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Coins, Trophy, Activity, Leaf, Target, Zap } from 'lucide-react';
import { Droplets } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useCO2Data } from '../hooks/useCO2Data';
import { useUsers } from '../hooks/useUsers';
import { formatNumber } from '../utils/formatNumber';
import MetricCard from './MetricCard';
import RingChart from './RingChart';
import EcosystemCard from './EcosystemCard';
import ComplianceOverview from './ComplianceOverview';
import ApiIntegration from './ApiIntegration';
import AlertThresholds from './AlertThresholds';
import WaterSavingsCard from './WaterSavingsCard';
import CO2BreakdownCard from './CO2BreakdownCard';
import TestDataGenerator from './TestDataGenerator';
import ConnectionDiagnostic from './ConnectionDiagnostic';
import RealTimeStats from './RealTimeStats';
import ActivityFeed from './ActivityFeed';

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('month');
  const { translate } = useTranslation();
  const { data: co2Data, loading, error, isConnected, hasRealData } = useCO2Data();
  const { users, totalUsers, globalTotal, loading: usersLoading } = useUsers();

  const timeframes = [
    { id: 'today', label: translate('today') },
    { id: 'week', label: translate('week') },
    { id: 'month', label: translate('month') },
    { id: 'quarter', label: translate('quarter') }
  ];

  // Use real data if available, otherwise demo data
  const totalCO2 = hasRealData && co2Data.total > 0 ? co2Data.total : 2.847;
  const totalCO2Display = formatNumber(totalCO2, 'co2');
  
  // Show data source indicator
  const dataSource = hasRealData ? 'real' : isConnected ? 'empty' : 'demo';
  
  const metrics = [
    {
      title: 'total-emissions',
      value: loading ? 'Loading...' : totalCO2Display,
      change: 5.2,
      isPositive: false,
      icon: Zap,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'carbon-intensity',
      value: loading ? 'Loading...' : `${formatNumber(totalCO2 * 1000, 'generic')} g/page`,
      change: 8.7,
      isPositive: true,
      icon: Activity,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'potential-savings',
      value: loading ? 'Loading...' : `€${(totalCO2 * 25).toFixed(0)}`,
      change: 12.3,
      isPositive: true,
      icon: Target,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'water-savings',
      value: loading ? 'Loading...' : `${(totalCO2 * 100).toFixed(0)}L`,
      change: 8.3,
      isPositive: true,
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const waterSavingsData = {
    savedLiters: 5200,
    trend: 8.3,
    equivalences: {
      showers: 52,
      bottles: 10400,
      swimmingPools: 0.002
    }
  };

  const ecosystemData = [
    {
      icon: Coins,
      title: 'GreenCoins',
      value: '45.7k',
      description: 'Monnaie virtuelle récompensant les comportements éco-responsables'
    },
    {
      icon: Activity,
      title: 'Mode Focus',
      value: '+32%',
      description: 'Amélioration de la concentration et réduction des distractions'
    },
    {
      icon: Target,
      title: 'Score Ikigai',
      value: '7.8/10',
      description: 'Alignement passion/mission/vocation/profession'
    },
    {
      icon: Leaf,
      title: 'Blockchain',
      value: 'Sécurisé',
      description: 'Sécurisation et traçabilité des transactions GreenCoins'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Connection Diagnostic - Show if there are connection issues */}
      {(!isConnected || error) && <ConnectionDiagnostic />}
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {translate('carbon-dashboard-title')}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            {dataSource === 'real' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                🟢 Données temps réel
              </span>
            )}
            {dataSource === 'empty' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                🔵 API connectée - Aucune donnée
              </span>
            )}
            {dataSource === 'demo' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                🟠 Données de démonstration
              </span>
            )}
            {error && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                🔴 {error}
              </span>
            )}
          </div>
        </div>
        
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

      {/* Real-time Statistics */}
      <RealTimeStats />

      {/* Ring Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RingChart
          title="carbon-performance"
          centerValue={loading ? '...' : totalCO2Display}
          centerLabel="total-co2"
          progress={Math.min((totalCO2 * 100), 100)}
          metrics={[
            { icon: Zap, label: 'emissions-totales', value: loading ? 'Loading...' : totalCO2Display },
            { icon: Trophy, label: 'conformite', value: isConnected ? '✅ Connected' : '❌ Disconnected' },
            { icon: Target, label: 'data-types', value: `${Object.keys(co2Data.details || {}).length} types` }
          ]}
        />
        
        <RingChart
          title="user-engagement"
          centerValue={usersLoading ? '...' : totalUsers.toString()}
          centerLabel="active-users"
          progress={Math.min(totalUsers * 10, 100)}
          color="from-blue-500 to-purple-600"
          metrics={[
            { icon: Users, label: 'utilisateurs-actifs', value: usersLoading ? 'Loading...' : totalUsers.toString() },
            { icon: Activity, label: 'co2-moyen', value: usersLoading ? 'Loading...' : formatNumber(totalUsers > 0 ? globalTotal / totalUsers : 0, 'co2') },
            { icon: Trophy, label: 'total-collecte', value: usersLoading ? 'Loading...' : formatNumber(globalTotal, 'co2') }
          ]}
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} title={translate(metric.title)} value={metric.value} change={metric.change} isPositive={metric.isPositive} icon={metric.icon} color={metric.color} />
        ))}
      </div>

      {/* Greenbrows Ecosystem */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold">{translate('greenbrows-ecosystem')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemData.map((item, index) => (
            <EcosystemCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Activity and CO2 Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CO2BreakdownCard 
          details={hasRealData ? co2Data.details || {} : { 'webpage': 1.2, 'video': 0.8, 'image': 0.4, 'script': 0.447 }} 
          total={totalCO2} 
          loading={loading} 
        />
        <ActivityFeed />
      </div>

      {/* API Integration */}
      <ApiIntegration />

      {/* Test Data Generator - Only show if no real data */}
      {!hasRealData && <TestDataGenerator />}

      {/* Alert Thresholds */}
      <AlertThresholds />

      {/* Compliance Overview */}
      <ComplianceOverview />
    </div>
  );
};

export default Dashboard;