<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title">Eren Olut</h1>
            <h2 class="hero-subtitle">Odyoloji Uzmanı</h2>
            <p class="hero-description">
              İşitme sağlığı alanında uzmanlaşmış, modern teknolojileri kullanarak hastalara en iyi
              hizmeti sunmayı hedefleyen bir sağlık profesyoneli.
            </p>
            <div class="hero-buttons">
              <router-link to="/hakkimizda" class="btn btn-primary btn-lg me-3">
                <i class="fas fa-user me-2"></i>
                Hakkımda
              </router-link>
              <router-link to="/iletisim" class="btn btn-outline-light btn-lg">
                <i class="fas fa-envelope me-2"></i>
                İletişim
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Eren Olut"
              class="img-fluid rounded-circle"
              style="max-width: 400px; max-height: 400px; object-fit: cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title">Hizmetlerim</h2>
        <div class="row">
          <div class="col-lg-4 mb-4" v-for="service in services" :key="service.id">
            <div class="card h-100 text-center">
              <div class="card-body">
                <i :class="service.icon" class="service-icon mb-3"></i>
                <h5 class="card-title">{{ service.title }}</h5>
                <p class="card-text">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Blog Posts -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Son Blog Yazıları</h2>
        <div class="row">
          <div class="col-lg-4 mb-4" v-for="post in latestPosts" :key="post.id">
            <div class="card h-100">
              <img
                :src="post.image"
                :alt="post.title"
                class="card-img-top"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.excerpt }}</p>
                <router-link :to="`/blog/${post.id}`" class="btn btn-primary">
                  Devamını Oku
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link to="/blog" class="btn btn-outline-primary btn-lg">
            Tüm Blog Yazıları
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    title: 'İşitme Testleri',
    description: 'Kapsamlı işitme değerlendirmesi ve tanı hizmetleri',
    icon: 'fas fa-stethoscope fa-3x text-primary',
  },
  {
    id: 2,
    title: 'İşitme Cihazı Danışmanlığı',
    description: 'Size en uygun işitme cihazının seçimi ve uyarlanması',
    icon: 'fas fa-assistive-listening-systems fa-3x text-primary',
  },
  {
    id: 3,
    title: 'Rehabilitasyon',
    description: 'İşitme kaybı sonrası rehabilitasyon ve destek hizmetleri',
    icon: 'fas fa-user-md fa-3x text-primary',
  },
])

const latestPosts = ref([
  {
    id: 1,
    title: 'İşitme Cihazları Teknolojisindeki Son Gelişmeler',
    excerpt: '2024 yılında işitme cihazı teknolojisinde yaşanan önemli gelişmeler...',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Koklear İmplant Sonrası Rehabilitasyon Süreci',
    excerpt:
      'Koklear implant ameliyatı sonrası rehabilitasyon sürecinde dikkat edilmesi gereken noktalar...',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Çocuklarda İşitme Kaybı: Erken Teşhis ve Müdahale',
    excerpt: 'Çocuklarda işitme kaybının erken teşhis edilmesinin önemi...',
    image: 'https://picsum.photos/800/600?random=1',
  },
])
</script>

<style scoped>
.hero-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.section {
  padding: 5rem 0;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  color: #333;
}

.service-icon {
  margin-bottom: 1rem;
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
