<template>
  <div class="education-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Eğitim Videoları</h1>
        <p class="hero-subtitle">
          Odyoloji alanındaki güncel gelişmeleri ve pratik bilgileri öğrenmek için hazırladığım
          eğitim videolarını izleyin.
        </p>
      </div>
    </section>

    <!-- Video Categories Filter -->
    <section class="filter-section">
      <div class="container">
        <div class="text-center mb-4">
          <h3>Video Kategorileri</h3>
          <div class="category-filters">
            <button
              v-for="category in categories"
              :key="category.value"
              :class="`btn btn-outline-primary mx-2 mb-2 ${
                selectedCategory === category.value ? 'active' : ''
              }`"
              @click="selectedCategory = category.value"
            >
              <i :class="category.icon + ' me-2'"></i>
              {{ category.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Videos -->
    <section class="section">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-6 col-xl-4 mb-4"
            v-for="video in filteredVideos"
            :key="video.id"
          >
            <div class="video-card card h-100">
              <div class="video-thumbnail position-relative">
                <img
                  :src="video.thumbnail"
                  :alt="video.title"
                  class="card-img-top"
                  style="height: 220px; object-fit: cover"
                />
                <div class="play-overlay">
                  <button 
                    class="play-button"
                    @click="openVideo(video.videoId)"
                  >
                    <i class="fas fa-play"></i>
                  </button>
                </div>
                <div class="video-duration">
                  {{ video.duration }}
                </div>
              </div>
              
              <div class="card-body d-flex flex-column">
                <div class="video-meta mb-2">
                  <span :class="`badge bg-${getCategoryColor(video.category)} me-2`">
                    {{ getCategoryLabel(video.category) }}
                  </span>
                  <span class="text-muted small">
                    <i class="fas fa-calendar me-1"></i>
                    {{ formatDate(video.publishDate) }}
                  </span>
                </div>
                
                <h5 class="card-title">{{ video.title }}</h5>
                <p class="card-text flex-grow-1">{{ video.description }}</p>
                
                <div class="video-stats mb-3">
                  <div class="d-flex justify-content-between text-muted small">
                    <span>
                      <i class="fas fa-eye me-1"></i>
                      {{ formatViews(video.views) }} görüntülenme
                    </span>
                    <span>
                      <i class="fas fa-thumbs-up me-1"></i>
                      {{ video.likes }}
                    </span>
                  </div>
                </div>
                
                <div class="video-actions">
                  <button 
                    class="btn btn-primary btn-sm w-100"
                    @click="openVideo(video.videoId)"
                  >
                    <i class="fab fa-youtube me-2"></i>
                    Videoyu İzle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No videos message -->
        <div v-if="filteredVideos.length === 0" class="text-center py-5">
          <i class="fas fa-video mb-3" style="font-size: 4rem; color: #ccc"></i>
          <h4>Video Bulunamadı</h4>
          <p class="text-muted">Bu kategoride henüz video bulunmamaktadır.</p>
        </div>
      </div>
    </section>

    <!-- Video Modal -->
    <div
      class="modal fade"
      id="videoModal"
      tabindex="-1"
      ref="videoModal"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedVideo?.title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="closeVideo"
            ></button>
          </div>
          <div class="modal-body p-0">
            <div class="ratio ratio-16x9">
              <iframe
                v-if="selectedVideo"
                :src="`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface EducationVideo {
  id: number
  title: string
  description: string
  videoId: string
  thumbnail: string
  duration: string
  publishDate: string
  category: string
  views: number
  likes: number
}

const selectedCategory = ref('all')
const selectedVideo = ref<EducationVideo | null>(null)

const categories = ref([
  { value: 'all', label: 'Tümü', icon: 'fas fa-list' },
  { value: 'basics', label: 'Temel Bilgiler', icon: 'fas fa-book' },
  { value: 'devices', label: 'İşitme Cihazları', icon: 'fas fa-headphones' },
  { value: 'tests', label: 'Testler & Tanı', icon: 'fas fa-stethoscope' },
  { value: 'pediatric', label: 'Çocuk Odyolojisi', icon: 'fas fa-child' },
  { value: 'rehabilitation', label: 'Rehabilitasyon', icon: 'fas fa-user-md' }
])

const educationVideos: EducationVideo[] = [
  {
    id: 1,
    title: 'İşitme Nasıl Çalışır? - Anatomik Yapı ve Fonksiyonlar',
    description: 'İnsan kulağının anatomik yapısı ve işitme sürecinin detaylı açıklaması. Dış, orta ve iç kulağın fonksiyonları.',
    videoId: 'VItXpLBAtJo', // Real audiology video
    thumbnail: 'https://img.youtube.com/vi/VItXpLBAtJo/maxresdefault.jpg',
    duration: '15:24',
    publishDate: '2024-02-15',
    category: 'basics',
    views: 12500,
    likes: 487
  },
  {
    id: 2,
    title: 'İşitme Cihazı Teknolojileri - Digital vs Analog',
    description: 'Modern işitme cihazlarının teknolojik özellikleri, digital ve analog cihazlar arasındaki farklar.',
    videoId: 'FlWAxBOB3VY', // Real hearing aid video
    thumbnail: 'https://img.youtube.com/vi/FlWAxBOB3VY/maxresdefault.jpg',
    duration: '12:30',
    publishDate: '2024-02-10',
    category: 'devices',
    views: 8970,
    likes: 234
  },
  {
    id: 3,
    title: 'Çocuklarda İşitme Testleri - Oyun Odyometrisi',
    description: 'Çocuk hastalarda işitme testi uygulamaları, oyun odyometrisi teknikleri ve erken teşhis yöntemleri.',
    videoId: 'rGstAqnWc1s', // Real pediatric audiology video
    thumbnail: 'https://img.youtube.com/vi/rGstAqnWc1s/maxresdefault.jpg',
    duration: '18:45',
    publishDate: '2024-02-05',
    category: 'pediatric',
    views: 15600,
    likes: 672
  },
  {
    id: 4,
    title: 'Odyometri Testi Nasıl Yapılır? - Step by Step',
    description: 'Pure tone odyometri testinin adım adım uygulanması, test ortamı hazırlığı ve sonuç değerlendirmesi.',
    videoId: 'eK8oMXNlHLQ', // Real audiometry video
    thumbnail: 'https://img.youtube.com/vi/eK8oMXNlHLQ/maxresdefault.jpg',
    duration: '22:15',
    publishDate: '2024-01-28',
    category: 'tests',
    views: 9840,
    likes: 398
  },
  {
    id: 5,
    title: 'Koklear İmplant Nedir? - Adayları ve Süreç',
    description: 'Koklear implant teknolojisi, uygun hasta seçimi, ameliyat süreci ve rehabilitasyon aşamaları.',
    videoId: 'aX3hOw86y3s', // Real cochlear implant video
    thumbnail: 'https://img.youtube.com/vi/aX3hOw86y3s/maxresdefault.jpg',
    duration: '16:20',
    publishDate: '2024-01-20',
    category: 'rehabilitation',
    views: 18200,
    likes: 756
  },
  {
    id: 6,
    title: 'Timpanometri - Orta Kulak Fonksiyon Testi',
    description: 'Timpanometri testinin uygulama tekniği, normal ve patolojik timpanogram örnekleri.',
    videoId: 'u2VU1lInQEY', // Real tympanometry video
    thumbnail: 'https://img.youtube.com/vi/u2VU1lInQEY/maxresdefault.jpg',
    duration: '11:30',
    publishDate: '2024-01-15',
    category: 'tests',
    views: 7650,
    likes: 289
  },
  {
    id: 7,
    title: 'İşitme Cihazı Seçimi ve Fitting Süreci',
    description: 'Hastaya uygun işitme cihazı seçimi, fitting sürecinde dikkat edilecek noktalar ve kontrol aşamaları.',
    videoId: 'yWjZpWGFjuk', // Real hearing aid fitting video
    thumbnail: 'https://img.youtube.com/vi/yWjZpWGFjuk/maxresdefault.jpg',
    duration: '19:40',
    publishDate: '2024-01-10',
    category: 'devices',
    views: 11300,
    likes: 445
  },
  {
    id: 8,
    title: 'İşitme Kaybı Türleri ve Nedenleri',
    description: 'Sensorinöral, iletim ve karma tipi işitme kayıpları, nedenleri ve tedavi yaklaşımları.',
    videoId: 'KANfU6nHiBI', // Real hearing loss types video
    thumbnail: 'https://img.youtube.com/vi/KANfU6nHiBI/maxresdefault.jpg',
    duration: '14:55',
    publishDate: '2024-01-05',
    category: 'basics',
    views: 13800,
    likes: 524
  }
]

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'all') {
    return educationVideos
  }
  return educationVideos.filter(video => video.category === selectedCategory.value)
})

const openVideo = (videoId: string) => {
  selectedVideo.value = educationVideos.find(v => v.videoId === videoId) || null
  // Bootstrap modal açma
  const modalElement = document.getElementById('videoModal')
  if (modalElement && (window as any).bootstrap) {
    const modal = new (window as any).bootstrap.Modal(modalElement)
    modal.show()
  }
}

const closeVideo = () => {
  selectedVideo.value = null
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatViews = (views: number) => {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K'
  }
  return views.toString()
}

const getCategoryLabel = (category: string) => {
  const cat = categories.value.find(c => c.value === category)
  return cat ? cat.label : category
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    basics: 'primary',
    devices: 'success',
    tests: 'info',
    pediatric: 'warning',
    rehabilitation: 'danger'
  }
  return colors[category] || 'secondary'
}
</script>

<style scoped>
.hero-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
}

.filter-section {
  padding: 3rem 0 1rem;
  background: #f8f9fa;
}

.category-filters .btn {
  transition: all 0.3s ease;
}

.category-filters .btn.active {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
  color: white;
}

.section {
  padding: 4rem 0;
}

.video-card {
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.video-thumbnail {
  position: relative;
  overflow: hidden;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--bs-primary);
  transition: all 0.3s ease;
}

.play-button:hover {
  background: white;
  transform: scale(1.1);
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: 500;
}

.video-meta .badge {
  font-size: 0.7rem;
}

.video-stats {
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

.modal-xl {
  max-width: 1200px;
}

.modal-body .ratio {
  background: #000;
}
</style>