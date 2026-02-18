
-- 1. admin_settings의 서비스 역할 정책을 더 제한적으로 변경
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Service role can read settings" ON public.admin_settings;

-- 서비스 역할은 notification_email과 sender_email만 읽을 수 있도록 제한
CREATE POLICY "Service role can read notification settings"
  ON public.admin_settings
  FOR SELECT
  USING (key IN ('notification_email', 'sender_email'));
