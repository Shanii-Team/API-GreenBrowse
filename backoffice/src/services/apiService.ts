// API Service to connect to GreenGrows API
// Simplified version to avoid import errors

// API Base URL - using direct configuration to avoid import issues
const getApiBaseUrl = (): string => {
  // Direct access to VPS API with port
  return 'http://141.95.160.10:3001/api';
};

const API_BASE_URL = getApiBaseUrl();
console.log('🌐 API Base URL configured:', API_BASE_URL);

export interface CO2Stats {
  success: boolean;
  data: {
    total: number;
    details: Record<string, number>;
  };
}

export interface CO2Data {
  type: string;
  co2: number;
  userId?: string;
  deviceInfo?: any;
}

export interface User {
  id: string;
  profile: {
    name: string;
    createdAt: string;
    deviceInfo?: any;
  };
  totalCO2: number;
  lastActivity: string;
  typesCount?: number;
}

export interface UsersResponse {
  success: boolean;
  data: {
    users: User[];
    totalUsers: number;
    globalTotal: number;
  };
}

export interface UserStats {
  success: boolean;
  data: {
    userId: string;
    profile: {
      name: string;
      createdAt: string;
      deviceInfo?: any;
    };
    total: number;
    details: Record<string, number>;
    lastActivity: string;
  };
}

class ApiService {
  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      console.log('🔗 Attempting fetch to:', url);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
      });
      
      console.log('📡 Response received:', response.status, response.statusText);
      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('💥 Fetch error details:', {
        message: error?.message || 'Unknown error',
        name: error?.name || 'Error',
        url: url,
      });
      throw error;
    }
  }

  async getStats(): Promise<CO2Stats> {
    try {
      console.log('🌐 Making request to:', `${API_BASE_URL}/stats`);
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/stats`);
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('📊 Raw API result:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Error fetching CO2 stats:', error);
      throw error;
    }
  }

  async postCO2Data(data: CO2Data): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/co2`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('❌ Error posting CO2 data:', error);
      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/health`);
      if (response.ok) {
        const result = await response.json();
        return result.success === true;
      }
      return false;
    } catch (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
  }

  async getHealth(): Promise<{ success: boolean; message?: string; timestamp?: string; version?: string }> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching health status:', error);
      return {
        success: false,
        message: 'API unavailable'
      };
    }
  }

  async getUsers(): Promise<UsersResponse> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/users`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      return {
        success: false,
        data: {
          users: [],
          totalUsers: 0,
          globalTotal: 0
        }
      };
    }
  }

  async getUserStats(userId: string): Promise<UserStats> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/users/${userId}/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`❌ Error fetching user ${userId} stats:`, error);
      return {
        success: false,
        data: {
          userId,
          profile: { name: 'Unknown', createdAt: '' },
          total: 0,
          details: {},
          lastActivity: ''
        }
      };
    }
  }

  async updateUserProfile(userId: string, profile: { name?: string; deviceInfo?: any }): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/users/${userId}/profile`, {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error(`❌ Error updating user ${userId} profile:`, error);
      return false;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error(`❌ Error deleting user ${userId}:`, error);
      return false;
    }
  }

  async postCO2DataWithUser(data: CO2Data): Promise<boolean> {
    return this.postCO2Data(data); // Same method, different name for compatibility
  }
}

export const apiService = new ApiService();