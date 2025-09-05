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
              <!-- Giriş Paragrafı -->
              <div class="intro-paragraph mb-4">
                <p class="lead">{{ post?.content }}</p>
              </div>

              <!-- Ana İçerik Bölümleri -->
              <div v-if="post?.sections" class="content-sections">
                <div
                  v-for="(section, index) in post?.sections"
                  :key="index"
                  class="content-section mb-5"
                >
                  <h3 class="section-title mb-3">{{ section.title }}</h3>
                  <p class="section-content">{{ section.content }}</p>

                  <!-- Section'da liste varsa göster -->
                  <ul v-if="section.list" class="section-list mt-3">
                    <li v-for="(item, itemIndex) in section.list" :key="itemIndex" class="mb-2">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Sonuç/Özet -->
              <div v-if="post?.conclusion" class="conclusion-section p-4 bg-light rounded mb-4">
                <h4 class="mb-3">
                  <i class="fas fa-lightbulb me-2 text-warning"></i>
                  Sonuç
                </h4>
                <p class="mb-0">{{ post?.conclusion }}</p>
              </div>

              <!-- İstatistikler -->
              <div class="post-stats mb-4">
                <div class="row text-center">
                  <div class="col-md-3 mb-3">
                    <div class="stat-card p-3 border rounded">
                      <i class="fas fa-eye fa-2x text-primary mb-2"></i>
                      <h5 class="mb-0">{{ post?.views || 0 }}</h5>
                      <small class="text-muted">Görüntülenme</small>
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <div class="stat-card p-3 border rounded">
                      <i class="fas fa-heart fa-2x text-danger mb-2"></i>
                      <h5 class="mb-0">{{ post?.likes || 0 }}</h5>
                      <small class="text-muted">Beğeni</small>
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <div class="stat-card p-3 border rounded">
                      <i class="fas fa-share fa-2x text-success mb-2"></i>
                      <h5 class="mb-0">{{ post?.shares || 0 }}</h5>
                      <small class="text-muted">Paylaşım</small>
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <div class="stat-card p-3 border rounded">
                      <i class="fas fa-bookmark fa-2x text-info mb-2"></i>
                      <h5 class="mb-0">{{ post?.bookmarks || 0 }}</h5>
                      <small class="text-muted">Kaydetme</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Etiketler -->
              <div class="post-tags mb-4">
                <h6 class="mb-2">
                  <i class="fas fa-tags me-2"></i>
                  Etiketler:
                </h6>
                <span
                  v-for="(tag, index) in post?.tags"
                  :key="index"
                  class="badge bg-primary me-2 mb-2"
                  style="font-size: 0.9rem; padding: 0.5rem 1rem"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- Sosyal Medya Paylaşım -->
              <div class="social-share mb-5">
                <h6 class="mb-3">
                  <i class="fas fa-share-alt me-2"></i>
                  Bu yazıyı paylaş:
                </h6>
                <div class="d-flex flex-wrap gap-2">
                  <button class="btn btn-outline-primary btn-sm">
                    <i class="fab fa-facebook-f me-1"></i>
                    Facebook
                  </button>
                  <button class="btn btn-outline-info btn-sm">
                    <i class="fab fa-twitter me-1"></i>
                    Twitter
                  </button>
                  <button class="btn btn-outline-success btn-sm">
                    <i class="fab fa-whatsapp me-1"></i>
                    WhatsApp
                  </button>
                  <button class="btn btn-outline-secondary btn-sm">
                    <i class="fas fa-link me-1"></i>
                    Linki Kopyala
                  </button>
                </div>
              </div>

              <!-- Yazar Bilgisi -->
              <div class="author-info p-4 bg-light rounded mb-4">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center mb-3 mb-md-0">
                    <img
                      :src="post?.authorImage"
                      :alt="post?.author"
                      class="rounded-circle"
                      style="width: 100px; height: 100px; object-fit: cover"
                    />
                  </div>
                  <div class="col-md-10">
                    <h5 class="mb-2">{{ post?.author }}</h5>
                    <p class="text-muted mb-2">{{ post?.authorTitle || 'Odyoloji Uzmanı' }}</p>
                    <p class="mb-3">
                      {{
                        post?.authorBio ||
                        'Odyoloji alanında uzmanlaşmış, işitme sağlığı konusunda toplumsal farkındalık yaratmayı hedefleyen bir sağlık profesyoneli.'
                      }}
                    </p>
                    <div class="author-social">
                      <a href="#" class="text-decoration-none me-3">
                        <i class="fab fa-linkedin"></i> LinkedIn
                      </a>
                      <a href="#" class="text-decoration-none me-3">
                        <i class="fab fa-twitter"></i> Twitter
                      </a>
                      <a href="#" class="text-decoration-none">
                        <i class="fas fa-envelope"></i> E-posta
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- İlgili Yazılar -->
              <div class="related-posts mb-5">
                <h4 class="mb-4">
                  <i class="fas fa-newspaper me-2"></i>
                  İlgili Yazılar
                </h4>
                <div class="row">
                  <div
                    v-for="relatedPost in relatedPosts"
                    :key="relatedPost.id"
                    class="col-md-6 mb-3"
                  >
                    <div class="card h-100">
                      <img
                        :src="relatedPost.image"
                        class="card-img-top"
                        style="height: 200px; object-fit: cover"
                        :alt="relatedPost.title"
                      />
                      <div class="card-body">
                        <h6 class="card-title">{{ relatedPost.title }}</h6>
                        <p class="card-text text-muted small">{{ relatedPost.excerpt }}</p>
                        <router-link
                          :to="`/blog/${relatedPost.id}`"
                          class="btn btn-outline-primary btn-sm"
                        >
                          Oku
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigasyon Butonları -->
              <div class="navigation-buttons d-flex justify-content-between">
                <button @click="goBack" class="btn btn-outline-primary">
                  <i class="fas fa-arrow-left me-2"></i>
                  Blog'a Dön
                </button>
                <div>
                  <button class="btn btn-outline-secondary me-2">
                    <i class="fas fa-bookmark me-1"></i>
                    Kaydet
                  </button>
                  <button class="btn btn-primary">
                    <i class="fas fa-heart me-1"></i>
                    Beğen
                  </button>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt?: string
  sections?: Array<{
    title: string
    content: string
    list?: string[]
  }>
  conclusion?: string
  author: string
  authorTitle?: string
  authorBio?: string
  authorImage: string
  date: string
  category: string
  readTime: string
  image: string
  tags: string[]
  views?: number
  likes?: number
  shares?: number
  bookmarks?: number
}

const post = ref<BlogPost | null>(null)
const relatedPosts = computed(() => {
  if (!post.value) return []
  return blogPosts.filter((p) => p.id !== post.value!.id).slice(0, 2)
})

// Mock blog posts data (in real app, this would come from API)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'İşitme Cihazları Teknolojisindeki Son Gelişmeler',
    content:
      'İşitme cihazı teknolojisi son yıllarda hızla gelişmekte ve bu gelişmeler işitme engelli bireylerin yaşam kalitesini önemli ölçüde artırmaktadır.',
    excerpt: '2024 yılında işitme cihazı teknolojisinde yaşanan önemli gelişmeler...',
    sections: [
      {
        title: 'Yapay Zeka Destekli İşitme Cihazları',
        content:
          'Modern işitme cihazları yapay zeka algoritmaları kullanarak çevresel sesleri otomatik olarak analiz eder ve filtreleyerek kullanıcıya daha net bir ses deneyimi sunar. Bu teknoloji özellikle gürültülü ortamlarda konuşma anlaşılabilirliğini önemli ölçüde artırmaktadır.',
      },
      {
        title: 'Kişiselleştirilebilir Özellikler',
        content:
          'Günümüz işitme cihazları kullanıcının yaşam tarzına ve işitme kaybının derecesine göre tamamen kişiselleştirilebilir özelliklere sahiptir.',
        list: [
          'Otomatik ortam tanıma ve ses ayarı',
          'Bluetooth bağlantısı ile müzik ve telefon desteği',
          'Mobil uygulama ile uzaktan kontrol',
          'Pil ömrünü optimize eden enerji tasarrufu modları',
        ],
      },
      {
        title: 'Gelecek Teknolojileri',
        content:
          'Araştırmacılar şu anda daha da gelişmiş özellikler üzerinde çalışmaktadır. Bunlar arasında beyin-bilgisayar arayüzleri, tamamen görünmez cihazlar ve çok daha uzun pil ömrü sunan teknolojiler yer almaktadır.',
      },
    ],
    conclusion:
      'İşitme cihazları teknolojisindeki bu gelişmeler, işitme kaybı yaşayan bireylerin günlük yaşam kalitesini önemli ölçüde artırmaktadır. Gelecekte bu teknolojilerin daha da gelişeceği ve daha fazla insanın bunlardan faydalanabileceği öngörülmektedir.',
    author: 'Eren Olut',
    authorTitle: 'Odyoloji Uzmanı',
    authorBio:
      'İşitme cihazları ve rehabilitasyon konularında 15 yıllık deneyime sahip odyoloji uzmanı. Teknolojik gelişmeleri yakından takip ederek hastalarına en iyi hizmeti sunmaya odaklanmıştır.',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-10',
    category: 'Teknoloji',
    readTime: '8 dk',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['işitme cihazı', 'teknoloji', 'yapay zeka', 'bluetooth'],
    views: 1245,
    likes: 87,
    shares: 23,
    bookmarks: 45,
  },
  {
    id: 2,
    title: 'Koklear İmplant Sonrası Rehabilitasyon Süreci',
    content:
      'Koklear implant ameliyatı sadece işitme kaybının tedavisi değil, aynı zamanda yeni bir yaşam tarzının başlangıcıdır.',
    excerpt:
      'Koklear implant ameliyatı sonrası rehabilitasyon sürecinde dikkat edilmesi gereken noktalar...',
    sections: [
      {
        title: 'Rehabilitasyon Sürecinin Önemi',
        content:
          'Koklear implant sonrası rehabilitasyon süreci, hastanın yeni işitme deneyimine adapte olması için kritik önem taşır. Bu süreçte sabır, düzenli egzersiz ve profesyonel destek büyük rol oynar.',
      },
      {
        title: 'Rehabilitasyon Aşamaları',
        content:
          'Rehabilitasyon programları hastanın yaşına, işitme kaybının nedenine ve kişisel ihtiyaçlarına göre özelleştirilir.',
        list: [
          'İlk aktivasyon ve cihaz ayarları',
          'Ses algılama ve tanıma egzersizleri',
          'Konuşma anlama çalışmaları',
          'Müzik dinleme ve ses kalitesi optimizasyonu',
          'Günlük yaşam aktivitelerine uyum',
        ],
      },
      {
        title: 'Başarı Faktörleri',
        content:
          'Rehabilitasyon sürecinin başarısı hastanın motivasyonu, ailenin desteği ve uzman ekibin rehberliği ile doğrudan ilişkilidir. Düzenli kontroller ve egzersizler en iyi sonuçları elde etmek için gereklidir.',
      },
    ],
    conclusion:
      'Koklear implant sonrası rehabilitasyon süreci doğru yönetildiğinde hastaların işitme performansı önemli ölçüde gelişir ve yaşam kaliteleri artar.',
    author: 'Prof. Dr. Mehmet Kaya',
    authorTitle: 'Kulak Burun Boğaz Uzmanı',
    authorBio:
      "Koklear implant cerrahisi konusunda uzmanlaşmış, 20 yıllık deneyime sahip KBB uzmanı. 500'den fazla başarılı koklear implant ameliyatı gerçekleştirmiştir.",
    authorImage:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-08',
    category: 'Rehabilitasyon',
    readTime: '10 dk',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['koklear implant', 'rehabilitasyon', 'ameliyat', 'egzersiz'],
    views: 892,
    likes: 64,
    shares: 18,
    bookmarks: 32,
  },
  {
    id: 3,
    title: 'Çocuklarda İşitme Kaybı: Erken Teşhis ve Müdahale',
    content:
      'Çocuklarda işitme kaybının erken dönemde tespit edilmesi, gelişim açısından kritik öneme sahiptir.',
    excerpt:
      'Çocuklarda işitme kaybının erken teşhis edilmesinin önemi ve etkili müdahale yöntemleri...',
    sections: [
      {
        title: 'Erken Teşhisin Önemi',
        content:
          'Çocuklarda işitme kaybının erken tespit edilmesi, dil ve konuşma gelişimi açısından hayati önem taşır. İlk 6 ay içinde yapılan müdahaleler en etkili sonuçları verir.',
      },
      {
        title: 'Belirtiler ve Tanı Yöntemleri',
        content: 'Ebeveynlerin dikkat etmesi gereken belirtiler ve modern tanı yöntemleri:',
        list: [
          'Yenidoğan işitme taraması',
          'Odyometrik testler',
          'Timpanometri',
          'Beyin sapı işitsel uyarılmış potansiyeller (BERA)',
          'Otoacoustik emisyon testleri',
        ],
      },
    ],
    conclusion:
      'Erken teşhis ve müdahale ile çocukların normal gelişim süreçlerini tamamlamaları mümkündür.',
    author: 'Eren Olut',
    authorTitle: 'Odyoloji Uzmanı',
    authorBio:
      'Pediatrik odyoloji alanında uzmanlaşmış, çocuk işitme sağlığı konusunda deneyimli odyoloji uzmanı.',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    date: '2024-03-05',
    category: 'Pediatri',
    readTime: '6 dk',
    image: 'https://picsum.photos/800/600?random=1',
    tags: ['çocuk', 'pediatri', 'erken teşhis', 'işitme kaybı'],
    views: 756,
    likes: 89,
    shares: 31,
    bookmarks: 67,
  },
]

onMounted(() => {
  const postId = parseInt(route.params.id as string)
  post.value = blogPosts.find((p) => p.id === postId) || null

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
  background: linear-gradient(45deg, #f8f9fa 0%, #e9ecef 100%);
}

.stat-card {
  transition: all 0.3s ease;
  background: white;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.content-section {
  position: relative;
}

.section-title {
  color: var(--bs-primary);
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background: var(--bs-primary);
}

.section-list {
  padding-left: 1.5rem;
}

.section-list li {
  position: relative;
  color: #555;
}

.section-list li::marker {
  color: var(--bs-primary);
}

.conclusion-section {
  border-left: 4px solid #ffc107;
  background: linear-gradient(45deg, #fffbf0 0%, #fff8e1 100%);
}

.social-share .btn {
  transition: all 0.3s ease;
}

.social-share .btn:hover {
  transform: translateY(-1px);
}

.navigation-buttons {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
}

.related-posts .card {
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.related-posts .card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.6;
  color: #555;
}
</style>
