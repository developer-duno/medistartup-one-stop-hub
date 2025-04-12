
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
  displayOrder?: number;        // 전문가 표시 순서
  showOnMain?: boolean;         // 메인 페이지에 표시 여부
}

export interface NewExpert extends Omit<Expert, 'id'> {}
