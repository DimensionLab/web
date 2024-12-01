-- /** 
-- * USER PROFILES
-- * Note: This table contains user data. Users should only be able to view and update their own data.
-- */
-- create policy "Can view own user data." on user_profiles for select using (auth.user_id() = user_id);
-- create policy "Can update own user data." on user_profiles for update using (auth.user_id() = user_id);

-- /**
-- * This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
-- */ 
-- create or replace function public.handle_new_user() 
-- returns trigger as $$
-- begin
--   insert into public.user_profiles (user_id, full_name, avatar_url)
--   values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
--   return new;
-- end;
-- $$ language plpgsql security definer;
-- create or replace trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();

-- /**
-- * This function returns the user ID from the JWT claims.
-- */
-- create or replace function auth.user_id() returns text as $$
--   select nullif(current_setting('request.jwt.claims', true)::json->>'userId', '')::text;
-- $$ language sql stable;

-- /**
-- * CUSTOMERS
-- * Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.
-- */
-- alter table customers enable row level security;
-- -- No policies as this is a private table that the user must not have access to.

-- /** 
-- * PRODUCTS
-- * Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
-- */
-- alter table products enable row level security;
-- create policy "Allow public read-only access." on products for select using (true);

-- /**
-- * PRICES
-- * Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
-- */
-- alter table prices enable row level security;
-- create policy "Allow public read-only access." on prices for select using (true);

-- /**
-- * SUBSCRIPTIONS
-- * Note: subscriptions are created and managed in Stripe and synced to our DB via Stripe webhooks.
-- */
-- alter table subscriptions enable row level security;
-- create policy "Can only view own subs data." on subscriptions for select using (auth.user_id() = user_id);

-- /**
--  * REALTIME SUBSCRIPTIONS
--  * Only allow realtime listening on public tables and users.
--  */
-- drop publication if exists supabase_realtime;
-- create publication supabase_realtime for table products, prices, user_profiles;