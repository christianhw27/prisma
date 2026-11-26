import { ref } from 'vue'
import { supabase, isSupabaseConfigured } from './supabaseClient.js'

const ROOMS_STORAGE_KEY = 'prisma_exam_rooms_v1'
const PARTICIPANTS_STORAGE_KEY = 'prisma_exam_participants_v1'
const BROADCAST_CHANNEL_NAME = 'prisma_exam_sync_v1'

export const examRooms = ref([])
export const isLoadingExams = ref(false)

const syncChannel = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel(BROADCAST_CHANNEL_NAME)
  : null

function notifyLocalSync(roomId) {
  if (syncChannel) {
    syncChannel.postMessage({ type: 'exam-sync', roomId, ts: Date.now() })
  }
}

/**
 * Membuat kode room acak 6 karakter yang mudah dibaca siswa SD (tanpa 0/O/1/I).
 */
export function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

function readLocalRooms() {
  try {
    const raw = localStorage.getItem(ROOMS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeLocalRooms(rooms) {
  localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms))
}

function readLocalParticipants() {
  try {
    const raw = localStorage.getItem(PARTICIPANTS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeLocalParticipants(list) {
  localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(list))
}

function normalizeRoomRow(row) {
  if (!row) return null
  const resolvedSession = Number(row.sessionNumber ?? row.settings?.sessionNumber ?? 1)
  return {
    id: row.id,
    roomCode: (row.room_code ?? row.roomCode ?? '').toUpperCase(),
    title: row.title || 'Ulangan Harian',
    kelas: row.kelas || 'Kelas 4',
    mataPelajaran: row.mata_pelajaran ?? row.mataPelajaran ?? 'IPAS',
    description: row.description || '',
    isActive: row.is_active !== undefined ? Boolean(row.is_active) : Boolean(row.isActive ?? true),
    status: row.status || 'waiting', // 'waiting' | 'running' | 'finished'
    durationMinutes: Number(row.duration_minutes ?? row.durationMinutes ?? 15),
    sessionNumber: resolvedSession,
    settings: {
      shuffleQuestions: false,
      showScoreToStudent: true,
      ...(row.settings || {}),
      sessionNumber: resolvedSession
    },
    questions: Array.isArray(row.questions) ? row.questions : [],
    createdBy: row.created_by ?? row.createdBy ?? 'Guru Prisma',
    startedAt: row.started_at ?? row.startedAt ?? null,
    finishedAt: row.finished_at ?? row.finishedAt ?? null,
    createdAt: row.created_at ?? row.createdAt ?? new Date().toISOString()
  }
}

function toDbRoomRow(room) {
  return {
    id: room.id,
    room_code: (room.roomCode || generateRoomCode()).toUpperCase().trim(),
    title: room.title || 'Ulangan Harian',
    kelas: room.kelas || 'Kelas 4',
    mata_pelajaran: room.mataPelajaran || 'IPAS',
    description: room.description || '',
    is_active: Boolean(room.isActive),
    status: room.status || 'waiting',
    duration_minutes: Number(room.durationMinutes || 0),
    settings: {
      ...(room.settings || { shuffleQuestions: false, showScoreToStudent: true }),
      sessionNumber: Number(room.sessionNumber || room.settings?.sessionNumber || 1)
    },
    questions: Array.isArray(room.questions) ? room.questions : [],
    created_by: room.createdBy || 'Guru Prisma',
    started_at: room.startedAt || null,
    finished_at: room.finishedAt || null,
    created_at: room.createdAt || new Date().toISOString()
  }
}

function normalizeParticipantRow(row) {
  if (!row) return null
  return {
    id: row.id,
    roomId: row.room_id ?? row.roomId,
    studentName: row.student_name ?? row.studentName ?? 'Siswa',
    studentAbsen: row.student_absen ?? row.studentAbsen ?? '',
    status: row.status || 'joined', // 'joined' | 'working' | 'submitted'
    sessionNumber: Number(row.sessionNumber ?? row.answers?._sessionNumber ?? 1),
    answers: row.answers || {},
    score: Number(row.score ?? 0),
    correctCount: Number(row.correct_count ?? row.correctCount ?? 0),
    totalCount: Number(row.total_count ?? row.totalCount ?? 0),
    joinedAt: row.joined_at ?? row.joinedAt ?? new Date().toISOString(),
    submittedAt: row.submitted_at ?? row.submittedAt ?? null
  }
}

/**
 * Mengambil seluruh daftar room ujian.
 */
export async function fetchExamRooms() {
  isLoadingExams.value = true
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('exam_rooms')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && Array.isArray(data)) {
        const normalized = data.map(normalizeRoomRow)
        examRooms.value = normalized
        writeLocalRooms(normalized)
        return normalized
      }
    }
    const local = readLocalRooms().map(normalizeRoomRow)
    examRooms.value = local
    return local
  } finally {
    isLoadingExams.value = false
  }
}

/**
 * Membuat room ujian baru.
 */
export async function createExamRoom(payload) {
  const newRoom = normalizeRoomRow({
    id: `exam_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    roomCode: (payload.roomCode || generateRoomCode()).toUpperCase().trim(),
    ...payload,
    status: 'waiting',
    createdAt: new Date().toISOString()
  })

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('exam_rooms')
      .insert([toDbRoomRow(newRoom)])
      .select()
      .single()

    if (error) {
      throw new Error(error.message || 'Gagal menyimpan room ujian ke server.')
    }
    const saved = normalizeRoomRow(data)
    examRooms.value = [saved, ...examRooms.value.filter(r => r.id !== saved.id)]
    writeLocalRooms(examRooms.value)
    notifyLocalSync(saved.id)
    return saved
  }

  const local = [newRoom, ...readLocalRooms()]
  writeLocalRooms(local)
  examRooms.value = local
  notifyLocalSync(newRoom.id)
  return newRoom
}

/**
 * Memperbarui room ujian (pengaturan, soal, status aktif, atau status sesi).
 */
export async function updateExamRoom(roomId, patch) {
  const existing = examRooms.value.find(r => r.id === roomId) || readLocalRooms().find(r => r.id === roomId)
  if (!existing) throw new Error('Room ujian tidak ditemukan.')

  const updated = normalizeRoomRow({ ...existing, ...patch, id: roomId })

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('exam_rooms')
      .update(toDbRoomRow(updated))
      .eq('id', roomId)
      .select()
      .single()

    if (error) {
      throw new Error(error.message || 'Gagal memperbarui room ujian.')
    }
    const saved = normalizeRoomRow(data)
    examRooms.value = examRooms.value.map(r => (r.id === roomId ? saved : r))
    writeLocalRooms(examRooms.value)
    notifyLocalSync(roomId)
    return saved
  }

  const local = readLocalRooms().map(r => (r.id === roomId ? updated : r))
  writeLocalRooms(local)
  examRooms.value = local.map(normalizeRoomRow)
  notifyLocalSync(roomId)
  return updated
}

/**
 * Menghapus room ujian beserta pesertanya.
 */
export async function deleteExamRoom(roomId) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('exam_rooms').delete().eq('id', roomId)
    if (error) throw new Error(error.message || 'Gagal menghapus room ujian.')
  }

  const localRooms = readLocalRooms().filter(r => r.id !== roomId)
  writeLocalRooms(localRooms)
  examRooms.value = localRooms.map(normalizeRoomRow)

  const localParticipants = readLocalParticipants().filter(p => p.roomId !== roomId)
  writeLocalParticipants(localParticipants)
  notifyLocalSync(roomId)
}

/**
 * Mencari room ujian berdasarkan kode room (untuk siswa).
 */
export async function findExamRoomByCode(rawCode) {
  const code = String(rawCode || '').trim().toUpperCase()
  if (!code) return null

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('exam_rooms')
      .select('*')
      .eq('room_code', code)
      .maybeSingle()

    if (!error && data) {
      return normalizeRoomRow(data)
    }
  }

  const local = readLocalRooms().map(normalizeRoomRow)
  return local.find(r => r.roomCode === code) || null
}

/**
 * Siswa bergabung ke room ujian menggunakan kode room.
 */
export async function joinExamRoom(rawCode, { studentName, studentAbsen = '' }) {
  const room = await findExamRoomByCode(rawCode)
  if (!room) {
    throw new Error('Kode room tidak ditemukan. Periksa kembali kode dari Ibu/Bapak Guru.')
  }
  if (!room.isActive) {
    throw new Error('Room ujian ini sedang dinonaktifkan oleh guru.')
  }
  if (room.status === 'finished') {
    throw new Error('Sesi ujian pada room ini sudah berakhir.')
  }

  const cleanName = String(studentName || '').trim()
  if (!cleanName) {
    throw new Error('Nama lengkap wajib diisi sebelum masuk room.')
  }

  const currentSession = Number(room.sessionNumber || 1)
  const participant = normalizeParticipantRow({
    id: `part_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    roomId: room.id,
    studentName: cleanName,
    studentAbsen: String(studentAbsen || '').trim(),
    status: room.status === 'running' ? 'working' : 'joined',
    sessionNumber: currentSession,
    answers: { _sessionNumber: currentSession },
    score: 0,
    correctCount: 0,
    totalCount: room.questions.length,
    joinedAt: new Date().toISOString()
  })

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('exam_participants')
      .insert([{
        id: participant.id,
        room_id: participant.roomId,
        student_name: participant.studentName,
        student_absen: participant.studentAbsen,
        status: participant.status,
        answers: participant.answers,
        score: participant.score,
        correct_count: participant.correctCount,
        total_count: participant.totalCount,
        joined_at: participant.joinedAt
      }])
      .select()
      .single()

    if (error) {
      throw new Error(error.message || 'Gagal bergabung ke room ujian.')
    }
    notifyLocalSync(room.id)
    return { room, participant: normalizeParticipantRow(data) }
  }

  const local = readLocalParticipants()
  local.push(participant)
  writeLocalParticipants(local)
  notifyLocalSync(room.id)
  return { room, participant }
}

/**
 * Mengambil daftar siswa yang bergabung pada suatu room.
 */
export async function fetchRoomParticipants(roomId) {
  if (!roomId) return []

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('exam_participants')
      .select('*')
      .eq('room_id', roomId)
      .order('joined_at', { ascending: true })

    if (!error && Array.isArray(data)) {
      return data.map(normalizeParticipantRow)
    }
  }

  return readLocalParticipants()
    .map(normalizeParticipantRow)
    .filter(p => p.roomId === roomId)
}

/**
 * Menghapus peserta dari lobby (oleh guru).
 */
export async function removeParticipant(participantId, roomId) {
  if (isSupabaseConfigured) {
    await supabase.from('exam_participants').delete().eq('id', participantId)
  }
  const local = readLocalParticipants().filter(p => p.id !== participantId)
  writeLocalParticipants(local)
  notifyLocalSync(roomId)
}

/**
 * Memperbarui progres atau mengumpulkan jawaban ujian siswa.
 */
export async function updateParticipantProgress(participantId, roomId, patch) {
  if (isSupabaseConfigured) {
    const dbPatch = {}
    if (patch.status !== undefined) dbPatch.status = patch.status
    if (patch.answers !== undefined) {
      dbPatch.answers = {
        ...patch.answers,
        ...(patch.sessionNumber !== undefined ? { _sessionNumber: patch.sessionNumber } : {})
      }
    }
    if (patch.score !== undefined) dbPatch.score = patch.score
    if (patch.correctCount !== undefined) dbPatch.correct_count = patch.correctCount
    if (patch.totalCount !== undefined) dbPatch.total_count = patch.totalCount
    if (patch.submittedAt !== undefined) dbPatch.submitted_at = patch.submittedAt

    const { data, error } = await supabase
      .from('exam_participants')
      .update(dbPatch)
      .eq('id', participantId)
      .select()
      .single()

    if (!error && data) {
      notifyLocalSync(roomId)
      return normalizeParticipantRow(data)
    }
  }

  const local = readLocalParticipants().map(p => (p.id === participantId ? { ...p, ...patch } : p))
  writeLocalParticipants(local)
  notifyLocalSync(roomId)
  return local.find(p => p.id === participantId) || null
}

/**
 * Menghitung skor otomatis berdasarkan kunci jawaban soal.
 */
export function gradeExamAnswers(questions = [], answers = {}) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return { score: 0, correctCount: 0, totalCount: 0 }
  }

  let correctCount = 0
  questions.forEach((q, idx) => {
    const ans = answers[idx]
    const type = q.type || 'multiple_choice'

    if (type === 'multiple_choice' || type === 'true_false') {
      if (ans !== undefined && ans !== null && Number(ans) === Number(q.correctIndex)) {
        correctCount++
      }
    } else if (type === 'fill_in_blank') {
      const expected = String(q.correctAnswer || '').trim().toLowerCase()
      const actual = String(ans || '').trim().toLowerCase()
      if (expected && actual === expected) {
        correctCount++
      }
    } else if (type === 'multi_select') {
      const expectedArr = Array.isArray(q.correctIndices) ? [...q.correctIndices].map(Number).sort() : []
      const actualArr = Array.isArray(ans) ? [...ans].map(Number).sort() : []
      if (
        expectedArr.length > 0 &&
        expectedArr.length === actualArr.length &&
        expectedArr.every((val, i) => val === actualArr[i])
      ) {
        correctCount++
      }
    } else if (type === 'matching') {
      const pairs = Array.isArray(q.pairs) ? q.pairs : []
      if (
        pairs.length > 0 &&
        ans &&
        typeof ans === 'object' &&
        pairs.every((p, i) => String(ans[i] || '').trim() === String(p.right || '').trim())
      ) {
        correctCount++
      }
    } else if (type === 'ordering') {
      const expectedOrder = Array.isArray(q.correctOrder) ? q.correctOrder : []
      if (
        expectedOrder.length > 0 &&
        Array.isArray(ans) &&
        ans.length === expectedOrder.length &&
        expectedOrder.every((val, i) => String(ans[i] || '').trim() === String(val || '').trim())
      ) {
        correctCount++
      }
    }
  })

  const totalCount = questions.length
  const score = Math.round((correctCount / totalCount) * 100)
  return { score, correctCount, totalCount }
}

/**
 * Berlangganan pembaruan real-time untuk sebuah room (Supabase Realtime + polling/BroadcastChannel fallback).
 */
export function subscribeToRoom(roomId, { onRoomUpdate, onParticipantsUpdate }) {
  let channel = null
  let pollTimer = null

  const refreshAll = async () => {
    try {
      if (onRoomUpdate) {
        if (isSupabaseConfigured) {
          const { data } = await supabase.from('exam_rooms').select('*').eq('id', roomId).maybeSingle()
          if (data) onRoomUpdate(normalizeRoomRow(data))
        } else {
          const localRoom = readLocalRooms().map(normalizeRoomRow).find(r => r.id === roomId)
          if (localRoom) onRoomUpdate(localRoom)
        }
      }
      if (onParticipantsUpdate) {
        const list = await fetchRoomParticipants(roomId)
        onParticipantsUpdate(list)
      }
    } catch {
      // Abaikan error sementara saat polling
    }
  }

  if (isSupabaseConfigured) {
    channel = supabase
      .channel(`exam-room-${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'exam_rooms', filter: `id=eq.${roomId}` },
        (payload) => {
          if (payload.new && onRoomUpdate) {
            onRoomUpdate(normalizeRoomRow(payload.new))
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'exam_participants', filter: `room_id=eq.${roomId}` },
        async () => {
          if (onParticipantsUpdate) {
            const list = await fetchRoomParticipants(roomId)
            onParticipantsUpdate(list)
          }
        }
      )
      .subscribe()
  }

  const handleBroadcast = (event) => {
    if (event.data?.roomId === roomId) {
      refreshAll()
    }
  }
  const handleStorage = (event) => {
    if (event.key === ROOMS_STORAGE_KEY || event.key === PARTICIPANTS_STORAGE_KEY) {
      refreshAll()
    }
  }

  if (syncChannel) syncChannel.addEventListener('message', handleBroadcast)
  if (typeof window !== 'undefined') window.addEventListener('storage', handleStorage)

  // Polling ringan tiap 3 detik sebagai jaring pengaman bila realtime WS putus
  pollTimer = setInterval(refreshAll, 3000)

  return () => {
    if (channel) supabase.removeChannel(channel)
    if (syncChannel) syncChannel.removeEventListener('message', handleBroadcast)
    if (typeof window !== 'undefined') window.removeEventListener('storage', handleStorage)
    if (pollTimer) clearInterval(pollTimer)
  }
}
