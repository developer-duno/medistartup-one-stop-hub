
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
  isApproved?: boolean;         // 관리자 승인 여부
  applicationStatus?: 'pending' | 'approved' | 'rejected'; // 신청 상태
  applicationDate?: string;     // 신청 날짜
  approvalDate?: string;        // 승인 날짜
  rejectionReason?: string;     // 반려 사유
  
  // 추가 상세 프로필 필드
  coverImage?: string;
  keyAchievements?: string[];
  educationHistory?: Array<{degree: string, institution: string, year: string}>;
  careerTimeline?: Array<{year: string, position: string, company: string, description: string}>;
  successCases?: Array<{
    title: string, 
    description: string, 
    image?: string, 
    results: string[]
  }>;
  testimonials?: Array<{
    name: string, 
    position: string, 
    content: string, 
    image?: string, 
    video?: string
  }>;
}

export interface NewExpert extends Omit<Expert, 'id'> {}
