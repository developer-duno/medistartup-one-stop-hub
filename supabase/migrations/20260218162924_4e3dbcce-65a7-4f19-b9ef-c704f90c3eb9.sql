
-- experts 테이블: 공개 SELECT를 제거하고 관리자 전용으로 변경
-- 프론트엔드는 experts_public 뷰를 통해 접근
DROP POLICY IF EXISTS "Anyone can view approved experts via view" ON public.experts;

-- 관리자만 직접 테이블 접근 가능
CREATE POLICY "Admins can read all experts"
  ON public.experts FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 공개 사용자는 뷰를 통해서만 접근 가능하도록 별도 정책
-- security_invoker=on 뷰이므로 뷰를 통한 SELECT도 정책이 필요
-- 승인된 전문가만 뷰를 통해 볼 수 있도록 제한
CREATE POLICY "Public can view approved experts"
  ON public.experts FOR SELECT
  USING (is_approved = true);
