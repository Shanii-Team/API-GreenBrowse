// Fallback API service that provides demo data when real API is unavailable
import { CO2Stats, CO2Data, User, UsersResponse, UserStats } from './apiService';

export class FallbackApiService {
  private demoData: CO2Stats = {
    success: true,
    data: {
      total: 2.847,
      details: {
        'webpage': 1.234,
        'video': 0.789,
        'image': 0.456,
        'script': 0.368
      }
    }
  };

  private demoUsers: User[] = [
    {
      id: 'demo-user-1',
      profile: {
        name: 'Utilisateur Demo 1',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        deviceInfo: { platform: 'chrome-extension', version: '1.0.0' }
      },
      totalCO2: 1.456,
      lastActivity: new Date(Date.now() - 3600000).toISOString(),
      typesCount: 3
    },
    {
      id: 'demo-user-2', 
      profile: {
        name: 'Utilisateur Demo 2',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        deviceInfo: { platform: 'flutter', version: '3.0.0' }
      },
      totalCO2: 1.391,
      lastActivity: new Date(Date.now() - 1800000).toISOString(),
      typesCount: 2
    }
  ];

  async getStats(): Promise<CO2Stats> {
    console.log('🎭 Using fallback demo data for stats');
    return Promise.resolve(this.demoData);
  }

  async getUsers(): Promise<UsersResponse> {
    console.log('🎭 Using fallback demo data for users');
    return Promise.resolve({
      success: true,
      data: {
        users: this.demoUsers,
        totalUsers: this.demoUsers.length,
        globalTotal: this.demoData.data.total
      }
    });
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const user = this.demoUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    return Promise.resolve({
      success: true,
      data: {
        userId: user.id,
        profile: user.profile,
        total: user.totalCO2,
        details: {
          'webpage': user.totalCO2 * 0.6,
          'video': user.totalCO2 * 0.4
        },
        lastActivity: user.lastActivity
      }
    });
  }

  async postCO2Data(data: CO2Data): Promise<boolean> {
    console.log('🎭 Simulating CO2 data post:', data);
    
    // Simulate adding data
    this.demoData.data.total += data.co2;
    if (!this.demoData.data.details[data.type]) {
      this.demoData.data.details[data.type] = 0;
    }
    this.demoData.data.details[data.type] += data.co2;
    
    return Promise.resolve(true);
  }

  async testConnection(): Promise<boolean> {
    console.log('🎭 Fallback service - always returns true');
    return Promise.resolve(true);
  }

  async getHealth(): Promise<{ success: boolean; message?: string; timestamp?: string; version?: string }> {
    return Promise.resolve({
      success: true,
      message: 'Fallback demo service is running',
      timestamp: new Date().toISOString(),
      version: 'demo-1.0.0'
    });
  }

  // Add random variation to demo data
  private addRandomVariation() {
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    this.demoData.data.total += variation;
    
    Object.keys(this.demoData.data.details).forEach(key => {
      this.demoData.data.details[key] += variation * Math.random();
    });
  }

  // Simulate live data updates
  startLiveDemo() {
    setInterval(() => {
      this.addRandomVariation();
      console.log('🎭 Demo data updated:', this.demoData.data.total.toFixed(3));
    }, 30000); // Update every 30 seconds
  }
}

export const fallbackApiService = new FallbackApiService();