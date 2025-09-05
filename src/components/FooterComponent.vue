<template>
  <footer class="bg-dark text-white mt-5">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-4 mb-4">
          <h5 class="mb-3">Eren Olut</h5>
          <p class="text-white">
            Odyoloji alanında uzmanlaşmış, işitme sağlığı konusunda toplumsal farkındalık yaratmayı
            hedefleyen bir sağlık profesyoneli.
          </p>
          <div class="social-links">
            <a href="#" class="text-white me-3">
              <i class="fab fa-linkedin fa-lg"></i>
            </a>
            <a href="#" class="text-white me-3">
              <i class="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" class="text-white me-3">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" class="text-white">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-2 mb-4">
          <h6 class="mb-3">Sayfalar</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-white text-decoration-none">Ana Sayfa</router-link>
            </li>
            <li class="mb-2">
              <router-link to="/hakkimizda" class="text-white text-decoration-none"
                >Hakkımda</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/etkinlikler" class="text-white text-decoration-none"
                >Eğitimler</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/blog" class="text-white text-decoration-none">Blog</router-link>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 mb-4">
          <h6 class="mb-3">İletişim</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <i class="fas fa-envelope me-2 text-white"></i>
              <span class="text-white">eren@odyolojikulubu.com</span>
            </li>
            <li class="mb-2">
              <i class="fas fa-phone me-2 text-white"></i>
              <span class="text-white">+90 555 123 45 67</span>
            </li>
            <li class="mb-2">
              <i class="fas fa-map-marker-alt me-2 text-white"></i>
              <span class="text-white">İstanbul, Türkiye</span>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 mb-4">
          <h6 class="mb-3">Bülten</h6>
          <p class="text-white mb-3">
            Odyoloji alanındaki güncel gelişmelerden haberdar olmak için bültenimize abone olun.
          </p>
          <div class="input-group">
            <input
              type="email"
              class="form-control"
              placeholder="E-posta adresiniz"
              v-model="email"
            />
            <button class="btn btn-primary" type="button" @click="subscribe">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      <hr class="my-4" />

      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="text-white mb-0">&copy; {{ currentYear }} Eren Olut. Tüm hakları saklıdır.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <span class="text-white">
            <i class="fas fa-heart text-danger"></i>
            ile tasarlandı
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const currentYear = computed(() => new Date().getFullYear())

const subscribe = () => {
  if (email.value) {
    alert('Bülten aboneliği başarılı!')
    email.value = ''
  } else {
    alert('Lütfen geçerli bir e-posta adresi girin.')
  }
}
</script>

<style scoped>
.social-links a {
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--bs-primary) !important;
}

footer a:hover {
  color: white !important;
}
</style>
