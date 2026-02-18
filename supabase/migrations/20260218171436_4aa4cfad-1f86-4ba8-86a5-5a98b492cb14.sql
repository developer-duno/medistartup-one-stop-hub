
-- Region groups (권역)
CREATE TABLE public.region_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Region items (하위 지역)
CREATE TABLE public.region_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.region_groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(group_id, name)
);

-- Enable RLS
ALTER TABLE public.region_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.region_items ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can read region groups" ON public.region_groups FOR SELECT USING (true);
CREATE POLICY "Public can read region items" ON public.region_items FOR SELECT USING (true);

-- Admin write
CREATE POLICY "Admins can insert region groups" ON public.region_groups FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update region groups" ON public.region_groups FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete region groups" ON public.region_groups FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert region items" ON public.region_items FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update region items" ON public.region_items FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete region items" ON public.region_items FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_region_groups_updated_at BEFORE UPDATE ON public.region_groups FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_region_items_updated_at BEFORE UPDATE ON public.region_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial data
INSERT INTO public.region_groups (name, display_order) VALUES
  ('수도권', 0), ('충청권', 1), ('경상권', 2), ('전라/제주권', 3);

INSERT INTO public.region_items (group_id, name, display_order) VALUES
  ((SELECT id FROM public.region_groups WHERE name = '수도권'), '서울', 0),
  ((SELECT id FROM public.region_groups WHERE name = '수도권'), '경기남부', 1),
  ((SELECT id FROM public.region_groups WHERE name = '수도권'), '경기북부', 2),
  ((SELECT id FROM public.region_groups WHERE name = '수도권'), '인천', 3),
  ((SELECT id FROM public.region_groups WHERE name = '충청권'), '대전', 0),
  ((SELECT id FROM public.region_groups WHERE name = '충청권'), '세종', 1),
  ((SELECT id FROM public.region_groups WHERE name = '충청권'), '충남', 2),
  ((SELECT id FROM public.region_groups WHERE name = '충청권'), '충북', 3),
  ((SELECT id FROM public.region_groups WHERE name = '경상권'), '부산', 0),
  ((SELECT id FROM public.region_groups WHERE name = '경상권'), '울산', 1),
  ((SELECT id FROM public.region_groups WHERE name = '경상권'), '대구', 2),
  ((SELECT id FROM public.region_groups WHERE name = '경상권'), '경남', 3),
  ((SELECT id FROM public.region_groups WHERE name = '경상권'), '경북', 4),
  ((SELECT id FROM public.region_groups WHERE name = '전라/제주권'), '광주', 0),
  ((SELECT id FROM public.region_groups WHERE name = '전라/제주권'), '제주', 1);
