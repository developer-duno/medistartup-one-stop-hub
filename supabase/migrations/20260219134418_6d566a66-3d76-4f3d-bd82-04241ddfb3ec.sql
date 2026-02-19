
-- Fix security definer view by using security_invoker
DROP VIEW IF EXISTS public.experts_public;
CREATE VIEW public.experts_public
WITH (security_invoker=on) AS
SELECT
  id, name, role, specialty, image, experience, projects, description,
  regions, services, certifications, is_regional_manager, managed_regions,
  display_order, show_on_main, is_approved, application_status,
  application_date, approval_date, rejection_reason,
  cover_image, key_achievements, education_history, career_timeline,
  success_cases, testimonials, created_at, updated_at, profile_views
FROM public.experts
WHERE is_approved = true;
