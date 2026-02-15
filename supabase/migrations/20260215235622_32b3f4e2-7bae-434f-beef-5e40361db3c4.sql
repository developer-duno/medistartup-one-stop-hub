
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: users can read their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS policy: only admins can manage roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update experts table RLS: anyone can read approved experts, only admins can modify
DROP POLICY IF EXISTS "Anyone can view approved experts" ON public.experts;
CREATE POLICY "Anyone can view approved experts"
ON public.experts
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow insert experts" ON public.experts;
CREATE POLICY "Admins can insert experts"
ON public.experts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Allow update experts" ON public.experts;
CREATE POLICY "Admins can update experts"
ON public.experts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Allow delete experts" ON public.experts;
CREATE POLICY "Admins can delete experts"
ON public.experts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update consultations RLS
DROP POLICY IF EXISTS "Allow read consultations" ON public.consultations;
CREATE POLICY "Admins can read consultations"
ON public.consultations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Allow update consultations" ON public.consultations;
CREATE POLICY "Admins can update consultations"
ON public.consultations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Keep public insert for consultations (anyone can submit)
-- "Anyone can submit consultation" policy already exists

-- Update expert_applications RLS
DROP POLICY IF EXISTS "Allow read expert applications" ON public.expert_applications;
CREATE POLICY "Admins can read expert applications"
ON public.expert_applications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Allow update expert applications" ON public.expert_applications;
CREATE POLICY "Admins can update expert applications"
ON public.expert_applications
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Keep public insert for expert_applications
-- "Anyone can submit expert application" policy already exists
