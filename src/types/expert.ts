
export interface Expert {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  experience: string;
  projects: string;
  description: string;
  regions: string[];
  services: string[];
  education?: string;
  certifications?: string[];
  contact?: string;
  email?: string;
  achievements?: string;
  isRegionalManager?: boolean;  // 지역 총괄 책임자 여부
  managedRegions?: string[];    // 총괄 책임자가 담당하는 지역들
}

export interface NewExpert extends Omit<Expert, 'id'> {}
