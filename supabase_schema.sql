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

-- ========================================================
-- FITUR UJIAN / ULANGAN (EXAM ROOMS & PARTICIPANTS)
-- ========================================================

CREATE TABLE IF NOT EXISTS public.exam_rooms (
  id TEXT PRIMARY KEY,
  room_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  kelas TEXT DEFAULT 'Kelas 4',
  mata_pelajaran TEXT DEFAULT 'IPAS',
  description TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'waiting', -- 'waiting' | 'running' | 'finished'
  duration_minutes INTEGER DEFAULT 15,
  settings JSONB DEFAULT '{"shuffleQuestions": false, "showScoreToStudent": true}'::jsonb,
  questions JSONB DEFAULT '[]'::jsonb,
  created_by TEXT DEFAULT 'Guru Prisma',
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exam_participants (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES public.exam_rooms(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_absen TEXT DEFAULT '',
  status TEXT DEFAULT 'joined', -- 'joined' | 'working' | 'submitted'
  answers JSONB DEFAULT '{}'::jsonb,
  score INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  total_count INTEGER DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitted_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.exam_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_participants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public All Exam Rooms" ON public.exam_rooms;
CREATE POLICY "Public All Exam Rooms"
  ON public.exam_rooms
  FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public All Exam Participants" ON public.exam_participants;
CREATE POLICY "Public All Exam Participants"
  ON public.exam_participants
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Aktifkan Realtime agar lobby guru & layar siswa sinkron otomatis
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.exam_rooms;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.exam_participants;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

