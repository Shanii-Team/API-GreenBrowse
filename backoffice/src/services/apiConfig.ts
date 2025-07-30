// API Configuration with environment detection
export class ApiConfig {
  private static instance: ApiConfig;
  private baseUrl: string;

  private constructor() {
    // Detect environment and set appropriate API URL
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';
    
    const isHTTPS = window.location.protocol === 'https:';
    
    // If we're on HTTPS or deployed, we might need to use a proxy or different URL
    if (isHTTPS && !isLocalhost) {
      // Option 1: Use relative URL (same domain)
      this.baseUrl = '/api';
      console.log('🔒 Using HTTPS - Using relative API URL');
    } else {
      // Option 2: Direct HTTP connection
      this.baseUrl = 'http://141.95.160.10:3002/api';
      console.log('🌐 Using HTTP - Direct connection to VPS');
    }
    
    console.log('⚙️ API Configuration:', {
      currentLocation: window.location.href,
      isHTTPS,
      isLocalhost,
      apiBaseUrl: this.baseUrl
    });
  }

  public static getInstance(): ApiConfig {
    if (!ApiConfig.instance) {
      ApiConfig.instance = new ApiConfig();
    }
    return ApiConfig.instance;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  // Test different URL configurations
  public async testConnections(): Promise<{ url: string; success: boolean; error?: string }[]> {
    const urlsToTest = [
      'http://141.95.160.10:3001/api',
      'https://141.95.160.10:3001/api', 
      '/api',
      'http://localhost:3001/api'
    ];

    const results = [];
    
    for (const url of urlsToTest) {
      try {
        console.log(`🧪 Testing connection to: ${url}/health`);
        const response = await fetch(`${url}/health`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          results.push({ url, success: true });
          console.log(`✅ ${url} - Success:`, data);
        } else {
          results.push({ url, success: false, error: `HTTP ${response.status}` });
        }
      } catch (error) {
        results.push({ url, success: false, error: error.message });
        console.log(`❌ ${url} - Failed:`, error.message);
      }
    }
    
    return results;
  }
}

export const apiConfig = ApiConfig.getInstance();