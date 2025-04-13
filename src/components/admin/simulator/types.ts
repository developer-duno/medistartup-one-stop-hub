
export interface Simulator {
  id: number;
  title: string;
  description: string;
  type: string;
  active: boolean;
  views: number;
}

export interface UsageData {
  date: string;
  views: number;
}

export interface SimulatorTestParams {
  specialty?: string;
  size?: number;
  location?: string;
  patients?: number;
  region?: string;
  services?: string[];
}
