<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title">Hakkımda</h1>
            <p class="hero-subtitle">
              İşitme sağlığı alanında uzmanlaşmış bir sağlık profesyoneli olarak, hastalarıma en iyi
              hizmeti sunmak için çalışıyorum.
            </p>
          </div>
          <div class="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Eren Olut"
              class="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h2>Deneyimim</h2>
            <p>
              Odyoloji alanında 10+ yıllık deneyime sahip, işitme sağlığı konusunda uzmanlaşmış bir
              profesyonelim.
            </p>

            <h3>Eğitim</h3>
            <ul>
              <li>Doktora - Odyoloji, İstanbul Üniversitesi</li>
              <li>Yüksek Lisans - İşitme Sağlığı, Ankara Üniversitesi</li>
              <li>Lisans - Odyoloji, Hacettepe Üniversitesi</li>
            </ul>

            <h3>Uzmanlık Alanları</h3>
            <ul>
              <li>İşitme testleri ve değerlendirme</li>
              <li>İşitme cihazı uyarlaması</li>
              <li>Koklear implant rehabilitasyonu</li>
              <li>Çocuk odyolojisi</li>
            </ul>
          </div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h5>İletişim Bilgileri</h5>
              </div>
              <div class="card-body">
                <p><i class="fas fa-envelope me-2"></i> eren@odyolojikulubu.com</p>
                <p><i class="fas fa-phone me-2"></i> +90 555 123 45 67</p>
                <p><i class="fas fa-map-marker-alt me-2"></i> İstanbul, Türkiye</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No reactive data needed for this component
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
</style>
