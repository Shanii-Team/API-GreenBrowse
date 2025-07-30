import { useState, useEffect, useCallback } from 'react';
import { apiService, User, UsersResponse } from '../services/apiService';

export const useUsers = (refreshInterval = 10000) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [globalTotal, setGlobalTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setError(null);
      const response: UsersResponse = await apiService.getUsers();
      
      if (response.success) {
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);
        setGlobalTotal(response.data.globalTotal);
      } else {
        setError('Failed to fetch users');
      }
      
      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      if (loading) {
        setLoading(false);
      }
    }
  }, [loading]);

  const deleteUser = useCallback(async (userId: string) => {
    const success = await apiService.deleteUser(userId);
    if (success) {
      await fetchUsers(); // Refresh the list
    }
    return success;
  }, [fetchUsers]);

  const updateUserProfile = useCallback(async (userId: string, profile: { name?: string; deviceInfo?: any }) => {
    const success = await apiService.updateUserProfile(userId, profile);
    if (success) {
      await fetchUsers(); // Refresh the list
    }
    return success;
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
    
    const interval = setInterval(fetchUsers, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchUsers, refreshInterval]);

  return {
    users,
    totalUsers,
    globalTotal,
    loading,
    error,
    refresh: fetchUsers,
    deleteUser,
    updateUserProfile,
  };
};