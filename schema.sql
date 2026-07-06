-- Fruit Lab Database Schema for Supabase SQL Editor

-- 1. Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer',
    points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Disable row level security restrictions for simplicity in local demo setup
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read/write access" ON public.users;
CREATE POLICY "Allow public read/write access" ON public.users FOR ALL TO public USING (true) WITH CHECK (true);


-- 2. Create menu table
CREATE TABLE IF NOT EXISTS public.menu (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT UNIQUE NOT NULL,
    price TEXT NOT NULL,
    bottle TEXT NOT NULL DEFAULT 'yellow',
    image TEXT,
    fruits TEXT[] DEFAULT '{}',
    rating TEXT DEFAULT '4.8',
    reviews TEXT DEFAULT '+1',
    ingredients TEXT,
    sub_category TEXT
);

ALTER TABLE public.menu ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read/write access" ON public.menu;
CREATE POLICY "Allow public read/write access" ON public.menu FOR ALL TO public USING (true) WITH CHECK (true);


-- 3. Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    date TEXT,
    image TEXT
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read/write access" ON public.blogs;
CREATE POLICY "Allow public read/write access" ON public.blogs FOR ALL TO public USING (true) WITH CHECK (true);


-- 4. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id),
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_price TEXT NOT NULL,
    points_earned INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read/write access" ON public.orders;
CREATE POLICY "Allow public read/write access" ON public.orders FOR ALL TO public USING (true) WITH CHECK (true);
