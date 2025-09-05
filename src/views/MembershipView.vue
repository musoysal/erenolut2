<template>
  <div class="membership-view">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-3">Odyoloji Kulübü'ne Katıl!</h1>
            <p class="lead mb-4">
              Odyoloji alanındaki gelişmeleri takip et, deneyim payla ve karierin için önemli adımlar at.
            </p>
            <div class="hero-stats row text-center">
              <div class="col-4">
                <h3 class="fw-bold">{{ memberStats.totalMembers }}+</h3>
                <small>Aktif Üye</small>
              </div>
              <div class="col-4">
                <h3 class="fw-bold">{{ memberStats.universities }}</h3>
                <small>Üniversite</small>
              </div>
              <div class="col-4">
                <h3 class="fw-bold">{{ memberStats.events }}</h3>
                <small>Etkinlik</small>
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="hero-illustration">
              <i class="fas fa-users display-1 opacity-75"></i>
              <div class="floating-icons">
                <i class="fas fa-graduation-cap"></i>
                <i class="fas fa-stethoscope"></i>
                <i class="fas fa-brain"></i>
                <i class="fas fa-heart"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="fw-bold">Neden Odyoloji Kulübü?</h2>
            <p class="text-muted">Üye olmak için birçok neden var</p>
          </div>
        </div>
        <div class="row">
          <div
            v-for="benefit in benefits"
            :key="benefit.id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="benefit-card h-100 text-center p-4">
              <div class="benefit-icon mb-3">
                <i :class="benefit.icon"></i>
              </div>
              <h5 class="benefit-title">{{ benefit.title }}</h5>
              <p class="benefit-description text-muted">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Membership Form Section -->
    <section class="form-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="form-card">
              <div class="form-header text-center mb-4">
                <h3 class="fw-bold">Üyelik Başvuru Formu</h3>
                <p class="text-muted">Hemen başvuru yap ve topluluğumuzun bir parçası ol!</p>
              </div>

              <form @submit.prevent="submitForm" class="membership-form">
                <!-- Personal Information -->
                <div class="form-section-title">
                  <h5><i class="fas fa-user me-2"></i>Kişisel Bilgiler</h5>
                  <hr>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">Ad *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="formData.firstName"
                      required
                      :class="{ 'is-invalid': errors.firstName }"
                    >
                    <div v-if="errors.firstName" class="invalid-feedback">
                      {{ errors.firstName }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Soyad *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      v-model="formData.lastName"
                      required
                      :class="{ 'is-invalid': errors.lastName }"
                    >
                    <div v-if="errors.lastName" class="invalid-feedback">
                      {{ errors.lastName }}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">E-posta *</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="formData.email"
                      required
                      :class="{ 'is-invalid': errors.email }"
                    >
                    <div v-if="errors.email" class="invalid-feedback">
                      {{ errors.email }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="phone" class="form-label">Telefon</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      v-model="formData.phone"
                      placeholder="0555 123 4567"
                    >
                  </div>
                </div>

                <div class="mb-3">
                  <label for="birthDate" class="form-label">Doğum Tarihi</label>
                  <input
                    type="date"
                    class="form-control"
                    id="birthDate"
                    v-model="formData.birthDate"
                  >
                </div>

                <!-- Academic Information -->
                <div class="form-section-title mt-4">
                  <h5><i class="fas fa-graduation-cap me-2"></i>Akademik Bilgiler</h5>
                  <hr>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="university" class="form-label">Üniversite *</label>
                    <select
                      class="form-select"
                      id="university"
                      v-model="formData.university"
                      required
                      :class="{ 'is-invalid': errors.university }"
                    >
                      <option value="">Üniversite Seçin</option>
                      <option v-for="uni in universities" :key="uni" :value="uni">
                        {{ uni }}
                      </option>
                    </select>
                    <div v-if="errors.university" class="invalid-feedback">
                      {{ errors.university }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="faculty" class="form-label">Fakülte *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="faculty"
                      v-model="formData.faculty"
                      required
                      placeholder="Sağlık Bilimleri Fakültesi"
                      :class="{ 'is-invalid': errors.faculty }"
                    >
                    <div v-if="errors.faculty" class="invalid-feedback">
                      {{ errors.faculty }}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="department" class="form-label">Bölüm *</label>
                    <select
                      class="form-select"
                      id="department"
                      v-model="formData.department"
                      required
                      :class="{ 'is-invalid': errors.department }"
                    >
                      <option value="">Bölüm Seçin</option>
                      <option value="Odyoloji">Odyoloji</option>
                      <option value="Tıp">Tıp</option>
                      <option value="Hemşirelik">Hemşirelik</option>
                      <option value="Fizyoterapi">Fizyoterapi</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                    <div v-if="errors.department" class="invalid-feedback">
                      {{ errors.department }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="grade" class="form-label">Sınıf *</label>
                    <select
                      class="form-select"
                      id="grade"
                      v-model="formData.grade"
                      required
                      :class="{ 'is-invalid': errors.grade }"
                    >
                      <option value="">Sınıf Seçin</option>
                      <option value="1">1. Sınıf</option>
                      <option value="2">2. Sınıf</option>
                      <option value="3">3. Sınıf</option>
                      <option value="4">4. Sınıf</option>
                      <option value="Mezun">Mezun</option>
                      <option value="Yüksek Lisans">Yüksek Lisans</option>
                      <option value="Doktora">Doktora</option>
                    </select>
                    <div v-if="errors.grade" class="invalid-feedback">
                      {{ errors.grade }}
                    </div>
                  </div>
                </div>

                <!-- Interests -->
                <div class="form-section-title mt-4">
                  <h5><i class="fas fa-heart me-2"></i>İlgi Alanları</h5>
                  <hr>
                </div>

                <div class="mb-3">
                  <label class="form-label">Hangi konularla ilgileniyorsun? (Birden fazla seçebilirsin)</label>
                  <div class="interest-grid">
                    <div
                      v-for="interest in interests"
                      :key="interest.id"
                      class="form-check"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="interest.id"
                        :id="'interest-' + interest.id"
                        v-model="formData.selectedInterests"
                      >
                      <label class="form-check-label" :for="'interest-' + interest.id">
                        <i :class="interest.icon + ' me-2'"></i>
                        {{ interest.name }}
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Additional Information -->
                <div class="form-section-title mt-4">
                  <h5><i class="fas fa-info-circle me-2"></i>Ek Bilgiler</h5>
                  <hr>
                </div>

                <div class="mb-3">
                  <label for="motivation" class="form-label">Neden kulübe katılmak istiyorsun?</label>
                  <textarea
                    class="form-control"
                    id="motivation"
                    rows="4"
                    v-model="formData.motivation"
                    placeholder="Motivasyonunu ve beklentilerini paylaş..."
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="experience" class="form-label">Odyoloji alanındaki deneyimin nedir?</label>
                  <textarea
                    class="form-control"
                    id="experience"
                    rows="3"
                    v-model="formData.experience"
                    placeholder="Staj, proje, araştırma vb. deneyimlerini paylaş..."
                  ></textarea>
                </div>

                <!-- Agreement -->
                <div class="mb-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="agreement"
                      v-model="formData.agreement"
                      required
                      :class="{ 'is-invalid': errors.agreement }"
                    >
                    <label class="form-check-label" for="agreement">
                      <strong>Kulüp kurallarını</strong> ve <strong>gizlilik politikasını</strong> okudum, kabul ediyorum. *
                    </label>
                    <div v-if="errors.agreement" class="invalid-feedback">
                      {{ errors.agreement }}
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="text-center">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg px-5"
                    :disabled="isSubmitting"
                  >
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="fas fa-user-plus me-2"></i>
                    {{ isSubmitting ? 'Başvuru Gönderiliyor...' : 'Başvuru Gönder' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center p-5">
            <div class="success-icon mb-3">
              <i class="fas fa-check-circle text-success display-1"></i>
            </div>
            <h4 class="fw-bold mb-3">Başvurun Alındı! 🎉</h4>
            <p class="text-muted mb-4">
              Başvurun başarıyla iletildi. En kısa sürede e-posta adresinize bilgilendirme mesajı göndereceğiz.
            </p>
            <button type="button" class="btn btn-primary" @click="closeSuccessModal">
              Anasayfaya Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Interfaces
interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  university: string
  faculty: string
  department: string
  grade: string
  selectedInterests: string[]
  motivation: string
  experience: string
  agreement: boolean
}

interface Benefit {
  id: string
  icon: string
  title: string
  description: string
}

interface Interest {
  id: string
  name: string
  icon: string
}

// Reactive data
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const memberStats = {
  totalMembers: 150,
  universities: 25,
  events: 48
}

const formData = reactive<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  university: '',
  faculty: '',
  department: '',
  grade: '',
  selectedInterests: [],
  motivation: '',
  experience: '',
  agreement: false
})

// Benefits data
const benefits: Benefit[] = [
  {
    id: '1',
    icon: 'fas fa-graduation-cap text-primary display-6',
    title: 'Eğitim Fırsatları',
    description: 'Online seminerler, workshoplar ve sertifika programlarına ücretsiz erişim.'
  },
  {
    id: '2',
    icon: 'fas fa-users text-success display-6',
    title: 'Networking',
    description: 'Odyoloji alanındaki profesyoneller ve öğrencilerle tanışma fırsatı.'
  },
  {
    id: '3',
    icon: 'fas fa-briefcase text-warning display-6',
    title: 'Kariyer Desteği',
    description: 'İş fırsatları, staj imkanları ve mentörlük programları.'
  },
  {
    id: '4',
    icon: 'fas fa-book text-info display-6',
    title: 'Kaynak Paylaşımı',
    description: 'Güncel araştırmalar, makaleler ve eğitim materyallerine erişim.'
  },
  {
    id: '5',
    icon: 'fas fa-calendar text-danger display-6',
    title: 'Etkinlikler',
    description: 'Konferanslar, söyleşiler ve sosyal etkinliklerde öncelikli katılım.'
  },
  {
    id: '6',
    icon: 'fas fa-certificate text-secondary display-6',
    title: 'Sertifikalar',
    description: 'Katıldığın etkinlikler için geçerli katılım sertifikaları.'
  }
]

// Universities data
const universities = [
  'Ankara Üniversitesi',
  'İstanbul Üniversitesi',
  'Hacettepe Üniversitesi',
  'Marmara Üniversitesi',
  'Ege Üniversitesi',
  'Dokuz Eylül Üniversitesi',
  'Gazi Üniversitesi',
  'Anadolu Üniversitesi',
  'Başkent Üniversitesi',
  'İstanbul Medipol Üniversitesi',
  'Diğer'
]

// Interests data
const interests: Interest[] = [
  { id: 'pediatric', name: 'Pediatrik Odyoloji', icon: 'fas fa-baby' },
  { id: 'hearing-aids', name: 'İşitme Cihazları', icon: 'fas fa-assistive-listening-systems' },
  { id: 'cochlear', name: 'Koklear İmplant', icon: 'fas fa-microchip' },
  { id: 'diagnostics', name: 'Teşhis Testleri', icon: 'fas fa-stethoscope' },
  { id: 'research', name: 'Araştırma', icon: 'fas fa-flask' },
  { id: 'rehabilitation', name: 'Rehabilitasyon', icon: 'fas fa-hands-helping' },
  { id: 'tinnitus', name: 'Tinnitus', icon: 'fas fa-volume-up' },
  { id: 'balance', name: 'Denge Bozuklukları', icon: 'fas fa-balance-scale' }
]

// Methods
const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.firstName.trim()) {
    errors.value.firstName = 'Ad alanı zorunludur'
  }
  
  if (!formData.lastName.trim()) {
    errors.value.lastName = 'Soyad alanı zorunludur'
  }
  
  if (!formData.email.trim()) {
    errors.value.email = 'E-posta alanı zorunludur'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.value.email = 'Geçerli bir e-posta adresi girin'
  }
  
  if (!formData.university) {
    errors.value.university = 'Üniversite seçimi zorunludur'
  }
  
  if (!formData.faculty.trim()) {
    errors.value.faculty = 'Fakülte alanı zorunludur'
  }
  
  if (!formData.department) {
    errors.value.department = 'Bölüm seçimi zorunludur'
  }
  
  if (!formData.grade) {
    errors.value.grade = 'Sınıf seçimi zorunludur'
  }
  
  if (!formData.agreement) {
    errors.value.agreement = 'Kulüp kurallarını kabul etmelisiniz'
  }
  
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) {
    // Scroll to first error
    const firstError = Object.keys(errors.value)[0]
    const element = document.getElementById(firstError)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    }
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success modal
    showSuccessModal()
    
    // Reset form
    Object.assign(formData, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      university: '',
      faculty: '',
      department: '',
      grade: '',
      selectedInterests: [],
      motivation: '',
      experience: '',
      agreement: false
    })
    
  } catch (error) {
    console.error('Form submission error:', error)
    alert('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
  } finally {
    isSubmitting.value = false
  }
}

const showSuccessModal = () => {
  const modalElement = document.getElementById('successModal')
  if (modalElement) {
    if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
      const modal = new (window as any).bootstrap.Modal(modalElement)
      modal.show()
    } else {
      // Fallback
      modalElement.classList.add('show')
      modalElement.style.display = 'block'
      
      const backdrop = document.createElement('div')
      backdrop.className = 'modal-backdrop fade show'
      backdrop.id = 'success-modal-backdrop'
      document.body.appendChild(backdrop)
      document.body.classList.add('modal-open')
    }
  }
}

const closeSuccessModal = () => {
  const modalElement = document.getElementById('successModal')
  if (modalElement) {
    if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      }
    } else {
      // Fallback
      modalElement.classList.remove('show')
      modalElement.style.display = 'none'
      
      const backdrop = document.getElementById('success-modal-backdrop')
      if (backdrop) {
        backdrop.remove()
      }
      document.body.classList.remove('modal-open')
    }
  }
  
  // Redirect to home
  router.push('/')
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4a90e2 100%);
}

.hero-illustration {
  position: relative;
  display: inline-block;
}

.floating-icons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.floating-icons i {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
}

.floating-icons i:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-icons i:nth-child(2) {
  top: 30%;
  right: 15%;
  animation-delay: 0.5s;
}

.floating-icons i:nth-child(3) {
  bottom: 30%;
  left: 15%;
  animation-delay: 1s;
}

.floating-icons i:nth-child(4) {
  bottom: 20%;
  right: 10%;
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.benefit-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.benefit-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-title {
  color: var(--bs-dark);
  font-weight: 600;
  margin-bottom: 1rem;
}

.form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  border: 1px solid #e9ecef;
}

.form-section-title {
  margin-bottom: 1.5rem;
}

.form-section-title h5 {
  color: var(--bs-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-section-title hr {
  margin: 0;
  opacity: 0.3;
}

.interest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.form-check {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.form-check:hover {
  background: #e9ecef;
  border-color: var(--bs-primary);
}

.form-check-input:checked + .form-check-label {
  color: var(--bs-primary);
  font-weight: 600;
}

.form-control, .form-select {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4a90e2 100%);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.3);
}

.success-icon {
  animation: successPulse 1s ease-in-out;
}

@keyframes successPulse {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-card {
    padding: 1.5rem;
  }
  
  .hero-stats {
    margin-top: 2rem;
  }
  
  .interest-grid {
    grid-template-columns: 1fr;
  }
  
  .floating-icons {
    display: none;
  }
}

/* Animation delays for benefit cards */
.benefit-card:nth-child(1) { animation: fadeInUp 0.6s ease-out 0.1s both; }
.benefit-card:nth-child(2) { animation: fadeInUp 0.6s ease-out 0.2s both; }
.benefit-card:nth-child(3) { animation: fadeInUp 0.6s ease-out 0.3s both; }
.benefit-card:nth-child(4) { animation: fadeInUp 0.6s ease-out 0.4s both; }
.benefit-card:nth-child(5) { animation: fadeInUp 0.6s ease-out 0.5s both; }
.benefit-card:nth-child(6) { animation: fadeInUp 0.6s ease-out 0.6s both; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
