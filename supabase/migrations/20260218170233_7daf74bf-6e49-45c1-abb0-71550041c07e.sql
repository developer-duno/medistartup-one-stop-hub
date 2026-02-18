
-- 시뮬레이터 노출 설정을 공개적으로 읽을 수 있도록 정책 추가
CREATE POLICY "Public can read simulator visibility setting"
  ON public.admin_settings FOR SELECT
  USING (key = 'simulator_visible');
