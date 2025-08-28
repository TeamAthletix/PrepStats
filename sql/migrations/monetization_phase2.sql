-- Phase 2: Monetization: token edit, token pricing, freebies, spotlight edit
--
-- token_edits (denotes someone spotlight edit a token)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.token_items WHERE name = 'SpotLight Edit' AND type = 'spotLight'
  ) THEN
    INSERT INTO public.token_items (name, type)
    VALUES ('SpotLight Edit', 'spotLight');
  END IF;
END $$;

-- token_accounts, token_purchases (denotes token purchase; schema: independent)
CREATE TABLE IF NOT EXISTS public.token_accounts (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.token_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  token_item_id UUID NOT NULL REFERENCES public.token_items(id),
  stripe_session_id TEXT
);
