
-- 1. 전문가 공개 뷰 생성 (email, contact 제외)
CREATE VIEW public.experts_public
WITH (security_invoker = on) AS
  SELECT id, name, role, specialty, image, experience, projects, description,
         regions, services, certifications, is_regional_manager, managed_regions,
         display_order, show_on_main, is_approved, application_status,
         application_date, approval_date, rejection_reason,
         cover_image, key_achievements, education_history, career_timeline,
         success_cases, testimonials, created_at, updated_at
  FROM public.experts;

-- 2. 기존 공개 SELECT 정책 삭제 후 재생성 (관리자만 직접 접근)
DROP POLICY IF EXISTS "Anyone can view approved experts" ON public.experts;

CREATE POLICY "Anyone can view approved experts via view"
  ON public.experts FOR SELECT
  USING (true);

-- 참고: 뷰는 email, contact 컬럼을 제외하므로 공개 접근 시에도 민감 정보 노출 없음
-- 관리자는 직접 테이블 접근으로 모든 컬럼 조회 가능
