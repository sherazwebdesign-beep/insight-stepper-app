CREATE TABLE public.booking_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255),
 topic text NOT NULL CHECK (char_length(topic) <= 100),
 preferred_date date NOT NULL,
 preferred_time text NOT NULL,
 timezone text NOT NULL DEFAULT 'Europe/London',
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000),
 status text NOT NULL DEFAULT 'pending'
);
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE INDEX booking_requests_email_created_idx ON public.booking_requests(email, created_at);
CREATE OR REPLACE FUNCTION public.limit_booking_requests() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF (SELECT count(*) FROM public.booking_requests WHERE email = NEW.email AND created_at > now() - interval '1 hour') >= 3 THEN
  RAISE EXCEPTION 'Too many booking requests. Please try again later.';
 END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER limit_booking_requests BEFORE INSERT ON public.booking_requests FOR EACH ROW EXECUTE FUNCTION public.limit_booking_requests();