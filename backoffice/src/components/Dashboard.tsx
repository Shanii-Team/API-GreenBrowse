import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Coins, Trophy, Activity, Leaf, Target, Zap } from 'lucide-react';
import { Droplets } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useCO2Data } from '../hooks/useCO2Data';
import MetricCard from './MetricCard';
import RingChart from './RingChart';
import EcosystemCard from './EcosystemCard';
import ComplianceOverview from './ComplianceOverview';
import ApiIntegration from './ApiIntegration';
import AlertThresholds from './AlertThresholds';
import WaterSavingsCard from './WaterSavingsCard';
import CO2BreakdownCard from './CO2BreakdownCard';

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('month');
  const { translate } = useTranslation();
  const { data: co2Data, loading, error, isConnected } = useCO2Data();

  const timeframes = [
    { id: 'today', label: translate('today') },
    { id: 'week', label: translate('week') },
    { id: 'month', label: translate('month') },
    { id: 'quarter', label: translate('quarter') }
  ];

  const totalCO2 = co2Data.total || 0;
  const totalCO2Display = totalCO2 < 1 ? `${(totalCO2 * 1000).toFixed(0)} gCO₂e` : `${totalCO2.toFixed(3)} kgCO₂e`;
  
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
      value: loading ? 'Loading...' : `${(totalCO2 * 1000).toFixed(1)} g/page`,
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
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {translate('carbon-dashboard-title')}
        </h1>
        
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
          title="employee-engagement"
          centerValue="85%"
          centerLabel="active-users"
          progress={85}
          color="from-orange-500 to-amber-500"
          metrics={[
            { icon: Users, label: 'utilisateurs', value: '1,245' },
            { icon: Coins, label: 'green-coins', value: '45.7k' },
            { icon: Trophy, label: 'defis-completes', value: '156' }
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

      {/* CO2 Breakdown */}
      <CO2BreakdownCard details={co2Data.details || {}} total={totalCO2} loading={loading} />

      {/* API Integration */}
      <ApiIntegration />

      {/* Alert Thresholds */}
      <AlertThresholds />

      {/* Compliance Overview */}
      <ComplianceOverview />
    </div>
  );
};

export default Dashboard;