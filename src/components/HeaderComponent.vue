<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/" style="color: var(--bs-primary)">
          <i class="fas fa-user-md me-2"></i>
          Eren Olut
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="fas fa-home me-2"></i>
                Ana Sayfa
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/hakkimizda">
                <i class="fas fa-user me-2"></i>
                Hakkımda
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/egitimler">
                <i class="fas fa-graduation-cap me-2"></i>
                Eğitimler
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cihazlar">
                <i class="fas fa-stethoscope me-2"></i>
                Cihazlar
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/uyelik">
                <i class="fas fa-users me-2"></i>
                Üyelik
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/blog">
                <i class="fas fa-blog me-2"></i>
                Blog
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/duyurular">
                <i class="fas fa-bullhorn me-2"></i>
                Duyurular
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/iletisim">
                <i class="fas fa-envelope me-2"></i>
                İletişim
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
// No reactive data needed for this component
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--bs-primary) !important;
}

.router-link-active {
  color: var(--bs-primary) !important;
}
</style>
