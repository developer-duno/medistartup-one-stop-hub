import { Expert } from '@/types/expert';

// DB row → Expert type mapping
export interface ExpertRow {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string | null;
  experience: string | null;
  projects: string | null;
  description: string | null;
  regions: string[] | null;
  services: string[] | null;
  certifications: string[] | null;
  contact: string | null;
  email: string | null;
  is_regional_manager: boolean | null;
  managed_regions: string[] | null;
  display_order: number | null;
  show_on_main: boolean | null;
  is_approved: boolean | null;
  application_status: string | null;
  application_date: string | null;
  approval_date: string | null;
  rejection_reason: string | null;
  cover_image: string | null;
  key_achievements: string[] | null;
  education_history: any[] | null;
  career_timeline: any[] | null;
  success_cases: any[] | null;
  testimonials: any[] | null;
  profile_views: number | null;
  created_at: string;
  updated_at: string;
}

export const mapRowToExpert = (row: ExpertRow): Expert => ({
  id: row.id,
  name: row.name,
  role: row.role,
  specialty: row.specialty,
  image: row.image || '',
  experience: row.experience || '',
  projects: row.projects || '',
  description: row.description || '',
  regions: row.regions || [],
  services: row.services || [],
  certifications: row.certifications || [],
  contact: row.contact || '',
  email: row.email || '',
  isRegionalManager: row.is_regional_manager || false,
  managedRegions: row.managed_regions || [],
  displayOrder: row.display_order ?? 0,
  showOnMain: row.show_on_main ?? true,
  isApproved: row.is_approved ?? true,
  applicationStatus: (row.application_status as 'pending' | 'approved' | 'rejected') || 'approved',
  applicationDate: row.application_date || undefined,
  approvalDate: row.approval_date || undefined,
  rejectionReason: row.rejection_reason || '',
  coverImage: row.cover_image || '',
  keyAchievements: row.key_achievements || [],
  educationHistory: (row.education_history as any[]) || [],
  careerTimeline: (row.career_timeline as any[]) || [],
  successCases: (row.success_cases as any[]) || [],
  testimonials: (row.testimonials as any[]) || [],
  profileViews: row.profile_views ?? 0,
});

export const mapExpertToRow = (expert: Expert | Omit<Expert, 'id'>) => ({
  ...('id' in expert ? { id: expert.id } : {}),
  name: expert.name,
  role: expert.role,
  specialty: expert.specialty,
  image: expert.image || '',
  experience: expert.experience || '',
  projects: expert.projects || '',
  description: expert.description || '',
  regions: expert.regions || [],
  services: expert.services || [],
  certifications: expert.certifications || [],
  contact: expert.contact || '',
  email: expert.email || '',
  is_regional_manager: expert.isRegionalManager || false,
  managed_regions: expert.managedRegions || [],
  display_order: expert.displayOrder ?? 0,
  show_on_main: expert.showOnMain ?? true,
  is_approved: expert.isApproved ?? true,
  application_status: expert.applicationStatus || 'approved',
  application_date: expert.applicationDate || null,
  approval_date: expert.approvalDate || null,
  rejection_reason: expert.rejectionReason || '',
  cover_image: expert.coverImage || '',
  key_achievements: expert.keyAchievements || [],
  education_history: expert.educationHistory || [],
  career_timeline: expert.careerTimeline || [],
  success_cases: expert.successCases || [],
  testimonials: expert.testimonials || [],
});
