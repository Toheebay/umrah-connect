
-- Add expires_at column to community_posts table
ALTER TABLE public.community_posts 
ADD COLUMN expires_at TIMESTAMP WITH TIME ZONE NULL;

-- Create a function to automatically delete expired posts
CREATE OR REPLACE FUNCTION delete_expired_posts()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.community_posts 
  WHERE expires_at IS NOT NULL 
  AND expires_at < NOW();
END;
$$;
