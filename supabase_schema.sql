-- ========================================================
-- PRISMA - SUPABASE DATABASE SCHEMA
-- Jalankan query ini di Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ========================================================

CREATE TABLE IF NOT EXISTS public.materi (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  jenjang TEXT DEFAULT 'SD',
  mata_pelajaran TEXT DEFAULT 'IPAS',
  level TEXT DEFAULT 'Kelas 4',
  badge TEXT DEFAULT 'Gratis',
  image TEXT,
  description TEXT,
  duration TEXT DEFAULT '± 5 menit',
  activity_type TEXT DEFAULT 'Materi + Video + Kuis',
  learning_options TEXT DEFAULT '3 Tab Interaktif',
  
  -- Tab 1: Materi (Teks, Gambar, Poin Belajar, dan Audio Narasi Suara)
  materi_content JSONB,
  
  -- Tab 2: Video (Video 1 & Video 2 - YouTube atau Cloudinary MP4)
  videos JSONB,
  
  -- Tab 3: Quiz (Pilihan Ganda dengan opsi gambar pada setiap soal)
  quiz JSONB,
  
  -- Bidang pendukung & backward compatibility
  types JSONB,
  steps JSONB,
  learning_points JSONB,
  standard_config JSONB,
  focus_config JSONB,
  standard_content JSONB,
  slow_content JSONB,
  high_contrast_content JSONB,
  focus_content JSONB,
  assessment JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.materi ENABLE ROW LEVEL SECURITY;

-- Policy agar data materi dapat dibaca secara publik oleh siapapun (Siswa & Pengunjung)
DROP POLICY IF EXISTS "Public Read Materi" ON public.materi;
CREATE POLICY "Public Read Materi" 
  ON public.materi 
  FOR SELECT 
  USING (true);

-- Policy agar admin/pengguna dengan Anon Key dapat menambah materi
DROP POLICY IF EXISTS "Public Insert Materi" ON public.materi;
CREATE POLICY "Public Insert Materi" 
  ON public.materi 
  FOR INSERT 
  WITH CHECK (true);

-- Policy agar admin/pengguna dengan Anon Key dapat mengubah materi
DROP POLICY IF EXISTS "Public Update Materi" ON public.materi;
CREATE POLICY "Public Update Materi" 
  ON public.materi 
  FOR UPDATE 
  USING (true);

-- Policy agar admin/pengguna dengan Anon Key dapat menghapus materi
DROP POLICY IF EXISTS "Public Delete Materi" ON public.materi;
CREATE POLICY "Public Delete Materi" 
  ON public.materi 
  FOR DELETE 
  USING (true);

