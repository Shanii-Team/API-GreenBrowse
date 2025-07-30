import React, { useState } from 'react';
import { Droplets, TrendingUp, TrendingDown, Smartphone, Server, Play, Download, BarChart3, PieChart, Users, Building, Waves, ShowerHead as Shower } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { WaterMetrics, WaterBreakdown, WaterHistoryPoint, WaterDepartmentUsage } from '../types/water';
import WaterFootprintCard from './WaterFootprintCard';
import CombinedCO2WaterWidget from './CombinedCO2WaterWidget';
import WaterSavingsCard from './WaterSavingsCard';

const WaterImpactSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [viewMode, setViewMode] = useState('overview');
  const { translate } = useTranslation();

  const timeframes = [
    { id: '7d', label: '7 days' },
    { id: '30d', label: '30 days' },
    { id: '90d', label: '3 months' },
    { id: '12m', label: '12 months' }
  ];

  const viewModes = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'breakdown', label: 'Breakdown', icon: PieChart },
    { id: 'departments', label: 'Departments', icon: Users }
  ];

  // Mock data - in real app, this would come from API
  const waterMetrics: WaterMetrics = {
    totalLiters: 42750,
    deviceWater: 15200,
    dataWater: 18300,
    streamingWater: 9250,
    trend: {
      value: -8.3,
      isPositive: false
    },
    equivalences: {
      showers: 450,
      bottles: 85500,
      swimmingPools: 0.017
    }
  };

  const combinedMetrics = {
    carbon: {
      totalEmissions: 2847,
      intensity: 12.4,
      trend: { value: -5.2, isPositive: false }
    },
    water: waterMetrics
  };

  const waterBreakdown: WaterBreakdown = {
    manufacturing: 35.6,
    dataCenter: 42.8,
    streaming: 21.6,
    other: 0
  };

  const waterHistory: WaterHistoryPoint[] = [
    { date: '2024-01', liters: 48200, deviceWater: 16800, dataWater: 20100, streamingWater: 11300 },
    { date: '2024-02', liters: 46800, deviceWater: 16200, dataWater: 19800, streamingWater: 10800 },
    { date: '2024-03', liters: 45600, deviceWater: 15900, dataWater: 19200, streamingWater: 10500 },
    { date: '2024-04', liters: 44200, deviceWater: 15600, dataWater: 18900, streamingWater: 9700 },
    { date: '2024-05', liters: 43800, deviceWater: 15400, dataWater: 18700, streamingWater: 9700 },
    { date: '2024-06', liters: 42750, deviceWater: 15200, dataWater: 18300, streamingWater: 9250 }
  ];

  const departmentUsage: WaterDepartmentUsage[] = [
    { department: 'Technology', liters: 18500, employees: 145, perEmployee: 127.6, trend: -12.3 },
    { department: 'Sales', liters: 8900, employees: 89, perEmployee: 100.0, trend: -8.7 },
    { department: 'Marketing', liters: 7200, employees: 67, perEmployee: 107.5, trend: -15.2 },
    { department: 'HR', liters: 4800, employees: 34, perEmployee: 141.2, trend: 5.8 },
    { department: 'Finance', liters: 3350, employees: 28, perEmployee: 119.6, trend: -3.4 }
  ];

  const industryBenchmark = {
    industry: 52000,
    sector: 48500,
    company: 42750,
    percentile: 25 // Company is in top 25% (lower water usage)
  };

  const aiRecommendations = [
    {
      priority: 'high',
      title: 'Optimize Streaming Quality',
      description: 'Reduce default video quality to 720p for internal meetings',
      impact: '~3,200L/month savings',
      effort: 'Low'
    },
    {
      priority: 'medium',
      title: 'Data Center Efficiency',
      description: 'Migrate to water-efficient cloud providers',
      impact: '~5,800L/month savings',
      effort: 'Medium'
    },
    {
      priority: 'low',
      title: 'Device Lifecycle Extension',
      description: 'Extend laptop replacement cycle from 3 to 4 years',
      impact: '~2,100L/month savings',
      effort: 'High'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {translate('water-impact-title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {translate('water-impact-subtitle')}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200">
            <Download className="w-4 h-4" />
            {translate('export-report')}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
        {viewModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                viewMode === mode.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {translate(mode.label.toLowerCase())}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* AI Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  💧 {translate('ai-water-optimization')} - Recommandations
                </h3>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <p><strong>{translate('immediate-impact')} :</strong> Réduisez la qualité de streaming pour économiser 3 200L/mois (~34 douches)</p>
                  <p><strong>{translate('cloud-optimization')} :</strong> Migrez vers des centres de données économes en eau pour 5 800L/mois d'économies</p>
                  <p><strong>{translate('device-lifecycle')} :</strong> Étendez les cycles d'ordinateurs portables pour réduire l'empreinte hydrique de fabrication de 15%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WaterFootprintCard waterMetrics={waterMetrics} />
            <CombinedCO2WaterWidget metrics={combinedMetrics} />
          </div>

          {/* Water Savings and Benchmark */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WaterSavingsCard
              savedLiters={5200}
              trend={8.3}
              equivalences={{
                showers: 52,
                bottles: 10400,
                swimmingPools: 0.002
              }}
            />
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    Top 25%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Industry benchmark</div>
                </div>
              </div>
              <div className="text-sm text-emerald-600">
                18% below sector average
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    127.6L
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Per employee/month</div>
                </div>
              </div>
              <div className="text-sm text-blue-600">
                ≈ 1.3 showers per person
              </div>
            </div>
          </div>

          {/* Water Usage Trend Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{translate('water-usage-trend')}</h3>
              <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setTimeframe(tf.id)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                      timeframe === tf.id
                        ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative h-80">
              <svg viewBox="0 0 800 300" className="w-full h-full">
                <defs>
                  <linearGradient id="waterAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((line) => (
                  <line
                    key={line}
                    x1="80"
                    y1={50 + line * 40}
                    x2="750"
                    y2={50 + line * 40}
                    stroke="rgba(148, 163, 184, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Y-axis labels */}
                {[50000, 48000, 46000, 44000, 42000, 40000].map((value, index) => (
                  <text
                    key={index}
                    x="70"
                    y={55 + index * 40}
                    textAnchor="end"
                    className="text-xs fill-slate-500 dark:fill-slate-400"
                  >
                    {(value / 1000).toFixed(0)}k
                  </text>
                ))}
                
                {/* Water usage line */}
                <path
                  d={`M 80 ${250 - ((waterHistory[0].liters - 40000) / 10000) * 200} ${waterHistory.slice(1).map((point, index) => 
                    `L ${80 + (index + 1) * 110} ${250 - ((point.liters - 40000) / 10000) * 200}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Area fill */}
                <path
                  d={`M 80 250 L 80 ${250 - ((waterHistory[0].liters - 40000) / 10000) * 200} ${waterHistory.slice(1).map((point, index) => 
                    `L ${80 + (index + 1) * 110} ${250 - ((point.liters - 40000) / 10000) * 200}`
                  ).join(' ')} L 750 250 Z`}
                  fill="url(#waterAreaGradient)"
                />
                
                {/* Data points */}
                {waterHistory.map((point, index) => (
                  <circle
                    key={index}
                    cx={80 + index * 110}
                    cy={250 - ((point.liters - 40000) / 10000) * 200}
                    r="4"
                    fill="#3b82f6"
                    className="drop-shadow-sm"
                  />
                ))}
                
                {/* X-axis labels */}
                {waterHistory.map((point, index) => (
                  <text
                    key={index}
                    x={80 + index * 110}
                    y="280"
                    textAnchor="middle"
                    className="text-xs fill-slate-500 dark:fill-slate-400"
                  >
                    {point.date.split('-')[1]}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Breakdown Tab */}
      {viewMode === 'breakdown' && (
        <div className="space-y-6">
          {/* Water Usage Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Water Usage Breakdown</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Donut Chart */}
              <div className="relative w-80 h-80 mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  <defs>
                    <linearGradient id="manufacturingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="dataCenterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                    <linearGradient id="streamingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.1)"
                    strokeWidth="20"
                  />
                  
                  {/* Manufacturing segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#manufacturingGradient)"
                    strokeWidth="20"
                    strokeDasharray={`${(waterBreakdown.manufacturing / 100) * 502.65} 502.65`}
                    strokeDashoffset={0}
                  />
                  
                  {/* Data Center segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#dataCenterGradient)"
                    strokeWidth="20"
                    strokeDasharray={`${(waterBreakdown.dataCenter / 100) * 502.65} 502.65`}
                    strokeDashoffset={-((waterBreakdown.manufacturing / 100) * 502.65)}
                  />
                  
                  {/* Streaming segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#streamingGradient)"
                    strokeWidth="20"
                    strokeDasharray={`${(waterBreakdown.streaming / 100) * 502.65} 502.65`}
                    strokeDashoffset={-((waterBreakdown.manufacturing + waterBreakdown.dataCenter) / 100) * 502.65}
                  />
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {(waterMetrics.totalLiters / 1000).toFixed(1)}k
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Total Liters
                  </div>
                </div>
              </div>
              
              {/* Legend and Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Device Manufacturing</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{waterBreakdown.manufacturing}%</span>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {waterMetrics.deviceWater.toLocaleString()} L
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Data Centers</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{waterBreakdown.dataCenter}%</span>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {waterMetrics.dataWater.toLocaleString()} L
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Streaming & Media</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{waterBreakdown.streaming}%</span>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {waterMetrics.streamingWater.toLocaleString()} L
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Equivalences */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Water Equivalences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Shower className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {waterMetrics.equivalences.showers} showers
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets className="w-4 h-4 text-cyan-500" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {waterMetrics.equivalences.bottles.toLocaleString()} water bottles
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Waves className="w-4 h-4 text-purple-500" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {waterMetrics.equivalences.swimmingPools.toFixed(3)} swimming pools
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">AI Optimization Recommendations</h3>
            
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority === 'high' ? 'High Priority' : 
                         rec.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                      </div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {rec.effort} effort
                      </div>
                    </div>
                    <div className="text-sm text-blue-600 font-semibold">
                      {rec.impact}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {rec.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {rec.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                      Implement
                    </button>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Departments Tab */}
      {viewMode === 'departments' && (
        <div className="space-y-6">
          {/* Department Usage Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Water Usage by Department</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Total Usage</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Per Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Trend</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Equivalence</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentUsage.map((dept, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{dept.department}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{dept.employees} employees</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {(dept.liters / 1000).toFixed(1)}k L
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {dept.perEmployee.toFixed(1)} L
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`flex items-center gap-1 font-semibold ${
                          dept.trend < 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {dept.trend < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <TrendingUp className="w-4 h-4" />
                          )}
                          {Math.abs(dept.trend)}%
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          ≈ {Math.round(dept.liters / 95)} showers
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Department Performance Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-6">Water Usage per Employee by Department</h3>
            
            <div className="relative h-80">
              <svg viewBox="0 0 800 300" className="w-full h-full">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((line) => (
                  <line
                    key={line}
                    x1="80"
                    y1={50 + line * 40}
                    x2="750"
                    y2={50 + line * 40}
                    stroke="rgba(148, 163, 184, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Y-axis labels */}
                {[150, 120, 90, 60, 30, 0].map((value, index) => (
                  <text
                    key={index}
                    x="70"
                    y={55 + index * 40}
                    textAnchor="end"
                    className="text-xs fill-slate-500 dark:fill-slate-400"
                  >
                    {value}L
                  </text>
                ))}
                
                {/* Bars */}
                {departmentUsage.map((dept, index) => {
                  const barHeight = (dept.perEmployee / 150) * 200;
                  const x = 120 + index * 120;
                  const y = 250 - barHeight;
                  
                  return (
                    <g key={index}>
                      <rect
                        x={x}
                        y={y}
                        width="80"
                        height={barHeight}
                        fill="#3b82f6"
                        rx="4"
                        className="hover:fill-blue-600 transition-colors duration-200"
                      />
                      <text
                        x={x + 40}
                        y="280"
                        textAnchor="middle"
                        className="text-xs fill-slate-500 dark:fill-slate-400"
                      >
                        {dept.department}
                      </text>
                      <text
                        x={x + 40}
                        y={y - 5}
                        textAnchor="middle"
                        className="text-xs fill-slate-700 dark:fill-slate-300 font-medium"
                      >
                        {dept.perEmployee.toFixed(0)}L
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterImpactSection;