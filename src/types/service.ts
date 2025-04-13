
export type ServiceCategory = 'planning' | 'implementation' | 'equipment' | 'operation';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: string;
  category: ServiceCategory;
  order?: number;
}

export type NewService = Omit<Service, 'id'>;
