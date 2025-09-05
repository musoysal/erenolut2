<template>
  <div class="contact-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">İletişim</h1>
        <p class="hero-subtitle">
          Sorularınız, randevu talepleriniz veya işbirliği önerileriniz için benimle iletişime
          geçin.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <h4>İletişim Formu</h4>
              </div>
              <div class="card-body">
                <form @submit.prevent="submitForm">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="name" class="form-label">Ad Soyad *</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="form.name"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="email" class="form-label">E-posta *</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="form.email"
                        required
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="phone" class="form-label">Telefon</label>
                      <input type="tel" class="form-control" id="phone" v-model="form.phone" />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="subject" class="form-label">Konu *</label>
                      <select class="form-select" id="subject" v-model="form.subject" required>
                        <option value="">Konu seçin</option>
                        <option value="randevu">Randevu Talebi</option>
                        <option value="danisma">Danışmanlık</option>
                        <option value="isbirligi">İşbirliği</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">Mesaj *</label>
                    <textarea
                      class="form-control"
                      id="message"
                      rows="5"
                      v-model="form.message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane me-2"></i>
                    Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h5>İletişim Bilgileri</h5>
              </div>
              <div class="card-body">
                <div class="contact-item mb-3">
                  <i class="fas fa-envelope text-primary me-3"></i>
                  <div>
                    <strong>E-posta</strong>
                    <p class="mb-0">eren@odyolojikulubu.com</p>
                  </div>
                </div>
                <div class="contact-item mb-3">
                  <i class="fas fa-phone text-primary me-3"></i>
                  <div>
                    <strong>Telefon</strong>
                    <p class="mb-0">+90 555 123 45 67</p>
                  </div>
                </div>
                <div class="contact-item mb-3">
                  <i class="fas fa-map-marker-alt text-primary me-3"></i>
                  <div>
                    <strong>Adres</strong>
                    <p class="mb-0">İstanbul, Türkiye</p>
                  </div>
                </div>
                <div class="contact-item">
                  <i class="fas fa-clock text-primary me-3"></i>
                  <div>
                    <strong>Çalışma Saatleri</strong>
                    <p class="mb-0">Pazartesi - Cuma: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <div class="card-header">
                <h5>Sosyal Medya</h5>
              </div>
              <div class="card-body">
                <div class="social-links">
                  <a href="#" class="btn btn-outline-primary me-2 mb-2">
                    <i class="fab fa-linkedin"></i>
                    LinkedIn
                  </a>
                  <a href="#" class="btn btn-outline-primary me-2 mb-2">
                    <i class="fab fa-twitter"></i>
                    Twitter
                  </a>
                  <a href="#" class="btn btn-outline-primary me-2 mb-2">
                    <i class="fab fa-instagram"></i>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitForm = () => {
  // Form validation
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    alert('Lütfen zorunlu alanları doldurun.')
    return
  }

  // Simulate form submission
  alert('Mesajınız başarıyla gönderildi! Size en kısa sürede dönüş yapacağım.')

  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  }
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
  max-width: 600px;
  margin: 0 auto;
}

.section {
  padding: 5rem 0;
}

.card {
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.contact-item {
  display: flex;
  align-items: flex-start;
}

.contact-item i {
  margin-top: 0.25rem;
}

.social-links a {
  text-decoration: none;
}
</style>
