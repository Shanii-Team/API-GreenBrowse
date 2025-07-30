import React, { useState, useEffect } from 'react';
import { Activity, User, Globe, TrendingUp, Clock } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { formatNumber } from '../utils/formatNumber';

interface ActivityItem {
  id: string;
  type: 'user_joined' | 'co2_recorded' | 'milestone' | 'high_activity';
  message: string;
  timestamp: string;
  userId?: string;
  userName?: string;
  value?: number;
}

const ActivityFeed: React.FC = () => {
  const { users, totalUsers, globalTotal } = useUsers();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Generate activity feed from user data
    const generateActivities = () => {
      const newActivities: ActivityItem[] = [];

      users.forEach(user => {
        // New user activity
        if (user.profile.createdAt) {
          newActivities.push({
            id: `user-${user.id}`,
            type: 'user_joined',
            message: `${user.profile.name} a rejoint la plateforme`,
            timestamp: user.profile.createdAt,
            userId: user.id,
            userName: user.profile.name
          });
        }

        // High CO2 activity
        if (user.totalCO2 > 5) {
          newActivities.push({
            id: `co2-${user.id}`,
            type: 'high_activity',
            message: `${user.profile.name} a généré ${formatNumber(user.totalCO2, 'co2')}`,
            timestamp: user.lastActivity,
            userId: user.id,
            userName: user.profile.name,
            value: user.totalCO2
          });
        }
      });

      // Global milestones
      if (globalTotal > 10) {
        newActivities.push({
          id: 'milestone-10kg',
          type: 'milestone',
          message: `🎉 Milestone atteint: ${formatNumber(globalTotal, 'co2')} collectés !`,
          timestamp: new Date().toISOString()
        });
      }

      // Sort by timestamp (most recent first)
      return newActivities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10); // Keep only 10 most recent
    };

    setActivities(generateActivities());
  }, [users, globalTotal]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_joined': return <User className="w-4 h-4" />;
      case 'co2_recorded': return <Globe className="w-4 h-4" />;
      case 'milestone': return <TrendingUp className="w-4 h-4" />;
      case 'high_activity': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_joined': return 'from-blue-500 to-blue-600';
      case 'co2_recorded': return 'from-green-500 to-green-600';
      case 'milestone': return 'from-yellow-500 to-orange-600';
      case 'high_activity': return 'from-red-500 to-red-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins}min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    
    return date.toLocaleDateString('fr-FR');
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Activité Récente</h2>
        </div>
        
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucune activité récente</p>
          <p className="text-sm">L'activité apparaîtra quand les utilisateurs interagiront avec l'extension</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Activité Récente</h2>
        <div className="ml-auto text-sm text-slate-500 dark:text-slate-400">
          {activities.length} événements
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 hover:shadow-sm transition-all duration-200"
          >
            <div className={`w-8 h-8 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {activity.message}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {formatTime(activity.timestamp)}
              </p>
            </div>

            {activity.type === 'high_activity' && activity.value && (
              <div className="flex-shrink-0 text-right">
                <div className="text-xs font-medium text-red-600 dark:text-red-400">
                  Impact élevé
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{totalUsers} utilisateurs actifs</span>
          <span>Dernière mise à jour: maintenant</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;