
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
