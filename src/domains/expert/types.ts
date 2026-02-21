
import { ReactNode } from 'react';

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
  certifications?: string[];
  contact?: string;
  email?: string;
  isRegionalManager?: boolean;
  managedRegions?: string[];
  displayOrder?: number;
  showOnMain?: boolean;
  isApproved?: boolean;
  applicationStatus?: 'pending' | 'approved' | 'rejected';
  applicationDate?: string;
  approvalDate?: string;
  rejectionReason?: string;
  
  // Detailed profile fields
  coverImage?: string;
  keyAchievements?: string[];
  educationHistory?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  careerTimeline?: Array<{
    year: string;
    position: string;
    company: string;
    description: string;
  }>;
  successCases?: Array<{
    title: string;
    description: string;
    image?: string;
    results: string[];
  }>;
  testimonials?: Array<{
    name: string;
    position: string;
    content: string;
    image?: string;
    video?: string;
  }>;
  profileViews?: number;
}

export interface NewExpert extends Omit<Expert, 'id'> {}

export interface ExpertsContextType {
  experts: Expert[];
  loading: boolean;
  addExpert: (expert: NewExpert) => void;
  updateExpert: (expert: Expert) => void;
  deleteExpert: (id: number) => void;
  updateExpertsOrder: (newOrder: Expert[]) => void;
  toggleExpertMainVisibility: (id: number) => void;
  applyAsExpert: (expert: NewExpert) => void;
  approveExpert: (id: number) => void;
  rejectExpert: (id: number, reason: string) => void;
  pendingApplications: Expert[];
  getExpertById: (id: number) => Expert | undefined;
}

export interface ExpertsProviderProps {
  children: ReactNode;
}
