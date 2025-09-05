<template>
  <div class="news-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Duyurular</h1>
        <p class="hero-subtitle">
          Odyoloji alanındaki güncel haberler, duyurular ve önemli gelişmeler.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4" v-for="news in newsList" :key="news.id">
            <div class="card h-100">
              <img
                :src="news.image"
                :alt="news.title"
                class="card-img-top"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body">
                <span class="badge bg-warning mb-2">{{ news.date }}</span>
                <h5 class="card-title">{{ news.title }}</h5>
                <p class="card-text">{{ news.description }}</p>
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

const newsList = ref([
  {
    id: 1,
    title: 'Yeni İşitme Merkezi Açılıyor',
    description:
      "İstanbul'da yeni bir işitme merkezi hizmete girmeye hazırlanıyor. Modern teknolojilerle donatılmış merkez...",
    date: '10 Mart 2024',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Ücretsiz İşitme Taraması Kampanyası',
    description:
      'Mart ayı boyunca düzenlenen ücretsiz işitme taraması kampanyası başladı. Katılım için...',
    date: '5 Mart 2024',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Odyoloji Kongresi 2024',
    description:
      'Bu yıl düzenlenen ulusal odyoloji kongresi için kayıtlar başladı. Kongrede son teknolojiler...',
    date: '1 Mart 2024',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
])
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
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>
