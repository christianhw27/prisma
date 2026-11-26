<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import {
  materiList, addMateri, updateMateri, deleteMateri, isLoadingMateri, RELIABLE_MODE_VIDEOS,
  KELAS_SD_OPTIONS, getKelasFromLevel, isYouTubeUrl, getYouTubeEmbedUrl
} from '../lib/materiService'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { currentUser, isAdmin, adminManagedKelas, logoutUser } from '../lib/authService'
import { uploadVideo, uploadImage, uploadAudio, isCloudinaryConfigured } from '../lib/cloudinary'
import { searchRelevantImages } from '../lib/imageSearchService'
import { playMascotChime } from '../lib/soundEffects'
import {
  BookOpen, LogOut, Plus, Trash2, Edit3, Eye,
  X, CheckCircle2, UploadCloud, ShieldAlert, Search,
  RefreshCw, Sparkles, ArrowLeft, Save, ImagePlus, AlignLeft,
  HelpCircle, FileText, Volume2, Music, Video, Link2, Check,
  Bold, Italic, Underline, List, ListOrdered
} from '@lucide/vue'

const emit = defineEmits(['previewMateri', 'backToApp', 'openAuth'])

// Modal / Form state
const showForm = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const activeFormTab = ref('materi') // 'materi' | 'video' | 'quiz'
const videoInputMode = ref({ video1: 'link', video2: 'link' }) // 'link' | 'upload'

// Toast notifikasi simpan sukses
const saveToast = ref({ show: false, message: '' })
const triggerSaveToast = (msg) => {
  saveToast.value = { show: true, message: msg }
  setTimeout(() => {
    saveToast.value.show = false
  }, 3500)
}

// Search/filter in table
const tableSearch = ref('')
const selectedKelasFilter = ref('Semua')

// Upload state
const isUploadingVideo = ref(false)
const uploadProgress = ref(0)
const uploadTargetKey = ref(null)
const dragOverKey = ref(null)

const isUploadingImage = ref(false)
const imageUploadProgress = ref(0)

const isUploadingAudio = ref(false)
const audioUploadProgress = ref(0)

const isUploadingQuizImage = ref({})

// Konfigurasi Pilihan Kelas SD (Kelas 1 sampai 6)
const levelOptions = KELAS_SD_OPTIONS.map(k => ({ value: k, label: k }))

const QUESTION_TYPE_LABELS = {
  multiple_choice: 'Pilihan Ganda',
  matching: 'Hubungkan Garis (Pasangan)',
  ordering: 'Urutkan Kartu',
  true_false: 'Benar / Salah',
  fill_in_blank: 'Isian Singkat',
  multi_select: 'Pilih Banyak Jawaban',
  image_choice: 'Pilih Gambar (Interaktif)',
  color_choice: 'Pilih Warna (Interaktif)',
  grid_map: 'Peta Koordinat (Interaktif)',
  place_value: 'Nilai Tempat (Interaktif)'
}

const EDITABLE_QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Pilihan Ganda' },
  { value: 'matching', label: 'Hubungkan Garis (Pasangan)' },
  { value: 'ordering', label: 'Urutkan Kartu' },
  { value: 'true_false', label: 'Benar / Salah' },
  { value: 'fill_in_blank', label: 'Isian Singkat' },
  { value: 'multi_select', label: 'Pilih Banyak Jawaban' }
]

const getQuestionTypeLabel = (type) => {
  return QUESTION_TYPE_LABELS[type || 'multiple_choice'] || 'Pilihan Ganda'
}

const isSpecialQuestionType = (type) => {
  return ['image_choice', 'color_choice', 'grid_map', 'place_value'].includes(type)
}

const normalizeLevelForForm = (rawLevel) => {
  return getKelasFromLevel(rawLevel)
}

// Form data
const currentForm = ref(getEmptyForm())

// Rich Text Editor (Isi Teks Bacaan)
const richTextEditorRef = ref(null)
const syncRichTextFromModel = () => {
  nextTick(() => {
    if (richTextEditorRef.value) {
      const raw = currentForm.value.materiContent?.text || ''
      // Jika teks polos dengan newline, ubah newline jadi <br> agar rapi di editor
      const hasHtml = /<(b|strong|i|em|u|ul|ol|li|p|br|div)\b/i.test(raw)
      richTextEditorRef.value.innerHTML = hasHtml ? raw : raw.replace(/\n/g, '<br>')
    }
  })
}

const onRichTextInput = () => {
  if (!richTextEditorRef.value || !currentForm.value.materiContent) return
  const html = richTextEditorRef.value.innerHTML
  currentForm.value.materiContent.text = (html === '<br>' || html === '<div><br></div>') ? '' : html
}

const applyFormat = (cmd) => {
  if (!richTextEditorRef.value) return
  richTextEditorRef.value.focus()
  document.execCommand(cmd, false, null)
  onRichTextInput()
}

watch(activeFormTab, (tab) => {
  if (tab === 'materi' && showForm.value) {
    syncRichTextFromModel()
  }
})

// Pencarian Gambar dengan Kata Kunci (Sampul Materi & Gambar Soal)
const imageSearchModal = ref({
  isOpen: false,
  target: 'cover', // 'cover' | 'quiz'
  qIdx: null,
  query: '',
  results: [],
  isSearching: false
})

const openImageSearch = async (target, qIdx = null) => {
  imageSearchModal.value = {
    isOpen: true,
    target,
    qIdx,
    query: '',
    results: [],
    isSearching: true
  }
  imageSearchModal.value.results = await searchRelevantImages('')
  imageSearchModal.value.isSearching = false
}

const runImageSearch = async () => {
  imageSearchModal.value.isSearching = true
  imageSearchModal.value.results = await searchRelevantImages(imageSearchModal.value.query)
  imageSearchModal.value.isSearching = false
}

const selectSearchedImage = (url) => {
  if (imageSearchModal.value.target === 'cover') {
    if (!currentForm.value.materiContent) currentForm.value.materiContent = { image: '' }
    currentForm.value.materiContent.image = url
    currentForm.value.image = url
  } else if (imageSearchModal.value.target === 'quiz' && imageSearchModal.value.qIdx !== null) {
    const q = currentForm.value.quiz?.questions?.[imageSearchModal.value.qIdx]
    if (q) q.image = url
  }
  imageSearchModal.value.isOpen = false
}

function getEmptyForm() {
  return {
    id: '',
    title: '',
    jenjang: 'SD',
    mataPelajaran: 'Bahasa Indonesia & Matematika',
    level: adminManagedKelas.value || 'Kelas 1',
    description: '',
    badge: 'Gratis',
    duration: '± 5 menit',
    image: '/es_batu_card.jpg',
    types: ['Teks & Gambar', '2 Video Edukasi', 'Kuis Interaktif'],
    materiContent: {
      text: '',
      image: '/es_batu_card.jpg',
      audioUrl: '',
      points: [
        { id: 'lp-1', title: 'Konsep Dasar', desc: 'Penjelasan konsep utama materi.' },
        { id: 'lp-2', title: 'Penerapan Nyata', desc: 'Contoh penerapan dalam kehidupan sehari-hari.' }
      ]
    },
    videos: {
      video1: {
        title: 'Video 1: Pengenalan Konsep Materi',
        url: ''
      },
      video2: {
        title: 'Video 2: Praktik & Cerita Seru',
        url: ''
      }
    },
    quiz: {
      title: 'Kuis Pemahaman Materi',
      questions: [
        {
          id: 'q-1',
          type: 'multiple_choice',
          questionText: '',
          image: '',
          points: 50,
          options: ['', '', '', ''],
          correctOptionIndex: 0,
          explanation: ''
        }
      ]
    },
    learningPoints: [],
    standardContent: { title: 'Video 1', text: '', videoUrl: '' },
    slowContent: { title: 'Video 2', text: '', videoUrl: '' },
    assessment: { title: 'Kuis Pemahaman Materi', questions: [] }
  }
}

const openAddForm = () => {
  isEditing.value = false
  currentForm.value = getEmptyForm()
  videoInputMode.value = { video1: 'link', video2: 'link' }
  activeFormTab.value = 'materi'
  showForm.value = true
  syncRichTextFromModel()
}

const openEditForm = (item) => {
  isEditing.value = true
  const copy = JSON.parse(JSON.stringify(item))

  // Tab 1: materiContent
  if (!copy.materiContent) {
    copy.materiContent = {
      text: copy.standardContent?.text || copy.description || '',
      image: copy.image || '/es_batu_card.jpg',
      audioUrl: copy.audioUrl || '',
      points: (copy.learningPoints || []).map((lp, idx) => ({
        id: lp.id || `p-${idx + 1}`,
        title: typeof lp === 'string' ? lp : lp.title || `Poin ${idx + 1}`,
        desc: lp.desc || ''
      }))
    }
  } else {
    if (copy.materiContent.audioUrl === undefined) {
      copy.materiContent.audioUrl = copy.audioUrl || ''
    }
  }
  if (!copy.materiContent.points) copy.materiContent.points = []

  // Tab 2: videos
  if (!copy.videos) {
    copy.videos = {
      video1: {
        title: copy.standardContent?.title || 'Video 1: Pengenalan Konsep',
        url: copy.standardContent?.videoUrl || copy.videoUrl || ''
      },
      video2: {
        title: copy.slowContent?.title || 'Video 2: Praktik & Eksperimen',
        url: copy.slowContent?.videoUrl || ''
      }
    }
  } else {
    if (!copy.videos.video1) copy.videos.video1 = { title: 'Video 1', url: '' }
    if (!copy.videos.video2) copy.videos.video2 = { title: 'Video 2', url: '' }
  }

  videoInputMode.value = {
    video1: copy.videos.video1.url && !isYouTubeUrl(copy.videos.video1.url) && copy.videos.video1.url.includes('cloudinary') ? 'upload' : 'link',
    video2: copy.videos.video2.url && !isYouTubeUrl(copy.videos.video2.url) && copy.videos.video2.url.includes('cloudinary') ? 'upload' : 'link'
  }

  // Tab 3: quiz (pertahankan tipe soal interaktif yang ada)
  if (!copy.quiz) {
    const rawQs = copy.assessment?.questions || []
    copy.quiz = {
      title: copy.assessment?.title || 'Kuis Pemahaman Materi',
      questions: rawQs.map((q, idx) => ({
        ...q,
        id: q.id || `q-${idx + 1}`,
        type: q.type || 'multiple_choice',
        questionText: q.questionText || '',
        image: q.image || '',
        points: Number(q.points) || 50,
        options: Array.isArray(q.options) && q.options.length ? q.options : ['', '', '', ''],
        correctOptionIndex: typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0,
        explanation: q.explanation || ''
      }))
    }
  } else if (copy.quiz.questions) {
    copy.quiz.questions.forEach((q) => {
      if (!q.type) q.type = 'multiple_choice'
      if (!q.image) q.image = ''
      if (!q.points || isNaN(q.points)) q.points = 50
      if (q.type === 'multiple_choice' && (!q.options || !Array.isArray(q.options) || q.options.length < 4)) {
        const existing = Array.isArray(q.options) ? q.options : []
        q.options = [existing[0] || '', existing[1] || '', existing[2] || '', existing[3] || '']
      }
      if (q.type === 'true_false') {
        q.options = ['Benar', 'Salah']
      }
      if (q.type === 'matching' && (!q.pairs || !Array.isArray(q.pairs))) {
        q.pairs = [{ left: '', right: '' }]
      }
      if (q.type === 'ordering' && (!q.correctOrder || !Array.isArray(q.correctOrder))) {
        q.correctOrder = q.orderItems || ['', '']
      }
      if (q.type === 'fill_in_blank' && (!q.expectedAnswers || !Array.isArray(q.expectedAnswers))) {
        q.expectedAnswers = [q.options?.[q.correctOptionIndex] || '']
      }
      if (q.type === 'multi_select') {
        if (!q.options || !Array.isArray(q.options) || q.options.length < 4) {
          const existing = Array.isArray(q.options) ? q.options : []
          q.options = [existing[0] || '', existing[1] || '', existing[2] || '', existing[3] || '']
        }
        if (!Array.isArray(q.multiCorrectIndices)) q.multiCorrectIndices = [0]
      }
      if (typeof q.correctOptionIndex !== 'number') q.correctOptionIndex = 0
    })
  }

  copy.jenjang = 'SD'
  copy.level = normalizeLevelForForm(copy.level)

  currentForm.value = copy
  activeFormTab.value = 'materi'
  showForm.value = true
  syncRichTextFromModel()
}

const onQuestionTypeChange = (q) => {
  if (q.type === 'multiple_choice') {
    if (!Array.isArray(q.options) || q.options.length < 4) {
      q.options = ['', '', '', '']
    }
    if (typeof q.correctOptionIndex !== 'number') q.correctOptionIndex = 0
  } else if (q.type === 'true_false') {
    q.options = ['Benar', 'Salah']
    if (q.correctOptionIndex !== 0 && q.correctOptionIndex !== 1) q.correctOptionIndex = 0
  } else if (q.type === 'matching') {
    if (!Array.isArray(q.pairs) || q.pairs.length === 0) {
      q.pairs = [{ left: '', right: '' }, { left: '', right: '' }]
    }
  } else if (q.type === 'ordering') {
    if (!Array.isArray(q.correctOrder) || q.correctOrder.length === 0) {
      q.correctOrder = ['', '', '']
    }
  } else if (q.type === 'fill_in_blank') {
    if (!Array.isArray(q.expectedAnswers) || q.expectedAnswers.length === 0) {
      q.expectedAnswers = ['']
    }
  } else if (q.type === 'multi_select') {
    if (!Array.isArray(q.options) || q.options.length < 4) {
      q.options = ['', '', '', '']
    }
    if (!Array.isArray(q.multiCorrectIndices)) q.multiCorrectIndices = [0]
  }
}

const addMatchingPairToQ = (q) => {
  if (!Array.isArray(q.pairs)) q.pairs = []
  q.pairs.push({ left: '', right: '' })
}

const removeMatchingPairFromQ = (q, idx) => {
  if (Array.isArray(q.pairs) && q.pairs.length > 1) {
    q.pairs.splice(idx, 1)
  }
}

const addOrderItemToQ = (q) => {
  if (!Array.isArray(q.correctOrder)) q.correctOrder = []
  q.correctOrder.push('')
}

const removeOrderItemFromQ = (q, idx) => {
  if (Array.isArray(q.correctOrder) && q.correctOrder.length > 2) {
    q.correctOrder.splice(idx, 1)
  }
}

const toggleMultiSelectIndex = (q, optIdx) => {
  if (!Array.isArray(q.multiCorrectIndices)) q.multiCorrectIndices = []
  const pos = q.multiCorrectIndices.indexOf(optIdx)
  if (pos >= 0) {
    if (q.multiCorrectIndices.length > 1) q.multiCorrectIndices.splice(pos, 1)
  } else {
    q.multiCorrectIndices.push(optIdx)
  }
}

const addLearningPoint = () => {
  if (!currentForm.value.materiContent) {
    currentForm.value.materiContent = { points: [] }
  }
  if (!currentForm.value.materiContent.points) {
    currentForm.value.materiContent.points = []
  }
  currentForm.value.materiContent.points.push({
    id: `lp-${Date.now()}`,
    title: '',
    desc: ''
  })
}

const removeLearningPoint = (idx) => {
  if (currentForm.value.materiContent?.points) {
    currentForm.value.materiContent.points.splice(idx, 1)
  }
}

const addQuestion = () => {
  if (!currentForm.value.quiz) {
    currentForm.value.quiz = { title: 'Kuis Pemahaman Materi', questions: [] }
  }
  if (!currentForm.value.quiz.questions) {
    currentForm.value.quiz.questions = []
  }
  currentForm.value.quiz.questions.push({
    id: `q-${Date.now()}`,
    type: 'multiple_choice',
    questionText: '',
    image: '',
    points: 50,
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    explanation: ''
  })
}

const removeQuestion = (idx) => {
  if (currentForm.value.quiz?.questions) {
    currentForm.value.quiz.questions.splice(idx, 1)
  }
}

const handleQuizImageUpload = async (file, qIdx) => {
  if (!file) return
  isUploadingQuizImage.value[qIdx] = true
  try {
    const res = await uploadImage(file, () => {}, `quiz_q${qIdx}_${Date.now()}`)
    if (res?.secure_url) {
      if (!currentForm.value.quiz) currentForm.value.quiz = { questions: [] }
      if (!currentForm.value.quiz.questions[qIdx]) return
      currentForm.value.quiz.questions[qIdx].image = res.secure_url
    }
  } catch (err) {
    alert(`Upload gambar soal gagal: ${err.message}`)
  } finally {
    isUploadingQuizImage.value[qIdx] = false
  }
}

const removeQuizImage = (qIdx) => {
  if (currentForm.value.quiz?.questions?.[qIdx]) {
    currentForm.value.quiz.questions[qIdx].image = ''
  }
}

const handleSave = async () => {
  if (!currentForm.value.title.trim()) {
    alert('Judul materi wajib diisi')
    return
  }
  if (isUploadingVideo.value || isUploadingImage.value || isUploadingAudio.value) {
    alert('Tunggu sebentar, unggahan media (video/gambar/audio) masih berjalan. Simpan setelah selesai.')
    return
  }

  isSaving.value = true
  try {
    // Sinkronisasi soal kuis tipe matching, ordering, fill_in_blank agar konsisten dengan player siswa
    if (currentForm.value.quiz?.questions) {
      currentForm.value.quiz.questions.forEach((q) => {
        if (q.type === 'matching' && Array.isArray(q.pairs)) {
          const validPairs = q.pairs.filter(p => p.left?.trim() && p.right?.trim())
          q.pairs = validPairs
          q.leftItems = validPairs.map(p => p.left.trim())
          // Acak sedikit urutan kanan jika belum ada rightItems atau item berubah
          const rights = validPairs.map(p => p.right.trim())
          q.rightItems = rights.length > 1 ? [...rights.slice(1), rights[0]] : rights
          q.options = validPairs.map(p => `${p.left} = ${p.right}`)
        } else if (q.type === 'ordering' && Array.isArray(q.correctOrder)) {
          const cleanOrder = q.correctOrder.map(s => String(s).trim()).filter(Boolean)
          q.correctOrder = cleanOrder
          q.orderItems = cleanOrder.length > 1 ? [...cleanOrder].reverse() : cleanOrder
        } else if (q.type === 'fill_in_blank') {
          const ans = q.expectedAnswers?.[0]?.trim() || ''
          q.expectedAnswers = ans ? [ans] : []
          q.options = ans ? [ans] : []
          q.correctOptionIndex = 0
        }
      })
    }

    // Sinkronisasi data utama (1 tombol simpan otomatis update lokal + cloud)
    currentForm.value.image = currentForm.value.materiContent?.image || currentForm.value.image || '/es_batu_card.jpg'
    currentForm.value.audioUrl = currentForm.value.materiContent?.audioUrl || currentForm.value.audioUrl || ''
    currentForm.value.videoUrl = currentForm.value.videos?.video1?.url || ''
    currentForm.value.standardContent = {
      title: currentForm.value.videos?.video1?.title || currentForm.value.title,
      text: currentForm.value.materiContent?.text || currentForm.value.description,
      videoUrl: currentForm.value.videos?.video1?.url || ''
    }
    currentForm.value.slowContent = {
      title: currentForm.value.videos?.video2?.title || `${currentForm.value.title} (Video 2)`,
      text: currentForm.value.materiContent?.text || currentForm.value.description,
      videoUrl: currentForm.value.videos?.video2?.url || ''
    }
    currentForm.value.assessment = currentForm.value.quiz
    currentForm.value.learningPoints = (currentForm.value.materiContent?.points || []).map(p => ({
      id: p.id || `lp-${Date.now()}`,
      title: p.title || '',
      desc: p.desc || ''
    }))

    if (isEditing.value && currentForm.value.id) {
      await updateMateri(currentForm.value.id, currentForm.value)
    } else {
      await addMateri(currentForm.value)
    }

    playMascotChime()
    showForm.value = false
    triggerSaveToast(`Materi "${currentForm.value.title}" berhasil disimpan!`)
  } finally {
    isSaving.value = false
  }
}

const handleDelete = async (id, title) => {
  if (confirm(`Hapus materi "${title}"?\nData yang dihapus tidak dapat dikembalikan.`)) {
    await deleteMateri(id)
    triggerSaveToast(`Materi "${title}" telah dihapus.`)
  }
}

// Video upload handler for Video 1 & Video 2
const doUpload = async (file, videoKey) => {
  uploadTargetKey.value = videoKey
  uploadProgress.value = 0

  if (!isCloudinaryConfigured) {
    alert('Penyimpanan video cloud belum diatur. Bapak/Ibu bisa menggunakan Link YouTube terlebih dahulu.')
    uploadTargetKey.value = null
    return
  }

  isUploadingVideo.value = true
  try {
    const rawId = currentForm.value.id || currentForm.value.title || 'video'
    const cleanSlug = rawId.toString().toLowerCase().replace(/[^a-z0-9]/g, '_')
    const customPublicId = `prisma_${cleanSlug}_${videoKey}_${Date.now()}`
    const res = await uploadVideo(file, (pct) => { uploadProgress.value = pct }, customPublicId)
    if (!currentForm.value.videos) currentForm.value.videos = {}
    if (!currentForm.value.videos[videoKey]) currentForm.value.videos[videoKey] = { title: '', url: '' }
    currentForm.value.videos[videoKey].url = res.secure_url
  } catch (err) {
    alert(`Upload video gagal: ${err.message}. Bapak/Ibu dapat menggunakan Link YouTube sebagai alternatif.`)
  } finally {
    isUploadingVideo.value = false
    uploadTargetKey.value = null
    uploadProgress.value = 0
  }
}

const handleDrop = async (e, videoKey) => {
  e.preventDefault()
  dragOverKey.value = null
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('video/')) {
    await doUpload(file, videoKey)
  }
}

const handleFileInput = async (e, videoKey) => {
  const file = e.target.files[0]
  if (file) await doUpload(file, videoKey)
}

// Image upload for materi thumbnail
const handleImageUpload = async (file) => {
  if (!file) return
  isUploadingImage.value = true
  imageUploadProgress.value = 0
  try {
    const rawId = currentForm.value.id || currentForm.value.title || 'thumb'
    const cleanSlug = rawId.toString().toLowerCase().replace(/[^a-z0-9]/g, '_')
    const customPublicId = `img_${cleanSlug}_${Date.now()}`
    const res = await uploadImage(file, (pct) => { imageUploadProgress.value = pct }, customPublicId)
    if (!currentForm.value.materiContent) {
      currentForm.value.materiContent = { image: '' }
    }
    currentForm.value.materiContent.image = res.secure_url
    currentForm.value.image = res.secure_url
  } catch (err) {
    alert(`Upload gambar gagal: ${err.message}`)
  } finally {
    isUploadingImage.value = false
    imageUploadProgress.value = 0
  }
}

const handleImageFileInput = async (e) => {
  const file = e.target.files[0]
  if (file) await handleImageUpload(file)
}

const handleImageDrop = async (e) => {
  e.preventDefault()
  dragOverKey.value = null
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    await handleImageUpload(file)
  }
}

// Audio upload for materi narration
const handleAudioUpload = async (file) => {
  if (!file) return
  isUploadingAudio.value = true
  audioUploadProgress.value = 0
  try {
    const rawId = currentForm.value.id || currentForm.value.title || 'audio'
    const cleanSlug = rawId.toString().toLowerCase().replace(/[^a-z0-9]/g, '_')
    const customPublicId = `audio_${cleanSlug}_${Date.now()}`
    const res = await uploadAudio(file, (pct) => { audioUploadProgress.value = pct }, customPublicId)
    if (!currentForm.value.materiContent) {
      currentForm.value.materiContent = { audioUrl: '' }
    }
    currentForm.value.materiContent.audioUrl = res.secure_url
  } catch (err) {
    alert(`Upload audio gagal: ${err.message}`)
  } finally {
    isUploadingAudio.value = false
    audioUploadProgress.value = 0
  }
}

const handleAudioFileInput = async (e) => {
  const file = e.target.files[0]
  if (file) await handleAudioUpload(file)
}

const handleAudioDrop = async (e) => {
  e.preventDefault()
  dragOverKey.value = null
  const file = e.dataTransfer.files[0]
  if (file && (file.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg|aac)$/i.test(file.name))) {
    await handleAudioUpload(file)
  }
}

const removeAudio = () => {
  if (currentForm.value.materiContent) {
    currentForm.value.materiContent.audioUrl = ''
  }
}

// Helper kelengkapan media per materi
const getVideoCount = (m) => {
  let c = 0
  const v1 = m.videos?.video1?.url || m.standardContent?.videoUrl || m.videoUrl
  const v2 = m.videos?.video2?.url || m.slowContent?.videoUrl
  if (v1 && String(v1).trim()) c++
  if (v2 && String(v2).trim()) c++
  return c
}

const hasAudio = (m) => {
  const url = m.materiContent?.audioUrl || m.audioUrl
  return Boolean(url && String(url).trim())
}

const getQuestionCount = (m) => {
  return m.quiz?.questions?.length ?? m.assessment?.questions?.length ?? 0
}

// Daftar materi sesuai hak akses admin (Master Admin: semua kelas, Admin Kelas 1-6: khusus kelasnya)
const scopedMateriList = computed(() => {
  if (adminManagedKelas.value) {
    return materiList.value.filter(m => normalizeLevelForForm(m.level) === adminManagedKelas.value)
  }
  return materiList.value
})

// Computed stats (akurat berdasarkan ruang lingkup admin)
const totalVideos = computed(() => scopedMateriList.value.reduce((a, m) => a + getVideoCount(m), 0))
const totalAudioMateri = computed(() => scopedMateriList.value.filter(hasAudio).length)
const totalQuizQuestions = computed(() => scopedMateriList.value.reduce((a, m) => a + getQuestionCount(m), 0))

const availableTableKelasOptions = KELAS_SD_OPTIONS

// Filtered table
const filteredMateri = computed(() => {
  let list = scopedMateriList.value
  if (!adminManagedKelas.value && selectedKelasFilter.value !== 'Semua') {
    list = list.filter(m => normalizeLevelForForm(m.level) === selectedKelasFilter.value)
  }
  if (tableSearch.value.trim()) {
    const q = tableSearch.value.toLowerCase()
    list = list.filter(m =>
      m.title?.toLowerCase().includes(q) ||
      m.level?.toLowerCase().includes(q) ||
      m.mataPelajaran?.toLowerCase().includes(q)
    )
  }
  return list
})
</script>

<template>
  <!-- ====== ACCESS GUARD ====== -->
  <div v-if="!isAdmin" class="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF8F0] p-4 font-['Lexend']">
    <div class="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#8F8575]/30 shadow-xl text-center max-w-md w-full space-y-6">
      <div class="w-16 h-16 rounded-2xl bg-[#FFDE7A]/30 border-2 border-[#FFDE7A] flex items-center justify-center mx-auto text-[#1E7A6F]">
        <ShieldAlert class="w-8 h-8 text-[#1E7A6F]" />
      </div>
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">Akses Khusus Guru</h2>
        <p class="text-sm text-[#2B3445]/70 mt-2 leading-relaxed">Halaman ini khusus untuk Bapak/Ibu Guru atau pengelola materi pembelajaran PRISMA.</p>
      </div>
      <div class="flex flex-col gap-3">
        <button
          @click="emit('openAuth')"
          class="btn-prisma-mint w-full py-3.5 rounded-2xl font-bold text-sm text-[#FFF8F0] cursor-pointer shadow-md hover:brightness-105 active:scale-95 transition"
        >
          Masuk ke Panel Guru
        </button>
        <button
          @click="emit('backToApp')"
          class="btn-prisma-white w-full py-3 rounded-2xl font-bold text-sm text-[#2B3445] border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] transition cursor-pointer"
        >
          Kembali ke Halaman Belajar
        </button>
      </div>
    </div>
  </div>

  <!-- ====== FULL-SCREEN PANEL GURU (1 HALAMAN TERPADU TANPA SIDEBAR) ====== -->
  <template v-else>
    <div class="fixed inset-0 z-40 flex flex-col bg-[#FFF8F0] overflow-hidden font-['Lexend'] text-[#2B3445]">

      <!-- ==================== TOP HEADER BAR ==================== -->
      <header class="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-white border-b-2 border-[#8F8575]/25 shadow-2xs flex-wrap">
        <!-- Left: Logo & Brand -->
        <div class="flex items-center gap-3">
          <img src="/Logo.png" alt="Prisma" class="w-9 h-9 object-contain shrink-0" />
          <div>
            <div class="flex items-center gap-2">
              <p class="font-bold font-['Baloo_2'] text-lg text-[#2B3445] leading-none">Prisma</p>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#7FD4C4]/25 text-[#1E7A6F] border border-[#7FD4C4]">
                Panel Guru
              </span>
            </div>
            <p class="text-[11px] text-[#5B6474] font-medium mt-0.5 hidden sm:block">
              {{ showForm ? (isEditing ? 'Mengedit Materi Pembelajaran' : 'Menambah Materi Baru') : 'Kelola Bacaan, Audio, Video & Kuis Siswa' }}
            </p>
          </div>
        </div>

        <!-- Right: Cloud status, App link, User, Logout -->
        <div class="flex items-center gap-2 sm:gap-3">
          <div :class="[
            'hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2',
            isSupabaseConfigured
              ? 'bg-[#7FD4C4]/20 border-[#7FD4C4] text-[#1E7A6F]'
              : 'bg-[#FFDE7A]/30 border-[#FFDE7A] text-[#2B3445]'
          ]">
            <span class="w-2 h-2 rounded-full" :class="isSupabaseConfigured ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'"></span>
            {{ isSupabaseConfigured ? 'Tersambung ke Cloud' : 'Mode Lokal' }}
          </div>

          <button
            @click="emit('backToApp')"
            class="px-3.5 py-2 rounded-2xl bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 border-2 border-[#8F8575]/25 text-[#2B3445] transition cursor-pointer flex items-center gap-1.5 text-xs font-bold active:scale-95"
            title="Kembali ke Halaman Belajar Siswa"
          >
            <ArrowLeft class="w-4 h-4 text-[#1E7A6F]" />
            <span class="hidden sm:inline">Lihat Aplikasi Belajar</span>
          </button>

          <!-- User chip -->
          <div class="hidden sm:flex items-center gap-2 pl-2 border-l-2 border-[#8F8575]/20">
            <div class="text-right">
              <p class="text-xs font-bold font-['Baloo_2'] text-[#2B3445] leading-none">{{ currentUser?.name }}</p>
              <p class="text-[10px] text-[#1E7A6F] font-bold mt-0.5">
                {{ adminManagedKelas ? `Admin ${adminManagedKelas}` : 'Master Admin (Kelas 1–6)' }}
              </p>
            </div>
            <div class="w-8 h-8 rounded-xl bg-[#1E7A6F] text-[#FFF8F0] border-2 border-[#7FD4C4] flex items-center justify-center text-xs shadow-2xs font-bold">
              {{ currentUser?.avatar || '👩‍🏫' }}
            </div>
          </div>

          <button
            @click="logoutUser(); emit('backToApp')"
            class="p-2 sm:px-3 sm:py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold active:scale-95"
            title="Keluar dari Panel Guru"
          >
            <LogOut class="w-4 h-4" />
            <span class="hidden lg:inline">Keluar</span>
          </button>
        </div>
      </header>

      <!-- ==================== MAIN CONTENT AREA ==================== -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FFF8F0]">

        <!-- Toast Notifikasi Simpan Sukses -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="saveToast.show"
            class="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#1E7A6F] text-white shadow-xl border-2 border-[#7FD4C4] text-sm font-bold"
          >
            <CheckCircle2 class="w-5 h-5 text-[#7FD4C4] shrink-0" />
            <span>{{ saveToast.message }}</span>
          </div>
        </Transition>

        <!-- Page Content (scrollable) -->
        <main class="flex-1 overflow-y-auto bg-[#FFF8F0]">

          <!-- ============ FORM EDITOR (3 Langkah Jelas untuk Guru) ============ -->
          <div v-if="showForm" class="h-full flex flex-col font-['Lexend']">
            <!-- Form Header -->
            <div class="bg-white border-b-2 border-[#8F8575]/25 px-6 py-4 flex items-center justify-between gap-3 shrink-0 shadow-2xs flex-wrap">
              <div class="flex items-center gap-3">
                <button @click="showForm = false" class="p-2 rounded-2xl hover:bg-[#FFF8F0] border-2 border-[#8F8575]/20 text-[#2B3445] cursor-pointer transition">
                  <ArrowLeft class="w-5 h-5" />
                </button>
                <div>
                  <h2 class="text-xl font-bold font-['Baloo_2'] text-[#2B3445]">{{ isEditing ? 'Edit Materi' : 'Tambah Materi Baru' }}</h2>
                  <p class="text-xs text-[#2B3445]/60 font-medium">Lengkapi bacaan, video, dan soal kuis untuk siswa</p>
                </div>
              </div>
              <div class="flex items-center gap-2.5">
                <button
                  v-if="isEditing && currentForm.id"
                  type="button"
                  @click="emit('previewMateri', currentForm)"
                  class="btn-prisma-white flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/30 text-xs sm:text-sm font-bold text-[#2B3445] hover:bg-[#FFF8F0] transition cursor-pointer"
                >
                  <Eye class="w-4 h-4 text-[#1E7A6F]" />
                  <span class="hidden sm:inline">Lihat Tampilan Siswa</span>
                </button>
                <button
                  @click="handleSave"
                  :disabled="isSaving"
                  class="btn-prisma-mint flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[#FFF8F0] text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition cursor-pointer disabled:opacity-60"
                >
                  <RefreshCw v-if="isSaving" class="w-4 h-4 animate-spin" />
                  <Save v-else class="w-4 h-4" />
                  <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Materi' }}</span>
                </button>
              </div>
            </div>

            <!-- Form Body -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 sm:pb-8 bg-[#FFF8F0]">
              <div class="max-w-5xl mx-auto space-y-6">

                <!-- Tab Pills (3 Langkah Jelas, Muat Tanpa Scroll Horizontal di Mobile) -->
                <div class="grid grid-cols-3 sm:flex items-center gap-2 sm:gap-2.5">
                  <button
                    v-for="(label, key) in {
                      materi: '1. Bacaan & Audio',
                      video: '2. Video Belajar',
                      quiz: '3. Kuis & Soal'
                    }"
                    :key="key"
                    @click="activeFormTab = key"
                    :class="[
                      'flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 rounded-2xl text-[11px] sm:text-sm font-bold text-center transition cursor-pointer border-2 shadow-2xs leading-tight',
                      activeFormTab === key
                        ? 'bg-[#1E7A6F] text-[#FFF8F0] border-[#1E7A6F] shadow-sm'
                        : 'bg-white text-[#2B3445]/70 border-[#8F8575]/25 hover:border-[#1E7A6F]/50 hover:text-[#2B3445]'
                    ]"
                  >
                    <BookOpen v-if="key === 'materi'" class="w-4 h-4 shrink-0" />
                    <Video v-else-if="key === 'video'" class="w-4 h-4 shrink-0" />
                    <Sparkles v-else class="w-4 h-4 shrink-0" />
                    <span>{{ label }}</span>
                  </button>
                </div>

                <!-- ---- TAB 1: BACAAN, GAMBAR & AUDIO ---- -->
                <div v-if="activeFormTab === 'materi'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <!-- Left column -->
                  <div class="lg:col-span-2 space-y-5">
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                        <AlignLeft class="w-4 h-4 text-[#1E7A6F]" /> Informasi & Cerita Materi
                      </h3>
                      <div>
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Judul Materi *</label>
                        <input
                          v-model="currentForm.title"
                          placeholder="Contoh: Bab 1: Panen Tomat di Kebun Nenek"
                          class="w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445] font-bold"
                        />
                      </div>
                      <div>
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Deskripsi Singkat</label>
                        <textarea
                          v-model="currentForm.description"
                          rows="2"
                          placeholder="Gambaran singkat tentang materi ini untuk ditampilkan ke siswa..."
                          class="w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445] resize-none"
                        ></textarea>
                      </div>

                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Mata Pelajaran</label>
                          <select v-model="currentForm.mataPelajaran" class="w-full px-3 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] text-sm text-[#2B3445] font-semibold focus:bg-white focus:border-[#1E7A6F] focus:outline-none cursor-pointer">
                            <option value="Bahasa Indonesia & Matematika">Bahasa Indonesia & Matematika</option>
                            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                            <option value="Matematika">Matematika</option>
                            <option value="IPAS">IPAS</option>
                            <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                            <option value="Seni Budaya">Seni Budaya</option>
                          </select>
                        </div>
                        <div>
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Kelas</label>
                          <select
                            v-model="currentForm.level"
                            :disabled="Boolean(adminManagedKelas)"
                            class="w-full px-3 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] text-sm text-[#2B3445] font-semibold focus:bg-white focus:border-[#1E7A6F] focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            <option
                              v-for="opt in levelOptions"
                              :key="opt.value"
                              :value="opt.value"
                            >
                              {{ opt.label }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <!-- Isi Lengkap Teks Bacaan Materi (Rich Text Editor ala Word) -->
                      <div class="pt-3 border-t-2 border-[#8F8575]/15 space-y-2">
                        <div class="flex items-center justify-between flex-wrap gap-2">
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide flex items-center gap-1.5">
                            <FileText class="w-4 h-4 text-[#1E7A6F]" />
                            <span>Isi Teks Bacaan Cerita *</span>
                          </label>
                          <span class="text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/25 px-2.5 py-0.5 rounded-full">Tebal, Miring, Garis Bawah & Poin</span>
                        </div>

                        <!-- Toolbar Format Teks -->
                        <div class="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 flex-wrap">
                          <button
                            type="button"
                            @mousedown.prevent="applyFormat('bold')"
                            class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#7FD4C4]/25 border border-[#8F8575]/20 text-[#2B3445] text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                            title="Tebal (Bold)"
                          >
                            <Bold class="w-3.5 h-3.5" />
                            <span>Tebal</span>
                          </button>
                          <button
                            type="button"
                            @mousedown.prevent="applyFormat('italic')"
                            class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#7FD4C4]/25 border border-[#8F8575]/20 text-[#2B3445] text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                            title="Miring (Italic)"
                          >
                            <Italic class="w-3.5 h-3.5" />
                            <span>Miring</span>
                          </button>
                          <button
                            type="button"
                            @mousedown.prevent="applyFormat('underline')"
                            class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#7FD4C4]/25 border border-[#8F8575]/20 text-[#2B3445] text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                            title="Garis Bawah (Underline)"
                          >
                            <Underline class="w-3.5 h-3.5" />
                            <span>Garis Bawah</span>
                          </button>
                          <div class="w-px h-5 bg-[#8F8575]/25 mx-0.5"></div>
                          <button
                            type="button"
                            @mousedown.prevent="applyFormat('insertUnorderedList')"
                            class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#7FD4C4]/25 border border-[#8F8575]/20 text-[#2B3445] text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                            title="Daftar Poin-poin"
                          >
                            <List class="w-3.5 h-3.5" />
                            <span>Poin</span>
                          </button>
                          <button
                            type="button"
                            @mousedown.prevent="applyFormat('insertOrderedList')"
                            class="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#7FD4C4]/25 border border-[#8F8575]/20 text-[#2B3445] text-xs font-bold flex items-center gap-1 cursor-pointer transition"
                            title="Daftar Bernomor"
                          >
                            <ListOrdered class="w-3.5 h-3.5" />
                            <span>Nomor</span>
                          </button>
                        </div>

                        <!-- Area Ketik Rich Text (dengan placeholder di latar belakang) -->
                        <div
                          ref="richTextEditorRef"
                          contenteditable="true"
                          @input="onRichTextInput"
                          data-placeholder="Tuliskan cerita atau uraian materi di sini dengan bahasa yang mudah dipahami anak SD..."
                          class="rich-editor min-h-[190px] max-h-[420px] overflow-y-auto w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445] font-medium leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_u]:underline"
                        ></div>
                      </div>
                    </div>

                    <!-- Poin-Poin Penting Belajar -->
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <div class="flex items-center justify-between">
                        <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                          <Sparkles class="w-4 h-4 text-[#FFDE7A]" /> Poin Penting Belajar (Opsional)
                        </h3>
                        <button
                          type="button"
                          @click="addLearningPoint"
                          class="text-xs font-bold text-[#1E7A6F] hover:underline flex items-center gap-1 cursor-pointer bg-[#7FD4C4]/20 px-3 py-1 rounded-xl"
                        >
                          + Tambah Poin
                        </button>
                      </div>
                      <div class="space-y-3">
                        <div
                          v-for="(lp, idx) in currentForm.materiContent?.points"
                          :key="lp.id || idx"
                          class="flex items-start gap-2 bg-[#FFF8F0] p-3.5 rounded-2xl border-2 border-[#8F8575]/20"
                        >
                          <span class="w-6 h-6 rounded-full bg-[#1E7A6F] text-[#FFF8F0] text-xs font-bold flex items-center justify-center shrink-0 mt-1 font-['Baloo_2']">
                            {{ idx + 1 }}
                          </span>
                          <div class="flex-1 space-y-2">
                            <input
                              v-model="lp.title"
                              placeholder="Judul poin..."
                              class="w-full px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-white text-xs font-bold text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                            />
                            <input
                              v-model="lp.desc"
                              placeholder="Penjelasan singkat poin ini..."
                              class="w-full px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-white text-xs focus:border-[#1E7A6F] focus:outline-none text-[#2B3445]/80"
                            />
                          </div>
                          <button
                            type="button"
                            @click="removeLearningPoint(idx)"
                            class="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer mt-1"
                            title="Hapus Poin"
                          >
                            <X class="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right column: thumbnail image & audio -->
                  <div class="space-y-5">
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                        <ImagePlus class="w-4 h-4 text-[#1E7A6F]" /> Gambar Sampul Materi
                      </h3>

                      <div
                        @dragover.prevent="dragOverKey = 'image'"
                        @dragleave="dragOverKey = null"
                        @drop="handleImageDrop"
                        :class="[
                          'relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-dashed transition group text-center flex items-center justify-center',
                          dragOverKey === 'image' ? 'border-[#1E7A6F] bg-[#7FD4C4]/20' : 'border-[#8F8575]/35 bg-[#FFF8F0] hover:border-[#1E7A6F]'
                        ]"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          class="absolute inset-0 opacity-0 cursor-pointer z-10"
                          @change="handleImageFileInput"
                        />
                        <img
                          :src="currentForm.materiContent?.image || currentForm.image || '/es_batu_card.jpg'"
                          alt="Thumbnail Preview"
                          class="w-full h-full object-cover"
                          @error="$event.target.src = '/es_batu_card.jpg'"
                        />
                        <div class="absolute inset-0 bg-[#2B3445]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-1 p-3 pointer-events-none">
                          <UploadCloud class="w-7 h-7 text-[#7FD4C4]" />
                          <span class="text-xs font-bold">Klik untuk Ganti Gambar</span>
                        </div>
                        <div v-if="isUploadingImage" class="absolute inset-0 bg-[#2B3445]/85 flex flex-col items-center justify-center text-white z-20 space-y-2">
                          <RefreshCw class="w-6 h-6 animate-spin text-[#7FD4C4]" />
                          <span class="text-xs font-bold">Mengunggah... {{ imageUploadProgress }}%</span>
                        </div>
                      </div>

                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <label class="btn-prisma-white py-2.5 px-3 rounded-2xl border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] text-xs font-bold text-[#1E7A6F] flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                          <ImagePlus class="w-4 h-4 shrink-0" />
                          <span>Pilih dari Laptop</span>
                          <input type="file" accept="image/*" class="hidden" @change="handleImageFileInput" />
                        </label>
                        <button
                          type="button"
                          @click="openImageSearch('cover')"
                          class="py-2.5 px-3 rounded-2xl border-2 border-[#1E7A6F]/30 bg-[#7FD4C4]/20 hover:bg-[#7FD4C4]/35 text-xs font-bold text-[#1E7A6F] flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Search class="w-4 h-4 shrink-0" />
                          <span>Cari Gambar</span>
                        </button>
                      </div>
                    </div>

                    <!-- Audio Narasi Suara Materi -->
                    <div class="bg-white rounded-3xl p-6 border-2 border-[#8F8575]/25 shadow-2xs space-y-4">
                      <div class="flex items-center justify-between">
                        <h3 class="text-base font-bold font-['Baloo_2'] text-[#1E7A6F] flex items-center gap-2">
                          <Volume2 class="w-4 h-4 text-[#1E7A6F]" /> Suara Bacaan (Audio)
                        </h3>
                        <span v-if="currentForm.materiContent?.audioUrl" class="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#7FD4C4]/30 text-[#1E7A6F]">
                          Terpasang
                        </span>
                      </div>
                      <p class="text-xs text-[#2B3445]/70 leading-relaxed">
                        Unggah rekaman suara bacaan (.mp3, .wav, .m4a) agar siswa dapat mendengarkan cerita.
                      </p>

                      <div v-if="currentForm.materiContent?.audioUrl" class="p-3.5 bg-[#FFF8F0] border-2 border-[#7FD4C4] rounded-2xl space-y-2.5">
                        <div class="flex items-center justify-between">
                          <span class="text-xs font-bold text-[#1E7A6F] flex items-center gap-1.5">
                            <Music class="w-3.5 h-3.5 text-[#1E7A6F]" /> Audio Terpasang
                          </span>
                          <button
                            type="button"
                            @click="removeAudio"
                            class="text-xs font-bold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                        <audio :src="currentForm.materiContent.audioUrl" controls class="w-full h-9 rounded-xl"></audio>
                      </div>

                      <div
                        @dragover.prevent="dragOverKey = 'audio'"
                        @dragleave="dragOverKey = null"
                        @drop="handleAudioDrop"
                        :class="[
                          'relative border-2 border-dashed rounded-2xl p-4 text-center transition cursor-pointer',
                          dragOverKey === 'audio' ? 'border-[#1E7A6F] bg-[#7FD4C4]/20' : 'border-[#8F8575]/35 bg-[#FFF8F0] hover:border-[#1E7A6F]'
                        ]"
                      >
                        <input
                          type="file"
                          accept="audio/*, .mp3, .wav, .m4a, .ogg"
                          class="absolute inset-0 opacity-0 cursor-pointer z-10"
                          @change="handleAudioFileInput"
                        />
                        <div v-if="isUploadingAudio" class="space-y-1.5 py-1">
                          <RefreshCw class="w-6 h-6 text-[#1E7A6F] mx-auto animate-spin" />
                          <p class="text-xs text-[#1E7A6F] font-bold">Mengunggah Audio... {{ audioUploadProgress }}%</p>
                        </div>
                        <div v-else class="flex flex-col items-center justify-center gap-1 text-[#2B3445]/75">
                          <UploadCloud class="w-6 h-6 text-[#1E7A6F]" />
                          <span class="text-xs font-bold text-[#2B3445]">Klik untuk Unggah Rekaman Suara</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ---- TAB 2: VIDEO BELAJAR (2 VIDEO SIMPEL) ---- -->
                <div v-if="activeFormTab === 'video'" class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden p-6 space-y-6">
                  <div class="p-4 rounded-2xl bg-[#7FD4C4]/15 border-2 border-[#7FD4C4]/60 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-[#1E7A6F] text-[#FFF8F0] flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                      🎬
                    </div>
                    <div>
                      <h3 class="font-bold font-['Baloo_2'] text-base text-[#1E7A6F]">Video Pembelajaran (Maksimal 2 Video)</h3>
                      <p class="text-xs text-[#2B3445]/80">Bapak/Ibu cukup memilih: tempel link YouTube atau unggah file video dari laptop.</p>
                    </div>
                  </div>

                  <!-- Loop Video 1 & Video 2 secara seragam -->
                  <div
                    v-for="(vKey, vIdx) in ['video1', 'video2']"
                    :key="vKey"
                    class="p-5 rounded-3xl border-2 border-[#8F8575]/25 bg-[#FFF8F0]/50 space-y-4"
                  >
                    <div class="flex items-center justify-between border-b-2 border-[#8F8575]/15 pb-3 flex-wrap gap-2">
                      <span class="px-3.5 py-1 rounded-xl bg-[#1E7A6F] text-white text-xs font-bold font-['Baloo_2']">
                        {{ vIdx === 0 ? 'Video 1 (Utama)' : 'Video 2 (Tambahan)' }}
                      </span>

                      <!-- Toggle Cara Input Sederhana -->
                      <div class="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#8F8575]/25">
                        <button
                          type="button"
                          @click="videoInputMode[vKey] = 'link'"
                          :class="[
                            'px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1',
                            videoInputMode[vKey] === 'link' ? 'bg-[#1E7A6F] text-white' : 'text-[#5B6474] hover:bg-[#FFF8F0]'
                          ]"
                        >
                          <Link2 class="w-3.5 h-3.5" /> Link YouTube / URL
                        </button>
                        <button
                          type="button"
                          @click="videoInputMode[vKey] = 'upload'"
                          :class="[
                            'px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1',
                            videoInputMode[vKey] === 'upload' ? 'bg-[#1E7A6F] text-white' : 'text-[#5B6474] hover:bg-[#FFF8F0]'
                          ]"
                        >
                          <UploadCloud class="w-3.5 h-3.5" /> Unggah File Video
                        </button>
                      </div>
                    </div>

                    <div>
                      <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">Judul {{ vIdx === 0 ? 'Video 1' : 'Video 2' }}</label>
                      <input
                        v-if="currentForm.videos?.[vKey]"
                        v-model="currentForm.videos[vKey].title"
                        :placeholder="vIdx === 0 ? 'Contoh: Video 1: Pengenalan Konsep' : 'Contoh: Video 2: Contoh Praktik'"
                        class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-sm font-bold text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                      />
                    </div>

                    <!-- Mode Link YouTube / URL -->
                    <div v-if="videoInputMode[vKey] === 'link'">
                      <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">
                        Tempel Link YouTube di Sini
                      </label>
                      <input
                        v-if="currentForm.videos?.[vKey]"
                        v-model="currentForm.videos[vKey].url"
                        placeholder="Contoh: https://www.youtube.com/watch?v=..."
                        class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-xs text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none"
                      />
                    </div>

                    <!-- Mode Upload File Video -->
                    <div v-else>
                      <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">Pilih File Video (MP4) dari Laptop</label>
                      <div
                        @dragover.prevent="dragOverKey = vKey"
                        @dragleave="dragOverKey = null"
                        @drop="handleDrop($event, vKey)"
                        :class="[
                          'relative border-2 border-dashed rounded-2xl p-5 text-center transition cursor-pointer',
                          dragOverKey === vKey ? 'border-[#1E7A6F] bg-[#7FD4C4]/20' : 'border-[#8F8575]/35 bg-white hover:border-[#1E7A6F]'
                        ]"
                      >
                        <input type="file" accept="video/*" class="absolute inset-0 opacity-0 cursor-pointer z-10" @change="handleFileInput($event, vKey)" />
                        <div v-if="uploadTargetKey === vKey && isUploadingVideo" class="space-y-1">
                          <UploadCloud class="w-6 h-6 text-[#1E7A6F] mx-auto animate-bounce" />
                          <p class="text-xs text-[#1E7A6F] font-bold">Mengunggah Video... {{ uploadProgress }}%</p>
                        </div>
                        <div v-else class="flex items-center justify-center gap-2 text-[#2B3445]/70 text-xs font-bold">
                          <UploadCloud class="w-5 h-5 text-[#1E7A6F]" />
                          <span>Klik atau tarik file video ke sini</span>
                        </div>
                      </div>
                    </div>

                    <!-- Preview Video -->
                    <div v-if="currentForm.videos?.[vKey]?.url" class="pt-1">
                      <span class="text-xs font-bold text-[#2B3445]/60 block mb-1.5">Pratinjau Video:</span>
                      <div class="w-full max-w-md aspect-video rounded-2xl overflow-hidden bg-black shadow-md border-2 border-[#8F8575]/25">
                        <iframe
                          v-if="isYouTubeUrl(currentForm.videos[vKey].url)"
                          :src="getYouTubeEmbedUrl(currentForm.videos[vKey].url)"
                          class="w-full h-full border-0"
                          allowfullscreen
                        ></iframe>
                        <video
                          v-else
                          :src="currentForm.videos[vKey].url"
                          controls
                          class="w-full h-full object-contain"
                        ></video>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ---- TAB 3: KUIS & SOAL (MENDUKUNG SEMUA TIPE SOAL PRISMA) ---- -->
                <div v-if="activeFormTab === 'quiz'" class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden p-6 space-y-6">
                  <div class="flex items-center justify-between p-4 rounded-2xl bg-[#FFDE7A]/25 border-2 border-[#FFDE7A]/70 flex-wrap gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-2xl bg-[#1E7A6F] text-[#FFF8F0] flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                        ✍️
                      </div>
                      <div>
                        <h3 class="font-bold font-['Baloo_2'] text-base text-[#2B3445]">Soal Kuis Interaktif</h3>
                        <p class="text-xs text-[#2B3445]/70">Atur pertanyaan, tipe soal (Pilihan Ganda, Hubungkan Garis, Urutkan, dll.), dan pembahasannya.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="addQuestion"
                      class="btn-prisma-mint px-4 py-2.5 rounded-2xl text-[#FFF8F0] text-xs font-bold hover:brightness-105 transition cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Plus class="w-4 h-4" /> Tambah Soal
                    </button>
                  </div>

                  <div>
                    <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1.5">Judul Kuis</label>
                    <input
                      v-if="currentForm.quiz"
                      v-model="currentForm.quiz.title"
                      placeholder="Contoh: Kuis Pemahaman Materi"
                      class="w-full px-4 py-3 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white text-sm font-bold text-[#2B3445]"
                    />
                  </div>

                  <!-- Ringkasan Total Poin -->
                  <div class="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 text-xs">
                    <span class="font-bold text-[#2B3445]">Total Poin Kuis ({{ currentForm.quiz?.questions?.length || 0 }} Soal):</span>
                    <span class="font-black text-sm text-[#1E7A6F] bg-white border-2 border-[#7FD4C4] px-3.5 py-1 rounded-xl shadow-2xs font-['Baloo_2']">
                      {{ currentForm.quiz?.questions?.reduce((acc, q) => acc + (Number(q.points) || 50), 0) || 0 }} Poin
                    </span>
                  </div>

                  <!-- Empty Questions -->
                  <div v-if="!currentForm.quiz?.questions?.length" class="text-center py-10 border-2 border-dashed border-[#8F8575]/35 rounded-3xl bg-[#FFF8F0]">
                    <HelpCircle class="w-10 h-10 text-[#8F8575]/60 mx-auto mb-2" />
                    <p class="text-sm font-bold text-[#2B3445]">Belum ada soal untuk materi ini</p>
                    <p class="text-xs text-[#2B3445]/60 mb-4">Klik tombol di bawah untuk membuat soal pertama</p>
                    <button
                      type="button"
                      @click="addQuestion"
                      class="btn-prisma-mint px-5 py-2.5 rounded-2xl text-[#FFF8F0] text-xs font-bold hover:brightness-105 transition cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus class="w-4 h-4" /> Tambah Soal Pertama
                    </button>
                  </div>

                  <!-- Questions List -->
                  <div v-else class="space-y-6">
                    <div
                      v-for="(q, qIdx) in currentForm.quiz.questions"
                      :key="q.id || qIdx"
                      class="p-5 rounded-3xl border-2 border-[#8F8575]/25 bg-[#FFF8F0]/50 space-y-4 relative group hover:border-[#1E7A6F] transition"
                    >
                      <!-- Header Soal -->
                      <div class="flex items-center justify-between border-b-2 border-[#8F8575]/15 pb-3 flex-wrap gap-2">
                        <div class="flex items-center gap-2.5 flex-wrap">
                          <span class="text-xs font-bold uppercase tracking-wider text-white bg-[#1E7A6F] px-3.5 py-1 rounded-xl font-['Baloo_2']">
                            Soal {{ qIdx + 1 }}
                          </span>

                          <!-- Pilihan Tipe Soal -->
                          <select
                            v-if="!isSpecialQuestionType(q.type)"
                            v-model="q.type"
                            @change="onQuestionTypeChange(q)"
                            class="text-xs font-bold text-[#2B3445] bg-white border-2 border-[#8F8575]/25 rounded-xl px-3 py-1 focus:border-[#1E7A6F] focus:outline-none cursor-pointer"
                          >
                            <option v-for="tOpt in EDITABLE_QUESTION_TYPES" :key="tOpt.value" :value="tOpt.value">
                              {{ tOpt.label }}
                            </option>
                          </select>
                          <span v-else class="text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/25 border border-[#7FD4C4] rounded-xl px-3 py-1">
                            {{ getQuestionTypeLabel(q.type) }}
                          </span>

                          <div class="flex items-center gap-1.5 bg-white border-2 border-[#8F8575]/25 rounded-xl px-2.5 py-1 shadow-2xs">
                            <span class="text-xs font-bold text-[#2B3445]/70">Poin:</span>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              v-model.number="q.points"
                              class="w-12 text-center text-xs font-black text-[#1E7A6F] focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          @click="removeQuestion(qIdx)"
                          class="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 class="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>

                      <!-- Pertanyaan Teks -->
                      <div>
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block mb-1">
                          Pertanyaan / Instruksi Soal *
                        </label>
                        <textarea
                          v-model="q.questionText"
                          rows="2"
                          placeholder="Tuliskan pertanyaan untuk siswa di sini..."
                          class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/25 bg-white text-sm text-[#2B3445] focus:border-[#1E7A6F] focus:outline-none resize-none font-medium"
                        ></textarea>
                      </div>

                      <!-- Gambar Soal (Opsional) -->
                      <div class="p-4 rounded-2xl bg-white border-2 border-[#8F8575]/20 space-y-2">
                        <div class="flex items-center justify-between">
                          <label class="text-xs font-bold text-[#2B3445] flex items-center gap-1.5">
                            <ImagePlus class="w-4 h-4 text-[#1E7A6F]" />
                            <span>Gambar Soal (Opsional)</span>
                          </label>
                          <button
                            v-if="q.image"
                            type="button"
                            @click="removeQuizImage(qIdx)"
                            class="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                          >
                            Hapus Gambar
                          </button>
                        </div>

                        <div v-if="q.image" class="w-full max-w-xs aspect-video rounded-2xl overflow-hidden border-2 border-[#8F8575]/25 bg-[#FFF8F0]">
                          <img :src="q.image" alt="Preview Gambar Soal" class="w-full h-full object-contain" />
                        </div>

                        <div class="flex items-center gap-2 flex-wrap">
                          <input
                            v-model="q.image"
                            placeholder="Tempel link gambar soal (opsional)..."
                            class="flex-1 min-w-[160px] px-3 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-[#FFF8F0] text-xs text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none"
                          />
                          <button
                            type="button"
                            @click="openImageSearch('quiz', qIdx)"
                            class="px-3.5 py-2 rounded-xl border-2 border-[#1E7A6F]/30 bg-[#7FD4C4]/20 hover:bg-[#7FD4C4]/35 text-[#1E7A6F] text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition"
                          >
                            <Search class="w-3.5 h-3.5" />
                            <span>Cari Gambar</span>
                          </button>
                          <label class="btn-prisma-white px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] text-[#1E7A6F] text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                            <UploadCloud class="w-3.5 h-3.5" />
                            <span>{{ isUploadingQuizImage[qIdx] ? 'Mengunggah...' : 'Pilih Gambar' }}</span>
                            <input
                              type="file"
                              accept="image/*"
                              class="hidden"
                              @change="handleQuizImageUpload($event.target.files[0], qIdx)"
                            />
                          </label>
                        </div>
                      </div>

                      <!-- ==================== INPUT JAWABAN DINAMIS SESUAI TIPE SOAL ==================== -->

                      <!-- 1. PILIHAN GANDA -->
                      <div v-if="!q.type || q.type === 'multiple_choice'" class="space-y-2.5">
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block">
                          Pilihan Jawaban (Klik huruf A/B/C/D untuk menentukan kunci benar)
                        </label>
                        <div
                          v-for="(_, oIdx) in 4"
                          :key="oIdx"
                          :class="[
                            'flex items-center gap-3 p-2.5 rounded-2xl border-2 transition',
                            q.correctOptionIndex === oIdx ? 'bg-[#7FD4C4]/20 border-[#1E7A6F]' : 'bg-white border-[#8F8575]/25'
                          ]"
                        >
                          <label
                            class="flex items-center justify-center w-7 h-7 rounded-xl font-bold text-xs shrink-0 cursor-pointer font-['Baloo_2']"
                            :class="q.correctOptionIndex === oIdx ? 'bg-[#1E7A6F] text-white' : 'bg-[#FFF8F0] border-2 border-[#8F8575]/30 text-[#2B3445]'"
                          >
                            <input type="radio" :name="`correct-${qIdx}`" :value="oIdx" v-model="q.correctOptionIndex" class="sr-only" />
                            {{ String.fromCharCode(65 + oIdx) }}
                          </label>
                          <input
                            v-model="q.options[oIdx]"
                            :placeholder="`Pilihan ${String.fromCharCode(65 + oIdx)}...`"
                            class="flex-1 px-3 py-1.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none"
                          />
                          <span v-if="q.correctOptionIndex === oIdx" class="text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/30 px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1 font-['Baloo_2']">
                            <CheckCircle2 class="w-3.5 h-3.5" /> Kunci Benar
                          </span>
                        </div>
                      </div>

                      <!-- 2. HUBUNGKAN GARIS (MATCHING) -->
                      <div v-else-if="q.type === 'matching'" class="space-y-2.5">
                        <div class="flex items-center justify-between">
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide">
                            Daftar Pasangan Benar (Kolom A ➔ Kolom B)
                          </label>
                          <button type="button" @click="addMatchingPairToQ(q)" class="text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/25 px-3 py-1 rounded-xl cursor-pointer hover:brightness-95">
                            + Tambah Pasangan
                          </button>
                        </div>
                        <div
                          v-for="(pair, pIdx) in (q.pairs || [])"
                          :key="pIdx"
                          class="flex items-center gap-2 bg-white p-2.5 rounded-2xl border-2 border-[#8F8575]/20 flex-wrap sm:flex-nowrap"
                        >
                          <span class="text-xs font-bold text-[#5B6474] px-2">{{ pIdx + 1 }}.</span>
                          <input v-model="pair.left" placeholder="Item kiri (contoh: jam)" class="flex-1 min-w-[120px] px-3 py-1.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm text-[#2B3445]" />
                          <span class="text-sm font-bold text-[#1E7A6F]">➔</span>
                          <input v-model="pair.right" placeholder="Pasangan kanan (contoh: lingkaran)" class="flex-1 min-w-[120px] px-3 py-1.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm text-[#2B3445]" />
                          <button v-if="(q.pairs || []).length > 1" type="button" @click="removeMatchingPairFromQ(q, pIdx)" class="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer">
                            <X class="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <!-- 3. URUTKAN KARTU (ORDERING) -->
                      <div v-else-if="q.type === 'ordering'" class="space-y-2.5">
                        <div class="flex items-center justify-between">
                          <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide">
                            Urutan Kartu yang Benar (dari 1 ke akhir)
                          </label>
                          <button type="button" @click="addOrderItemToQ(q)" class="text-xs font-bold text-[#1E7A6F] bg-[#7FD4C4]/25 px-3 py-1 rounded-xl cursor-pointer hover:brightness-95">
                            + Tambah Kartu
                          </button>
                        </div>
                        <div
                          v-for="(_, oIdx) in (q.correctOrder || [])"
                          :key="oIdx"
                          class="flex items-center gap-2 bg-white p-2.5 rounded-2xl border-2 border-[#8F8575]/20"
                        >
                          <span class="w-7 h-7 rounded-xl bg-[#1E7A6F] text-white text-xs font-bold flex items-center justify-center shrink-0">{{ oIdx + 1 }}</span>
                          <input v-model="q.correctOrder[oIdx]" :placeholder="`Isi kartu urutan ke-${oIdx + 1}...`" class="flex-1 px-3 py-1.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm text-[#2B3445]" />
                          <button v-if="(q.correctOrder || []).length > 2" type="button" @click="removeOrderItemFromQ(q, oIdx)" class="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl cursor-pointer">
                            <X class="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <!-- 4. BENAR / SALAH -->
                      <div v-else-if="q.type === 'true_false'" class="space-y-2">
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block">Kunci Jawaban Benar / Salah</label>
                        <div class="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            @click="q.correctOptionIndex = 0"
                            :class="[
                              'py-3 rounded-2xl border-2 font-bold text-sm cursor-pointer transition',
                              q.correctOptionIndex === 0 ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]' : 'bg-white text-[#2B3445] border-[#8F8575]/25'
                            ]"
                          >
                            ✓ Benar
                          </button>
                          <button
                            type="button"
                            @click="q.correctOptionIndex = 1"
                            :class="[
                              'py-3 rounded-2xl border-2 font-bold text-sm cursor-pointer transition',
                              q.correctOptionIndex === 1 ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]' : 'bg-white text-[#2B3445] border-[#8F8575]/25'
                            ]"
                          >
                            ✕ Salah
                          </button>
                        </div>
                      </div>

                      <!-- 5. ISIAN SINGKAT -->
                      <div v-else-if="q.type === 'fill_in_blank'" class="space-y-1.5">
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block">Kunci Jawaban Isian Singkat</label>
                        <input
                          v-if="q.expectedAnswers"
                          v-model="q.expectedAnswers[0]"
                          placeholder="Tuliskan jawaban singkat yang benar..."
                          class="w-full px-4 py-2.5 rounded-2xl border-2 border-[#1E7A6F]/50 bg-white text-sm font-bold text-[#1E7A6F] focus:outline-none"
                        />
                      </div>

                      <!-- 6. PILIH BANYAK JAWABAN (MULTI SELECT) -->
                      <div v-else-if="q.type === 'multi_select'" class="space-y-2.5">
                        <label class="text-xs font-bold text-[#2B3445] uppercase tracking-wide block">
                          Pilihan Jawaban (Centang semua jawaban yang benar)
                        </label>
                        <div
                          v-for="(_, oIdx) in 4"
                          :key="oIdx"
                          :class="[
                            'flex items-center gap-3 p-2.5 rounded-2xl border-2 transition',
                            (q.multiCorrectIndices || []).includes(oIdx) ? 'bg-[#7FD4C4]/20 border-[#1E7A6F]' : 'bg-white border-[#8F8575]/25'
                          ]"
                        >
                          <button
                            type="button"
                            @click="toggleMultiSelectIndex(q, oIdx)"
                            class="flex items-center justify-center w-7 h-7 rounded-xl font-bold text-xs shrink-0 cursor-pointer"
                            :class="(q.multiCorrectIndices || []).includes(oIdx) ? 'bg-[#1E7A6F] text-white' : 'bg-[#FFF8F0] border-2 border-[#8F8575]/30 text-[#2B3445]'"
                          >
                            <Check v-if="(q.multiCorrectIndices || []).includes(oIdx)" class="w-4 h-4" />
                            <span v-else>{{ String.fromCharCode(65 + oIdx) }}</span>
                          </button>
                          <input
                            v-model="q.options[oIdx]"
                            :placeholder="`Pilihan ${String.fromCharCode(65 + oIdx)}...`"
                            class="flex-1 px-3 py-1.5 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0]/50 text-sm text-[#2B3445] focus:bg-white focus:border-[#1E7A6F] focus:outline-none"
                          />
                        </div>
                      </div>

                      <!-- 7. TIPE KHUSUS INTERAKTIF BAWAAN (IMAGE CHOICE / GRID MAP / COLOR CHOICE / PLACE VALUE) -->
                      <div v-else class="p-3.5 rounded-2xl bg-[#7FD4C4]/15 border border-[#7FD4C4] text-xs text-[#2B3445] space-y-1">
                        <p class="font-bold text-[#1E7A6F]">Soal Interaktif Khusus ({{ getQuestionTypeLabel(q.type) }})</p>
                        <p class="text-[#5B6474]">Komponen interaktif soal ini tetap tersimpan aman. Bapak/Ibu dapat mengedit teks pertanyaan, poin, gambar, dan pembahasannya di atas/bawah.</p>
                      </div>

                      <!-- Pembahasan Singkat -->
                      <div>
                        <label class="text-xs font-bold text-[#2B3445]/70 uppercase tracking-wide block mb-1">
                          Pembahasan Jawaban (Muncul di Pop Up Siswa)
                        </label>
                        <input
                          v-model="q.explanation"
                          placeholder="Penjelasan singkat yang muncul setelah siswa menjawab..."
                          class="w-full px-3.5 py-2 rounded-xl border-2 border-[#8F8575]/25 bg-white text-xs text-[#2B3445] focus:outline-none focus:border-[#1E7A6F]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Save bar at bottom -->
                <div class="flex items-center justify-between pt-4 mt-6 border-t-2 border-[#8F8575]/20">
                  <button @click="showForm = false" class="btn-prisma-white px-6 py-2.5 rounded-2xl text-sm font-bold text-[#2B3445] border-2 border-[#8F8575]/30 hover:bg-[#FFF8F0] transition cursor-pointer">
                    Batal
                  </button>
                  <button
                    @click="handleSave"
                    :disabled="isSaving"
                    class="btn-prisma-mint flex items-center gap-2 px-8 py-3 rounded-2xl text-[#FFF8F0] text-sm font-bold cursor-pointer active:scale-95 transition shadow-md hover:brightness-105 disabled:opacity-60"
                  >
                    <RefreshCw v-if="isSaving" class="w-4 h-4 animate-spin" />
                    <Save v-else class="w-4 h-4" />
                    <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Materi' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ============================================================ -->
          <!-- HALAMAN UTAMA TERPADU: RINGKASAN + KELOLA MATERI -->
          <!-- ============================================================ -->
          <div v-else class="max-w-7xl mx-auto p-4 sm:p-6 pb-24 sm:pb-8 space-y-5 sm:space-y-6 font-['Lexend']">
            <!-- Welcome & Primary Action -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 class="text-2xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445]">Selamat datang, {{ currentUser?.name?.split(' ')[0] || 'Guru' }}! 👋</h1>
                <p class="text-[#2B3445]/60 text-sm mt-0.5">Kelola materi bacaan, suara narasi, video belajar, dan soal kuis siswa PRISMA dalam satu tempat.</p>
              </div>
              <button
                @click="openAddForm"
                class="btn-prisma-mint flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[#FFF8F0] text-sm font-bold cursor-pointer active:scale-95 transition shadow-md shrink-0 w-full sm:w-auto"
              >
                <Plus class="w-4 h-4" /> Tambah Materi Baru
              </button>
            </div>

            <!-- Stats grid (Ringkasan Singkat, Rapi di Mobile) -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div class="bg-white rounded-3xl p-3.5 sm:p-5 border-2 border-[#8F8575]/25 shadow-2xs flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center shrink-0">
                  <BookOpen class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div class="min-w-0">
                  <p class="text-xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445] leading-none">{{ scopedMateriList.length }}</p>
                  <p class="text-[11px] sm:text-xs text-[#2B3445]/60 font-semibold mt-1 leading-tight">Total Materi Bab</p>
                </div>
              </div>

              <div class="bg-white rounded-3xl p-3.5 sm:p-5 border-2 border-[#8F8575]/25 shadow-2xs flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#94C6FF]/30 text-[#1E7A6F] flex items-center justify-center shrink-0">
                  <Video class="w-4 h-4 sm:w-5 sm:h-5 text-[#1E7A6F]" />
                </div>
                <div class="min-w-0">
                  <p class="text-xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445] leading-none">{{ totalVideos }}</p>
                  <p class="text-[11px] sm:text-xs text-[#2B3445]/60 font-semibold mt-1 leading-tight">Video Belajar</p>
                </div>
              </div>

              <div class="bg-white rounded-3xl p-3.5 sm:p-5 border-2 border-[#8F8575]/25 shadow-2xs flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#FFDE7A]/35 text-[#1E7A6F] flex items-center justify-center shrink-0">
                  <Volume2 class="w-4 h-4 sm:w-5 sm:h-5 text-[#1E7A6F]" />
                </div>
                <div class="min-w-0">
                  <p class="text-xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445] leading-none">{{ totalAudioMateri }}</p>
                  <p class="text-[11px] sm:text-xs text-[#2B3445]/60 font-semibold mt-1 leading-tight">Materi Bersuara</p>
                </div>
              </div>

              <div class="bg-white rounded-3xl p-3.5 sm:p-5 border-2 border-[#8F8575]/25 shadow-2xs flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center shrink-0">
                  <Sparkles class="w-4 h-4 sm:w-5 sm:h-5 text-[#1E7A6F]" />
                </div>
                <div class="min-w-0">
                  <p class="text-xl sm:text-3xl font-bold font-['Baloo_2'] text-[#2B3445] leading-none">{{ totalQuizQuestions }}</p>
                  <p class="text-[11px] sm:text-xs text-[#2B3445]/60 font-semibold mt-1 leading-tight">Total Soal Kuis</p>
                </div>
              </div>
            </div>

            <!-- Filter + Search Bar -->
            <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs p-4 flex flex-col lg:flex-row items-start lg:items-center gap-3">
              <div class="relative flex-1 min-w-0 w-full lg:w-auto">
                <Search class="w-4 h-4 text-[#8F8575] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  v-model="tableSearch"
                  placeholder="Cari judul materi..."
                  class="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445]"
                />
              </div>
              <div v-if="!adminManagedKelas" class="flex items-center gap-1.5 flex-wrap shrink-0">
                <button
                  v-for="k in ['Semua', ...availableTableKelasOptions]"
                  :key="k"
                  @click="selectedKelasFilter = k"
                  :class="[
                    'px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border-2',
                    selectedKelasFilter === k
                      ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-xs'
                      : 'bg-[#FFF8F0] text-[#2B3445] border-[#8F8575]/25 hover:border-[#1E7A6F]/50'
                  ]"
                >{{ k }}</button>
              </div>
              <div v-else class="flex items-center gap-2 shrink-0 px-3.5 py-2 rounded-xl bg-[#7FD4C4]/20 border-2 border-[#7FD4C4] text-[#1E7A6F] text-xs font-bold">
                <span>🔒 Khusus {{ adminManagedKelas }}</span>
              </div>
            </div>

            <!-- Table Card (Desktop Table + Mobile Cards) -->
            <div class="bg-white rounded-3xl border-2 border-[#8F8575]/25 shadow-2xs overflow-hidden">
              <div class="hidden sm:grid grid-cols-12 gap-3 px-5 py-3.5 border-b-2 border-[#8F8575]/20 bg-[#FFF8F0] text-xs font-bold font-['Baloo_2'] text-[#2B3445]/80 uppercase tracking-wide">
                <div class="col-span-5">Materi Pembelajaran</div>
                <div class="col-span-2 hidden md:block">Kelas</div>
                <div class="col-span-3 hidden lg:block">Kelengkapan</div>
                <div class="col-span-7 md:col-span-5 lg:col-span-2 text-right">Aksi</div>
              </div>

              <div v-if="isLoadingMateri" class="py-12 text-center">
                <RefreshCw class="w-6 h-6 animate-spin mx-auto mb-2 text-[#1E7A6F]" />
                <p class="text-sm text-[#2B3445]/60 font-semibold">Memuat daftar materi...</p>
              </div>

              <div v-else class="divide-y divide-[#8F8575]/15">
                <div
                  v-for="item in filteredMateri"
                  :key="item.id"
                  class="flex flex-col sm:grid sm:grid-cols-12 gap-3 items-stretch sm:items-center px-4 sm:px-5 py-4 hover:bg-[#FFF8F0]/70 transition group"
                >
                  <div class="sm:col-span-5 flex items-start sm:items-center gap-3 min-w-0">
                    <img :src="item.image || '/es_batu_card.jpg'" :alt="item.title" class="w-14 h-14 sm:w-12 sm:h-12 rounded-2xl object-cover shrink-0 border-2 border-[#8F8575]/20" />
                    <div class="min-w-0 flex-1 space-y-1.5 sm:space-y-0">
                      <p class="text-sm font-bold text-[#2B3445] leading-snug sm:truncate">{{ item.title }}</p>
                      <!-- Mobile-only: Kelas & Kelengkapan Media -->
                      <div class="flex items-center gap-1.5 flex-wrap lg:hidden">
                        <span class="px-2 py-0.5 rounded-lg bg-[#FFF8F0] border border-[#8F8575]/25 text-[#2B3445] text-[10px] font-bold md:hidden">
                          {{ getKelasFromLevel(item.level) }}
                        </span>
                        <span
                          :class="[
                            'px-2 py-0.5 rounded-lg text-[10px] font-bold border',
                            hasAudio(item) ? 'bg-[#7FD4C4]/25 text-[#1E7A6F] border-[#7FD4C4]' : 'bg-gray-100 text-gray-400 border-gray-200'
                          ]"
                        >
                          🔊 {{ hasAudio(item) ? 'Audio' : 'Tanpa Audio' }}
                        </span>
                        <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#94C6FF]/20 text-[#1E7A6F] border border-[#94C6FF]/40">
                          🎬 {{ getVideoCount(item) }} Video
                        </span>
                        <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#FFDE7A]/30 text-[#2B3445] border border-[#FFDE7A]">
                          ✍️ {{ getQuestionCount(item) }} Soal
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="col-span-2 hidden md:block">
                    <span class="px-3 py-1 rounded-xl bg-[#FFF8F0] border-2 border-[#8F8575]/25 text-[#2B3445] text-xs font-bold font-['Baloo_2']">
                      {{ getKelasFromLevel(item.level) }}
                    </span>
                  </div>

                  <!-- Desktop Indikator Kelengkapan Media (Audio, Video, Soal) -->
                  <div class="col-span-3 hidden lg:flex items-center gap-1.5 flex-wrap">
                    <span
                      :class="[
                        'px-2 py-0.5 rounded-lg text-[11px] font-bold border',
                        hasAudio(item) ? 'bg-[#7FD4C4]/25 text-[#1E7A6F] border-[#7FD4C4]' : 'bg-gray-100 text-gray-400 border-gray-200'
                      ]"
                    >
                      🔊 {{ hasAudio(item) ? 'Audio' : 'Tanpa Audio' }}
                    </span>
                    <span class="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-[#94C6FF]/20 text-[#1E7A6F] border border-[#94C6FF]/40">
                      🎬 {{ getVideoCount(item) }} Video
                    </span>
                    <span class="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-[#FFDE7A]/30 text-[#2B3445] border border-[#FFDE7A]">
                      ✍️ {{ getQuestionCount(item) }} Soal
                    </span>
                  </div>

                  <div class="sm:col-span-7 md:col-span-5 lg:col-span-2 flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#8F8575]/10">
                    <button @click="emit('previewMateri', item)" class="flex-1 sm:flex-none px-3 py-2 sm:p-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 hover:bg-[#7FD4C4]/30 text-[#1E7A6F] transition cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold" title="Lihat Tampilan Siswa">
                      <Eye class="w-4 h-4 shrink-0" />
                      <span class="sm:hidden">Lihat</span>
                    </button>
                    <button @click="openEditForm(item)" class="flex-1 sm:flex-none px-3 py-2 sm:p-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 hover:bg-[#FFDE7A]/40 text-[#2B3445] transition cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold" title="Edit Materi">
                      <Edit3 class="w-4 h-4 shrink-0" />
                      <span class="sm:hidden">Edit</span>
                    </button>
                    <button @click="handleDelete(item.id, item.title)" class="flex-1 sm:flex-none px-3 py-2 sm:p-2 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/20 hover:bg-rose-100 text-rose-600 transition cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold" title="Hapus Materi">
                      <Trash2 class="w-4 h-4 shrink-0" />
                      <span class="sm:hidden">Hapus</span>
                    </button>
                  </div>
                </div>

                <div v-if="filteredMateri.length === 0" class="py-16 text-center">
                  <BookOpen class="w-10 h-10 text-[#8F8575]/50 mx-auto mb-3" />
                  <p class="text-[#2B3445]/60 font-semibold">{{ tableSearch ? 'Tidak ada materi yang cocok dengan pencarian.' : 'Belum ada materi pembelajaran.' }}</p>
                  <button v-if="!tableSearch" @click="openAddForm" class="btn-prisma-mint mt-3 px-5 py-2.5 rounded-2xl text-[#FFF8F0] text-sm font-bold cursor-pointer shadow-sm">+ Tambah Sekarang</button>
                </div>
              </div>

              <div class="px-5 py-3.5 border-t-2 border-[#8F8575]/20 bg-[#FFF8F0] text-xs font-semibold text-[#2B3445]/70">
                Menampilkan {{ filteredMateri.length }} dari {{ scopedMateriList.length }} materi
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>

    <!-- ==================== MODAL PENCARIAN GAMBAR (KATA KUNCI) ==================== -->
    <Teleport to="body">
      <div
        v-if="imageSearchModal.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B3445]/60 backdrop-blur-xs font-['Lexend']"
        @click.self="imageSearchModal.isOpen = false"
      >
        <div class="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-[#8F8575]/30 overflow-hidden flex flex-col max-h-[85vh]">
          <div class="px-5 py-4 bg-[#FFF8F0] border-b-2 border-[#8F8575]/20 flex items-center justify-between gap-3">
            <div>
              <h3 class="font-bold font-['Baloo_2'] text-lg text-[#1E7A6F]">Cari Gambar Relevan</h3>
              <p class="text-xs text-[#5B6474]">Ketik kata kunci (misal: apel, jam, segitiga, buku, kucing)</p>
            </div>
            <button
              type="button"
              @click="imageSearchModal.isOpen = false"
              class="p-2 rounded-xl hover:bg-black/5 text-[#5B6474] cursor-pointer"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="runImageSearch" class="p-4 border-b border-[#8F8575]/15 flex items-center gap-2">
            <div class="relative flex-1">
              <Search class="w-4 h-4 text-[#8F8575] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                v-model="imageSearchModal.query"
                placeholder="Ketik kata kunci gambar..."
                class="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-[#8F8575]/30 bg-[#FFF8F0] focus:bg-white focus:border-[#1E7A6F] focus:outline-none text-sm text-[#2B3445]"
              />
            </div>
            <button
              type="submit"
              :disabled="imageSearchModal.isSearching"
              class="btn-prisma-mint px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-[#FFF8F0] cursor-pointer shrink-0 disabled:opacity-60"
            >
              {{ imageSearchModal.isSearching ? 'Mencari...' : 'Cari' }}
            </button>
          </form>

          <div class="p-4 overflow-y-auto flex-1">
            <div v-if="imageSearchModal.isSearching" class="py-12 text-center space-y-2">
              <RefreshCw class="w-7 h-7 animate-spin text-[#1E7A6F] mx-auto" />
              <p class="text-xs font-semibold text-[#5B6474]">Mencari gambar relevan...</p>
            </div>

            <div v-else-if="imageSearchModal.results.length === 0" class="py-12 text-center text-sm text-[#5B6474]">
              Tidak ditemukan gambar untuk kata kunci tersebut. Coba kata lain ya!
            </div>

            <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                v-for="(img, idx) in imageSearchModal.results"
                :key="idx"
                type="button"
                @click="selectSearchedImage(img.url)"
                class="group rounded-2xl border-2 border-[#8F8575]/20 hover:border-[#1E7A6F] bg-[#FFF8F0]/50 overflow-hidden text-left transition cursor-pointer flex flex-col"
              >
                <div class="aspect-video w-full bg-white overflow-hidden">
                  <img :src="img.url" :alt="img.title" class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div class="p-2.5 flex items-center justify-between gap-1.5">
                  <span class="text-[11px] font-bold text-[#2B3445] truncate">{{ img.title }}</span>
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#7FD4C4]/30 text-[#1E7A6F] shrink-0">{{ img.source }}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
</template>

<style scoped>
.rich-editor:empty::before {
  content: attr(data-placeholder);
  color: rgba(91, 100, 116, 0.55);
  pointer-events: none;
  display: block;
}
</style>
