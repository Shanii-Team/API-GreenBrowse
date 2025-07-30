import React, { useState } from 'react';
import { Users, UserCheck, Trash2, Edit3, Activity, Calendar, Smartphone } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { User } from '../services/apiService';

const UsersSection: React.FC = () => {
  const { users, totalUsers, globalTotal, loading, error, deleteUser, updateUserProfile, refresh } = useUsers();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user.id);
    setEditName(user.profile.name);
  };

  const handleSaveEdit = async () => {
    if (editingUser && editName.trim()) {
      const success = await updateUserProfile(editingUser, { name: editName.trim() });
      if (success) {
        setEditingUser(null);
        setEditName('');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditName('');
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      await deleteUser(userId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCO2 = (co2: number) => {
    return co2 < 1 ? `${(co2 * 1000).toFixed(0)} g` : `${co2.toFixed(3)} kg`;
  };

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold">Gestion des utilisateurs</h2>
          </div>
          
          <button
            onClick={refresh}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            <Activity className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Utilisateurs actifs</span>
            </div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {totalUsers}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Total CO₂</span>
            </div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {formatCO2(globalTotal)}CO₂e
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Moyenne par utilisateur</span>
            </div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {formatCO2(totalUsers > 0 ? globalTotal / totalUsers : 0)}CO₂e
            </div>
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Liste des utilisateurs</h3>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl">
            <p className="text-red-600 dark:text-red-400">❌ {error}</p>
          </div>
        )}

        {users.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun utilisateur trouvé</p>
            <p className="text-sm">Les utilisateurs apparaîtront lors de l'utilisation des applications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {user.profile.name.charAt(0).toUpperCase()}
                      </div>
                      
                      {editingUser === user.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                            autoFocus
                          />
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            ✓
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {user.profile.name}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            ID: {user.id}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-500" />
                        <span className="text-slate-600 dark:text-slate-400">CO₂:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {formatCO2(user.totalCO2)}CO₂e
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-slate-600 dark:text-slate-400">Dernière activité:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {formatDate(user.lastActivity)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-purple-500" />
                        <span className="text-slate-600 dark:text-slate-400">Types de données:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {user.typesCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersSection;