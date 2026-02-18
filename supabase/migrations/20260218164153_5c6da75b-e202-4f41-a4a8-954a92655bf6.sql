
-- 시뮬레이터 설정 테이블 생성
CREATE TABLE public.simulators (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('financial', 'revenue', 'staffing')),
  active BOOLEAN NOT NULL DEFAULT true,
  views INTEGER NOT NULL DEFAULT 0,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.simulators ENABLE ROW LEVEL SECURITY;

-- 공개 사용자는 활성화된 시뮬레이터만 조회 가능
CREATE POLICY "Public can view active simulators"
  ON public.simulators FOR SELECT
  USING (active = true);

-- 관리자 전체 접근
CREATE POLICY "Admins can read all simulators"
  ON public.simulators FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert simulators"
  ON public.simulators FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update simulators"
  ON public.simulators FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete simulators"
  ON public.simulators FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 타임스탬프 자동 업데이트 트리거
CREATE TRIGGER update_simulators_updated_at
  BEFORE UPDATE ON public.simulators
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 기본 시뮬레이터 데이터 삽입
INSERT INTO public.simulators (id, title, description, type, active, views, display_order) VALUES
  (1, '개원 비용 시뮬레이터', '진료과목별 평균 개원 비용 시뮬레이션', 'financial', true, 120, 1),
  (2, '수익성 분석 시뮬레이터', '지역 및 진료과목별 예상 수익 시뮬레이션', 'revenue', true, 85, 2),
  (3, '인력 구성 시뮬레이터', '병원 규모별 최적 인력 구성 시뮬레이션', 'staffing', true, 60, 3);

-- 시퀀스를 다음 값으로 설정
SELECT setval('simulators_id_seq', 3);
