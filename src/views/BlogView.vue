<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title">Blog</h1>
            <p class="hero-subtitle">
              Odyoloji alanındaki güncel gelişmeler, araştırmalar ve uzman görüşleri hakkında
              detaylı yazılarımızı okuyun.
            </p>
          </div>
          <div class="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Blog"
              class="img-fluid rounded"
              style="max-height: 400px; width: 100%; object-fit: cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Post -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">Öne Çıkan Yazı</h2>

        <div class="row">
          <div class="col-lg-8">
            <div class="card featured-post-card">
              <img
                :src="featuredPost.image"
                :alt="featuredPost.title"
                class="card-img-top"
                style="height: 400px; object-fit: cover"
              />
              <div class="card-body">
                <div class="post-meta mb-3">
                  <span :class="`badge bg-${getCategoryColor(featuredPost.category)} me-2`">
                    {{ getCategoryLabel(featuredPost.category) }}
                  </span>
                  <span class="text-muted">
                    <i class="fas fa-calendar-alt me-1"></i>
                    {{ formatDate(featuredPost.date) }}
                  </span>
                  <span class="text-muted ms-3">
                    <i class="fas fa-clock me-1"></i>
                    {{ featuredPost.readTime }}
                  </span>
                </div>

                <h2 class="card-title">{{ featuredPost.title }}</h2>
                <p class="card-text">{{ featuredPost.excerpt }}</p>

                <div class="post-tags mb-3">
                  <span
                    v-for="(tag, index) in featuredPost.tags"
                    :key="index"
                    class="badge bg-light text-dark me-1"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <div class="post-stats mb-3">
                  <span class="me-3">
                    <i class="fas fa-eye me-1"></i>
                    {{ featuredPost.views }} görüntülenme
                  </span>
                  <span class="me-3">
                    <i class="fas fa-heart me-1"></i>
                    {{ featuredPost.likes }} beğeni
                  </span>
                </div>

                <div class="author-info d-flex align-items-center mb-3">
                  <img
                    :src="featuredPost.authorImage"
                    :alt="featuredPost.author"
                    class="rounded-circle me-3"
                    style="width: 50px; height: 50px; object-fit: cover"
                  />
                  <div>
                    <h6 class="mb-0">{{ featuredPost.author }}</h6>
                    <small class="text-muted">Yazar</small>
                  </div>
                </div>

                <button class="btn btn-primary" @click="handleBlogClick(featuredPost.id)">
                  Devamını Oku
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Son Yazılar</h5>
              </div>
              <div class="card-body">
                <div v-for="post in recentPosts" :key="post.id" class="recent-post-item mb-3">
                  <h6 class="recent-post-title">
                    <button
                      class="btn btn-link text-decoration-none p-0 text-start"
                      @click="handleBlogClick(post.id)"
                    >
                      {{ post.title }}
                    </button>
                  </h6>
                  <div class="recent-post-meta">
                    <small class="text-muted">
                      <i class="fas fa-calendar-alt me-1"></i>
                      {{ formatDate(post.date) }}
                    </small>
                    <small class="text-muted ms-2">
                      <i class="fas fa-clock me-1"></i>
                      {{ post.readTime }}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <div class="card-header">
                <h5 class="mb-0">Kategoriler</h5>
              </div>
              <div class="card-body">
                <button
                  v-for="category in categories"
                  :key="category.value"
                  :class="`btn btn-outline-primary btn-sm me-2 mb-2 ${
                    selectedCategory === category.value ? 'active' : ''
                  }`"
                  @click="selectedCategory = category.value"
                >
                  {{ category.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="section bg-light">
      <div class="container">
        <div class="row mb-4">
          <div class="col-lg-6">
            <h2 class="section-title">Tüm Yazılar</h2>
          </div>
          <div class="col-lg-6">
            <div class="search-box">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Yazı ara..."
                  v-model="searchTerm"
                />
                <button class="btn btn-outline-primary" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div v-for="post in filteredPosts" :key="post.id" class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <img
                :src="post.image"
                :alt="post.title"
                class="card-img-top"
                style="height: 250px; object-fit: cover"
              />
              <div class="card-body d-flex flex-column">
                <div class="post-meta mb-2">
                  <span :class="`badge bg-${getCategoryColor(post.category)} me-2`">
                    {{ getCategoryLabel(post.category) }}
                  </span>
                  <span class="text-muted">
                    <i class="fas fa-calendar-alt me-1"></i>
                    {{ formatDate(post.date) }}
                  </span>
                </div>

                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text flex-grow-1">{{ post.excerpt }}</p>

                <div class="post-stats mb-3">
                  <small class="text-muted me-3">
                    <i class="fas fa-eye me-1"></i>
                    {{ post.views }}
                  </small>
                  <small class="text-muted me-3">
                    <i class="fas fa-heart me-1"></i>
                    {{ post.likes }}
                  </small>
                  <small class="text-muted">
                    <i class="fas fa-clock me-1"></i>
                    {{ post.readTime }}
                  </small>
                </div>

                <div class="author-info d-flex align-items-center mb-3">
                  <img
                    :src="post.authorImage"
                    :alt="post.author"
                    class="rounded-circle me-2"
                    style="width: 30px; height: 30px; object-fit: cover"
                  />
                  <small class="text-muted">{{ post.author }}</small>
                </div>

                <button class="btn btn-primary btn-sm w-100" @click="handleBlogClick(post.id)">
                  Devamını Oku
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-5">
          <i class="fas fa-search mb-3" style="font-size: 4rem; color: #ccc"></i>
          <h4>Yazı Bulunamadı</h4>
          <p class="text-muted">Aradığınız kriterlere uygun yazı bulunmamaktadır.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive state
const selectedCategory = ref('all')
const searchTerm = ref('')

// Blog post click handler
const handleBlogClick = (postId: number) => {
  router.push(`/blog/${postId}`)
}

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'İşitme Cihazları Teknolojisindeki Son Gelişmeler',
    excerpt:
      '2024 yılında işitme cihazı teknolojisinde yaşanan önemli gelişmeler ve bu gelişmelerin hastalar üzerindeki etkileri hakkında detaylı bir inceleme.',
    content:
      'İşitme cihazı teknolojisi son yıllarda hızla gelişmekte ve bu gelişmeler işitme engelli bireylerin yaşam kalitesini önemli ölçüde artırmaktadır.',
    author: 'Eren Olut',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-10',
    category: 'teknoloji',
    readTime: '5 dk',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['işitme cihazı', 'teknoloji', 'yapay zeka'],
    views: 245,
    likes: 18,
  },
  {
    id: 2,
    title: 'Koklear İmplant Sonrası Rehabilitasyon Süreci',
    excerpt:
      'Koklear implant ameliyatı sonrası rehabilitasyon sürecinde dikkat edilmesi gereken noktalar ve başarılı sonuçlar için öneriler.',
    content:
      'Koklear implant ameliyatı sadece işitme kaybının tedavisi değil, aynı zamanda yeni bir yaşam tarzının başlangıcıdır.',
    author: 'Prof. Dr. Mehmet Kaya',
    authorImage:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-08',
    category: 'rehabilitasyon',
    readTime: '7 dk',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['koklear implant', 'rehabilitasyon', 'ameliyat'],
    views: 189,
    likes: 12,
  },
  {
    id: 3,
    title: 'Çocuklarda İşitme Kaybı: Erken Teşhis ve Müdahale',
    excerpt:
      'Çocuklarda işitme kaybının erken teşhis edilmesinin önemi ve etkili müdahale yöntemleri hakkında kapsamlı bilgiler.',
    content:
      'Çocuklarda işitme kaybının erken dönemde tespit edilmesi, gelişim açısından kritik öneme sahiptir. Erken müdahale ile çocukların dil ve konuşma becerilerinin gelişimi desteklenebilir.',
    author: 'Eren Olut',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-05',
    category: 'pediatri',
    readTime: '6 dk',
    image: 'https://picsum.photos/800/600?random=1',
    tags: ['çocuk', 'pediatri', 'erken teşhis', 'işitme kaybı'],
    views: 756,
    likes: 89,
  },
]

const categories = [
  { value: 'all', label: 'Tümü' },
  { value: 'teknoloji', label: 'Teknoloji' },
  { value: 'rehabilitasyon', label: 'Rehabilitasyon' },
  { value: 'pediatri', label: 'Pediatri' },
  { value: 'vestibuler', label: 'Vestibüler' },
  { value: 'test', label: 'Test Yöntemleri' },
  { value: 'saglik', label: 'Sağlık' },
]

// Computed properties
const featuredPost = computed(() => blogPosts[0])
const recentPosts = computed(() => blogPosts.slice(1, 4))

const filteredPosts = computed(() => {
  return blogPosts.filter((post) => {
    const categoryMatch =
      selectedCategory.value === 'all' || post.category === selectedCategory.value
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))
    return categoryMatch && searchMatch
  })
})

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const getCategoryLabel = (category: string) => {
  const cat = categories.find((c) => c.value === category)
  return cat ? cat.label : category
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    teknoloji: 'primary',
    rehabilitasyon: 'success',
    pediatri: 'info',
    vestibuler: 'warning',
    test: 'secondary',
    saglik: 'danger',
  }
  return colors[category] || 'light'
}
</script>

<style scoped>
.hero-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
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

.featured-post-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: none;
  transition: transform 0.3s ease;
}

.featured-post-card:hover {
  transform: translateY(-5px);
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

.post-meta .badge {
  font-size: 0.75rem;
}

.recent-post-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.recent-post-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.search-box {
  margin-bottom: 2rem;
}
</style>
