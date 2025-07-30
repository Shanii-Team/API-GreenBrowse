import { useState, useEffect, useCallback } from 'react';
import { apiService, CO2Stats } from '../services/apiService';

export const useCO2Data = (refreshInterval = 5000) => {
  const [data, setData] = useState<CO2Stats>({
    success: true,
    data: { total: 0, details: {} }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasRealData, setHasRealData] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      console.log('🔄 Fetching CO2 data from API...');
      const stats = await apiService.getStats();
      console.log('📊 API Response:', stats);
      
      setData(stats);
      setIsConnected(true);
      setHasRealData(stats.data.total > 0 || Object.keys(stats.data.details).length > 0);
      
      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      console.error('❌ Error fetching CO2 data:', err);
      setError(err instanceof Error ? err.message : 'API connection failed');
      setIsConnected(false);
      setHasRealData(false);
      
      // Keep fallback data structure for UI components
      setData({
        success: false,
        data: { total: 0, details: {} }
      });
      
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
    hasRealData,
    refresh: fetchData,
    testConnection,
  };
};