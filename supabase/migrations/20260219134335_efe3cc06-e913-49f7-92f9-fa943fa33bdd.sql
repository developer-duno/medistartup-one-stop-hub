
-- Add profile_views column to experts table
ALTER TABLE public.experts ADD COLUMN IF NOT EXISTS profile_views integer NOT NULL DEFAULT 0;

-- Create function to increment expert profile views (public access)
CREATE OR REPLACE FUNCTION public.increment_expert_views(expert_id integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.experts
  SET profile_views = profile_views + 1
  WHERE id = expert_id AND is_approved = true;
END;
$$;

-- Recreate the experts_public view to include profile_views
DROP VIEW IF EXISTS public.experts_public;
CREATE VIEW public.experts_public AS
SELECT
  id, name, role, specialty, image, experience, projects, description,
  regions, services, certifications, is_regional_manager, managed_regions,
  display_order, show_on_main, is_approved, application_status,
  application_date, approval_date, rejection_reason,
  cover_image, key_achievements, education_history, career_timeline,
  success_cases, testimonials, created_at, updated_at, profile_views
FROM public.experts
WHERE is_approved = true;
