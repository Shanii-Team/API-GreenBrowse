import { useState, useEffect, useCallback } from 'react';
import { apiService, CO2Stats } from '../services/apiService';

export const useCO2Data = (refreshInterval = 5000) => {
  const [data, setData] = useState<CO2Stats>({
    success: false,
    data: { total: 0, details: {} }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const stats = await apiService.getStats();
      setData(stats);
      setIsConnected(stats.success !== false);
      
      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsConnected(false);
      
      if (loading) {
        setLoading(false);
      }
    }
  }, [loading]);

  const testConnection = useCallback(async () => {
    const connected = await apiService.testConnection();
    setIsConnected(connected);
    return connected;
  }, []);

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    data: data.data,
    loading,
    error,
    isConnected,
    refresh: fetchData,
    testConnection,
  };
};