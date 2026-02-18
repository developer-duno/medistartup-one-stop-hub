
-- Create success_stories table
CREATE TABLE public.success_stories (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  hospital TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  services TEXT[] NOT NULL DEFAULT '{}',
  date TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  content TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- Public can read visible stories
CREATE POLICY "Public can view visible stories"
  ON public.success_stories FOR SELECT
  USING (visible = true);

-- Admins can read all stories
CREATE POLICY "Admins can read all stories"
  ON public.success_stories FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert
CREATE POLICY "Admins can insert stories"
  ON public.success_stories FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update
CREATE POLICY "Admins can update stories"
  ON public.success_stories FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete
CREATE POLICY "Admins can delete stories"
  ON public.success_stories FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_success_stories_updated_at
  BEFORE UPDATE ON public.success_stories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default data
INSERT INTO public.success_stories (title, hospital, location, services, date, image_url, featured, visible, content, summary) VALUES
('서울 강남구 피부과 성공적 개원', '미소피부과의원', '서울 강남', ARRAY['입지 분석', '인테리어', '마케팅'], '2023-03-15', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop', true, true, '미소피부과의원은 MediStartup과 함께 강남 지역의 특성을 고려한 입지 분석부터 시작했습니다. 유동인구가 많고 접근성이 좋은 위치를 선정했으며, 타겟 고객층에 맞는 인테리어와 마케팅 전략을 수립하였습니다. 개원 3개월 만에 손익분기점을 돌파하는 성과를 거두었습니다.', 'MediStartup과 함께 효율적인 운영 시스템을 구축하여 환자 만족도를 크게 향상시켰습니다.'),
('대전 둔산동 소아과 리모델링', '행복소아과의원', '대전 서구', ARRAY['인테리어', '의료기기'], '2023-02-10', 'https://images.unsplash.com/photo-1629909614088-7dd6c3197533?q=80&w=2069&auto=format&fit=crop', false, true, '행복소아과의원은 10년 된 의원의 리모델링을 통해 새로운 도약을 준비했습니다. MediStartup은 아이들이 편안함을 느낄 수 있는 인테리어 디자인과 최신 의료기기 도입을 통해 진료 효율성을 높였습니다. 리모델링 후 환자 만족도가 92%로 상승했으며, 신규 환자 유입이 35% 증가했습니다.', '10년 된 소아과 의원의 리모델링을 통해 새로운 도약을 이루어낸 성공 사례입니다.'),
('부산 해운대 치과 개원 컨설팅', '스마일치과의원', '부산 해운대', ARRAY['재무 컨설팅', '인력 채용'], '2023-01-22', 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop', true, true, '스마일치과의원은 해운대 지역 특성에 맞는 재무 계획과 인력 채용 전략을 MediStartup과 함께 수립했습니다. 지역 특성에 맞는 치과 서비스 포트폴리오를 구성하고, 경험 많은 의료진을 채용하여 개원 초기부터 안정적인 운영을 이룰 수 있었습니다. 개원 6개월 만에 월 매출 목표의 120%를 달성하였습니다.', '지역 특성에 맞는 재무 계획과 인력 채용으로 성공적인 치과 개원을 이루어냈습니다.');
