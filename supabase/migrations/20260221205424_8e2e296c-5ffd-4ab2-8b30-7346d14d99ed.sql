-- Fix: experts table SELECT policies are all RESTRICTIVE, 
-- which means NO rows are returned (PostgreSQL requires at least one PERMISSIVE policy to pass)
-- Drop restrictive SELECT policies and recreate as PERMISSIVE

DROP POLICY IF EXISTS "Public can view approved experts" ON public.experts;
DROP POLICY IF EXISTS "Admins can read all experts" ON public.experts;

-- Recreate as PERMISSIVE (default)
CREATE POLICY "Public can view approved experts"
  ON public.experts FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Admins can read all experts"
  ON public.experts FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
