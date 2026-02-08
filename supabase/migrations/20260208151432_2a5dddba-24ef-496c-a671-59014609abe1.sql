
-- 1. 전문가 테이블
CREATE TABLE public.experts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialty TEXT NOT NULL,
  image TEXT DEFAULT '',
  experience TEXT DEFAULT '',
  projects TEXT DEFAULT '',
  description TEXT DEFAULT '',
  regions TEXT[] DEFAULT '{}',
  services TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  contact TEXT DEFAULT '',
  email TEXT DEFAULT '',
  is_regional_manager BOOLEAN DEFAULT false,
  managed_regions TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  show_on_main BOOLEAN DEFAULT true,
  is_approved BOOLEAN DEFAULT true,
  application_status TEXT DEFAULT 'approved' CHECK (application_status IN ('pending', 'approved', 'rejected')),
  application_date TIMESTAMPTZ,
  approval_date TIMESTAMPTZ,
  rejection_reason TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  key_achievements TEXT[] DEFAULT '{}',
  education_history JSONB DEFAULT '[]',
  career_timeline JSONB DEFAULT '[]',
  success_cases JSONB DEFAULT '[]',
  testimonials JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. 상담 신청 테이블
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  region TEXT NOT NULL,
  specialty TEXT NOT NULL,
  message TEXT DEFAULT '',
  selected_expert_ids INTEGER[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'completed', 'cancelled')),
  admin_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. 전문가 지원 신청 테이블
CREATE TABLE public.expert_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialty TEXT NOT NULL,
  image TEXT DEFAULT '',
  experience TEXT DEFAULT '',
  projects TEXT DEFAULT '',
  description TEXT DEFAULT '',
  regions TEXT[] DEFAULT '{}',
  services TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  contact TEXT DEFAULT '',
  email TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  key_achievements TEXT[] DEFAULT '{}',
  education_history JSONB DEFAULT '[]',
  career_timeline JSONB DEFAULT '[]',
  success_cases JSONB DEFAULT '[]',
  testimonials JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_applications ENABLE ROW LEVEL SECURITY;

-- 전문가: 누구나 조회 가능 (공개 데이터), 현재는 인증 없이 관리 가능 (추후 관리자 인증 추가 시 변경)
CREATE POLICY "Anyone can view approved experts"
ON public.experts FOR SELECT
USING (true);

CREATE POLICY "Allow insert experts"
ON public.experts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update experts"
ON public.experts FOR UPDATE
USING (true);

CREATE POLICY "Allow delete experts"
ON public.experts FOR DELETE
USING (true);

-- 상담 신청: 누구나 신청 가능, 조회는 관리자만 (추후 인증 추가 시 변경)
CREATE POLICY "Anyone can submit consultation"
ON public.consultations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow read consultations"
ON public.consultations FOR SELECT
USING (true);

CREATE POLICY "Allow update consultations"
ON public.consultations FOR UPDATE
USING (true);

-- 전문가 지원: 누구나 지원 가능, 조회/관리는 관리자만 (추후 인증 추가 시 변경)
CREATE POLICY "Anyone can submit expert application"
ON public.expert_applications FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow read expert applications"
ON public.expert_applications FOR SELECT
USING (true);

CREATE POLICY "Allow update expert applications"
ON public.expert_applications FOR UPDATE
USING (true);

-- 타임스탬프 자동 업데이트 함수
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 타임스탬프 트리거
CREATE TRIGGER update_experts_updated_at
BEFORE UPDATE ON public.experts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at
BEFORE UPDATE ON public.consultations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expert_applications_updated_at
BEFORE UPDATE ON public.expert_applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
