export interface WaterMetrics {
  totalLiters: number;
  deviceWater: number; // Amortized manufacturing liters
  dataWater: number;   // Data center liters
  streamingWater: number; // Streaming liters
  trend: {
    value: number;
    isPositive: boolean;
  };
  equivalences: {
    showers: number;
    bottles: number;
    swimmingPools: number;
  };
}

export interface WaterBreakdown {
  manufacturing: number;
  dataCenter: number;
  streaming: number;
  other: number;
}

export interface WaterBenchmark {
  industry: number;
  sector: number;
  company: number;
  percentile: number;
}

export interface WaterHistoryPoint {
  date: string;
  liters: number;
  deviceWater: number;
  dataWater: number;
  streamingWater: number;
}

export interface WaterDepartmentUsage {
  department: string;
  liters: number;
  employees: number;
  perEmployee: number;
  trend: number;
}

export interface CombinedMetrics {
  carbon: {
    totalEmissions: number;
    intensity: number;
    trend: { value: number; isPositive: boolean };
  };
  water: WaterMetrics;
}