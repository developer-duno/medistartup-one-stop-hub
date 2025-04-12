
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
}

export interface NewExpert extends Omit<Expert, 'id'> {}
