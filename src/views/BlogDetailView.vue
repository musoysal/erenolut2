<template>
  <div class="blog-detail-page">
    <section class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="hero-title">{{ post?.title }}</h1>
            <div class="post-meta">
              <span class="badge bg-primary me-2">{{ post?.category }}</span>
              <span class="text-muted me-3">
                <i class="fas fa-calendar-alt me-1"></i>
                {{ formatDate(post?.date) }}
              </span>
              <span class="text-muted me-3">
                <i class="fas fa-user me-1"></i>
                {{ post?.author }}
              </span>
              <span class="text-muted">
                <i class="fas fa-clock me-1"></i>
                {{ post?.readTime }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <img
              :src="post?.image"
              :alt="post?.title"
              class="img-fluid rounded mb-4"
              style="width: 100%; height: 400px; object-fit: cover"
            />

            <div class="post-content">
              <p>{{ post?.content }}</p>

              <div class="post-tags mt-4">
                <span
                  v-for="(tag, index) in post?.tags"
                  :key="index"
                  class="badge bg-light text-dark me-1"
                >
                  #{{ tag }}
                </span>
              </div>

              <div class="author-info mt-5 p-4 bg-light rounded">
                <div class="d-flex align-items-center">
                  <img
                    :src="post?.authorImage"
                    :alt="post?.author"
                    class="rounded-circle me-3"
                    style="width: 80px; height: 80px; object-fit: cover"
                  />
                  <div>
                    <h5 class="mb-1">{{ post?.author }}</h5>
                    <p class="text-muted mb-0">Odyoloji Uzmanı</p>
                  </div>
                </div>
              </div>

              <div class="text-center mt-4">
                <button @click="goBack" class="btn btn-outline-primary">
                  <i class="fas fa-arrow-left me-2"></i>
                  Geri Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const post = ref<any>(null)

// Mock blog posts data (in real app, this would come from API)
const blogPosts = [
  {
    id: 1,
    title: 'İşitme Cihazları Teknolojisindeki Son Gelişmeler',
    content:
      'İşitme cihazı teknolojisi son yıllarda hızla gelişmekte ve bu gelişmeler işitme engelli bireylerin yaşam kalitesini önemli ölçüde artırmaktadır. Yapay zeka destekli işitme cihazları, çevresel sesleri otomatik olarak filtreleyerek kullanıcıya daha net bir ses deneyimi sunmaktadır. Bu teknoloji özellikle gürültülü ortamlarda konuşma anlaşılabilirliğini artırmaktadır. Modern işitme cihazları, kullanıcının yaşam tarzına ve işitme kaybının derecesine göre kişiselleştirilebilir özelliklere sahiptir.',
    author: 'Eren Olut',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-10',
    category: 'Teknoloji',
    readTime: '5 dk',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['işitme cihazı', 'teknoloji', 'yapay zeka'],
  },
  {
    id: 2,
    title: 'Koklear İmplant Sonrası Rehabilitasyon Süreci',
    content:
      'Koklear implant ameliyatı sadece işitme kaybının tedavisi değil, aynı zamanda yeni bir yaşam tarzının başlangıcıdır. Rehabilitasyon süreci, hastanın yeni işitme deneyimine adapte olması için kritik önem taşır. Bu süreçte sabır, düzenli egzersiz ve profesyonel destek büyük rol oynar. Rehabilitasyon programları, hastanın yaşına, işitme kaybının nedenine ve kişisel ihtiyaçlarına göre özelleştirilir.',
    author: 'Prof. Dr. Mehmet Kaya',
    authorImage:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-08',
    category: 'Rehabilitasyon',
    readTime: '7 dk',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['koklear implant', 'rehabilitasyon', 'ameliyat'],
  },
]

onMounted(() => {
  const postId = parseInt(route.params.id as string)
  post.value = blogPosts.find((p) => p.id === postId)

  if (!post.value) {
    router.push('/blog')
  }
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const goBack = () => {
  router.push('/blog')
}
</script>

<style scoped>
.hero-section {
  padding: 5rem 0 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.post-meta {
  font-size: 1rem;
  opacity: 0.9;
}

.section {
  padding: 3rem 0;
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
}

.author-info {
  border-left: 4px solid var(--bs-primary);
}
</style>
