DROP TABLE IF EXISTS users;

DELETE FROM auth.users WHERE id = '00000000-0000-4000-8000-000000000001';

INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token, email_change, email_change_token_new,
    email_change_token_current, phone_change_token, reauthentication_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000', '00000000-0000-4000-8000-000000000001',
    'authenticated', 'authenticated', 'demo@example.com',
    extensions.crypt('insights123', extensions.gen_salt('bf')), NOW(),
    '{"provider": "email", "providers": ["email"]}', '{}', NOW(), NOW(),
    '', '', '', '', '', '', ''
);

INSERT INTO auth.identities (id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at)
VALUES (
    gen_random_uuid(), '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'email',
    jsonb_build_object('sub', '00000000-0000-4000-8000-000000000001', 'email', 'demo@example.com', 'email_verified', true),
    NOW(), NOW(), NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    mail TEXT NOT NULL,
    image TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (id, name, mail)
VALUES ('00000000-0000-4000-8000-000000000001', 'Demo', 'demo@example.com');

REVOKE ALL ON users FROM anon, authenticated;
GRANT SELECT, INSERT ON users TO authenticated;
GRANT UPDATE (name, image) ON users TO authenticated;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own profile"
ON users FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can create their own profile"
ON users FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = id)
WITH CHECK ((SELECT auth.uid()) = id);
