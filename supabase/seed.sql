-- /** 
-- * USER PROFILES
-- * Note: This table contains user profiles data. Users should only be able to view and update their own data.
-- */
-- -- No profiles table as we are schema from Drizzle ORM.
-- alter table user_profiles enable row level security;
-- create policy "Can view own user data." on user_profiles for select using (auth.uid() = id);
-- create policy "Can update own user data." on user_profiles for update using (auth.uid() = id);

-- /**
-- * This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
-- */ 
-- create or replace function public.handle_new_user() 
-- returns trigger as $$
-- begin
--   insert into public.user_profiles (id, email, user_name, full_name, avatar_url, job_title, company)
--   values (
--     new.id, 
--     new.raw_user_meta_data->>'email',
--     new.raw_user_meta_data->>'user_name',
--     new.raw_user_meta_data->>'full_name', 
--     new.raw_user_meta_data->>'avatar_url',
--     new.raw_user_meta_data->>'job_title',
--     new.raw_user_meta_data->>'company'
--   );
--   return new;
-- end;
-- $$ language plpgsql security definer;
-- create or replace trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();

-- -- Function to automatically update the updated_at timestamp
-- create or replace function update_updated_at_column()
-- returns trigger as $$
-- begin
--   new.updated_at = now();
--   return new;
-- end;
-- $$ language plpgsql;

-- create trigger update_user_profiles_updated_at
--   before update on user_profiles
--   for each row
--   execute function update_updated_at_column();

-- /**
-- * ORGANIZATIONS
-- * Note: This table contains organization data. Organizations should only be able to view and update their own data.
-- */
-- -- No organization table as we are schema from Drizzle ORM.

-- /**
-- * CUSTOMERS
-- * Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.
-- */
-- -- No customers table as we are schema from Drizzle ORM.
-- alter table customers enable row level security;
-- -- No policies as this is a private table that the user must not have access to.

-- /** 
-- * PRODUCTS
-- * Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
-- */
-- -- No products table as we are schema from Drizzle ORM.
-- alter table products enable row level security;
-- create policy "Allow public read-only access." on products for select using (true);

-- /**
-- * PRICES
-- * Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
-- */
-- -- No prices table as we are schema from Drizzle ORM.
-- alter table prices enable row level security;
-- create policy "Allow public read-only access." on prices for select using (true);

-- /**
-- * SUBSCRIPTIONS
-- * Note: subscriptions are created and managed in Stripe and synced to our DB via Stripe webhooks.
-- */
-- -- No subscriptions table as we are schema from Drizzle ORM.
-- alter table subscriptions enable row level security;
-- create policy "Can only view own subs data." on subscriptions for select using (auth.uid() = user_id);

-- /**
--  * REALTIME SUBSCRIPTIONS
--  * Only allow realtime listening on public tables and user profiles.
--  */
-- drop publication if exists supabase_realtime;
-- create publication supabase_realtime for table products, prices, user_profiles;
