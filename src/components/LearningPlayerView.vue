<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  Video,
  Trophy,
  ChevronRight,
  Star,
  Check,
  HelpCircle,
  Layers,
  Film,
  MousePointerClick,
  Link,
  ArrowUpDown,
  Undo2,
  Info,
  Hash,
  CheckSquare,
  Compass,
  MapPin,
  BookOpen,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  PenTool,
  Move,
  Eraser,
  GripVertical
} from '@lucide/vue'
import { isYouTubeUrl, getYouTubeEmbedUrl, getKelasFromLevel, sortMateriNaturally, materiList } from '../lib/materiService'
import { playButtonPop, playCorrectChime, playEncouragingSound, playFanfare } from '../lib/soundEffects'
import { saveQuizAttempt, submitToMateriLeaderboard } from '../lib/quizService'
import { currentUser } from '../lib/authService'

const props = defineProps({
  materi: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['back', 'finish', 'open-settings', 'change-materi'])

// ==================== NAVIGASI ANTAR-BAB (BAB SEBELUMNYA & BAB SELANJUTNYA) ====================
const currentKelasMateriList = computed(() => {
  if (!props.materi?.level || !materiList.value?.length) return materiList.value || []
  const curKelas = getKelasFromLevel(props.materi.level)
  const list = materiList.value.filter(m => getKelasFromLevel(m.level) === curKelas)
  return sortMateriNaturally(list)
})

const currentChapterIndexInKelas = computed(() => {
  const list = currentKelasMateriList.value
  if (!list.length) return -1
  return list.findIndex(m => String(m.id) === String(props.materi?.id))
})

const chapterNumberInKelas = computed(() => {
  const idx = currentChapterIndexInKelas.value
  return idx >= 0 ? idx + 1 : 1
})

const totalChaptersInKelas = computed(() => {
  return currentKelasMateriList.value.length || 8
})

const isLastChapterInClass = computed(() => {
  const list = currentKelasMateriList.value
  if (!list.length) return true
  const idx = currentChapterIndexInKelas.value
  return idx >= list.length - 1
})

const nextMateri = computed(() => {
  const list = currentKelasMateriList.value
  const idx = currentChapterIndexInKelas.value
  if (idx >= 0 && idx < list.length - 1) {
    return list[idx + 1]
  }
  return null
})

const prevMateri = computed(() => {
  const list = currentKelasMateriList.value
  const idx = currentChapterIndexInKelas.value
  if (idx > 0) {
    return list[idx - 1]
  }
  return null
})

const scrollToPageTop = () => {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  } catch (e) {
    window.scrollTo(0, 0)
  }
  if (typeof document !== 'undefined') {
    if (document.documentElement) document.documentElement.scrollTop = 0
    if (document.body) document.body.scrollTop = 0
  }
  nextTick(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } catch (e) {
      window.scrollTo(0, 0)
    }
    if (typeof document !== 'undefined') {
      if (document.documentElement) document.documentElement.scrollTop = 0
      if (document.body) document.body.scrollTop = 0
    }
  })
  setTimeout(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } catch (e) {
      window.scrollTo(0, 0)
    }
    if (typeof document !== 'undefined') {
      if (document.documentElement) document.documentElement.scrollTop = 0
      if (document.body) document.body.scrollTop = 0
    }
  }, 60)
}

const goToNextChapter = () => {
  if (isLastChapterInClass.value) {
    playButtonPop()
    emit('finish')
    return
  }
  if (!nextMateri.value) return
  playButtonPop()
  emit('change-materi', nextMateri.value)
  scrollToPageTop()
}

const goToPrevChapter = () => {
  if (!prevMateri.value) return
  playButtonPop()
  emit('change-materi', prevMateri.value)
  scrollToPageTop()
}

// 2 Tahap Pembelajaran: 'video' | 'quiz'
const activeTab = ref('video')

// Data Poin Pembelajaran untuk ringkasan di sidebar
const learningPoints = computed(() => {
  return props.materi?.materiContent?.points || props.materi?.learningPoints || []
})

// ==================== TAHAP 1: VIDEO (2 VIDEO EDUKASI) ====================
const selectedVideoIndex = ref(1) // 1 atau 2

const videoList = computed(() => {
  const v1 = props.materi?.videos?.video1 || {
    title: props.materi?.standardContent?.title || 'Video 1: Pengenalan Konsep',
    url: props.materi?.standardContent?.videoUrl || props.materi?.videoUrl || 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
  }
  const v2 = props.materi?.videos?.video2 || {
    title: props.materi?.slowContent?.title || 'Video 2: Eksperimen & Penerapan',
    url: props.materi?.slowContent?.videoUrl || 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4'
  }
  return { video1: v1, video2: v2 }
})

const currentVideo = computed(() => {
  return selectedVideoIndex.value === 1 ? videoList.value.video1 : videoList.value.video2
})

const isCurrentVideoYouTube = computed(() => {
  return isYouTubeUrl(currentVideo.value?.url)
})

const currentEmbedUrl = computed(() => {
  return getYouTubeEmbedUrl(currentVideo.value?.url)
})

const switchVideo = (index) => {
  playButtonPop()
  selectedVideoIndex.value = index
}

// Video Player Speed (untuk video MP4)
const videoPlayerRef = ref(null)
const currentPlaybackSpeed = ref(1.0)
const setPlaybackSpeed = (speed) => {
  currentPlaybackSpeed.value = speed
  if (videoPlayerRef.value) {
    videoPlayerRef.value.playbackRate = speed
  }
}

// ==================== BACAAN MELEKAT DI ATAS KUIS ====================
const readingText = computed(() => {
  return props.materi?.bacaan || props.materi?.materiContent?.text || ''
})

const parsedReadingBlocks = computed(() => {
  const text = readingText.value || ''
  if (!text) return []

  const lines = text.split('\n')
  const blocks = []
  let currentParagraph = []
  let currentTableLines = []

  const flushParagraph = () => {
    if (currentParagraph.length) {
      const content = currentParagraph.join('\n').trim()
      if (content) {
        blocks.push({ type: 'paragraph', content })
      }
      currentParagraph = []
    }
  }

  const flushTable = () => {
    if (currentTableLines.length) {
      const validRows = []
      for (const line of currentTableLines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        if (/^\|?(\s*:?-+:?\s*\|?)+$/.test(trimmed)) continue
        let rawCells = trimmed.split('|')
        if (trimmed.startsWith('|')) rawCells.shift()
        if (trimmed.endsWith('|')) rawCells.pop()
        const cells = rawCells.map(c => c.trim())
        if (cells.length > 0 && cells.some(c => c.length > 0)) {
          validRows.push(cells)
        }
      }

      if (validRows.length >= 2) {
        blocks.push({
          type: 'table',
          headers: validRows[0],
          rows: validRows.slice(1)
        })
      } else if (validRows.length === 1) {
        blocks.push({
          type: 'table',
          headers: validRows[0],
          rows: []
        })
      } else {
        blocks.push({
          type: 'paragraph',
          content: currentTableLines.join('\n')
        })
      }
      currentTableLines = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    const isTableLine = trimmed.includes('|')

    if (isTableLine) {
      flushParagraph()
      currentTableLines.push(line)
    } else {
      if (currentTableLines.length > 0) {
        if (!trimmed) {
          let nextIsTable = false
          for (let j = i + 1; j < lines.length; j++) {
            const nextTrim = lines[j].trim()
            if (!nextTrim) continue
            if (nextTrim.includes('|')) nextIsTable = true
            break
          }
          if (nextIsTable) {
            continue
          } else {
            flushTable()
          }
        } else {
          flushTable()
          currentParagraph.push(line)
        }
      } else {
        currentParagraph.push(line)
      }
    }
  }

  flushParagraph()
  flushTable()

  return blocks
})

const readingGoal = computed(() => {
  return props.materi?.tujuan || ''
})

const bacaanSectionRef = ref(null)
const quizSectionRef = ref(null)

const goToBacaan = () => {
  playButtonPop()
  activeTab.value = 'quiz'
  isBacaanExpanded.value = true
  scrollToPageTop()
}

const scrollToQuiz = () => {
  playButtonPop()
  nextTick(() => {
    if (quizSectionRef.value) {
      quizSectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

const isBacaanExpanded = ref(true)
const isLearningPointsOpen = ref(false)
const isPlayingAudio = ref(false)
let currentAudioElement = null

const toggleAudioNarration = () => {
  playButtonPop()
  if (isPlayingAudio.value) {
    stopAudioNarration()
    return
  }

  const customAudioUrl = props.materi?.materiContent?.audioUrl || props.materi?.audioUrl
  if (customAudioUrl) {
    if (!currentAudioElement || currentAudioElement.src !== customAudioUrl) {
      if (currentAudioElement) {
        currentAudioElement.pause()
      }
      currentAudioElement = new Audio(customAudioUrl)
      currentAudioElement.onended = () => { isPlayingAudio.value = false }
      currentAudioElement.onerror = () => { isPlayingAudio.value = false }
    }
    currentAudioElement.currentTime = 0
    currentAudioElement.play().catch(() => { isPlayingAudio.value = false })
    isPlayingAudio.value = true
    return
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window && readingText.value) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(readingText.value)
    utterance.lang = 'id-ID'
    utterance.rate = 0.9
    utterance.onend = () => { isPlayingAudio.value = false }
    utterance.onerror = () => { isPlayingAudio.value = false }
    window.speechSynthesis.speak(utterance)
    isPlayingAudio.value = true
  }
}

const stopAudioNarration = () => {
  if (currentAudioElement) {
    currentAudioElement.pause()
    currentAudioElement.currentTime = 0
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  isPlayingAudio.value = false
}

// ==================== TAB 2: QUIZ (PILIHAN GANDA & GAMBAR SOAL) ====================
const quizData = computed(() => {
  if (props.materi?.quiz?.questions?.length) {
    return props.materi.quiz
  }
  if (props.materi?.assessment?.questions?.length) {
    return props.materi.assessment
  }
  return {
    title: 'Kuis Pemahaman Materi',
    questions: [
      {
        id: 'def-1',
        questionText: `Apa pemahaman utama yang kamu pelajari dari materi "${props.materi?.title || 'ini'}"?`,
        image: props.materi?.image || '/es_batu_card.jpg',
        points: 50,
        options: ['Memahami konsep dengan jelas', 'Membaca secara santai', 'Menonton video edukasi', 'Semua benar'],
        correctOptionIndex: 3,
        explanation: 'Semua kegiatan belajar membantu menguatkan pemahamanmu terhadap materi.'
      },
      {
        id: 'def-2',
        questionText: 'Mengapa kita perlu mempelajari materi ini dalam kehidupan sehari-hari?',
        image: '',
        points: 50,
        options: ['Agar memahami fenomena di sekitar', 'Hanya untuk ujian', 'Tidak ada manfaatnya', 'Agar cepat mengantuk'],
        correctOptionIndex: 0,
        explanation: 'Ilmu pengetahuan sangat berguna untuk memecahkan masalah dalam kehidupan nyata.'
      }
    ]
  }
})

const questions = computed(() => quizData.value.questions || [])
const currentQuestionIndex = ref(0)
const selectedAnswers = ref({})
const checkedQuestions = ref({})
const isQuizSubmitted = ref(false)

// ==================== 1. MENARIK GARIS NYATA (MATCHING WITH REAL LINES) ====================
const matchingContainerRef = ref(null)
const activeMatchingLeft = ref(null)
const dragLineState = ref({
  isDragging: false,
  startItem: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0
})
const linePairs = ref([])

const matchingPairColors = [
  { stroke: '#1E7A6F', border: 'border-[#1E7A6F]', bg: 'bg-[#7FD4C4]/20', text: 'text-[#1E7A6F]', badgeBg: 'bg-[#1E7A6F]', label: 'Pasangan 1' },
  { stroke: '#D97706', border: 'border-[#D97706]', bg: 'bg-[#FFDE7A]/35', text: 'text-[#B45309]', badgeBg: 'bg-[#D97706]', label: 'Pasangan 2' },
  { stroke: '#2563EB', border: 'border-[#2563EB]', bg: 'bg-[#94C6FF]/25', text: 'text-[#1D4ED8]', badgeBg: 'bg-[#2563EB]', label: 'Pasangan 3' },
  { stroke: '#9333EA', border: 'border-[#9333EA]', bg: 'bg-[#E9D5FF]/35', text: 'text-[#7E22CE]', badgeBg: 'bg-[#9333EA]', label: 'Pasangan 4' }
]

const getMatchingAnswersForCurrent = () => {
  const cur = selectedAnswers.value[currentQuestionIndex.value]
  if (cur && typeof cur === 'object' && !Array.isArray(cur)) {
    return cur
  }
  return {}
}

const getPairColor = (leftItem) => {
  const pairs = getMatchingAnswersForCurrent()
  const keys = Object.keys(pairs)
  const idx = keys.indexOf(leftItem)
  if (idx < 0) return matchingPairColors[0]
  return matchingPairColors[idx % matchingPairColors.length]
}

const getPairColorForRight = (rightItem) => {
  const pairs = getMatchingAnswersForCurrent()
  for (const [left, right] of Object.entries(pairs)) {
    if (right === rightItem) {
      return getPairColor(left)
    }
  }
  return null
}

const updateMatchingLines = () => {
  if (!matchingContainerRef.value) return
  const containerRect = matchingContainerRef.value.getBoundingClientRect()
  const pairs = getMatchingAnswersForCurrent()
  const result = []

  for (const [leftItem, rightItem] of Object.entries(pairs)) {
    const leftEl = matchingContainerRef.value.querySelector(`[data-match-left-pin="${CSS.escape(leftItem)}"]`)
    const rightEl = matchingContainerRef.value.querySelector(`[data-match-right-pin="${CSS.escape(rightItem)}"]`)

    if (leftEl && rightEl) {
      const leftRect = leftEl.getBoundingClientRect()
      const rightRect = rightEl.getBoundingClientRect()

      result.push({
        left: leftItem,
        right: rightItem,
        x1: leftRect.left + leftRect.width / 2 - containerRect.left,
        y1: leftRect.top + leftRect.height / 2 - containerRect.top,
        x2: rightRect.left + rightRect.width / 2 - containerRect.left,
        y2: rightRect.top + rightRect.height / 2 - containerRect.top,
        color: getPairColor(leftItem)
      })
    }
  }
  linePairs.value = result
}

const startDragLine = (leftItem, e) => {
  if (isCurrentQuestionChecked.value) return
  e.preventDefault()
  playButtonPop()
  if (!matchingContainerRef.value) return
  const containerRect = matchingContainerRef.value.getBoundingClientRect()
  const pinEl = matchingContainerRef.value.querySelector(`[data-match-left-pin="${CSS.escape(leftItem)}"]`)
  const pinRect = pinEl ? pinEl.getBoundingClientRect() : { left: e.clientX, top: e.clientY, width: 0, height: 0 }

  const startX = pinRect.left + pinRect.width / 2 - containerRect.left
  const startY = pinRect.top + pinRect.height / 2 - containerRect.top

  dragLineState.value = {
    isDragging: true,
    startItem: leftItem,
    startX,
    startY,
    currentX: e.clientX - containerRect.left,
    currentY: e.clientY - containerRect.top
  }

  const onPointerMove = (moveEv) => {
    if (!dragLineState.value.isDragging) return
    dragLineState.value.currentX = moveEv.clientX - containerRect.left
    dragLineState.value.currentY = moveEv.clientY - containerRect.top
  }

  const onPointerUp = (upEv) => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)

    if (!dragLineState.value.isDragging) return
    const el = document.elementFromPoint(upEv.clientX, upEv.clientY)
    const targetRight = el?.closest('[data-match-right]')
    if (targetRight) {
      const rightItem = targetRight.getAttribute('data-match-right')
      if (rightItem) {
        connectMatchingPair(dragLineState.value.startItem, rightItem)
      }
    }
    dragLineState.value.isDragging = false
    dragLineState.value.startItem = null
  }

  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

const connectMatchingPair = (leftItem, rightItem) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  const currentMap = { ...getMatchingAnswersForCurrent() }
  for (const [k, v] of Object.entries(currentMap)) {
    if (v === rightItem) delete currentMap[k]
  }
  currentMap[leftItem] = rightItem
  selectedAnswers.value[currentQuestionIndex.value] = currentMap
  activeMatchingLeft.value = null
  nextTick(() => {
    updateMatchingLines()

    // Otomatis picu pop up evaluasi ketika semua pasangan sudah terhubung
    const q = currentQuestion.value
    const totalRequired = (q?.leftItems || q?.pairs || []).length
    if (totalRequired > 0 && Object.keys(currentMap).length === totalRequired) {
      setTimeout(() => {
        if (!isCurrentQuestionChecked.value && currentQuestion.value?.type === 'matching') {
          evaluateCurrentQuestion()
        }
      }, 350)
    }
  })
}

const selectMatchingLeft = (leftItem) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  if (activeMatchingLeft.value === leftItem) {
    activeMatchingLeft.value = null
  } else {
    activeMatchingLeft.value = leftItem
  }
}

const selectMatchingRight = (rightItem) => {
  if (isCurrentQuestionChecked.value) return
  if (!activeMatchingLeft.value) return
  connectMatchingPair(activeMatchingLeft.value, rightItem)
}

const removeMatchingPair = (leftItem) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  const currentMap = { ...getMatchingAnswersForCurrent() }
  delete currentMap[leftItem]
  selectedAnswers.value[currentQuestionIndex.value] = currentMap
  nextTick(() => {
    updateMatchingLines()
  })
}

const resetMatching = () => {
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  selectedAnswers.value[currentQuestionIndex.value] = {}
  activeMatchingLeft.value = null
  linePairs.value = []
}

const getLinePath = (x1, y1, x2, y2) => {
  const dx = Math.abs(x2 - x1) * 0.45
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

// ==================== 2. MELINGKARI GAMBAR MANUAL (MANUAL CIRCLING) ====================
const circlingContainerRef = ref(null)
const isDrawingCircle = ref(false)
const currentCirclePoints = ref([])
const customCircledSvg = ref({}) // qIndex -> svg path string

const getPointsPathD = (points) => {
  if (!points || points.length < 2) return ''
  let d = `M ${Math.round(points[0].x)} ${Math.round(points[0].y)}`
  for (let i = 1; i < points.length; i++) {
    d += ` L ${Math.round(points[i].x)} ${Math.round(points[i].y)}`
  }
  return d
}

const onCirclingPointerDown = (e) => {
  if (!circlingContainerRef.value) return
  const containerRect = circlingContainerRef.value.getBoundingClientRect()
  isDrawingCircle.value = true
  currentCirclePoints.value = [{
    x: e.clientX - containerRect.left,
    y: e.clientY - containerRect.top
  }]

  const onPointerMove = (moveEv) => {
    if (!isDrawingCircle.value) return
    currentCirclePoints.value.push({
      x: moveEv.clientX - containerRect.left,
      y: moveEv.clientY - containerRect.top
    })
  }

  const onPointerUp = (upEv) => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)

    if (!isDrawingCircle.value) return
    isDrawingCircle.value = false

    const pts = currentCirclePoints.value
    if (pts.length > 5) {
      const xs = pts.map(p => p.x)
      const ys = pts.map(p => p.y)
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const minY = Math.min(...ys)
      const maxY = Math.max(...ys)
      const centerX = (minX + maxX) / 2
      const centerY = (minY + maxY) / 2

      const cards = circlingContainerRef.value.querySelectorAll('[data-image-option-card]')
      let targetIdx = -1

      cards.forEach((cardEl) => {
        const cRect = cardEl.getBoundingClientRect()
        const cardRelLeft = cRect.left - containerRect.left
        const cardRelTop = cRect.top - containerRect.top
        const cardRelRight = cardRelLeft + cRect.width
        const cardRelBottom = cardRelTop + cRect.height

        // Cek apakah centroid goresan berada di area kartu
        if (
          centerX >= cardRelLeft - 30 &&
          centerX <= cardRelRight + 30 &&
          centerY >= cardRelTop - 30 &&
          centerY <= cardRelBottom + 30
        ) {
          targetIdx = Number(cardEl.getAttribute('data-image-option-card'))
        }
      })

      if (targetIdx >= 0) {
        selectedAnswers.value[currentQuestionIndex.value] = targetIdx
        customCircledSvg.value[currentQuestionIndex.value] = getPointsPathD(pts)
        currentCirclePoints.value = []
        evaluateCurrentQuestion()
        return
      }
    }

    currentCirclePoints.value = []
  }

  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

const selectImageOptionDirectly = (optIdx) => {
  if (isCurrentQuestionChecked.value) return
  selectedAnswers.value[currentQuestionIndex.value] = optIdx
  delete customCircledSvg.value[currentQuestionIndex.value]
  evaluateCurrentQuestion()
}

const clearManualCircle = () => {
  playButtonPop()
  delete customCircledSvg.value[currentQuestionIndex.value]
  delete checkedQuestions.value[currentQuestionIndex.value]
  selectedAnswers.value[currentQuestionIndex.value] = undefined
}

// ==================== 3. DRAG AND DROP MENGURUTKAN (REAL ORDERING) ====================
const draggedOrderItem = ref(null)
const dragOverSlotIdx = ref(null)

const onCardDragStart = (item, e) => {
  if (isCurrentQuestionChecked.value) return
  draggedOrderItem.value = item
  if (e.dataTransfer) {
    e.dataTransfer.setData('text/plain', item)
    e.dataTransfer.effectAllowed = 'move'
  }
}

const onSlotDragOver = (slotIdx, e) => {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
  dragOverSlotIdx.value = slotIdx
}

const onSlotDragLeave = (slotIdx) => {
  if (dragOverSlotIdx.value === slotIdx) {
    dragOverSlotIdx.value = null
  }
}

// State khusus untuk Tipe Soal Mengurutkan / Ordering
const getOrderingAnswersForCurrent = () => {
  const cur = selectedAnswers.value[currentQuestionIndex.value]
  const total = currentQuestion.value?.orderItems?.length || 0
  if (Array.isArray(cur)) {
    const res = [...cur]
    while (res.length < total) res.push(null)
    return res
  }
  return Array(total).fill(null)
}

const onSlotDrop = (slotIdx, e) => {
  e.preventDefault()
  dragOverSlotIdx.value = null
  if (isCurrentQuestionChecked.value) return
  const item = draggedOrderItem.value || (e.dataTransfer ? e.dataTransfer.getData('text/plain') : null)
  if (!item) return

  playButtonPop()
  const cur = [...getOrderingAnswersForCurrent()]
  
  // Lepas jika item sudah berada di slot lain
  const oldIdx = cur.indexOf(item)
  const existingInSlot = cur[slotIdx]

  if (oldIdx >= 0) {
    cur[oldIdx] = existingInSlot || null
  }
  cur[slotIdx] = item
  selectedAnswers.value[currentQuestionIndex.value] = cur
  draggedOrderItem.value = null

  const total = currentQuestion.value?.orderItems?.length || 0
  if (total > 0 && cur.filter(Boolean).length === total) {
    evaluateCurrentQuestion()
  }
}

const onDropToCardPool = (e) => {
  e.preventDefault()
  if (draggedOrderItem.value) {
    playButtonPop()
    removeFromOrdering(draggedOrderItem.value)
    draggedOrderItem.value = null
  }
}

const addToOrdering = (item) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  const cur = [...getOrderingAnswersForCurrent()]
  if (!cur.includes(item)) {
    const firstEmpty = cur.findIndex(x => !x)
    if (firstEmpty !== -1) {
      cur[firstEmpty] = item
      selectedAnswers.value[currentQuestionIndex.value] = cur
      const total = currentQuestion.value?.orderItems?.length || 0
      if (total > 0 && cur.filter(Boolean).length === total) {
        evaluateCurrentQuestion()
      }
    }
  }
}

const removeFromOrdering = (item) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  const cur = [...getOrderingAnswersForCurrent()]
  const idx = cur.indexOf(item)
  if (idx !== -1) {
    cur[idx] = null
    selectedAnswers.value[currentQuestionIndex.value] = cur
  }
}

const resetOrdering = () => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  const total = currentQuestion.value?.orderItems?.length || 0
  selectedAnswers.value[currentQuestionIndex.value] = Array(total).fill(null)
}

// State khusus untuk Isi Angka (Fill in the Blank)
const onFillInBlankInput = (val) => {
  if (isCurrentQuestionChecked.value) return
  delete checkedQuestions.value[currentQuestionIndex.value]
  selectedAnswers.value[currentQuestionIndex.value] = val
}

const appendDigit = (digit) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  const cur = String(selectedAnswers.value[currentQuestionIndex.value] || '')
  selectedAnswers.value[currentQuestionIndex.value] = cur + digit
}

const backspaceDigit = () => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  const cur = String(selectedAnswers.value[currentQuestionIndex.value] || '')
  selectedAnswers.value[currentQuestionIndex.value] = cur.slice(0, -1)
}

const clearDigit = () => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  selectedAnswers.value[currentQuestionIndex.value] = ''
}

// State khusus untuk Pilih Semua yang Benar (Multi Select)
const getMultiSelectAnswersForCurrent = () => {
  const cur = selectedAnswers.value[currentQuestionIndex.value]
  if (Array.isArray(cur)) return cur
  return []
}

const toggleMultiSelect = (optIdx) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  const cur = [...getMultiSelectAnswersForCurrent()]
  const pos = cur.indexOf(optIdx)
  if (pos >= 0) {
    cur.splice(pos, 1)
  } else {
    cur.push(optIdx)
  }
  selectedAnswers.value[currentQuestionIndex.value] = cur
}

// State khusus untuk Peta Koordinat (Grid Map)
const selectGridCell = (cell) => {
  if (isCurrentQuestionChecked.value) return
  selectedAnswers.value[currentQuestionIndex.value] = cell
  evaluateCurrentQuestion()
}

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] || {}
})

const totalPossibleScore = computed(() => {
  return questions.value.reduce((acc, q) => acc + (Number(q.points) || 25), 0)
})

const selectAnswer = (optionIdx) => {
  if (isCurrentQuestionChecked.value) return
  selectedAnswers.value[currentQuestionIndex.value] = optionIdx
  evaluateCurrentQuestion()
}

// ==================== 8. PLACE VALUE (NILAI TEMPAT INTERAKTIF) ====================
const getPlaceValueAns = () => {
  const ans = selectedAnswers.value[currentQuestionIndex.value]
  if (ans && typeof ans === 'object' && !Array.isArray(ans)) return ans
  return { tens: null, ones: null }
}

const setPlaceValueTens = (val) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  const curr = { ...getPlaceValueAns() }
  curr.tens = val
  selectedAnswers.value[currentQuestionIndex.value] = curr
}

const setPlaceValueOnes = (val) => {
  if (isCurrentQuestionChecked.value) return
  playButtonPop()
  const curr = { ...getPlaceValueAns() }
  curr.ones = val
  selectedAnswers.value[currentQuestionIndex.value] = curr
}

const isQuestionAnswered = (idx) => {
  const q = questions.value[idx]
  if (!q) return false
  const ans = selectedAnswers.value[idx]
  if (ans === undefined || ans === null) return false
  if (q.type === 'place_value') {
    return Boolean(ans && typeof ans === 'object' && !Array.isArray(ans) && ans.tens && ans.ones)
  }
  if (q.type === 'matching') {
    return typeof ans === 'object' && !Array.isArray(ans) && Object.keys(ans).length > 0
  }
  if (q.type === 'ordering') {
    return Array.isArray(ans) && ans.filter(Boolean).length > 0
  }
  if (q.type === 'multi_select') {
    return Array.isArray(ans) && ans.length > 0
  }
  if (q.type === 'fill_in_blank') {
    return typeof ans === 'string' && ans.trim().length > 0
  }
  if (q.type === 'grid_map') {
    return typeof ans === 'string' && ans.trim().length > 0
  }
  return true
}

const checkAnswerCorrectness = (q, ans) => {
  if (ans === undefined || ans === null) return false
  if (q.type === 'matching' && q.pairs?.length) {
    if (typeof ans !== 'object' || Array.isArray(ans)) return false
    return q.pairs.every(p => {
      const expectedLeft = String(p.left || '').trim()
      const expectedRight = String(p.right || '').trim()
      const userRight = ans[p.left] ?? ans[expectedLeft]
      return String(userRight || '').trim() === expectedRight
    })
  }
  if (q.type === 'ordering' && q.correctOrder?.length) {
    if (Array.isArray(ans)) {
      return JSON.stringify(ans.filter(Boolean)) === JSON.stringify(q.correctOrder)
    }
    return false
  }
  if (q.type === 'multi_select' && q.multiCorrectIndices?.length) {
    if (!Array.isArray(ans)) return false
    const sortedUser = [...ans].sort((a, b) => a - b)
    const sortedCorrect = [...q.multiCorrectIndices].sort((a, b) => a - b)
    return sortedUser.length === sortedCorrect.length && sortedUser.every((v, i) => v === sortedCorrect[i])
  }
  if (q.type === 'fill_in_blank') {
    if (typeof ans !== 'string') return false
    const cleanUser = ans.trim().toLowerCase().replace(/[\s\.\,]/g, '')
    if (!cleanUser) return false
    const expected = (q.expectedAnswers && q.expectedAnswers.length) ? q.expectedAnswers : [q.options?.[q.correctOptionIndex] || '']
    return expected.some(exp => {
      const cleanExp = String(exp).trim().toLowerCase().replace(/[\s\.\,]/g, '')
      return cleanUser === cleanExp || cleanUser.includes(cleanExp) || cleanExp.includes(cleanUser)
    })
  }
  if (q.type === 'grid_map') {
    const target = String(q.correctCell || 'E5').trim().toUpperCase()
    return String(ans).trim().toUpperCase() === target
  }
  if (q.type === 'place_value') {
    if (!ans || typeof ans !== 'object' || Array.isArray(ans)) return false
    const tensOk = String(ans.tens || '').trim() === String(q.correctTens || '4').trim()
    const onesOk = String(ans.ones || '').trim() === String(q.correctOnes || '5').trim()
    return tensOk && onesOk
  }
  return ans === q.correctOptionIndex
}

// Evaluasi Langsung per Soal (Immersive Instant Feedback)
const isCurrentQuestionChecked = computed(() => {
  return !!checkedQuestions.value[currentQuestionIndex.value]
})

const isCurrentQuestionCorrect = computed(() => {
  if (!isCurrentQuestionChecked.value) return false
  return checkAnswerCorrectness(currentQuestion.value, selectedAnswers.value[currentQuestionIndex.value])
})

// State Popup Pembahasan Instan
const isExplanationPopupOpen = ref(false)

const evaluateCurrentQuestion = () => {
  const q = currentQuestion.value
  const ans = selectedAnswers.value[currentQuestionIndex.value]
  const isCorrect = checkAnswerCorrectness(q, ans)
  checkedQuestions.value[currentQuestionIndex.value] = true
  if (isCorrect) {
    playCorrectChime()
  } else {
    playEncouragingSound()
  }
  isExplanationPopupOpen.value = true
}

const handlePopupNext = () => {
  isExplanationPopupOpen.value = false
  if (currentQuestionIndex.value < questions.value.length - 1) {
    nextQuestion()
  } else {
    submitQuiz()
  }
}

const formatUserAnswerText = (q, ans) => {
  if (ans === undefined || ans === null) return 'Belum dijawab'
  if (q.type === 'multiple_choice') {
    return q.options?.[ans] !== undefined ? `${String.fromCharCode(65 + ans)}. ${q.options[ans]}` : 'Belum dijawab'
  }
  if (q.type === 'image_choice') {
    return q.imageOptions?.[ans]?.label || (ans !== undefined ? `Pilihan ${String.fromCharCode(65 + ans)}` : 'Belum dijawab')
  }
  if (q.type === 'true_false') {
    return ans === 0 ? 'Benar (B)' : ans === 1 ? 'Salah (S)' : 'Belum dijawab'
  }
  if (q.type === 'fill_in_blank') {
    return String(ans) || 'Belum dijawab'
  }
  if (q.type === 'matching') {
    if (!ans || typeof ans !== 'object' || Array.isArray(ans) || Object.keys(ans).length === 0) return 'Belum dipasangkan'
    return Object.entries(ans).map(([l, r]) => `${l} ➔ ${r}`).join(', ')
  }
  if (q.type === 'ordering') {
    if (!Array.isArray(ans) || ans.filter(Boolean).length === 0) return 'Belum diurutkan'
    return ans.filter(Boolean).join(' ➔ ')
  }
  if (q.type === 'color_choice') {
    return q.colorOptions?.[ans]?.name || 'Belum dijawab'
  }
  if (q.type === 'place_value') {
    if (!ans || typeof ans !== 'object' || Array.isArray(ans)) return 'Belum dijawab'
    return `${ans.tens || '?'} puluhan dan ${ans.ones || '?'} satuan`
  }
  if (q.type === 'grid_map') {
    return `Petak ${ans || '?'}`
  }
  return String(ans)
}

const formatCorrectAnswerText = (q) => {
  if (!q) return '-'
  if (q.type === 'multiple_choice') {
    const idx = q.correctOptionIndex
    return q.options?.[idx] !== undefined ? `${String.fromCharCode(65 + idx)}. ${q.options[idx]}` : '-'
  }
  if (q.type === 'image_choice') {
    const idx = q.correctOptionIndex
    return q.imageOptions?.[idx]?.label || `Pilihan ${String.fromCharCode(65 + idx)}`
  }
  if (q.type === 'true_false') {
    return q.correctOptionIndex === 0 ? 'Benar (B)' : 'Salah (S)'
  }
  if (q.type === 'fill_in_blank') {
    return (q.expectedAnswers && q.expectedAnswers[0]) || q.options?.[q.correctOptionIndex] || '-'
  }
  if (q.type === 'matching') {
    return (q.pairs || []).map(p => `${p.left} ➔ ${p.right}`).join(', ')
  }
  if (q.type === 'ordering') {
    return (q.correctOrder || []).join(' ➔ ')
  }
  if (q.type === 'color_choice') {
    return q.colorOptions?.[q.correctOptionIndex]?.name || '-'
  }
  if (q.type === 'place_value') {
    return `${q.correctTens || '4'} puluhan dan ${q.correctOnes || '5'} satuan`
  }
  if (q.type === 'grid_map') {
    return `Petak ${q.correctCell || 'E5'}`
  }
  return q.options?.[q.correctOptionIndex] || '-'
}

const retryCurrentQuestion = () => {
  playButtonPop()
  delete checkedQuestions.value[currentQuestionIndex.value]
  delete selectedAnswers.value[currentQuestionIndex.value]
  delete customCircledSvg.value[currentQuestionIndex.value]
  activeMatchingLeft.value = null
  if (currentQuestion.value?.type === 'matching') {
    linePairs.value = []
  }
}

const isPairCorrect = (left, right) => {
  return (currentQuestion.value?.pairs || []).some(p => p.left === left && p.right === right)
}

const isPairCorrectForRight = (right) => {
  const pairs = getMatchingAnswersForCurrent()
  for (const [left, r] of Object.entries(pairs)) {
    if (r === right) {
      return isPairCorrect(left, right)
    }
  }
  return false
}

const isSlotCorrect = (slotIdx) => {
  const cur = getOrderingAnswersForCurrent()
  return cur[slotIdx] === currentQuestion.value?.correctOrder?.[slotIdx]
}

const nextQuestion = () => {
  isExplanationPopupOpen.value = false
  playButtonPop()
  activeMatchingLeft.value = null
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

const prevQuestion = () => {
  isExplanationPopupOpen.value = false
  playButtonPop()
  activeMatchingLeft.value = null
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

// Perhitungan Hasil Kuis Komprehensif
const quizScore = computed(() => {
  let score = 0
  questions.value.forEach((q, idx) => {
    if (checkAnswerCorrectness(q, selectedAnswers.value[idx])) {
      score += Number(q.points) || 25
    }
  })
  return score
})

const correctCount = computed(() => {
  let count = 0
  questions.value.forEach((q, idx) => {
    if (checkAnswerCorrectness(q, selectedAnswers.value[idx])) {
      count++
    }
  })
  return count
})

const isPerfectScore = computed(() => {
  return quizScore.value === totalPossibleScore.value && totalPossibleScore.value > 0
})

const submitQuiz = () => {
  isExplanationPopupOpen.value = false
  playFanfare()
  isQuizSubmitted.value = true

  // Simpan riwayat kuis
  try {
    saveQuizAttempt(props.materi?.id || 'materi', quizScore.value, totalPossibleScore.value, questions.value.length)
    if (currentUser.value?.displayName || currentUser.value?.email) {
      submitToMateriLeaderboard(props.materi?.id || 'materi', {
        userId: currentUser.value.id || 'user',
        userName: currentUser.value.displayName || 'Sahabat Prisma',
        userAvatar: currentUser.value.avatar || '🌟',
        score: quizScore.value
      })
    }
  } catch (err) {
    console.warn('Gagal menyimpan hasil kuis:', err)
  }
}

const resetQuiz = () => {
  playButtonPop()
  selectedAnswers.value = {}
  checkedQuestions.value = {}
  currentQuestionIndex.value = 0
  activeMatchingLeft.value = null
  linePairs.value = []
  isQuizSubmitted.value = false
  isExplanationPopupOpen.value = false
}

// Reset tab & state saat materi berganti
watch(() => props.materi?.id, () => {
  isExplanationPopupOpen.value = false
  stopAudioNarration()
  if (currentAudioElement) {
    currentAudioElement.pause()
    currentAudioElement = null
  }
  activeTab.value = 'video'
  selectedVideoIndex.value = 1
  resetQuiz()
  scrollToPageTop()
})

watch(activeTab, () => {
  stopAudioNarration()
  scrollToPageTop()
  nextTick(() => {
    updateMatchingLines()
  })
})

watch(currentQuestionIndex, () => {
  nextTick(() => {
    updateMatchingLines()
  })
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  window.addEventListener('resize', updateMatchingLines)
})

onBeforeUnmount(() => {
  stopAudioNarration()
  window.removeEventListener('resize', updateMatchingLines)
})
</script>

<template>
  <!-- Loading State jika data materi sedang dimuat -->
  <div v-if="!materi || !materi.id" class="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
    <div class="w-14 h-14 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center animate-spin text-2xl border border-[#7FD4C4]/40">
      ⏳
    </div>
    <h3 class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">Menyiapkan Petualangan Belajar...</h3>
    <p class="text-xs text-[#5B6474] max-w-sm">Mohon tunggu sebentar, sedang menyiapkan video dan kuis interaktif untukmu.</p>
    <button @click="emit('back')" class="btn-prisma-mint px-5 py-2.5 text-xs font-semibold mt-2 cursor-pointer shadow-xs">
      Kembali ke Daftar Materi
    </button>
  </div>

  <div v-else class="w-full max-w-5xl mx-auto flex flex-col space-y-6 animate-soft-pop pb-12 font-['Lexend'] text-[#2B3445]">
    <!-- ==================== TOP BAR HEADER ==================== -->
    <!-- ==================== TOP BAR HEADER ==================== -->
    <header class="bg-white rounded-3xl border border-[#8F8575]/25 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <button
          @click="emit('back')"
          class="p-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 border border-[#8F8575]/30 text-[#2B3445] transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E7A6F] shrink-0 active:scale-95 shadow-2xs"
          title="Kembali ke Katalog Materi"
        >
          <ArrowLeft class="w-4 h-4 text-[#1E7A6F]" />
          <span>Kembali</span>
        </button>

        <div class="min-w-0 text-left">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-0.5 rounded-full text-xs font-bold bg-[#FFF8F0] text-[#1E7A6F] border border-[#1E7A6F]/25">
              {{ getKelasFromLevel(materi?.level) }} • Bab {{ chapterNumberInKelas }} dari {{ totalChaptersInKelas }}
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold font-['Baloo_2'] text-[#2B3445] leading-tight mt-1 truncate">
            {{ materi?.title }}
          </h1>
        </div>
      </div>

      <!-- Quick Chapter Stepper Navigation -->
      <div class="flex items-center gap-2 self-stretch sm:self-end md:self-center justify-end shrink-0 flex-wrap">
        <button
          v-if="prevMateri"
          @click="goToPrevChapter"
          class="p-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 border border-[#8F8575]/30 text-[#2B3445] transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold active:scale-95"
          :title="`Bab Sebelumnya: ${prevMateri.title}`"
        >
          <ChevronLeft class="w-4 h-4 text-[#1E7A6F]" />
          <span class="hidden sm:inline">Bab Sebelumnya</span>
        </button>

        <button
          v-if="!isLastChapterInClass && nextMateri"
          @click="goToNextChapter"
          class="btn-prisma-mint px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer transition active:scale-95 shadow-xs"
          :title="`Bab Selanjutnya: ${nextMateri.title}`"
        >
          <span>Bab Selanjutnya</span>
          <ChevronRight class="w-4 h-4 text-[#1E7A6F]" />
        </button>

        <button
          v-else-if="isLastChapterInClass"
          @click="goToNextChapter"
          class="btn-prisma-mint px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer transition active:scale-95 shadow-xs"
          title="Selesai bab di kelas ini, kembali ke katalog materi"
        >
          <span>Katalog Materi</span>
          <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
        </button>
      </div>
    </header>

    <!-- ==================== TAHAP PEMBELAJARAN (TAB BAR BESAR & TACTILE) ==================== -->
    <div class="bg-white rounded-3xl border border-[#8F8575]/25 p-2 sm:p-2.5 shadow-xs flex items-center justify-center gap-2 w-full">
      <button
        @click="activeTab = 'video'; playButtonPop()"
        :class="[
          'flex-1 py-3 px-4 sm:px-6 rounded-2xl font-[\'Baloo_2\'] text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 select-none',
          activeTab === 'video'
            ? 'bg-[#1E7A6F] text-white shadow-sm ring-2 ring-[#1E7A6F]'
            : 'bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 text-[#2B3445]'
        ]"
      >
        <Video class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span>1. Video Edukasi</span>
        <span
          :class="[
            'text-[10px] font-semibold px-2 py-0.5 rounded-full hidden sm:inline-block',
            activeTab === 'video' ? 'bg-white/20 text-white' : 'bg-[#8F8575]/15 text-[#5B6474]'
          ]"
        >
          2 Video
        </span>
      </button>

      <button
        @click="goToBacaan"
        :class="[
          'flex-1 py-3 px-4 sm:px-6 rounded-2xl font-[\'Baloo_2\'] text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 select-none',
          activeTab === 'quiz'
            ? 'bg-[#1E7A6F] text-white shadow-sm ring-2 ring-[#1E7A6F]'
            : 'bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 text-[#2B3445]'
        ]"
      >
        <BookOpen class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span>2. Bacaan Cerita & Kuis</span>
        <span
          :class="[
            'text-[10px] font-semibold px-2 py-0.5 rounded-full hidden sm:inline-block',
            activeTab === 'quiz' ? 'bg-white/20 text-white' : 'bg-[#8F8575]/15 text-[#5B6474]'
          ]"
        >
          {{ questions.length }} Soal
        </span>
      </button>
    </div>

    <!-- ==================== MAIN CONTENT CONTAINER ==================== -->
    <div class="w-full space-y-6">

    <!-- ==================== LANGKAH 1: VIDEO (2 VIDEO EDUKASI) ==================== -->
    <div v-if="activeTab === 'video'" class="space-y-6 animate-soft-pop">
      <div class="card-prisma p-5 sm:p-7 lg:p-8 space-y-6">
        
        <!-- Header Tahap Video -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#8F8575]/20 pb-5 text-left">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#94C6FF]/25 text-[#1E7A6F] border border-[#94C6FF]/50">
              <Video class="w-3.5 h-3.5 text-[#1E7A6F]" /> Langkah 1: Video Pembelajaran
            </span>
            <h2 class="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-[#2B3445] mt-1.5 leading-snug">
              {{ materi?.title }}
            </h2>
            <p class="text-xs sm:text-sm text-[#5B6474] font-normal mt-0.5">
              {{ materi?.description }}
            </p>
          </div>

          <div class="text-right shrink-0">
            <span class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FFF8F0] border border-[#8F8575]/25 text-[#2B3445] block">
              2 Pilihan Video
            </span>
          </div>
        </div>

        <!-- Video 1 & Video 2 Selector Buttons -->
        <div class="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
          <button
            @click="switchVideo(1)"
            :class="[
              'px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2.5 transition cursor-pointer border',
              selectedVideoIndex === 1
                ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
            ]"
          >
            <Film class="w-4 h-4" />
            <span>{{ videoList.video1.title || 'Video 1: Konsep Materi' }}</span>
          </button>

          <button
            @click="switchVideo(2)"
            :class="[
              'px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2.5 transition cursor-pointer border',
              selectedVideoIndex === 2
                ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm'
                : 'bg-white text-[#2B3445] border-[#8F8575]/30 hover:border-[#1E7A6F]'
            ]"
          >
            <Film class="w-4 h-4" />
            <span>{{ videoList.video2.title || 'Video 2: Eksperimen & Praktik' }}</span>
          </button>
        </div>

        <!-- Video Player Display Container -->
        <div class="w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-md relative border border-[#8F8575]/25 flex items-center justify-center">
          
          <!-- Case A: YouTube Video -->
          <iframe
            v-if="isCurrentVideoYouTube"
            :src="currentEmbedUrl"
            :title="currentVideo.title"
            class="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          <!-- Case B: Direct Upload / MP4 Video -->
          <video
            v-else-if="currentVideo.url"
            ref="videoPlayerRef"
            :src="currentVideo.url"
            controls
            playsinline
            class="w-full h-full object-contain"
          ></video>

          <!-- Fallback No Video -->
          <div v-else class="text-center p-8 text-white space-y-2">
            <Video class="w-12 h-12 text-[#94C6FF] mx-auto" />
            <p class="font-semibold text-sm">Video belum diatur oleh admin</p>
          </div>
        </div>

        <!-- Video Info & Speed Control (For MP4) -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/20">
          <div class="text-left">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white text-[#1E7A6F] border border-[#8F8575]/30">
                Video {{ selectedVideoIndex }} dari 2
              </span>
              <span v-if="isCurrentVideoYouTube" class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFB899]/30 text-[#2B3445] border border-[#8F8575]/20">
                YouTube
              </span>
              <span v-else class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#7FD4C4]/30 text-[#2B3445] border border-[#8F8575]/20">
                MP4 Video
              </span>
            </div>
            <h4 class="font-['Baloo_2'] font-bold text-lg text-[#2B3445] mt-1">
              {{ currentVideo.title }}
            </h4>
          </div>

          <!-- Speed controller for native video -->
          <div v-if="!isCurrentVideoYouTube && currentVideo.url" class="flex items-center gap-1.5 self-end sm:self-center">
            <span class="text-xs font-semibold text-[#5B6474] mr-1">Kecepatan:</span>
            <button
              v-for="s in [0.75, 1.0, 1.25]"
              :key="s"
              @click="setPlaybackSpeed(s)"
              :class="[
                'px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer',
                currentPlaybackSpeed === s
                  ? 'bg-[#1E7A6F] text-white'
                  : 'bg-white text-[#2B3445] border border-[#8F8575]/30 hover:border-[#1E7A6F]'
              ]"
            >
              {{ s }}x
            </button>
          </div>
        </div>

        <!-- Video Bottom Navigation -->
        <div class="pt-4 border-t border-[#8F8575]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2.5 flex-wrap">
            <button
              v-if="selectedVideoIndex === 1"
              @click="switchVideo(2)"
              class="btn-prisma-white px-5 py-2.5 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <span>Tonton Video 2 (Praktik)</span>
              <ChevronRight class="w-4 h-4 text-[#1E7A6F]" />
            </button>
            <button
              v-else-if="selectedVideoIndex === 2"
              @click="switchVideo(1)"
              class="btn-prisma-white px-5 py-2.5 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <ChevronRight class="w-4 h-4 text-[#1E7A6F] rotate-180" />
              <span>Kembali ke Video 1 (Konsep)</span>
            </button>

            <!-- Shortcut Langsung ke Bab Selanjutnya / Kembali ke Katalog -->
            <button
              v-if="!isLastChapterInClass && nextMateri"
              @click="goToNextChapter"
              class="px-4 py-2.5 rounded-2xl bg-white hover:bg-[#7FD4C4]/15 border border-[#8F8575]/25 text-[#1E7A6F] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              :title="`Lanjut ke ${nextMateri.title}`"
            >
              <span>Lompat ke Bab Selanjutnya</span>
              <ChevronRight class="w-3.5 h-3.5" />
            </button>
            <button
              v-else-if="isLastChapterInClass"
              @click="goToNextChapter"
              class="px-4 py-2.5 rounded-2xl bg-white hover:bg-[#7FD4C4]/15 border border-[#8F8575]/25 text-[#1E7A6F] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Ke Katalog Materi"
            >
              <span>Katalog Materi</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            @click="goToBacaan"
            class="btn-prisma-mint px-6 py-3.5 text-sm font-semibold flex items-center gap-2.5 cursor-pointer transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1E7A6F] shadow-sm"
          >
            <span>{{ readingText ? 'Lanjut ke Bacaan Cerita' : 'Lanjut ke Kuis Interaktif' }}</span>
            <BookOpen v-if="readingText" class="w-4 h-4 text-[#1E7A6F]" />
            <Sparkles v-else class="w-4 h-4 text-[#1E7A6F]" />
            <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
          </button>
        </div>

      </div>
    </div>

    <!-- ==================== LANGKAH 2: QUIZ (BACAAN & KUIS INTERAKTIF) ==================== -->
    <div v-if="activeTab === 'quiz'" class="space-y-6 animate-soft-pop">
      
      <!-- ==================== KARTU BACAAN CERITA ==================== -->
      <section
        ref="bacaanSectionRef"
        v-if="readingText"
        class="bg-white rounded-3xl border border-[#8F8575]/25 p-5 sm:p-7 shadow-xs space-y-4 text-left transition-all duration-300 scroll-mt-24"
      >
        <!-- Header Kartu Bacaan -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#8F8575]/15 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-[#7FD4C4]/25 text-[#1E7A6F] flex items-center justify-center shrink-0 border border-[#1E7A6F]/20">
              <BookOpen class="w-5 h-5 text-[#1E7A6F]" />
            </div>
            <div>
              <span class="text-xs font-bold text-[#1E7A6F] uppercase tracking-wider block">
                Bacaan Cerita
              </span>
              <h3 class="font-['Baloo_2'] text-lg sm:text-xl font-bold text-[#2B3445] leading-snug">
                {{ materi?.title }}
              </h3>
            </div>
          </div>

          <!-- Aksi: Suara Narasi & Buka/Tutup Bacaan -->
          <div class="flex items-center gap-2">
            <!-- Tombol Dengar Narasi Suara -->
            <button
              type="button"
              @click="toggleAudioNarration"
              class="px-3.5 py-2 rounded-xl border border-[#1E7A6F]/30 bg-[#7FD4C4]/20 hover:bg-[#7FD4C4]/35 text-[#1E7A6F] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95"
              :title="isPlayingAudio ? 'Hentikan suara' : 'Dengarkan suara cerita'"
            >
              <Volume2 v-if="!isPlayingAudio" class="w-4 h-4" />
              <VolumeX v-else class="w-4 h-4 text-[#D97706]" />
              <span>{{ isPlayingAudio ? 'Hentikan Suara' : 'Dengar Cerita' }}</span>
            </button>

            <!-- Toggle Sembunyikan / Buka -->
            <button
              type="button"
              @click="isBacaanExpanded = !isBacaanExpanded; playButtonPop()"
              class="px-3.5 py-2 rounded-xl border border-[#8F8575]/25 bg-[#FFF8F0] hover:bg-black/5 text-[#2B3445] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer active:scale-95"
            >
              <span>{{ isBacaanExpanded ? 'Sembunyikan' : 'Buka Cerita' }}</span>
              <ChevronUp v-if="isBacaanExpanded" class="w-3.5 h-3.5 text-[#5B6474]" />
              <ChevronDown v-else class="w-3.5 h-3.5 text-[#5B6474]" />
            </button>
          </div>
        </div>

        <!-- Konten Teks Bacaan & Ilustrasi Cerita -->
        <div
          v-show="isBacaanExpanded"
          class="space-y-4 pt-1"
        >
          <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <!-- Ilustrasi Cerita Cover (Kiri / Atas) -->
            <div v-if="materi?.image" class="md:col-span-5 rounded-2xl overflow-hidden border border-[#8F8575]/25 bg-white shadow-xs">
              <img
                :src="materi?.image"
                :alt="materi?.title"
                class="w-full h-44 sm:h-52 md:h-full max-h-64 object-cover"
              />
            </div>

            <!-- Paragraf Cerita (Kanan / Bawah) -->
            <div :class="materi?.image ? 'md:col-span-7' : 'col-span-12'" class="space-y-3.5">
              <template v-for="(block, bIdx) in parsedReadingBlocks" :key="bIdx">
                <!-- Teks Paragraf Normal -->
                <p
                  v-if="block.type === 'paragraph'"
                  class="text-[#2B3445] font-['Lexend'] text-sm sm:text-base leading-relaxed sm:leading-loose whitespace-pre-line select-text"
                >
                  {{ block.content }}
                </p>

                <!-- Tabel Data Rapi & Responsif -->
                <div
                  v-else-if="block.type === 'table'"
                  class="my-3 overflow-x-auto rounded-2xl border-2 border-[#1E7A6F]/20 bg-white shadow-xs"
                >
                  <table class="w-full border-collapse text-left font-['Lexend'] text-xs sm:text-sm">
                    <thead>
                      <tr class="bg-[#1E7A6F] text-white">
                        <th
                          v-for="(header, hIdx) in block.headers"
                          :key="hIdx"
                          class="px-3.5 sm:px-4 py-2.5 font-bold tracking-wide border-b border-[#145C53]"
                          :class="hIdx === 0 ? 'rounded-tl-xl' : hIdx === block.headers.length - 1 ? 'rounded-tr-xl' : ''"
                        >
                          {{ header }}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#8F8575]/15">
                      <tr
                        v-for="(row, rIdx) in block.rows"
                        :key="rIdx"
                        :class="rIdx % 2 === 0 ? 'bg-white' : 'bg-[#FFF8F0]/70'"
                        class="hover:bg-[#7FD4C4]/15 transition-colors"
                      >
                        <td
                          v-for="(cell, cIdx) in row"
                          :key="cIdx"
                          class="px-3.5 sm:px-4 py-2.5 text-[#2B3445] font-medium align-middle"
                        >
                          <span
                            v-if="cell.includes('卌') || cell.includes('│')"
                            class="font-mono text-sm sm:text-base font-bold text-[#1E7A6F] tracking-wider px-2 py-0.5 rounded-lg bg-[#7FD4C4]/20 border border-[#1E7A6F]/20 inline-block"
                          >
                            {{ cell }}
                          </span>
                          <span v-else>{{ cell }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </div>

          <!-- Tombol Aksi Menuju Kuis Interaktif (di bawah Bacaan Cerita) -->
          <div class="pt-5 mt-2 border-t border-[#8F8575]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2 text-xs sm:text-sm text-[#5B6474]">
              <Sparkles class="w-4 h-4 text-[#1E7A6F] shrink-0" />
              <span>Sudah selesai membaca? Yuk mulai kuis interaktifnya di bawah!</span>
            </div>
            <button
              type="button"
              @click="scrollToQuiz"
              class="w-full sm:w-auto btn-prisma-mint px-6 py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2.5 cursor-pointer transition active:scale-95 shadow-sm"
            >
              <span>Lanjut ke Kuis Interaktif</span>
              <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
              <ArrowDown class="w-4 h-4 text-[#1E7A6F]" />
            </button>
          </div>
        </div>

        <!-- Ringkasan jika sedang disembunyikan -->
        <div
          v-if="!isBacaanExpanded"
          @click="isBacaanExpanded = true; playButtonPop()"
          class="bg-[#FFF8F0] p-3 rounded-2xl border border-dashed border-[#8F8575]/35 text-xs text-[#5B6474] flex items-center justify-between cursor-pointer hover:bg-[#7FD4C4]/15 transition"
        >
          <span class="truncate max-w-xl italic">"{{ readingText.slice(0, 110) }}..."</span>
          <span class="text-[#1E7A6F] font-bold shrink-0 ml-2">Buka Cerita ▾</span>
        </div>
      </section>

      <!-- ==================== KARTU KUIS AKTIF (COMPACT & RAMAH ANAK SD) ==================== -->
      <div ref="quizSectionRef" class="card-prisma p-5 sm:p-7 lg:p-8 space-y-6 text-left scroll-mt-24">
        
        <!-- ==================== QUIZ ACTIVE QUESTION VIEW ==================== -->
        <div v-if="!isQuizSubmitted && questions.length > 0" class="space-y-5">
          
          <!-- Compact Unified Header (Soal, Tipe, Progress, Poin) -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#8F8575]/20">
            <!-- Left: Question Indicator -->
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1E7A6F] text-white text-xs font-bold tracking-wide shadow-2xs">
                <span>Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}</span>
              </span>
            </div>

            <!-- Middle: Mini Progress Bar (sm+) -->
            <div class="hidden sm:flex items-center gap-2.5 flex-1 max-w-xs mx-2">
              <div class="w-full h-2.5 bg-[#FFF8F0] rounded-full overflow-hidden border border-[#8F8575]/20">
                <div
                  class="h-full bg-gradient-to-r from-[#7FD4C4] to-[#1E7A6F] transition-all duration-300 rounded-full"
                  :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
                ></div>
              </div>
              <span class="text-[11px] font-bold text-[#5B6474] shrink-0">
                {{ Math.round(((currentQuestionIndex + 1) / questions.length) * 100) }}%
              </span>
            </div>

            <!-- Right: Points Badge -->
            <div class="flex items-center gap-2">
              <span class="px-3.5 py-1.5 rounded-xl bg-[#FFDE7A]/60 text-[#2B3445] border border-[#8F8575]/30 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <Sparkles class="w-3.5 h-3.5 text-[#1E7A6F]" />
                <span>+{{ currentQuestion.points || 50 }} Poin</span>
              </span>
            </div>
          </div>

          <!-- Main Question Box (Visual yang Menonjol untuk Anak SD) -->
          <div class="space-y-6">
            
            <!-- Question Text (Besar & Jelas) -->
            <h3 class="font-['Baloo_2'] text-xl sm:text-2xl lg:text-3xl font-bold text-[#2B3445] leading-snug">
              {{ currentQuestion.questionText }}
            </h3>

            <!-- Informasi Tambahan / Piktogram / Konteks (jika ada) -->
            <div v-if="currentQuestion.info" class="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FFF8F0] border-2 border-[#FFDE7A] text-xs sm:text-sm text-[#2B3445] shadow-xs">
              <div class="w-7 h-7 rounded-xl bg-[#FFDE7A] text-[#2B3445] flex items-center justify-center shrink-0 mt-0.5">
                <Info class="w-4 h-4" />
              </div>
              <div class="leading-relaxed">
                <span class="font-bold text-[#1E7A6F] block text-xs uppercase tracking-wider mb-0.5">Petunjuk Informasi:</span>
                <span>{{ currentQuestion.info }}</span>
              </div>
            </div>

            <!-- Optional Question Banner Image (Hanya tampil jika bukan image_choice dan tidak memiliki imageOptions agar tidak dobel) -->
            <div
              v-if="currentQuestion.image && currentQuestion.type !== 'image_choice' && !(currentQuestion.imageOptions && currentQuestion.imageOptions.length)"
              class="w-full flex justify-center py-2"
            >
              <div class="max-w-xl w-full flex items-center justify-center p-3 rounded-3xl bg-[#FFF8F0] border border-[#8F8575]/20 shadow-2xs">
                <img
                  :src="currentQuestion.image"
                  :alt="currentQuestion.questionText"
                  class="w-full max-h-60 object-contain"
                />
              </div>
            </div>

            <!-- ==================== MODE 1: IMAGE CHOICE ("LINGKARI GAMBAR SECARA MANUAL") ==================== -->
            <div v-if="currentQuestion.type === 'image_choice'" class="space-y-4 pt-2">
              <!-- Interactive Circling Canvas Wrapper -->
              <div
                ref="circlingContainerRef"
                @pointerdown="onCirclingPointerDown"
                class="relative touch-none select-none rounded-3xl p-4 sm:p-6 bg-[#FFF8F0]/40 border-2 border-dashed border-[#8F8575]/25"
              >
                <!-- Clean Controls (Hanya tampil tombol Hapus Coretan jika ada coretan manual) -->
                <div v-if="selectedAnswers[currentQuestionIndex] !== undefined && customCircledSvg[currentQuestionIndex]" class="flex justify-end mb-3">
                  <button
                    type="button"
                    @click.stop="clearManualCircle"
                    class="px-3.5 py-1.5 rounded-xl bg-white text-[#D97706] text-xs font-bold flex items-center gap-1.5 border border-[#D97706]/30 hover:bg-black/5 cursor-pointer transition active:scale-95 shadow-2xs"
                  >
                    <Eraser class="w-3.5 h-3.5" />
                    <span>Hapus Coretan</span>
                  </button>
                </div>

                <!-- SVG Overlay for Manual Freehand Circling -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
                  <!-- Live stroke while drawing -->
                  <path
                    v-if="isDrawingCircle && currentCirclePoints.length > 1"
                    :d="getPointsPathD(currentCirclePoints)"
                    fill="none"
                    stroke="#1E7A6F"
                    stroke-width="5.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    opacity="0.8"
                  />
                  <!-- Saved freehand stroke -->
                  <path
                    v-else-if="customCircledSvg[currentQuestionIndex]"
                    :d="customCircledSvg[currentQuestionIndex]"
                    fill="none"
                    stroke="#1E7A6F"
                    stroke-width="5.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    filter="drop-shadow(0 2px 4px rgba(30,122,111,0.25))"
                  />
                </svg>

                <!-- Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                  <div
                    v-for="(opt, optIdx) in currentQuestion.imageOptions || []"
                    :key="optIdx"
                    :data-image-option-card="optIdx"
                    @click="selectImageOptionDirectly(optIdx)"
                    :class="[
                      'relative rounded-3xl p-5 transition-all duration-200 cursor-pointer flex flex-col items-center text-center bg-white border-2 select-none group',
                      isCurrentQuestionChecked ? 'pointer-events-none' : '',
                      isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx
                        ? isCurrentQuestionCorrect
                          ? 'border-[#1E7A6F] shadow-md ring-4 ring-[#7FD4C4]/40 bg-[#7FD4C4]/15 scale-[1.02]'
                          : 'border-[#D97706] shadow-md ring-4 ring-[#FFDE7A]/50 bg-[#FFDE7A]/25 scale-[1.02]'
                        : isCurrentQuestionChecked && optIdx === currentQuestion.correctOptionIndex && !isCurrentQuestionCorrect
                        ? 'border-2 border-dashed border-[#1E7A6F] bg-[#7FD4C4]/10 shadow-sm'
                        : selectedAnswers[currentQuestionIndex] === optIdx
                        ? 'border-[#1E7A6F] shadow-md ring-4 ring-[#7FD4C4]/40 bg-[#7FD4C4]/5 scale-[1.02]'
                        : 'border-[#8F8575]/25 hover:border-[#1E7A6F]/60 hover:shadow-sm'
                    ]"
                  >
                    <!-- Evaluation Badges -->
                    <div
                      v-if="isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx"
                      :class="[
                        'absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full text-white text-xs font-bold shadow-sm flex items-center gap-1',
                        isCurrentQuestionCorrect ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'
                      ]"
                    >
                      <Check v-if="isCurrentQuestionCorrect" class="w-3.5 h-3.5" />
                      <Info v-else class="w-3.5 h-3.5" />
                      <span>{{ isCurrentQuestionCorrect ? 'Tepat! 🎉' : 'Pilihanmu 💡' }}</span>
                    </div>
                    <div
                      v-else-if="isCurrentQuestionChecked && optIdx === currentQuestion.correctOptionIndex && !isCurrentQuestionCorrect"
                      class="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-[#1E7A6F] text-white text-xs font-bold shadow-sm flex items-center gap-1"
                    >
                      <Star class="w-3.5 h-3.5" />
                      <span>Kunci Jawaban ⭐</span>
                    </div>
                    <div
                      v-else-if="selectedAnswers[currentQuestionIndex] === optIdx"
                      class="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-[#1E7A6F] text-white text-xs font-bold shadow-sm flex items-center gap-1"
                    >
                      <Check class="w-3.5 h-3.5" />
                      <span>Dilingkari</span>
                    </div>

                    <!-- Choice Letter Badge -->
                    <span
                      :class="[
                        'absolute top-3 left-3 w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-colors z-30',
                        isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx
                          ? isCurrentQuestionCorrect
                            ? 'bg-[#1E7A6F] text-white'
                            : 'bg-[#D97706] text-white'
                          : isCurrentQuestionChecked && optIdx === currentQuestion.correctOptionIndex && !isCurrentQuestionCorrect
                          ? 'bg-[#1E7A6F] text-white'
                          : selectedAnswers[currentQuestionIndex] === optIdx
                          ? 'bg-[#1E7A6F] text-white'
                          : 'bg-[#FFF8F0] text-[#2B3445] border border-[#8F8575]/25'
                      ]"
                    >
                      {{ String.fromCharCode(65 + optIdx) }}
                    </span>

                    <!-- Image Container -->
                    <div class="w-full aspect-square max-h-48 rounded-2xl flex items-center justify-center p-3 my-2 bg-transparent">
                      <img
                        :src="opt.image"
                        :alt="opt.label || ('Pilihan ' + String.fromCharCode(65 + optIdx))"
                        class="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105 pointer-events-none"
                      />
                    </div>

                    <!-- Image Label (Hanya tampil jika ada label teks) -->
                    <p v-if="opt.label && opt.label.trim()" class="font-['Baloo_2'] text-base sm:text-lg font-bold text-[#2B3445] mt-1 leading-snug">
                      {{ opt.label }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 2: MATCHING ("TARIK GARIS NYATA / HUBUNGKAN") ==================== -->
            <div v-else-if="currentQuestion.type === 'matching'" class="space-y-4 pt-2">
              <!-- Clean Reset Action (Hanya jika ada garis yang terhubung) -->
              <div v-if="Object.keys(getMatchingAnswersForCurrent()).length > 0" class="flex justify-end -mb-2">
                <button
                  @click="resetMatching"
                  class="text-xs font-bold text-[#B45309] hover:text-[#92400E] flex items-center gap-1.5 cursor-pointer bg-white px-3.5 py-1.5 rounded-xl border border-[#D97706]/30 shadow-2xs transition active:scale-95"
                >
                  <Undo2 class="w-3.5 h-3.5" /> <span>Reset Garis</span>
                </button>
              </div>

              <!-- Main Interactive Matching Board with Real SVG Line Drawing -->
              <div
                ref="matchingContainerRef"
                class="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 pt-2 pb-4 select-none"
              >
                <!-- SVG Canvas for Drawing and Connected Lines -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
                  <!-- Permanent Connected Lines -->
                  <g v-for="line in linePairs" :key="`${line.left}-${line.right}`">
                    <path
                      :d="getLinePath(line.x1, line.y1, line.x2, line.y2)"
                      fill="none"
                      stroke="#1E7A6F"
                      stroke-width="4.5"
                      stroke-linecap="round"
                    />
                    <!-- End Dots -->
                    <circle
                      :cx="line.x1"
                      :cy="line.y1"
                      r="6"
                      fill="#1E7A6F"
                      stroke="#FFFFFF"
                      stroke-width="2"
                    />
                    <circle
                      :cx="line.x2"
                      :cy="line.y2"
                      r="6"
                      fill="#1E7A6F"
                      stroke="#FFFFFF"
                      stroke-width="2"
                    />
                  </g>

                  <!-- Live Dragging Line (while user draws with finger/mouse) -->
                  <g v-if="dragLineState.isDragging">
                    <path
                      :d="getLinePath(dragLineState.startX, dragLineState.startY, dragLineState.currentX, dragLineState.currentY)"
                      fill="none"
                      stroke="#1E7A6F"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-dasharray="8 6"
                    />
                    <circle :cx="dragLineState.startX" :cy="dragLineState.startY" r="8" fill="#1E7A6F" stroke="#FFFFFF" stroke-width="3" />
                    <circle :cx="dragLineState.currentX" :cy="dragLineState.currentY" r="9" fill="#FFDE7A" stroke="#1E7A6F" stroke-width="3" />
                  </g>
                </svg>

                <!-- Kolom Kiri (A) -->
                <div class="space-y-3 relative z-10">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-[#5B6474] px-1 flex items-center justify-between">
                    <span>Kolom A</span>
                    <span class="text-[11px] font-normal">Tarik dari Titik Pin 👉</span>
                  </h4>
                  <div class="space-y-3">
                    <div
                      v-for="(item, idx) in currentQuestion.leftItems || []"
                      :key="idx"
                      @click="selectMatchingLeft(item)"
                      :class="[
                        'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 text-sm font-semibold select-none relative group',
                        activeMatchingLeft === item
                          ? 'border-[#1E7A6F] bg-[#7FD4C4]/20 ring-2 ring-[#1E7A6F] scale-[1.01] shadow-xs text-[#1E7A6F]'
                          : getMatchingAnswersForCurrent()[item]
                          ? 'bg-white border-[#1E7A6F] text-[#2B3445] shadow-xs'
                          : 'bg-white border-[#8F8575]/25 hover:border-[#1E7A6F] text-[#2B3445]'
                      ]"
                    >
                      <div class="flex items-center gap-3">
                        <span class="w-7 h-7 rounded-lg bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-bold flex items-center justify-center text-[#5B6474]">
                          {{ idx + 1 }}
                        </span>
                        <span>{{ item }}</span>
                      </div>

                      <div class="flex items-center gap-2">
                        <button
                          v-if="getMatchingAnswersForCurrent()[item] && !isCurrentQuestionChecked"
                          @click.stop="removeMatchingPair(item)"
                          class="w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center text-xs text-[#5B6474] transition active:scale-95 cursor-pointer"
                          title="Putus garis pasangan"
                        >
                          ✕
                        </button>
                        
                        <!-- Connector Pin Dot on Right Edge -->
                        <div
                          :data-match-left-pin="item"
                          @pointerdown.stop="startDragLine(item, $event)"
                          class="w-7 h-7 rounded-full bg-white border-2 border-[#1E7A6F] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform shadow-xs"
                          title="Tarik garis dari sini"
                        >
                          <span
                            class="w-3 h-3 rounded-full transition-colors"
                            :class="getMatchingAnswersForCurrent()[item] ? 'bg-[#1E7A6F]' : 'bg-[#8F8575]/40'"
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Kolom Kanan (B) -->
                <div class="space-y-3 relative z-10">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-[#5B6474] px-1 flex items-center justify-between">
                    <span>Kolom B</span>
                    <span class="text-[11px] font-normal">Lepas Garis di Sini 🎯</span>
                  </h4>
                  <div class="space-y-3">
                    <div
                      v-for="(item, idx) in currentQuestion.rightItems || []"
                      :key="idx"
                      :data-match-right="item"
                      @click="selectMatchingRight(item)"
                      :class="[
                        'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 text-sm font-semibold select-none relative group',
                        getPairColorForRight(item)
                          ? 'bg-white border-[#1E7A6F] text-[#2B3445] shadow-xs'
                          : activeMatchingLeft || dragLineState.isDragging
                          ? 'bg-white border-dashed border-[#1E7A6F] hover:bg-[#7FD4C4]/15 hover:scale-[1.01] text-[#2B3445]'
                          : 'bg-white border-[#8F8575]/25 text-[#2B3445]'
                      ]"
                    >
                      <div class="flex items-center gap-3">
                        <!-- Connector Pin Dot on Left Edge -->
                        <div
                          :data-match-right-pin="item"
                          class="w-7 h-7 rounded-full bg-white border-2 border-[#1E7A6F] flex items-center justify-center shrink-0 shadow-xs"
                        >
                          <span
                            class="w-3 h-3 rounded-full transition-colors"
                            :class="getPairColorForRight(item) ? 'bg-[#1E7A6F]' : 'bg-[#8F8575]/40'"
                          ></span>
                        </div>

                        <span class="w-7 h-7 rounded-lg bg-[#FFF8F0] border border-[#8F8575]/25 text-xs font-bold flex items-center justify-center text-[#5B6474]">
                          {{ String.fromCharCode(65 + idx) }}
                        </span>
                        <span>{{ item }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 3: ORDERING ("DRAG AND DROP MENGURUTKAN KARTU") ==================== -->
            <div v-else-if="currentQuestion.type === 'ordering'" class="space-y-6 pt-1">
              <!-- Reset Urutan Button (Hanya jika ada kartu yang sudah ditaruh) -->
              <div v-if="getOrderingAnswersForCurrent().length > 0 && !isCurrentQuestionChecked" class="flex justify-end -mb-2">
                <button
                  @click="resetOrdering"
                  class="text-xs font-bold text-[#B45309] hover:text-[#92400E] flex items-center gap-1.5 cursor-pointer bg-white px-3.5 py-1.5 rounded-xl border border-[#D97706]/30 shadow-2xs transition active:scale-95"
                >
                  <Undo2 class="w-3.5 h-3.5" /> <span>Reset Urutan</span>
                </button>
              </div>

              <!-- Kotak Sasaran Urutan (Drop Targets) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  v-for="(_, slotIdx) in currentQuestion.orderItems || []"
                  :key="slotIdx"
                  @dragover="onSlotDragOver(slotIdx, $event)"
                  @dragleave="onSlotDragLeave(slotIdx)"
                  @drop="onSlotDrop(slotIdx, $event)"
                  class="min-h-24 rounded-3xl border-2 p-4 flex flex-col justify-between transition-all duration-200 select-none"
                  :class="[
                    dragOverSlotIdx === slotIdx
                      ? 'border-[#1E7A6F] bg-[#7FD4C4]/25 ring-4 ring-[#7FD4C4]/40 scale-105 shadow-md'
                      : isCurrentQuestionChecked && getOrderingAnswersForCurrent()[slotIdx]
                      ? isSlotCorrect(slotIdx)
                        ? 'bg-[#7FD4C4]/20 border-[#1E7A6F] shadow-sm ring-2 ring-[#7FD4C4]/40'
                        : 'bg-[#FFDE7A]/30 border-[#D97706] shadow-sm ring-2 ring-[#FFDE7A]/50'
                      : getOrderingAnswersForCurrent()[slotIdx]
                      ? 'bg-white border-[#1E7A6F] shadow-sm'
                      : 'border-dashed border-[#8F8575]/35 bg-[#FFF8F0]/70 items-center justify-center'
                  ]"
                >
                  <div class="flex items-center justify-between w-full">
                    <span
                      class="w-8 h-8 rounded-xl text-white text-xs font-bold flex items-center justify-center shadow-xs font-['Baloo_2']"
                      :class="isCurrentQuestionChecked && getOrderingAnswersForCurrent()[slotIdx] ? (isSlotCorrect(slotIdx) ? 'bg-[#1E7A6F]' : 'bg-[#D97706]') : 'bg-[#1E7A6F]'"
                    >
                      {{ slotIdx + 1 }}
                    </span>
                    <span
                      v-if="isCurrentQuestionChecked && getOrderingAnswersForCurrent()[slotIdx]"
                      :class="[
                        'px-2.5 py-0.5 rounded-lg text-xs font-bold text-white',
                        isSlotCorrect(slotIdx) ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'
                      ]"
                    >
                      {{ isSlotCorrect(slotIdx) ? '✓ Tepat' : '💡 Belum Pas' }}
                    </span>
                    <button
                      v-else-if="getOrderingAnswersForCurrent()[slotIdx]"
                      @click="removeFromOrdering(getOrderingAnswersForCurrent()[slotIdx])"
                      class="w-6 h-6 rounded-full hover:bg-black/10 text-xs text-[#5B6474] flex items-center justify-center cursor-pointer transition active:scale-95"
                      title="Keluarkan dari kotak"
                    >
                      ✕
                    </button>
                  </div>

                  <!-- Isi Kartu di dalam Kotak -->
                  <div
                    v-if="getOrderingAnswersForCurrent()[slotIdx]"
                    :draggable="!isCurrentQuestionChecked"
                    @dragstart="onCardDragStart(getOrderingAnswersForCurrent()[slotIdx], $event)"
                    class="font-['Baloo_2'] font-bold text-xl sm:text-2xl text-[#2B3445] mt-2 leading-snug text-center py-1 select-none"
                    :class="!isCurrentQuestionChecked ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'"
                  >
                    <span>{{ getOrderingAnswersForCurrent()[slotIdx] }}</span>
                  </div>
                  <div v-else class="py-3 text-center">
                    <span class="text-sm font-semibold text-[#8F8575]/65 font-['Baloo_2']">
                      Urutan {{ slotIdx + 1 }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Pilihan Kartu (Drag / Tap Source) -->
              <div
                @dragover.prevent
                @drop="onDropToCardPool"
                class="pt-3 border-t border-[#8F8575]/20 bg-[#FFF8F0]/50 p-4 sm:p-5 rounded-3xl border border-dashed border-[#8F8575]/30"
              >
                <div class="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <div
                    v-for="(item, idx) in currentQuestion.orderItems || []"
                    :key="idx"
                    :draggable="!isCurrentQuestionChecked && !getOrderingAnswersForCurrent().includes(item)"
                    @dragstart="onCardDragStart(item, $event)"
                    @click="addToOrdering(item)"
                    class="px-6 py-4 rounded-2xl font-['Baloo_2'] font-bold text-xl sm:text-2xl transition-all border-2 flex items-center select-none"
                    :class="[
                      isCurrentQuestionChecked
                        ? 'opacity-60 cursor-default bg-white border-[#8F8575]/20 text-[#8F8575]'
                        : getOrderingAnswersForCurrent().includes(item)
                        ? 'opacity-30 bg-[#E0E0E0] border-transparent text-[#8F8575] cursor-not-allowed line-through scale-95'
                        : 'bg-white border-[#8F8575]/30 hover:border-[#1E7A6F] hover:bg-[#7FD4C4]/15 hover:shadow-md cursor-pointer active:scale-105 text-[#2B3445] shadow-xs'
                    ]"
                  >
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 4: TRUE / FALSE ("LINGKARI B ATAU S") ==================== -->
            <div v-else-if="currentQuestion.type === 'true_false'" class="space-y-4 pt-1">

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <!-- Opsi B (Benar) -->
                <button
                  @click="selectAnswer(0)"
                  :disabled="isCurrentQuestionChecked"
                  :class="[
                    'relative p-6 rounded-3xl border-2 transition-all flex items-center gap-5 cursor-pointer text-left select-none',
                    isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === 0
                      ? isCurrentQuestionCorrect
                        ? 'bg-[#7FD4C4]/25 border-[#1E7A6F] ring-4 ring-[#7FD4C4]/40 shadow-sm scale-[1.02]'
                        : 'bg-[#FFDE7A]/30 border-[#D97706] ring-4 ring-[#FFDE7A]/50 shadow-sm scale-[1.02]'
                      : isCurrentQuestionChecked && currentQuestion.correctOptionIndex === 0 && !isCurrentQuestionCorrect
                      ? 'border-2 border-dashed border-[#1E7A6F] bg-[#7FD4C4]/15 shadow-sm'
                      : selectedAnswers[currentQuestionIndex] === 0
                      ? 'bg-[#7FD4C4]/20 border-[#1E7A6F] ring-4 ring-[#7FD4C4]/40 shadow-sm scale-[1.02]'
                      : 'bg-white border-[#8F8575]/30 hover:border-[#1E7A6F]'
                  ]"
                >
                  <div
                    :class="[
                      'w-14 h-14 rounded-2xl font-bold font-[\'Baloo_2\'] text-2xl flex items-center justify-center shrink-0 transition-colors',
                      isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === 0
                        ? isCurrentQuestionCorrect ? 'bg-[#1E7A6F] text-white' : 'bg-[#D97706] text-white'
                        : isCurrentQuestionChecked && currentQuestion.correctOptionIndex === 0 && !isCurrentQuestionCorrect
                        ? 'bg-[#1E7A6F] text-white'
                        : selectedAnswers[currentQuestionIndex] === 0
                        ? 'bg-[#1E7A6F] text-white'
                        : 'bg-[#FFF8F0] text-[#1E7A6F] border border-[#8F8575]/25'
                    ]"
                  >
                    B
                  </div>

                  <div class="flex-1">
                    <p class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">BENAR</p>
                    <p class="text-xs text-[#5B6474] font-normal">Pernyataan pada soal adalah tepat</p>
                  </div>

                  <span
                    v-if="isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === 0"
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-bold text-white shrink-0 flex items-center gap-1',
                      isCurrentQuestionCorrect ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'
                    ]"
                  >
                    <Check v-if="isCurrentQuestionCorrect" class="w-3.5 h-3.5" />
                    <Info v-else class="w-3.5 h-3.5" />
                    <span>{{ isCurrentQuestionCorrect ? 'Tepat! 🎉' : 'Pilihanmu 💡' }}</span>
                  </span>
                  <span
                    v-else-if="isCurrentQuestionChecked && currentQuestion.correctOptionIndex === 0 && !isCurrentQuestionCorrect"
                    class="px-3 py-1 rounded-full text-xs font-bold bg-[#1E7A6F] text-white shrink-0 flex items-center gap-1"
                  >
                    <Star class="w-3.5 h-3.5" />
                    <span>Kunci ⭐</span>
                  </span>
                  <Check v-else-if="selectedAnswers[currentQuestionIndex] === 0" class="w-6 h-6 text-[#1E7A6F] shrink-0" />
                </button>

                <!-- Opsi S (Salah) -->
                <button
                  @click="selectAnswer(1)"
                  :disabled="isCurrentQuestionChecked"
                  :class="[
                    'relative p-6 rounded-3xl border-2 transition-all flex items-center gap-5 cursor-pointer text-left select-none',
                    isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === 1
                      ? isCurrentQuestionCorrect
                        ? 'bg-[#7FD4C4]/25 border-[#1E7A6F] ring-4 ring-[#7FD4C4]/40 shadow-sm scale-[1.02]'
                        : 'bg-[#FFDE7A]/30 border-[#D97706] ring-4 ring-[#FFDE7A]/50 shadow-sm scale-[1.02]'
                      : isCurrentQuestionChecked && currentQuestion.correctOptionIndex === 1 && !isCurrentQuestionCorrect
                      ? 'border-2 border-dashed border-[#1E7A6F] bg-[#7FD4C4]/15 shadow-sm'
                      : selectedAnswers[currentQuestionIndex] === 1
                      ? 'bg-[#FFDE7A]/30 border-[#D97706] ring-4 ring-[#FFDE7A]/50 shadow-sm scale-[1.02]'
                      : 'bg-white border-[#8F8575]/30 hover:border-[#D97706]'
                  ]"
                >
                  <div
                    :class="[
                      'w-14 h-14 rounded-2xl font-bold font-[\'Baloo_2\'] text-2xl flex items-center justify-center shrink-0 transition-colors',
                      isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === 1
                        ? isCurrentQuestionCorrect ? 'bg-[#1E7A6F] text-white' : 'bg-[#D97706] text-white'
                        : isCurrentQuestionChecked && currentQuestion.correctOptionIndex === 1 && !isCurrentQuestionCorrect
                        ? 'bg-[#1E7A6F] text-white'
                        : selectedAnswers[currentQuestionIndex] === 1
                        ? 'bg-[#D97706] text-white'
                        : 'bg-[#FFF8F0] text-[#D97706] border border-[#8F8575]/25'
                    ]"
                  >
                    S
                  </div>

                  <div class="flex-1">
                    <p class="font-['Baloo_2'] text-xl font-bold text-[#2B3445]">SALAH</p>
                    <p class="text-xs text-[#5B6474] font-normal">Pernyataan pada soal kurang tepat</p>
                  </div>

                  <span
                    v-if="isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === 1"
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-bold text-white shrink-0 flex items-center gap-1',
                      isCurrentQuestionCorrect ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'
                    ]"
                  >
                    <Check v-if="isCurrentQuestionCorrect" class="w-3.5 h-3.5" />
                    <Info v-else class="w-3.5 h-3.5" />
                    <span>{{ isCurrentQuestionCorrect ? 'Tepat! 🎉' : 'Pilihanmu 💡' }}</span>
                  </span>
                  <span
                    v-else-if="isCurrentQuestionChecked && currentQuestion.correctOptionIndex === 1 && !isCurrentQuestionCorrect"
                    class="px-3 py-1 rounded-full text-xs font-bold bg-[#1E7A6F] text-white shrink-0 flex items-center gap-1"
                  >
                    <Star class="w-3.5 h-3.5" />
                    <span>Kunci ⭐</span>
                  </span>
                  <Check v-else-if="selectedAnswers[currentQuestionIndex] === 1" class="w-6 h-6 text-[#D97706] shrink-0" />
                </button>
              </div>
            </div>

            <!-- ==================== MODE 5: FILL IN THE BLANK ("ISI ANGKA / JAWABAN") ==================== -->
            <div v-else-if="currentQuestion.type === 'fill_in_blank'" class="space-y-4 pt-1">
              <div v-if="currentQuestion.hint && !currentQuestion.hint.includes('Tuliskan angka jawaban')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7FD4C4]/20 text-[#1E7A6F] text-xs font-bold border border-[#1E7A6F]/20">
                <Hash class="w-3.5 h-3.5 shrink-0" />
                <span>{{ currentQuestion.hint }}</span>
              </div>

              <div class="max-w-md mx-auto space-y-4 pt-1">
                <div class="relative">
                  <input
                    type="text"
                    :value="selectedAnswers[currentQuestionIndex] || ''"
                    @input="onFillInBlankInput($event.target.value)"
                    @keydown.enter="!isCurrentQuestionChecked && evaluateCurrentQuestion()"
                    :disabled="isCurrentQuestionChecked"
                    placeholder="Ketik jawabanmu di sini..."
                    :class="[
                      'w-full px-6 py-4 rounded-2xl border-2 outline-none text-2xl font-bold text-center transition shadow-xs font-[\'Baloo_2\']',
                      isCurrentQuestionChecked
                        ? isCurrentQuestionCorrect
                          ? 'border-[#1E7A6F] bg-[#7FD4C4]/15 text-[#1E7A6F] ring-4 ring-[#7FD4C4]/40'
                          : 'border-[#D97706] bg-[#FFDE7A]/25 text-[#B45309] ring-4 ring-[#FFDE7A]/40'
                        : 'border-[#8F8575]/30 focus:border-[#1E7A6F] focus:ring-4 focus:ring-[#7FD4C4]/30 bg-white text-[#2B3445]'
                    ]"
                  />
                </div>

                <div
                  v-if="isCurrentQuestionChecked && !isCurrentQuestionCorrect"
                  class="p-2.5 rounded-xl bg-[#FFDE7A]/30 border border-[#D97706]/30 text-xs font-bold text-[#B45309] text-center"
                >
                  💡 Kunci jawaban yang tepat: <span class="text-[#2B3445] underline">{{ currentQuestion.expectedAnswers?.[0] || currentQuestion.options?.[currentQuestion.correctOptionIndex] }}</span>
                </div>

                <!-- Tombol Cepat Angka untuk Siswa SD -->
                <div class="bg-[#FFF8F0] p-4 rounded-2xl border border-[#8F8575]/25 space-y-2.5">
                  <div class="grid grid-cols-5 gap-2 max-w-xs mx-auto">
                    <button
                      v-for="digit in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']"
                      :key="digit"
                      type="button"
                      :disabled="isCurrentQuestionChecked"
                      @click="appendDigit(digit)"
                      class="h-11 rounded-xl bg-white border border-[#8F8575]/25 font-['Baloo_2'] text-xl font-bold text-[#2B3445] hover:bg-[#7FD4C4]/25 hover:border-[#1E7A6F] active:scale-95 transition cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ digit }}
                    </button>
                  </div>
                  <div class="flex justify-center gap-2 pt-1">
                    <button
                      type="button"
                      :disabled="isCurrentQuestionChecked"
                      @click="backspaceDigit"
                      class="px-4 py-2 rounded-xl bg-white border border-[#8F8575]/25 text-xs font-semibold text-[#5B6474] hover:text-[#2B3445] hover:bg-black/5 active:scale-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ⌫ Hapus Satu
                    </button>
                    <button
                      type="button"
                      :disabled="isCurrentQuestionChecked"
                      @click="clearDigit"
                      class="px-4 py-2 rounded-xl bg-white border border-[#8F8575]/25 text-xs font-semibold text-[#5B6474] hover:text-[#2B3445] hover:bg-black/5 active:scale-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Kosongkan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 6: MULTI SELECT ("PILIH SEMUA YANG BENAR") ==================== -->
            <div v-else-if="currentQuestion.type === 'multi_select'" class="space-y-4 pt-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7FD4C4]/20 text-[#1E7A6F] text-xs font-bold border border-[#1E7A6F]/20">
                <CheckSquare class="w-3.5 h-3.5 shrink-0" />
                <span>Pilih semua yang benar</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
                <button
                  v-for="(opt, optIdx) in currentQuestion.options || []"
                  :key="optIdx"
                  type="button"
                  :disabled="isCurrentQuestionChecked"
                  @click="toggleMultiSelect(optIdx)"
                  :class="[
                    'p-4 rounded-2xl font-medium text-base flex items-center justify-between gap-3 transition-all cursor-pointer border-2 select-none',
                    isCurrentQuestionChecked
                      ? getMultiSelectAnswersForCurrent().includes(optIdx)
                        ? (currentQuestion.multiCorrectIndices || []).includes(optIdx)
                          ? 'bg-[#7FD4C4]/25 border-[#1E7A6F] text-[#1E7A6F] font-bold shadow-sm ring-2 ring-[#7FD4C4]/40 scale-[1.02]'
                          : 'bg-[#FFDE7A]/30 border-[#D97706] text-[#B45309] font-bold shadow-sm ring-2 ring-[#FFDE7A]/40 scale-[1.02]'
                        : (currentQuestion.multiCorrectIndices || []).includes(optIdx)
                        ? 'border-2 border-dashed border-[#1E7A6F] bg-[#7FD4C4]/15 text-[#1E7A6F] font-bold'
                        : 'bg-white border-[#8F8575]/25 opacity-50 text-[#5B6474]'
                      : getMultiSelectAnswersForCurrent().includes(optIdx)
                      ? 'bg-[#7FD4C4]/20 border-[#1E7A6F] text-[#1E7A6F] font-bold shadow-sm ring-2 ring-[#7FD4C4]/40 scale-[1.02]'
                      : 'bg-white border-[#8F8575]/25 hover:border-[#1E7A6F] text-[#2B3445]'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <div
                      :class="[
                        'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors',
                        isCurrentQuestionChecked && getMultiSelectAnswersForCurrent().includes(optIdx)
                          ? (currentQuestion.multiCorrectIndices || []).includes(optIdx)
                            ? 'bg-[#1E7A6F] border-[#1E7A6F] text-white'
                            : 'bg-[#D97706] border-[#D97706] text-white'
                          : getMultiSelectAnswersForCurrent().includes(optIdx)
                          ? 'bg-[#1E7A6F] border-[#1E7A6F] text-white'
                          : 'border-[#8F8575]/40 bg-white'
                      ]"
                    >
                      <Check v-if="getMultiSelectAnswersForCurrent().includes(optIdx)" class="w-4 h-4" />
                    </div>
                    <span class="font-['Baloo_2'] text-lg">{{ opt }}</span>
                  </div>

                  <span
                    v-if="isCurrentQuestionChecked"
                    :class="[
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white',
                      getMultiSelectAnswersForCurrent().includes(optIdx)
                        ? (currentQuestion.multiCorrectIndices || []).includes(optIdx) ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'
                        : (currentQuestion.multiCorrectIndices || []).includes(optIdx) ? 'bg-[#1E7A6F]' : ''
                    ]"
                  >
                    {{
                      getMultiSelectAnswersForCurrent().includes(optIdx)
                        ? ((currentQuestion.multiCorrectIndices || []).includes(optIdx) ? '✓ Tepat' : '💡 Belum')
                        : ((currentQuestion.multiCorrectIndices || []).includes(optIdx) ? '⭐ Kunci' : '')
                    }}
                  </span>
                  <span
                    v-else-if="getMultiSelectAnswersForCurrent().includes(optIdx)"
                    class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1E7A6F] text-white"
                  >
                    Dipilih
                  </span>
                </button>
              </div>
            </div>

            <!-- ==================== MODE 7: GRID MAP ("PILIH PETAK DI PETA / KOORDINAT") ==================== -->
            <div v-else-if="currentQuestion.type === 'grid_map'" class="space-y-4 pt-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7FD4C4]/20 text-[#1E7A6F] text-xs font-bold border border-[#1E7A6F]/20">
                <Compass class="w-3.5 h-3.5 shrink-0" />
                <span>Ketuk petak tujuanmu di papan peta</span>
              </div>

              <div class="max-w-md mx-auto bg-white p-4 rounded-3xl border-2 border-[#8F8575]/25 space-y-3">
                <div class="flex items-center justify-between text-xs font-semibold px-2">
                  <span class="flex items-center gap-1.5 text-[#1E7A6F]">
                    <MapPin class="w-3.5 h-3.5" /> Posisi Awal: <strong class="bg-[#FFF8F0] px-2 py-0.5 rounded-lg border border-[#8F8575]/25">{{ currentQuestion.initialCell || 'D4' }}</strong>
                  </span>
                  <span class="text-[#2B3445]">
                    Pilihanmu: <strong class="text-[#1E7A6F] bg-[#7FD4C4]/20 px-2 py-0.5 rounded-lg border border-[#1E7A6F]/30">{{ selectedAnswers[currentQuestionIndex] || '-' }}</strong>
                  </span>
                </div>

                <!-- 6x6 Grid Table (Kolom A-F, Baris 1-6) -->
                <div class="overflow-x-auto pb-1">
                  <div class="min-w-[280px]">
                    <!-- Kolom Header A, B, C, D, E, F -->
                    <div class="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-[#5B6474] mb-1.5">
                      <div></div>
                      <div v-for="col in (currentQuestion.gridColumns || ['A','B','C','D','E','F'])" :key="col" class="py-1">
                        {{ col }}
                      </div>
                    </div>

                    <!-- Baris 1 sampai 6 -->
                    <div
                      v-for="row in (currentQuestion.gridRows || [1, 2, 3, 4, 5, 6])"
                      :key="row"
                      class="grid grid-cols-7 gap-1.5 mb-1.5 items-center"
                    >
                      <!-- Label Baris -->
                      <div class="text-xs font-bold text-[#5B6474] text-center">
                        {{ row }}
                      </div>

                      <!-- Petak A-F untuk Baris ini -->
                      <button
                        v-for="col in (currentQuestion.gridColumns || ['A','B','C','D','E','F'])"
                        :key="`${col}${row}`"
                        type="button"
                        :disabled="isCurrentQuestionChecked"
                        @click="selectGridCell(`${col}${row}`)"
                        :class="[
                          'h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-bold flex flex-col items-center justify-center transition-all cursor-pointer border select-none relative',
                          isCurrentQuestionChecked
                            ? selectedAnswers[currentQuestionIndex] === `${col}${row}`
                              ? isCurrentQuestionCorrect
                                ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm ring-4 ring-[#7FD4C4] scale-105 z-10'
                                : 'bg-[#D97706] text-white border-[#D97706] shadow-sm ring-4 ring-[#FFDE7A] scale-105 z-10'
                              : `${col}${row}` === (currentQuestion.correctCell || 'E5') && !isCurrentQuestionCorrect
                              ? 'bg-[#7FD4C4]/40 border-2 border-[#1E7A6F] text-[#1E7A6F] font-bold z-10'
                              : `${col}${row}` === (currentQuestion.initialCell || 'D4')
                              ? 'bg-[#FFDE7A]/50 border-[#D97706] text-[#B45309]'
                              : 'bg-[#FFF8F0] border-[#8F8575]/25 text-[#8F8575] opacity-60'
                            : selectedAnswers[currentQuestionIndex] === `${col}${row}`
                            ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-sm ring-2 ring-[#7FD4C4] scale-105 z-10'
                            : `${col}${row}` === (currentQuestion.initialCell || 'D4')
                            ? 'bg-[#FFDE7A]/50 border-[#D97706] text-[#B45309]'
                            : 'bg-[#FFF8F0] border-[#8F8575]/25 hover:border-[#1E7A6F] hover:bg-[#7FD4C4]/15 text-[#2B3445]'
                        ]"
                      >
                        <span>{{ col }}{{ row }}</span>
                        <span v-if="isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === `${col}${row}`" class="text-[9px] font-bold leading-none text-white">
                          {{ isCurrentQuestionCorrect ? 'Tepat!' : 'Pilihanmu' }}
                        </span>
                        <span v-else-if="isCurrentQuestionChecked && `${col}${row}` === (currentQuestion.correctCell || 'E5') && !isCurrentQuestionCorrect" class="text-[9px] font-bold leading-none text-[#1E7A6F]">
                          Kunci ⭐
                        </span>
                        <span v-else-if="`${col}${row}` === (currentQuestion.initialCell || 'D4') && selectedAnswers[currentQuestionIndex] !== `${col}${row}`" class="text-[9px] font-normal leading-none text-[#B45309]">
                          Awal
                        </span>
                        <span v-else-if="selectedAnswers[currentQuestionIndex] === `${col}${row}`" class="text-[9px] font-normal leading-none text-white">
                          Tujuan
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ==================== MODE 8: COLOR CHOICE ("PILIH BULATAN WARNA MANIK") ==================== -->
            <div v-else-if="currentQuestion.type === 'color_choice'" class="space-y-4 pt-1">
              <div class="grid grid-cols-3 gap-3.5 sm:gap-6 max-w-xl mx-auto">
                <button
                  v-for="(opt, optIdx) in currentQuestion.colorOptions || []"
                  :key="optIdx"
                  type="button"
                  :disabled="isCurrentQuestionChecked"
                  @click="selectAnswer(optIdx)"
                  :class="[
                    'relative p-4 sm:p-6 rounded-3xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center bg-white border-2 select-none group',
                    isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx
                      ? isCurrentQuestionCorrect
                        ? 'border-[#1E7A6F] shadow-md ring-4 ring-[#7FD4C4]/40 bg-[#7FD4C4]/15 scale-[1.03]'
                        : 'border-[#D97706] shadow-md ring-4 ring-[#FFDE7A]/50 bg-[#FFDE7A]/25 scale-[1.03]'
                      : isCurrentQuestionChecked && optIdx === currentQuestion.correctOptionIndex && !isCurrentQuestionCorrect
                      ? 'border-2 border-dashed border-[#1E7A6F] bg-[#7FD4C4]/15 shadow-sm'
                      : selectedAnswers[currentQuestionIndex] === optIdx
                      ? 'border-[#1E7A6F] shadow-md ring-4 ring-[#7FD4C4]/40 bg-[#7FD4C4]/10 scale-[1.03]'
                      : 'border-[#8F8575]/25 hover:border-[#1E7A6F]/60 hover:bg-[#FFF8F0]/50 hover:shadow-sm'
                  ]"
                >
                  <!-- Option Letter Badge (A, B, C) -->
                  <span
                    :class="[
                      'absolute top-3 left-3 w-8 h-8 rounded-xl font-bold font-[\'Baloo_2\'] text-xs flex items-center justify-center transition-colors shadow-2xs',
                      selectedAnswers[currentQuestionIndex] === optIdx
                        ? isCurrentQuestionChecked
                          ? isCurrentQuestionCorrect ? 'bg-[#1E7A6F] text-white' : 'bg-[#D97706] text-white'
                          : 'bg-[#1E7A6F] text-white'
                        : 'bg-[#FFF8F0] text-[#2B3445] border border-[#8F8575]/25'
                    ]"
                  >
                    {{ String.fromCharCode(65 + optIdx) }}
                  </span>

                  <!-- Status Badge on Checked -->
                  <div
                    v-if="isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx"
                    :class="[
                      'absolute top-3 right-3 px-2 py-0.5 rounded-full text-white text-[10px] font-bold shadow-xs flex items-center gap-1',
                      isCurrentQuestionCorrect ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'
                    ]"
                  >
                    <span>{{ isCurrentQuestionCorrect ? '✓' : '💡' }}</span>
                  </div>

                  <!-- 3D Glossy Bead Sphere -->
                  <div class="relative w-16 h-16 sm:w-20 sm:h-20 my-2 flex items-center justify-center">
                    <div class="absolute -bottom-1 w-12 sm:w-14 h-3 bg-black/15 rounded-full blur-[2px]"></div>
                    <div
                      class="w-14 h-14 sm:w-18 sm:h-18 rounded-full shadow-inner relative overflow-hidden transition-transform duration-200 group-hover:scale-110"
                      :style="{
                        background: `radial-gradient(circle at 35% 30%, ${opt.lightColor || '#FFFFFF'}, ${opt.color} 55%, ${opt.darkColor || '#000000'} 100%)`,
                        boxShadow: `0 4px 10px ${opt.color}55, inset 0 -4px 6px rgba(0,0,0,0.25)`
                      }"
                    >
                      <!-- Specular Highlight Shine -->
                      <div class="absolute top-1.5 left-2.5 w-4 h-2.5 sm:w-5 sm:h-3 rounded-full bg-white/70 rotate-[-25deg] blur-[0.5px]"></div>
                    </div>
                  </div>

                  <!-- Color Name Label -->
                  <span class="font-['Baloo_2'] text-base sm:text-xl font-bold text-[#2B3445] mt-1">
                    {{ opt.name }}
                  </span>
                </button>
              </div>
            </div>

            <!-- ==================== MODE 9: PLACE VALUE (SLOT NILAI TEMPAT INTERAKTIF) ==================== -->
            <div v-else-if="currentQuestion.type === 'place_value'" class="space-y-6 pt-2">
              
              <!-- Papan Persamaan Nilai Tempat Interaktif -->
              <div class="bg-gradient-to-b from-[#FFF8F0] to-white p-5 sm:p-7 rounded-3xl border-2 border-[#8F8575]/25 shadow-sm space-y-4">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#5B6474]">Lengkapi Persamaan Nilai Tempat:</span>
                </div>

                <!-- Equation Row -->
                <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                  <!-- Bilangan Target -->
                  <div class="px-5 py-2.5 rounded-2xl bg-[#2B3445] text-white font-['Baloo_2'] text-3xl sm:text-4xl font-extrabold shadow-sm">
                    {{ currentQuestion.numberTarget || 45 }}
                  </div>

                  <span class="font-['Baloo_2'] text-3xl sm:text-4xl font-extrabold text-[#2B3445]">=</span>

                  <!-- Kotak Slot Puluhan -->
                  <div class="flex items-center gap-2">
                    <div
                      class="min-w-16 h-16 sm:min-w-20 sm:h-20 px-4 rounded-2xl border-2 flex items-center justify-center font-['Baloo_2'] text-3xl sm:text-4xl font-extrabold transition-all duration-200"
                      :class="[
                        isCurrentQuestionChecked
                          ? isCurrentQuestionCorrect
                            ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-md ring-4 ring-[#7FD4C4]/40 scale-105'
                            : 'bg-[#D97706] text-white border-[#D97706] shadow-md ring-4 ring-[#FFDE7A]/50'
                          : getPlaceValueAns().tens
                          ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-md scale-105'
                          : 'bg-white border-dashed border-[#1E7A6F]/60 text-[#8F8575]/40 animate-pulse'
                      ]"
                    >
                      {{ getPlaceValueAns().tens || '___' }}
                    </div>
                    <span class="font-['Baloo_2'] text-lg sm:text-2xl font-bold text-[#1E7A6F]">
                      {{ currentQuestion.tensLabel || 'puluhan' }}
                    </span>
                  </div>

                  <!-- Plus Sign -->
                  <span class="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-[#8F8575] mx-0.5">
                    +
                  </span>

                  <!-- Kotak Slot Satuan -->
                  <div class="flex items-center gap-2">
                    <div
                      class="min-w-16 h-16 sm:min-w-20 sm:h-20 px-4 rounded-2xl border-2 flex items-center justify-center font-['Baloo_2'] text-3xl sm:text-4xl font-extrabold transition-all duration-200"
                      :class="[
                        isCurrentQuestionChecked
                          ? isCurrentQuestionCorrect
                            ? 'bg-[#D97706] text-white border-[#D97706] shadow-md ring-4 ring-[#FFDE7A]/50 scale-105'
                            : 'bg-[#D97706] text-white border-[#D97706] shadow-md ring-4 ring-[#FFDE7A]/50'
                          : getPlaceValueAns().ones
                          ? 'bg-[#D97706] text-white border-[#D97706] shadow-md scale-105'
                          : 'bg-white border-dashed border-[#D97706]/60 text-[#8F8575]/40 animate-pulse'
                      ]"
                    >
                      {{ getPlaceValueAns().ones || '___' }}
                    </div>
                    <span class="font-['Baloo_2'] text-lg sm:text-2xl font-bold text-[#D97706]">
                      {{ currentQuestion.onesLabel || 'satuan' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Pilihan Kartu Angka Interaktif -->
              <div v-if="!isCurrentQuestionChecked" class="space-y-4 pt-1">
                <!-- Baris 1: Pilih Angka Puluhan -->
                <div class="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#1E7A6F]/30 shadow-xs space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="font-['Baloo_2'] text-sm sm:text-base font-bold text-[#1E7A6F] flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full bg-[#1E7A6F] text-white text-xs flex items-center justify-center font-bold">1</span>
                      <span>Ketuk Angka untuk <strong>PULUHAN</strong>:</span>
                    </span>
                    <span v-if="getPlaceValueAns().tens" class="text-xs text-[#1E7A6F] font-bold bg-[#7FD4C4]/20 px-3 py-1 rounded-full">
                      ✓ Terpasang: {{ getPlaceValueAns().tens }}
                    </span>
                  </div>

                  <div class="grid grid-cols-3 gap-3 sm:gap-4">
                    <button
                      v-for="opt in currentQuestion.tensOptions || ['4', '5', '40']"
                      :key="opt"
                      type="button"
                      @click="setPlaceValueTens(opt)"
                      class="py-3.5 sm:py-5 rounded-2xl border-2 font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-xs"
                      :class="[
                        getPlaceValueAns().tens === opt
                          ? 'bg-[#1E7A6F] text-white border-[#1E7A6F] shadow-md ring-4 ring-[#7FD4C4]/50 scale-105'
                          : 'bg-[#FFF8F0] text-[#2B3445] border-[#8F8575]/25 hover:border-[#1E7A6F] hover:bg-[#7FD4C4]/15 hover:scale-[1.02]'
                      ]"
                    >
                      {{ opt }}
                    </button>
                  </div>
                </div>

                <!-- Baris 2: Pilih Angka Satuan -->
                <div class="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#D97706]/30 shadow-xs space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="font-['Baloo_2'] text-sm sm:text-base font-bold text-[#D97706] flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full bg-[#D97706] text-white text-xs flex items-center justify-center font-bold">2</span>
                      <span>Ketuk Angka untuk <strong>SATUAN</strong>:</span>
                    </span>
                    <span v-if="getPlaceValueAns().ones" class="text-xs text-[#D97706] font-bold bg-[#FFDE7A]/35 px-3 py-1 rounded-full">
                      ✓ Terpasang: {{ getPlaceValueAns().ones }}
                    </span>
                  </div>

                  <div class="grid grid-cols-3 gap-3 sm:gap-4">
                    <button
                      v-for="opt in currentQuestion.onesOptions || ['4', '5', '45']"
                      :key="opt"
                      type="button"
                      @click="setPlaceValueOnes(opt)"
                      class="py-3.5 sm:py-5 rounded-2xl border-2 font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-xs"
                      :class="[
                        getPlaceValueAns().ones === opt
                          ? 'bg-[#D97706] text-white border-[#D97706] shadow-md ring-4 ring-[#FFDE7A]/50 scale-105'
                          : 'bg-[#FFF8F0] text-[#2B3445] border-[#8F8575]/25 hover:border-[#D97706] hover:bg-[#FFDE7A]/15 hover:scale-[1.02]'
                      ]"
                    >
                      {{ opt }}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <!-- ==================== MODE 10: MULTIPLE CHOICE DEFAULT (BESAR & VISUAL UNTUK ANAK SD) ==================== -->
            <div v-else class="grid grid-cols-1 gap-3.5 pt-1">
              <button
                v-for="(opt, optIdx) in currentQuestion.options"
                :key="optIdx"
                @click="selectAnswer(optIdx)"
                :disabled="isCurrentQuestionChecked"
                :class="[
                  'w-full p-4 sm:p-5 rounded-3xl font-medium flex items-center gap-4 sm:gap-5 transition-all duration-200 cursor-pointer text-left border-2 select-none group',
                  isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx
                    ? isCurrentQuestionCorrect
                      ? 'bg-[#7FD4C4]/20 border-[#1E7A6F] text-[#1E7A6F] shadow-sm ring-4 ring-[#7FD4C4]/40 scale-[1.01]'
                      : 'bg-[#FFDE7A]/30 border-[#D97706] text-[#B45309] shadow-sm ring-4 ring-[#FFDE7A]/50 scale-[1.01]'
                    : isCurrentQuestionChecked && optIdx === currentQuestion.correctOptionIndex && !isCurrentQuestionCorrect
                    ? 'bg-[#7FD4C4]/15 border-2 border-dashed border-[#1E7A6F] text-[#1E7A6F]'
                    : selectedAnswers[currentQuestionIndex] === optIdx
                    ? 'bg-white border-[#1E7A6F] text-[#2B3445] shadow-md ring-4 ring-[#7FD4C4]/30 scale-[1.01]'
                    : 'bg-white border-[#8F8575]/25 hover:border-[#1E7A6F] hover:bg-[#FFF8F0]/60 hover:shadow-sm text-[#2B3445]'
                ]"
              >
                <!-- Option Letter Badge (A, B, C, D) - Big, tactile & playful -->
                <span
                  :class="[
                    'w-11 h-11 sm:w-13 sm:h-13 rounded-2xl font-bold font-[\'Baloo_2\'] text-lg sm:text-xl flex items-center justify-center shrink-0 transition-all duration-200 shadow-2xs',
                    isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx
                      ? isCurrentQuestionCorrect
                        ? 'bg-[#1E7A6F] text-white ring-2 ring-[#1E7A6F]'
                        : 'bg-[#D97706] text-white ring-2 ring-[#D97706]'
                      : isCurrentQuestionChecked && optIdx === currentQuestion.correctOptionIndex && !isCurrentQuestionCorrect
                      ? 'bg-[#1E7A6F] text-white ring-2 ring-[#1E7A6F]'
                      : selectedAnswers[currentQuestionIndex] === optIdx
                      ? 'bg-[#1E7A6F] text-white'
                      : 'bg-[#FFF8F0] text-[#2B3445] border-2 border-[#8F8575]/20 group-hover:border-[#1E7A6F]/50 group-hover:bg-[#7FD4C4]/20'
                  ]"
                >
                  {{ String.fromCharCode(65 + optIdx) }}
                </span>

                <!-- Option Text - Large & Clear for Elementary Students -->
                <span class="flex-1 font-['Baloo_2'] text-base sm:text-xl font-bold text-[#2B3445] leading-snug">
                  {{ opt }}
                </span>

                <!-- Status Badge on Right -->
                <span
                  v-if="isCurrentQuestionChecked && selectedAnswers[currentQuestionIndex] === optIdx"
                  :class="[
                    'px-3.5 py-1.5 rounded-full text-xs font-bold text-white shrink-0 flex items-center gap-1 shadow-xs',
                    isCurrentQuestionCorrect ? 'bg-[#1E7A6F]' : 'bg-[#D97706]'
                  ]"
                >
                  <Check v-if="isCurrentQuestionCorrect" class="w-4 h-4" />
                  <Info v-else class="w-4 h-4" />
                  <span>{{ isCurrentQuestionCorrect ? 'Tepat! 🎉' : 'Pilihanmu 💡' }}</span>
                </span>
                <span
                  v-else-if="isCurrentQuestionChecked && optIdx === currentQuestion.correctOptionIndex && !isCurrentQuestionCorrect"
                  class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1E7A6F] text-white shrink-0 flex items-center gap-1 shadow-xs"
                >
                  <Star class="w-4 h-4" />
                  <span>Kunci Jawaban ⭐</span>
                </span>
                <Check
                  v-else-if="selectedAnswers[currentQuestionIndex] === optIdx"
                  class="w-6 h-6 text-[#1E7A6F] shrink-0"
                />
              </button>
            </div>

            <!-- ==================== INSTANT FEEDBACK CARD PER SOAL ==================== -->
            <div
              v-if="isCurrentQuestionChecked"
              :class="[
                'p-5 sm:p-6 rounded-3xl border-2 space-y-3 transition-all duration-300 animate-soft-pop my-3 shadow-xs',
                isCurrentQuestionCorrect
                  ? 'bg-[#7FD4C4]/20 border-[#1E7A6F]'
                  : 'bg-[#FFDE7A]/35 border-[#D97706]'
              ]"
            >
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <div class="flex items-center gap-3">
                  <span
                    class="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-xs font-bold shrink-0"
                    :class="isCurrentQuestionCorrect ? 'bg-[#1E7A6F] text-white' : 'bg-[#D97706] text-white'"
                  >
                    {{ isCurrentQuestionCorrect ? '🎉' : '💡' }}
                  </span>
                  <div>
                    <h4
                      class="font-['Baloo_2'] text-lg sm:text-xl font-bold leading-tight"
                      :class="isCurrentQuestionCorrect ? 'text-[#1E7A6F]' : 'text-[#B45309]'"
                    >
                      {{ isCurrentQuestionCorrect ? 'Luar Biasa! Jawabanmu Benar! 🌟' : 'Hampir Benar! Coba Perhatikan Lagi 💡' }}
                    </h4>
                    <p class="text-xs text-[#5B6474]">
                      {{ isCurrentQuestionCorrect ? `Kamu mendapat +${currentQuestion.points || 50} poin untuk soal ini!` : 'Belajar dari petunjuk di bawah agar pemahamanmu makin mantap!' }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span
                    v-if="isCurrentQuestionCorrect"
                    class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1E7A6F] text-white shadow-2xs flex items-center gap-1"
                  >
                    <Sparkles class="w-3.5 h-3.5" />
                    <span>+{{ currentQuestion.points || 50 }} Poin</span>
                  </span>
                  <button
                    type="button"
                    @click="isExplanationPopupOpen = true; playButtonPop()"
                    class="px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#1E7A6F] border border-[#1E7A6F]/30 hover:bg-[#FFF8F0] transition flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                  >
                    <Sparkles class="w-3.5 h-3.5" />
                    <span>Lihat Pembahasan</span>
                  </button>
                </div>
              </div>

              <!-- Explanation -->
              <div
                v-if="currentQuestion.explanation"
                class="bg-white/90 p-4 rounded-2xl border border-black/5 text-xs sm:text-sm text-[#2B3445] leading-relaxed"
              >
                <strong :class="isCurrentQuestionCorrect ? 'text-[#1E7A6F]' : 'text-[#B45309]'">💡 Pembahasan:</strong>
                <span class="ml-1.5">{{ currentQuestion.explanation }}</span>
              </div>
            </div>

          </div>

          <!-- Bottom Quiz Navigation Bar -->
          <div class="flex items-center justify-between gap-3 pt-4 border-t border-[#8F8575]/20 flex-wrap">
            <div class="flex items-center gap-2 flex-wrap">
              <button
                @click="emit('back')"
                class="px-3.5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer border bg-[#FFF8F0] hover:bg-[#7FD4C4]/20 border-[#8F8575]/25 text-[#2B3445] active:scale-95 shadow-2xs"
                title="Kembali ke Katalog Materi"
              >
                <ArrowLeft class="w-4 h-4 text-[#1E7A6F]" />
                <span>Kembali ke Materi</span>
              </button>

              <button
                @click="prevQuestion"
                :disabled="currentQuestionIndex === 0"
                :class="[
                  'px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer border active:scale-95 shadow-2xs',
                  currentQuestionIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-white border-[#8F8575]/20 text-[#5B6474]'
                    : 'btn-prisma-white'
                ]"
              >
                <ChevronLeft class="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
            </div>

            <!-- Number Pills Quick Switcher with Live Right/Wrong Status -->
            <div class="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[220px] sm:max-w-none">
              <button
                v-for="(_, qIdx) in questions"
                :key="qIdx"
                @click="currentQuestionIndex = qIdx; playButtonPop()"
                :class="[
                  'w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center justify-center relative shadow-2xs shrink-0',
                  checkedQuestions[qIdx]
                    ? checkAnswerCorrectness(questions[qIdx], selectedAnswers[qIdx])
                      ? 'bg-[#7FD4C4] text-[#1E7A6F] border-[#1E7A6F]'
                      : 'bg-[#FFDE7A] text-[#B45309] border-[#D97706]'
                    : currentQuestionIndex === qIdx
                    ? 'bg-[#1E7A6F] text-white border-[#1E7A6F]'
                    : isQuestionAnswered(qIdx)
                    ? 'bg-[#7FD4C4]/40 text-[#1E7A6F] border-[#7FD4C4]'
                    : 'bg-white text-[#5B6474] border-[#8F8575]/30 hover:border-[#1E7A6F]'
                ]"
                :title="checkedQuestions[qIdx] ? (checkAnswerCorrectness(questions[qIdx], selectedAnswers[qIdx]) ? `Soal ${qIdx+1}: Benar` : `Soal ${qIdx+1}: Belum Tepat`) : `Soal ${qIdx+1}`"
              >
                <span v-if="checkedQuestions[qIdx] && checkAnswerCorrectness(questions[qIdx], selectedAnswers[qIdx])">✓</span>
                <span v-else-if="checkedQuestions[qIdx]">💡</span>
                <span v-else>{{ qIdx + 1 }}</span>
              </button>
            </div>

            <!-- Action Buttons: Periksa Jawaban / Buka Pembahasan / Selesai (Soal berikutnya diakses via Pop Up) -->
            <div class="flex items-center gap-2 flex-wrap">
              <button
                v-if="!isCurrentQuestionChecked && currentQuestion.type !== 'matching'"
                @click="evaluateCurrentQuestion"
                :disabled="!isQuestionAnswered(currentQuestionIndex)"
                :class="[
                  'px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-sm active:scale-95',
                  isQuestionAnswered(currentQuestionIndex)
                    ? 'btn-prisma-mint'
                    : 'bg-white border border-[#8F8575]/25 text-[#5B6474] opacity-50 cursor-not-allowed'
                ]"
              >
                <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
                <span>Periksa Jawaban ✨</span>
              </button>

              <button
                v-if="isCurrentQuestionChecked && currentQuestionIndex < questions.length - 1"
                type="button"
                @click="isExplanationPopupOpen = true; playButtonPop()"
                class="btn-prisma-mint px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shadow-sm active:scale-95"
                title="Buka pop up pembahasan untuk lanjut ke soal berikutnya"
              >
                <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
                <span>Buka Pembahasan</span>
              </button>

              <button
                v-else-if="isCurrentQuestionChecked && currentQuestionIndex === questions.length - 1"
                @click="submitQuiz"
                class="btn-prisma-mint px-7 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2 transition cursor-pointer shadow-md active:scale-95"
              >
                <Trophy class="w-4 h-4 text-[#1E7A6F]" />
                <span>Lihat Rangkuman Hasil 🏆</span>
              </button>
            </div>
          </div>

        </div>

        <!-- ==================== QUIZ RESULTS SCREEN (CHILD-FRIENDLY, NO RED!) ==================== -->
        <div v-else-if="isQuizSubmitted" class="space-y-8 animate-soft-pop text-center">
          
          <!-- Score Celebration Hero Card -->
          <div class="bg-[#FFF8F0] rounded-3xl p-8 sm:p-12 border border-[#8F8575]/25 space-y-4">
            <div class="w-20 h-20 rounded-2xl bg-[#FFDE7A] text-[#2B3445] flex items-center justify-center mx-auto text-4xl shadow-sm border border-[#8F8575]/25">
              <Trophy class="w-10 h-10 text-[#2B3445]" />
            </div>

            <div class="space-y-1">
              <h3 class="font-['Baloo_2'] text-2xl sm:text-3xl font-bold text-[#2B3445]">
                Hebat Sekali! Kamu Telah Menyelesaikan Kuis! 🎉
              </h3>
              <p class="text-sm text-[#5B6474] font-normal">
                Kamu menjawab <strong class="text-[#1E7A6F] font-bold">{{ correctCount }} dari {{ questions.length }}</strong> soal dengan tepat.
              </p>
            </div>

            <!-- Score Pill -->
            <div class="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-[#8F8575]/25 shadow-sm">
              <span class="text-xs font-semibold text-[#5B6474] uppercase tracking-wider">Skor Akhir:</span>
              <span class="font-['Baloo_2'] text-3xl sm:text-4xl font-bold text-[#2B3445]">
                {{ quizScore }} <span class="text-sm text-[#5B6474] font-normal">/ {{ totalPossibleScore }} Poin</span>
              </span>
            </div>
          </div>

          <!-- Next Chapter Celebration Banner (jika ada bab berikutnya dalam kelas ini) -->
          <div
            v-if="!isLastChapterInClass && nextMateri"
            class="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#1E7A6F] to-[#145C53] text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-5 text-left border-2 border-[#7FD4C4]/35 animate-soft-pop"
          >
            <div class="flex items-center gap-4 min-w-0">
              <div class="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🚀
              </div>
              <div class="space-y-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FFDE7A] text-[#2B3445]">
                    Bab Selanjutnya
                  </span>
                  <span class="text-xs text-[#FFF8F0]/80 font-normal">
                    {{ getKelasFromLevel(nextMateri.level) }}
                  </span>
                </div>
                <h4 class="font-['Baloo_2'] text-xl sm:text-2xl font-bold leading-tight truncate text-white">
                  {{ nextMateri.title }}
                </h4>
                <p class="text-xs sm:text-sm text-[#FFF8F0]/85 font-normal line-clamp-1">
                  {{ nextMateri.description }}
                </p>
              </div>
            </div>

            <button
              @click="goToNextChapter"
              class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#FFDE7A] hover:bg-[#ffe699] text-[#2B3445] font-['Baloo_2'] font-bold text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-md transition active:scale-95 shrink-0"
            >
              <span>Lanjut ke Bab Selanjutnya</span>
              <ArrowRight class="w-5 h-5 text-[#2B3445]" />
            </button>
          </div>

          <!-- Celebration Banner Bab Terakhir (Bab 8 selesai -> Tombol ke tab materi depan) -->
          <div
            v-else-if="isLastChapterInClass"
            class="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#1E7A6F] to-[#145C53] text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-5 text-left border-2 border-[#7FD4C4]/35 animate-soft-pop"
          >
            <div class="flex items-center gap-4 min-w-0">
              <div class="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🏆
              </div>
              <div class="space-y-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FFDE7A] text-[#2B3445]">
                    Kelas Tuntas
                  </span>
                  <span class="text-xs text-[#FFF8F0]/80 font-normal">
                    {{ getKelasFromLevel(props.materi?.level) }}
                  </span>
                </div>
                <h4 class="font-['Baloo_2'] text-xl sm:text-2xl font-bold leading-tight text-white">
                  Hebat! Kamu telah menuntaskan seluruh materi di kelas ini!
                </h4>
                <p class="text-xs sm:text-sm text-[#FFF8F0]/85 font-normal">
                  Semua bab telah selesai. Yuk jelajahi materi seru lainnya di katalog materi Prisma!
                </p>
              </div>
            </div>

            <button
              @click="goToNextChapter"
              class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#FFDE7A] hover:bg-[#ffe699] text-[#2B3445] font-['Baloo_2'] font-bold text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-md transition active:scale-95 shrink-0"
            >
              <span>Ke Katalog Materi</span>
              <ArrowRight class="w-5 h-5 text-[#2B3445]" />
            </button>
          </div>

          <!-- Question Review (Pembahasan Ramah Anak: Benar = Mint, Coba Lagi = Kuning) -->
          <div class="space-y-4 text-left">
            <h4 class="font-['Baloo_2'] text-xl font-bold text-[#2B3445] flex items-center gap-2">
              <CheckCircle2 class="w-5 h-5 text-[#1E7A6F]" />
              <span>Pembahasan Soal & Kunci Jawaban</span>
            </h4>

            <div class="space-y-4">
              <div
                v-for="(q, idx) in questions"
                :key="q.id || idx"
                class="p-5 sm:p-6 rounded-2xl border bg-white space-y-3"
                :class="checkAnswerCorrectness(q, selectedAnswers[idx]) ? 'border-[#7FD4C4]' : 'border-[#FFDE7A]'"
              >
                <div class="flex items-center justify-between">
                  <!-- Umpan Balik: Benar = Mint, Belum Tepat = Kuning Ramah Anak -->
                  <span
                    class="text-xs font-semibold px-3 py-1 rounded-lg border"
                    :class="checkAnswerCorrectness(q, selectedAnswers[idx])
                      ? 'bg-[#7FD4C4]/20 border-[#7FD4C4] text-[#2B3445]'
                      : 'bg-[#FFDE7A]/30 border-[#FFDE7A] text-[#2B3445]'"
                  >
                    Soal {{ idx + 1 }}: {{ checkAnswerCorrectness(q, selectedAnswers[idx]) ? '✓ Jawabanmu Tepat' : '💡 Coba Perhatikan Lagi' }}
                  </span>
                  <span class="text-xs font-semibold text-[#5B6474]">
                    {{ checkAnswerCorrectness(q, selectedAnswers[idx]) ? `+${q.points || 50} Poin` : '0 Poin' }}
                  </span>
                </div>

                <p class="font-semibold text-[#2B3445] text-base">
                  {{ q.questionText }}
                </p>

                <!-- Gambar Soal di Pembahasan -->
                <div v-if="q.image" class="w-full flex justify-start py-1">
                  <img :src="q.image" alt="Gambar Soal" class="max-h-48 rounded-xl border border-[#8F8575]/25 object-contain" />
                </div>

                <!-- Detail Pilihan Jawaban di Review -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium pt-2">
                  <div
                    class="p-3.5 rounded-2xl border"
                    :class="checkAnswerCorrectness(q, selectedAnswers[idx])
                      ? 'bg-[#7FD4C4]/15 border-[#7FD4C4]'
                      : 'bg-[#FFDE7A]/25 border-[#FFDE7A]'"
                  >
                    <span class="text-[#5B6474] block mb-1.5 font-semibold">Jawabanmu:</span>
                    
                    <!-- Image Choice Review -->
                    <div v-if="q.type === 'image_choice'" class="flex items-center gap-2.5">
                      <img
                        v-if="q.imageOptions?.[selectedAnswers[idx]]?.image"
                        :src="q.imageOptions[selectedAnswers[idx]].image"
                        class="w-12 h-12 rounded-xl object-contain bg-white border border-[#8F8575]/25 p-1"
                      />
                      <span class="text-[#2B3445] font-bold text-sm">
                        {{ q.imageOptions?.[selectedAnswers[idx]]?.label || (selectedAnswers[idx] !== undefined ? 'Pilihan ' + String.fromCharCode(65 + selectedAnswers[idx]) : 'Tidak dijawab') }}
                      </span>
                    </div>

                    <!-- Color Choice Review -->
                    <div v-else-if="q.type === 'color_choice'" class="flex items-center gap-2.5">
                      <span
                        v-if="selectedAnswers[idx] !== undefined && q.colorOptions?.[selectedAnswers[idx]]"
                        class="w-6 h-6 rounded-full inline-block shadow-2xs border border-black/10 shrink-0"
                        :style="{ backgroundColor: q.colorOptions[selectedAnswers[idx]].color }"
                      ></span>
                      <span class="text-[#2B3445] font-bold text-sm font-['Baloo_2'] text-base">
                        {{ selectedAnswers[idx] !== undefined && q.colorOptions?.[selectedAnswers[idx]] ? q.colorOptions[selectedAnswers[idx]].name : 'Tidak dijawab' }}
                      </span>
                    </div>

                    <!-- Matching Review -->
                    <div v-else-if="q.type === 'matching'" class="space-y-1">
                      <div v-for="(right, left) in (selectedAnswers[idx] || {})" :key="left" class="flex items-center gap-1.5 text-[#2B3445]">
                        <span class="font-semibold">{{ left }}</span>
                        <span>👉</span>
                        <span class="font-bold">{{ right }}</span>
                      </div>
                      <span v-if="!selectedAnswers[idx] || Object.keys(selectedAnswers[idx]).length === 0" class="text-[#8F8575]">Belum dipasangkan</span>
                    </div>

                    <!-- Ordering Review -->
                    <div v-else-if="q.type === 'ordering'" class="space-y-1">
                      <div class="flex flex-wrap gap-1.5 items-center">
                        <span
                          v-for="(item, oIdx) in ((selectedAnswers[idx] || []).filter(Boolean))"
                          :key="oIdx"
                          class="px-2 py-0.5 rounded-md bg-white border border-[#8F8575]/25 font-bold text-[#2B3445]"
                        >
                          {{ oIdx + 1 }}. {{ item }}
                        </span>
                      </div>
                      <span v-if="!selectedAnswers[idx] || (selectedAnswers[idx] || []).filter(Boolean).length === 0" class="text-[#8F8575]">Belum diurutkan</span>
                    </div>

                    <!-- True False Review -->
                    <span v-else-if="q.type === 'true_false'" class="text-[#2B3445] font-bold text-sm">
                      {{ selectedAnswers[idx] === 0 ? 'Benar (B)' : selectedAnswers[idx] === 1 ? 'Salah (S)' : 'Tidak dijawab' }}
                    </span>

                    <!-- Fill in the blank Review -->
                    <span v-else-if="q.type === 'fill_in_blank'" class="text-[#2B3445] font-bold text-sm font-['Baloo_2'] text-base">
                      {{ selectedAnswers[idx] || 'Tidak dijawab' }}
                    </span>

                    <!-- Multi Select Review -->
                    <div v-else-if="q.type === 'multi_select'" class="flex flex-wrap gap-1.5 items-center">
                      <span
                        v-for="selIdx in (selectedAnswers[idx] || [])"
                        :key="selIdx"
                        class="px-2.5 py-0.5 rounded-lg bg-white border border-[#8F8575]/25 font-bold text-[#2B3445]"
                      >
                        {{ q.options[selIdx] }}
                      </span>
                      <span v-if="!selectedAnswers[idx] || selectedAnswers[idx].length === 0" class="text-[#8F8575]">Belum dipilih</span>
                    </div>

                    <!-- Grid Map Review -->
                    <span v-else-if="q.type === 'grid_map'" class="text-[#2B3445] font-bold text-sm">
                      Petak {{ selectedAnswers[idx] || 'Tidak dijawab' }}
                    </span>

                    <!-- Place Value Review -->
                    <span v-else-if="q.type === 'place_value'" class="text-[#2B3445] font-bold text-sm">
                      {{ selectedAnswers[idx]?.tens ? `${selectedAnswers[idx].tens} puluhan dan ${selectedAnswers[idx].ones || '?'} satuan` : 'Belum dijawab' }}
                    </span>

                    <!-- Multiple Choice Review -->
                    <span v-else class="text-[#2B3445] font-bold text-sm">
                      {{ selectedAnswers[idx] !== undefined ? `${String.fromCharCode(65 + selectedAnswers[idx])}. ${q.options[selectedAnswers[idx]]}` : 'Tidak dijawab' }}
                    </span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-[#7FD4C4]/20 border border-[#7FD4C4]">
                    <span class="text-[#1E7A6F] block mb-1.5 font-semibold">Kunci Jawaban Tepat:</span>
                    
                    <!-- Image Choice Correct -->
                    <div v-if="q.type === 'image_choice'" class="flex items-center gap-2.5">
                      <img
                        v-if="q.imageOptions?.[q.correctOptionIndex]?.image"
                        :src="q.imageOptions[q.correctOptionIndex].image"
                        class="w-12 h-12 rounded-xl object-contain bg-white border border-[#1E7A6F]/30 p-1"
                      />
                      <span class="text-[#2B3445] font-bold text-sm">
                        {{ q.imageOptions?.[q.correctOptionIndex]?.label || ('Pilihan ' + String.fromCharCode(65 + q.correctOptionIndex)) }}
                      </span>
                    </div>

                    <!-- Color Choice Correct -->
                    <div v-else-if="q.type === 'color_choice'" class="flex items-center gap-2.5">
                      <span
                        v-if="q.colorOptions?.[q.correctOptionIndex]"
                        class="w-6 h-6 rounded-full inline-block shadow-2xs border border-black/10 shrink-0"
                        :style="{ backgroundColor: q.colorOptions[q.correctOptionIndex].color }"
                      ></span>
                      <span class="text-[#1E7A6F] font-bold text-sm font-['Baloo_2'] text-base">
                        {{ q.colorOptions?.[q.correctOptionIndex]?.name }}
                      </span>
                    </div>

                    <!-- Matching Correct -->
                    <div v-else-if="q.type === 'matching'" class="space-y-1">
                      <div v-for="(p, pIdx) in (q.pairs || [])" :key="pIdx" class="flex items-center gap-1.5 text-[#2B3445]">
                        <span class="font-semibold">{{ p.left }}</span>
                        <span>👉</span>
                        <span class="font-bold text-[#1E7A6F]">{{ p.right }}</span>
                      </div>
                    </div>

                    <!-- Ordering Correct -->
                    <div v-else-if="q.type === 'ordering'" class="space-y-1">
                      <div class="flex flex-wrap gap-1.5 items-center">
                        <span
                          v-for="(item, oIdx) in (q.correctOrder || [])"
                          :key="oIdx"
                          class="px-2 py-0.5 rounded-md bg-white border border-[#1E7A6F]/40 font-bold text-[#1E7A6F]"
                        >
                          {{ oIdx + 1 }}. {{ item }}
                        </span>
                      </div>
                    </div>

                    <!-- True False Correct -->
                    <span v-else-if="q.type === 'true_false'" class="text-[#2B3445] font-bold text-sm">
                      {{ q.correctOptionIndex === 0 ? 'Benar (B)' : 'Salah (S)' }}
                    </span>

                    <!-- Fill in the blank Correct -->
                    <span v-else-if="q.type === 'fill_in_blank'" class="text-[#1E7A6F] font-bold font-['Baloo_2'] text-base">
                      {{ q.expectedAnswers?.[0] || q.options?.[q.correctOptionIndex] }}
                    </span>

                    <!-- Multi Select Correct -->
                    <div v-else-if="q.type === 'multi_select'" class="flex flex-wrap gap-1.5 items-center">
                      <span
                        v-for="cIdx in (q.multiCorrectIndices || [])"
                        :key="cIdx"
                        class="px-2.5 py-0.5 rounded-lg bg-white border border-[#1E7A6F]/40 font-bold text-[#1E7A6F]"
                      >
                        {{ q.options[cIdx] }}
                      </span>
                    </div>

                    <!-- Grid Map Correct -->
                    <span v-else-if="q.type === 'grid_map'" class="text-[#1E7A6F] font-bold text-sm">
                      Petak {{ q.correctCell || 'E5' }}
                    </span>

                    <!-- Place Value Correct -->
                    <span v-else-if="q.type === 'place_value'" class="text-[#1E7A6F] font-bold text-sm">
                      {{ q.correctTens || '4' }} puluhan dan {{ q.correctOnes || '5' }} satuan
                    </span>

                    <!-- Multiple Choice Correct -->
                    <span v-else class="text-[#2B3445] font-bold text-sm">
                      {{ String.fromCharCode(65 + q.correctOptionIndex) }}. {{ q.options[q.correctOptionIndex] }}
                    </span>
                  </div>
                </div>

                <p v-if="q.explanation" class="text-xs text-[#2B3445] font-normal bg-[#FFF8F0] p-3.5 rounded-xl border border-[#8F8575]/20 leading-relaxed">
                  <strong class="text-[#1E7A6F]">💡 Petunjuk Belajar:</strong> {{ q.explanation }}
                </p>
              </div>
            </div>
          </div>

          <!-- Bottom Actions after Quiz -->
          <div class="pt-6 border-t border-[#8F8575]/20 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <button
              @click="resetQuiz"
              class="btn-prisma-white w-full sm:w-auto px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw class="w-4 h-4 text-[#1E7A6F]" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              @click="activeTab = 'video'; playButtonPop()"
              class="btn-prisma-white w-full sm:w-auto px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video class="w-4 h-4 text-[#1E7A6F]" />
              <span>Tonton Ulang Video</span>
            </button>

            <!-- Tombol Utama: Lanjut ke Bab Selanjutnya / Kembali ke Katalog Materi -->
            <button
              v-if="!isLastChapterInClass && nextMateri"
              @click="goToNextChapter"
              class="btn-prisma-mint w-full sm:w-auto px-7 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              <span>Lanjut ke Bab Selanjutnya</span>
              <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
            </button>

            <button
              v-else-if="isLastChapterInClass"
              @click="goToNextChapter"
              class="btn-prisma-mint w-full sm:w-auto px-7 py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              <span>Ke Katalog Materi</span>
              <ArrowRight class="w-4 h-4 text-[#1E7A6F]" />
            </button>

            <button
              @click="emit('finish')"
              class="px-6 py-3 rounded-2xl bg-white hover:bg-[#FFF8F0] border border-[#8F8575]/30 text-[#5B6474] hover:text-[#2B3445] text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 class="w-4 h-4 text-[#1E7A6F]" />
              <span>Selesai & Keluar</span>
            </button>
          </div>

        </div>

        <!-- Empty Questions Case -->
        <div v-else class="py-12 text-center space-y-3">
          <HelpCircle class="w-12 h-12 text-[#94C6FF] mx-auto" />
          <h4 class="font-['Baloo_2'] text-lg font-bold text-[#2B3445]">Belum Ada Soal Kuis</h4>
          <p class="text-xs text-[#5B6474]">Admin belum menambahkan soal pilihan ganda untuk materi ini.</p>
        </div>

      </div>

      <!-- Collapsible Poin & Tujuan Pembelajaran Drawer -->
      <div v-if="learningPoints.length > 0" class="bg-white rounded-3xl border border-[#8F8575]/25 p-4 sm:p-5 shadow-xs text-left">
        <button
          type="button"
          @click="isLearningPointsOpen = !isLearningPointsOpen; playButtonPop()"
          class="w-full flex items-center justify-between text-xs font-bold text-[#2B3445] cursor-pointer"
        >
          <div class="flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
            <span>Poin & Tujuan Pembelajaran ({{ learningPoints.length }} Poin)</span>
          </div>
          <ChevronDown
            class="w-4 h-4 text-[#5B6474] transition-transform duration-200"
            :class="{ 'rotate-180': isLearningPointsOpen }"
          />
        </button>

        <div v-show="isLearningPointsOpen" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 mt-3 border-t border-[#8F8575]/15">
          <div
            v-for="(lp, idx) in learningPoints"
            :key="idx"
            class="p-3.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/20 text-xs space-y-1"
          >
            <h5 class="font-bold text-[#1E7A6F] flex items-center gap-1.5 font-['Baloo_2'] text-sm">
              <span class="w-5 h-5 rounded-full bg-[#7FD4C4]/30 flex items-center justify-center text-[10px]">{{ idx + 1 }}</span>
              <span>{{ typeof lp === 'string' ? lp : lp.title }}</span>
            </h5>
            <p v-if="lp.desc" class="text-[#5B6474] text-[11px] leading-relaxed">
              {{ lp.desc }}
            </p>
          </div>
        </div>
      </div>

    </div>

    </div>

    <!-- ==================== POPUP PEMBAHASAN INSTAN SOAL (POPUP MODAL) ==================== -->
    <Teleport to="body">
      <div
        v-if="isExplanationPopupOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="relative w-full max-w-lg bg-white rounded-3xl border-2 shadow-2xl p-6 sm:p-8 space-y-5 animate-scale-up text-left max-h-[90vh] overflow-y-auto"
          :class="isCurrentQuestionCorrect ? 'border-[#1E7A6F]' : 'border-[#D97706]'"
        >
          <!-- Header Banner Status -->
          <div class="flex items-center justify-between gap-3 pb-3 border-b border-[#8F8575]/15">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0"
                :class="isCurrentQuestionCorrect ? 'bg-[#1E7A6F] text-white' : 'bg-[#D97706] text-white'"
              >
                {{ isCurrentQuestionCorrect ? '🎉' : '💡' }}
              </div>
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#5B6474] block">
                  Hasil Soal {{ currentQuestionIndex + 1 }} dari {{ questions.length }}
                </span>
                <h3
                  class="font-['Baloo_2'] text-xl sm:text-2xl font-bold leading-tight"
                  :class="isCurrentQuestionCorrect ? 'text-[#1E7A6F]' : 'text-[#B45309]'"
                >
                  {{ isCurrentQuestionCorrect ? 'Hebat Sekali! Jawabanmu Benar! 🌟' : 'Jawaban Belum Tepat, Yuk Cek Pembahasannya! 💡' }}
                </h3>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <div
                v-if="isCurrentQuestionCorrect"
                class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1E7A6F] text-white shadow-2xs shrink-0 flex items-center gap-1"
              >
                <Sparkles class="w-3.5 h-3.5" />
                <span>+{{ currentQuestion.points || 50 }} Poin</span>
              </div>
              <button
                type="button"
                @click="isExplanationPopupOpen = false; playButtonPop()"
                class="w-8 h-8 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-sm font-bold text-[#5B6474] cursor-pointer transition active:scale-95 shrink-0"
                title="Tutup Pembahasan"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Pertanyaan Singkat -->
          <div class="p-3.5 rounded-2xl bg-[#FFF8F0] border border-[#8F8575]/20 space-y-1">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#8F8575]">Pertanyaan:</span>
            <p class="font-['Baloo_2'] font-bold text-[#2B3445] text-base leading-snug">
              {{ currentQuestion.questionText }}
            </p>
          </div>

          <!-- Perbandingan Jawaban vs Kunci (Jika benar, sembunyikan Jawaban Kamu & langsung tampilkan Kunci Jawaban) -->
          <div
            class="grid gap-3 text-xs"
            :class="isCurrentQuestionCorrect ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'"
          >
            <!-- Pilihan Kamu (Hanya tampil jika jawaban belum tepat) -->
            <div
              v-if="!isCurrentQuestionCorrect"
              class="p-4 rounded-2xl border space-y-1.5 flex flex-col justify-between bg-[#FFDE7A]/25 border-[#D97706]/40"
            >
              <div class="space-y-1">
                <span class="text-[#5B6474] font-semibold block text-xs">Jawaban Kamu:</span>
                
                <!-- Khusus Tipe Matching: Daftar Pasangan per Baris -->
                <div v-if="currentQuestion.type === 'matching'" class="space-y-1 py-1 font-['Baloo_2'] font-bold text-sm sm:text-base leading-snug text-[#B45309]">
                  <div
                    v-for="(val, key, kIdx) in (selectedAnswers[currentQuestionIndex] || {})"
                    :key="key"
                  >
                    {{ key }} ➔ {{ val }}<span v-if="kIdx < Object.keys(selectedAnswers[currentQuestionIndex] || {}).length - 1">,</span>
                  </div>
                </div>

                <!-- Tipe Soal Lainnya -->
                <p
                  v-else
                  class="font-['Baloo_2'] font-bold text-base leading-snug text-[#B45309]"
                >
                  {{ formatUserAnswerText(currentQuestion, selectedAnswers[currentQuestionIndex]) }}
                </p>
              </div>

              <div>
                <span class="inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold text-white mt-2 shadow-2xs font-['Baloo_2'] bg-[#D97706]">
                  💡 Belum Tepat
                </span>
              </div>
            </div>

            <!-- Kunci Jawaban (Selalu tampil untuk semua tipe kuis) -->
            <div class="p-4 rounded-2xl bg-[#7FD4C4]/20 border border-[#7FD4C4] space-y-1.5 flex flex-col justify-between">
              <div class="space-y-1">
                <span class="text-[#1E7A6F] font-semibold block text-xs">Kunci Jawaban:</span>
                
                <!-- Khusus Tipe Matching: Daftar Kunci Pasangan per Baris -->
                <div v-if="currentQuestion.type === 'matching'" class="space-y-1 py-1 font-['Baloo_2'] font-bold text-sm sm:text-base text-[#1E7A6F] leading-snug">
                  <div
                    v-for="(pair, pIdx) in (currentQuestion.pairs || [])"
                    :key="pair.left"
                  >
                    {{ pair.left }} ➔ {{ pair.right }}<span v-if="pIdx < (currentQuestion.pairs || []).length - 1">,</span>
                  </div>
                </div>

                <!-- Tipe Soal Lainnya -->
                <p v-else class="font-['Baloo_2'] font-bold text-base text-[#1E7A6F] leading-snug">
                  {{ formatCorrectAnswerText(currentQuestion) }}
                </p>
              </div>

              <div>
                <span class="inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#1E7A6F] text-white mt-2 shadow-2xs font-['Baloo_2']">
                  ⭐ Tepat
                </span>
              </div>
            </div>
          </div>

          <!-- Penjelasan / Pembahasan Lengkap -->
          <div
            v-if="currentQuestion.explanation"
            class="p-4 rounded-2xl bg-white border-2 border-[#8F8575]/20 shadow-2xs space-y-1.5"
          >
            <h4 class="font-['Baloo_2'] text-sm font-bold text-[#1E7A6F] flex items-center gap-1.5">
              <Sparkles class="w-4 h-4 text-[#1E7A6F]" />
              <span>Pembahasan Detail:</span>
            </h4>
            <p class="text-xs sm:text-sm text-[#2B3445] leading-relaxed">
              {{ currentQuestion.explanation }}
            </p>
          </div>

          <!-- Tombol Aksi: Next ke Soal Berikutnya (Full Width Sesuai Mockup) -->
          <div class="pt-2">
            <button
              type="button"
              @click="handlePopupNext"
              class="w-full py-4 px-6 rounded-2xl font-['Baloo_2'] font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 text-[#2B3445] bg-[#7FD4C4] hover:bg-[#6ec2b3] border-2 border-[#1E7A6F]/20 shadow-md transition active:scale-98 cursor-pointer"
            >
              <span>{{ currentQuestionIndex < questions.length - 1 ? 'Lanjut ke Soal Berikutnya' : 'Selesai & Lihat Hasil Kuis 🎉' }}</span>
              <ArrowRight class="w-5 h-5 text-[#2B3445]" />
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
@keyframes drawCircle {
  0% {
    stroke-dashoffset: 400;
    opacity: 0.3;
    transform: scale(0.96) rotate(-4deg);
  }
  60% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
    transform: scale(1) rotate(-1deg);
  }
}

.animate-draw-circle {
  stroke-dasharray: 400;
  animation: drawCircle 0.42s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  transform-origin: center;
}
</style>
