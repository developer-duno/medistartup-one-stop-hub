
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
}

export interface NewExpert extends Omit<Expert, 'id'> {}
