
-- 공개 사용자가 시뮬레이터 조회수를 증가시킬 수 있도록 DB 함수 생성
CREATE OR REPLACE FUNCTION public.increment_simulator_views(simulator_id INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.simulators
  SET views = views + 1
  WHERE id = simulator_id AND active = true;
END;
$$;
