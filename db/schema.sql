-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (managed by Supabase Auth, but we can extend it if needed)
-- For this app, we'll rely on auth.users and maybe a public profile table if needed.
-- But the requirements say "users: id, email, created_at".
-- We can create a public.users table that references auth.users.

create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Card Designs table
create table public.card_designs (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  base_price decimal(10, 2) not null,
  preview_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id), -- Optional, for guest checkout support if needed, or link to auth user
  design_id uuid references public.card_designs(id) not null,
  customization_json jsonb not null,
  quantity integer not null,
  price decimal(10, 2) not null,
  status text not null default 'New', -- 'New', 'Printing', 'Shipped'
  customer_name text not null,
  customer_email text not null,
  shipping_address text not null,
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Print Jobs table
create table public.print_jobs (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) not null,
  status text not null default 'Pending',
  notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies

-- Enable RLS
alter table public.users enable row level security;
alter table public.card_designs enable row level security;
alter table public.orders enable row level security;
alter table public.print_jobs enable row level security;

-- Policies

-- Card Designs: Public read
create policy "Public designs are viewable by everyone"
  on public.card_designs for select
  using ( true );

-- Orders: Users can view their own orders (if authenticated)
create policy "Users can view own orders"
  on public.orders for select
  using ( auth.uid() = user_id );

-- Orders: Admin full access (assuming admin role or email check)
-- For simplicity in development, we might allow public insert for checkout?
-- But usually checkout is server-side.
-- We'll allow authenticated insert.

create policy "Anyone can create orders"
  on public.orders for insert
  with check ( true );

-- Admin policies (placeholder, need to define admin check)
-- create policy "Admins can do everything" ...

