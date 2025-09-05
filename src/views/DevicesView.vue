<template>
  <div class="devices-view">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-3">Odyoloji Cihazları</h1>
            <p class="lead mb-4">
              Odyoloji alanında kullanılan modern cihazlar ve teknolojiler hakkında bilgi edinin
            </p>
            <div class="hero-stats d-flex gap-4">
              <div>
                <h3 class="fw-bold">{{ deviceCategories.length }}</h3>
                <small>Kategori</small>
              </div>
              <div>
                <h3 class="fw-bold">{{ devices.length }}</h3>
                <small>Cihaz</small>
              </div>
              <div>
                <h3 class="fw-bold">{{ devices.filter((d) => d.isModern).length }}</h3>
                <small>Modern Teknoloji</small>
              </div>
            </div>
          </div>
          <div class="col-lg-4 text-center">
            <i class="fas fa-stethoscope display-1 opacity-75"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section py-4 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 class="mb-3 mb-md-0">Kategori Filtresi</h5>
          </div>
          <div class="col-md-6">
            <div class="d-flex flex-wrap gap-2">
              <button
                v-for="category in deviceCategories"
                :key="category.id"
                @click="selectedCategory = category.id"
                :class="[
                  'btn btn-sm',
                  selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary',
                ]"
              >
                <i :class="category.icon + ' me-2'"></i>
                {{ category.name }}
              </button>
              <button
                @click="selectedCategory = 'all'"
                :class="[
                  'btn btn-sm',
                  selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary',
                ]"
              >
                <i class="fas fa-th me-2"></i>
                Tümü
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Devices Grid -->
    <section class="devices-section py-5">
      <div class="container">
        <div class="row">
          <div v-for="device in filteredDevices" :key="device.id" class="col-lg-4 col-md-6 mb-4">
            <div class="device-card h-100">
              <div class="device-image">
                <img :src="device.image" :alt="device.name" class="img-fluid" />
                <div class="device-overlay">
                  <button class="btn btn-light btn-sm" @click="openDeviceModal(device)">
                    <i class="fas fa-eye me-2"></i>
                    Detayları Gör
                  </button>
                </div>
                <div class="device-badges">
                  <span v-if="device.isModern" class="badge bg-success">
                    <i class="fas fa-star me-1"></i>
                    Modern
                  </span>
                  <span v-if="device.isPortable" class="badge bg-info">
                    <i class="fas fa-mobile-alt me-1"></i>
                    Taşınabilir
                  </span>
                </div>
              </div>

              <div class="device-content">
                <div class="device-category mb-2">
                  <span class="badge bg-primary">{{ getCategoryName(device.category) }}</span>
                </div>

                <h5 class="device-title">{{ device.name }}</h5>
                <p class="device-description text-muted">{{ device.shortDescription }}</p>

                <div class="device-specs">
                  <div class="spec-item">
                    <i class="fas fa-industry me-2 text-primary"></i>
                    <small>{{ device.manufacturer }}</small>
                  </div>
                  <div class="spec-item">
                    <i class="fas fa-calendar me-2 text-primary"></i>
                    <small>{{ device.year }}</small>
                  </div>
                  <div class="spec-item" v-if="device.priceRange">
                    <i class="fas fa-tag me-2 text-primary"></i>
                    <small>{{ device.priceRange }}</small>
                  </div>
                </div>

                <div class="device-actions mt-3">
                  <button class="btn btn-primary btn-sm w-100" @click="openDeviceModal(device)">
                    <i class="fas fa-info-circle me-2"></i>
                    Detaylı Bilgi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredDevices.length === 0" class="text-center py-5">
          <i class="fas fa-search display-1 text-muted mb-3"></i>
          <h4 class="text-muted">Bu kategoride cihaz bulunamadı</h4>
          <p class="text-muted">Farklı bir kategori seçmeyi deneyin</p>
        </div>
      </div>
    </section>

    <!-- Device Detail Modal -->
    <div
      class="modal fade"
      id="deviceModal"
      tabindex="-1"
      aria-labelledby="deviceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deviceModalLabel">
              {{ selectedDevice?.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="closeDeviceModal"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedDevice">
            <div class="row">
              <div class="col-md-6">
                <img
                  :src="selectedDevice.image"
                  :alt="selectedDevice.name"
                  class="img-fluid rounded mb-3"
                />
              </div>
              <div class="col-md-6">
                <div class="device-info">
                  <div class="mb-3">
                    <span class="badge bg-primary me-2">{{
                      getCategoryName(selectedDevice.category)
                    }}</span>
                    <span v-if="selectedDevice.isModern" class="badge bg-success me-2">Modern</span>
                    <span v-if="selectedDevice.isPortable" class="badge bg-info">Taşınabilir</span>
                  </div>

                  <h6>Genel Bilgiler</h6>
                  <ul class="list-unstyled">
                    <li><strong>Üretici:</strong> {{ selectedDevice.manufacturer }}</li>
                    <li><strong>Model Yılı:</strong> {{ selectedDevice.year }}</li>
                    <li v-if="selectedDevice.priceRange">
                      <strong>Fiyat Aralığı:</strong> {{ selectedDevice.priceRange }}
                    </li>
                    <li v-if="selectedDevice.weight">
                      <strong>Ağırlık:</strong> {{ selectedDevice.weight }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <h6>Açıklama</h6>
              <p>{{ selectedDevice.fullDescription }}</p>
            </div>

            <div class="mt-4" v-if="selectedDevice.features">
              <h6>Özellikler</h6>
              <ul>
                <li v-for="feature in selectedDevice.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>

            <div class="mt-4" v-if="selectedDevice.applications">
              <h6>Kullanım Alanları</h6>
              <div class="d-flex flex-wrap gap-2">
                <span
                  v-for="app in selectedDevice.applications"
                  :key="app"
                  class="badge bg-light text-dark"
                >
                  {{ app }}
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeviceModal">Kapat</button>
            <button type="button" class="btn btn-primary" v-if="selectedDevice?.website">
              <i class="fas fa-external-link-alt me-2"></i>
              Resmi Site
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Interfaces
interface DeviceCategory {
  id: string
  name: string
  icon: string
}

interface Device {
  id: string
  name: string
  category: string
  shortDescription: string
  fullDescription: string
  manufacturer: string
  year: string
  image: string
  isModern: boolean
  isPortable: boolean
  priceRange?: string
  weight?: string
  features?: string[]
  applications?: string[]
  website?: string
}

// Reactive data
const selectedCategory = ref<string>('all')
const selectedDevice = ref<Device | null>(null)

// Device categories
const deviceCategories: DeviceCategory[] = [
  { id: 'audiometer', name: 'Odyometre', icon: 'fas fa-volume-up' },
  { id: 'impedance', name: 'İmpedansmetre', icon: 'fas fa-wave-square' },
  { id: 'otoacoustic', name: 'OAE', icon: 'fas fa-sound' },
  { id: 'abr', name: 'ABR/BERA', icon: 'fas fa-brain' },
  { id: 'hearing-aid', name: 'İşitme Cihazı', icon: 'fas fa-assistive-listening-systems' },
  { id: 'cochlear', name: 'Koklear İmplant', icon: 'fas fa-microchip' },
]

// Devices data
const devices: Device[] = [
  {
    id: '1',
    name: 'Interacoustics AC440',
    category: 'audiometer',
    shortDescription: 'Klinik odyometre - Tam teşhis paketi',
    fullDescription:
      'AC440, klinik ortamda kapsamlı işitme testleri yapabilen gelişmiş bir odyometredir. Hava ve kemik iletimi testleri, konuşma odyometrisi ve özel testler için tasarlanmıştır.',
    manufacturer: 'Interacoustics',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&h=300&fit=crop&crop=center',
    isModern: true,
    isPortable: false,
    priceRange: '50.000-80.000 TL',
    weight: '15 kg',
    features: [
      'Hava ve kemik iletimi odyometrisi',
      'Konuşma odyometrisi',
      'SISI, Tone Decay testleri',
      'Masking sistemi',
      'PC bağlantısı ve yazılım desteği',
    ],
    applications: ['Klinik teşhis', 'Araştırma', 'Eğitim'],
    website: 'https://interacoustics.com',
  },
  {
    id: '2',
    name: 'GSI Pello',
    category: 'audiometer',
    shortDescription: 'Taşınabilir odyometre - Saha çalışmaları için ideal',
    fullDescription:
      'GSI Pello, hafif ve taşınabilir tasarımıyla saha çalışmaları, okul taramaları ve ev ziyaretleri için özel olarak geliştirilmiş modern bir odyometredir.',
    manufacturer: 'GSI - Grason-Stadler',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop&crop=center',
    isModern: true,
    isPortable: true,
    priceRange: '25.000-40.000 TL',
    weight: '2.8 kg',
    features: [
      'Taşınabilir tasarım',
      'Tablet kontrol',
      'Kablosuz kulaklık desteği',
      'Otomatik masking',
      'Bulut tabanlı rapor sistemi',
    ],
    applications: ['Saha çalışması', 'Okul taraması', 'Ev ziyareti'],
    website: 'https://gsi.com',
  },
  {
    id: '3',
    name: 'Interacoustics Titan',
    category: 'impedance',
    shortDescription: 'Gelişmiş İmpedansmetre - Orta kulak analizi',
    fullDescription:
      'Titan, orta kulak fonksiyonlarını değerlendirmek için kullanılan son teknoloji impedansmetre cihazıdır. Timpanometri ve akustik refleks testleri yapabilir.',
    manufacturer: 'Interacoustics',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop&crop=center',
    isModern: true,
    isPortable: true,
    priceRange: '30.000-50.000 TL',
    weight: '3.5 kg',
    features: [
      'Yüksek frekans timpanometri (1000Hz)',
      'İpsilateral ve kontralateral refleks',
      'Otomatik test protokolleri',
      'Yaşa göre normatif veriler',
      'Renkli dokunmatik ekran',
    ],
    applications: ['Orta kulak değerlendirmesi', 'Pediatrik testler', 'Klinik teşhis'],
    website: 'https://interacoustics.com',
  },
  {
    id: '4',
    name: 'Otodynamics ILO292',
    category: 'otoacoustic',
    shortDescription: 'OAE Test Sistemi - Yenidoğan tarama',
    fullDescription:
      'ILO292, otoakustik emisyon testleri için geliştirilmiş uzman düzeyinde bir sistemdir. Yenidoğan işitme tarama programları için ideal.',
    manufacturer: 'Otodynamics',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=300&fit=crop&crop=center',
    isModern: false,
    isPortable: true,
    priceRange: '35.000-55.000 TL',
    weight: '4.2 kg',
    features: [
      'TEOAE ve DPOAE testleri',
      'Yenidoğan tarama protokolleri',
      'Gürültü analizi',
      'Otomatik pass/refer sonuçları',
      'İstatistiksel raporlama',
    ],
    applications: ['Yenidoğan tarama', 'Ototoksisite takibi', 'Araştırma'],
    website: 'https://otodynamics.com',
  },
  {
    id: '5',
    name: 'Natus Neuro Audio',
    category: 'abr',
    shortDescription: 'ABR/ASSR Test Sistemi - Beyin sapı cevapları',
    fullDescription:
      'Natus Neuro Audio, beyin sapı işitsel uyarılmış potansiyelleri ve otomatik işitsel uyarılmış cevapları ölçmek için kullanılan gelişmiş bir sistemdir.',
    manufacturer: 'Natus Medical',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1666886572860-4f57a6db9bb5?w=500&h=300&fit=crop&crop=center',
    isModern: true,
    isPortable: false,
    priceRange: '80.000-120.000 TL',
    weight: '12 kg',
    features: [
      'ABR ve ASSR testleri',
      'Otomatik eşik tahmini',
      'Frekans spesifik testler',
      'Yenidoğan ve yetişkin protokolleri',
      'İleri analiz araçları',
    ],
    applications: ['Objektif odyoloji', 'Yenidoğan teşhis', 'Retrocochlear patoloji'],
    website: 'https://natus.com',
  },
  {
    id: '6',
    name: 'Phonak Naida Marvel',
    category: 'hearing-aid',
    shortDescription: 'Premium İşitme Cihazı - Bluetooth bağlantılı',
    fullDescription:
      'Naida Marvel, ileri teknoloji özellikler ve güçlü performans sunan premium işitme cihazıdır. Bluetooth bağlantısı ve yapay zeka destekli ses işleme.',
    manufacturer: 'Phonak',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&h=300&fit=crop&crop=center',
    isModern: true,
    isPortable: true,
    priceRange: '15.000-25.000 TL',
    weight: '8 gram',
    features: [
      'Bluetooth bağlantısı',
      'Yapay zeka ses işleme',
      'Su geçirmez tasarım',
      'Şarj edilebilir batarya',
      'Mobil uygulama kontrolü',
    ],
    applications: ['Günlük kullanım', 'Müzik dinleme', 'Telefon konuşması'],
    website: 'https://phonak.com',
  },
  {
    id: '7',
    name: 'Cochlear Nucleus 8',
    category: 'cochlear',
    shortDescription: 'Koklear İmplant Sistemi - Gelişmiş işitme rehabilitasyonu',
    fullDescription:
      'Nucleus 8, ağır işitme kaybı olan bireyler için tasarlanmış en yeni nesil koklear implant sistemidir. Gelişmiş ses işleme teknolojisi içerir.',
    manufacturer: 'Cochlear',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=300&fit=crop&crop=center',
    isModern: true,
    isPortable: true,
    priceRange: '150.000-200.000 TL',
    weight: '50 gram',
    features: [
      'SmartSound iQ teknolojisi',
      'Su geçirmez tasarım',
      'Kablosuz bağlantı',
      'Uzaktan kontrol',
      'Akıllı telefon uygulaması',
    ],
    applications: ['Ağır işitme kaybı', 'İşitme rehabilitasyonu', 'Çocuk ve yetişkin'],
    website: 'https://cochlear.com',
  },
  {
    id: '8',
    name: 'Madsen Astera²',
    category: 'audiometer',
    shortDescription: 'Modüler Odyometre Sistemi - Esnek konfigürasyon',
    fullDescription:
      'Astera², klinik ihtiyaçlara göre özelleştirilebilen modüler odyometre sistemidir. Temel odyometriden ileri testlere kadar geniş kapsamlı çözüm sunar.',
    manufacturer: 'Natus - Madsen',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&h=300&fit=crop&crop=center',
    isModern: true,
    isPortable: false,
    priceRange: '60.000-100.000 TL',
    weight: '18 kg',
    features: [
      'Modüler tasarım',
      'Dokunmatik ekran arayüzü',
      'Otomatik test protokolleri',
      'HI-PRO programlama desteği',
      'NOAH yazılım entegrasyonu',
    ],
    applications: ['Klinik teşhis', 'İşitme cihazı uyumu', 'Araştırma'],
    website: 'https://natus.com',
  },
]

// Computed properties
const filteredDevices = computed(() => {
  if (selectedCategory.value === 'all') {
    return devices
  }
  return devices.filter((device) => device.category === selectedCategory.value)
})

// Methods
const getCategoryName = (categoryId: string): string => {
  const category = deviceCategories.find((cat) => cat.id === categoryId)
  return category ? category.name : categoryId
}

const openDeviceModal = (device: Device) => {
  selectedDevice.value = device

  // Bootstrap modal açma
  setTimeout(() => {
    const modalElement = document.getElementById('deviceModal')
    if (modalElement) {
      if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
        const modal = new (window as any).bootstrap.Modal(modalElement)
        modal.show()
      } else {
        // Fallback: Manual modal opening
        modalElement.classList.add('show')
        modalElement.style.display = 'block'
        modalElement.setAttribute('aria-modal', 'true')

        const backdrop = document.createElement('div')
        backdrop.className = 'modal-backdrop fade show'
        backdrop.id = 'device-modal-backdrop'
        document.body.appendChild(backdrop)
        document.body.classList.add('modal-open')
      }
    }
  }, 100)
}

const closeDeviceModal = () => {
  selectedDevice.value = null

  // Bootstrap modal kapatma
  const modalElement = document.getElementById('deviceModal')
  if (modalElement) {
    if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      }
    } else {
      // Fallback: Manual modal closing
      modalElement.classList.remove('show')
      modalElement.style.display = 'none'
      modalElement.removeAttribute('aria-modal')

      const backdrop = document.getElementById('device-modal-backdrop')
      if (backdrop) {
        backdrop.remove()
      }
      document.body.classList.remove('modal-open')
    }
  }
}

// Event listeners
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && selectedDevice.value) {
    closeDeviceModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4a90e2 100%);
}

.hero-stats > div {
  text-align: center;
}

.filter-section {
  border-bottom: 1px solid #dee2e6;
}

.device-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.device-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.device-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.device-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.device-card:hover .device-image img {
  transform: scale(1.05);
}

.device-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.device-card:hover .device-overlay {
  opacity: 1;
}

.device-badges {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.device-content {
  padding: 1.5rem;
}

.device-title {
  color: var(--bs-dark);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.device-description {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.device-specs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.spec-item {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #6c757d;
}

.device-actions button {
  transition: all 0.3s ease;
}

.device-actions button:hover {
  transform: translateY(-2px);
}

/* Modal improvements */
.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
}

.device-info ul li {
  padding: 0.25rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.device-info ul li:last-child {
  border-bottom: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-stats {
    justify-content: center;
    margin-top: 2rem;
  }

  .device-image {
    height: 200px;
  }

  .filter-section .d-flex {
    justify-content: center;
  }

  .device-overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
  }
}

/* Loading animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.device-card {
  animation: fadeIn 0.6s ease-out;
}

.device-card:nth-child(1) {
  animation-delay: 0.1s;
}
.device-card:nth-child(2) {
  animation-delay: 0.2s;
}
.device-card:nth-child(3) {
  animation-delay: 0.3s;
}
.device-card:nth-child(4) {
  animation-delay: 0.4s;
}
.device-card:nth-child(5) {
  animation-delay: 0.5s;
}
.device-card:nth-child(6) {
  animation-delay: 0.6s;
}
</style>
