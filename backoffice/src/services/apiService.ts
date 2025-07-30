// API Service to connect to GreenGrows API
const API_BASE_URL = 'http://141.95.160.10:3001/api';

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
  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
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
      // Return mock data with error indication if API is unavailable
      throw error; // Let the calling component handle the error
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
      // Test with health endpoint first
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/health`);
      if (response.ok) {
        const result = await response.json();
        return result.success === true;
      }
      
      // Fallback to stats endpoint
      const stats = await this.getStats();
      return stats.success !== false;
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

  // Méthodes pour la gestion des utilisateurs
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
      console.error('❌ Error posting CO2 data with user:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();