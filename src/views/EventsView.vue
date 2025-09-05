<template>
  <div class="events-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Etkinlikler</h1>
        <p class="hero-subtitle">
          Odyoloji alanındaki güncel gelişmeleri takip etmek ve bilgi paylaşımında bulunmak için
          düzenlediğim etkinliklere katılın.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4" v-for="event in events" :key="event.id">
            <div class="card h-100">
              <img
                :src="event.image"
                :alt="event.title"
                class="card-img-top"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body">
                <span class="badge bg-primary mb-2">{{ event.date }}</span>
                <h5 class="card-title">{{ event.title }}</h5>
                <p class="card-text">{{ event.description }}</p>
                <p class="text-muted">
                  <i class="fas fa-map-marker-alt me-1"></i>
                  {{ event.location }}
                </p>
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

const events = ref([
  {
    id: 1,
    title: 'İşitme Sağlığı Semineri',
    description:
      'İşitme sağlığının korunması ve işitme kaybının önlenmesi konularında bilgilendirme semineri.',
    date: '15 Mart 2024',
    location: 'İstanbul Üniversitesi',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: "Çocuk Odyolojisi Workshop'u",
    description: "Çocuklarda işitme testi uygulamaları ve erken müdahale yöntemleri workshop'u.",
    date: '22 Mart 2024',
    location: 'Ankara Hastanesi',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'İşitme Cihazları Teknolojileri Paneli',
    description: 'Son teknoloji işitme cihazları ve yapay zeka uygulamaları hakkında panel.',
    date: '5 Nisan 2024',
    location: 'İzmir Kongre Merkezi',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
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
  max-width: 800px;
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
