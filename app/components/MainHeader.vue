<template>
  <header class="main-header">
    <div class="header-content">
      <div class="header-left">
        <div class="logo">
          <h1 class="logo-text">{{ $t("Madison Reed") }}</h1>
        </div>
      </div>
      <div class="header-center">
        <p class="header-tagline">{{ $t("Image Gallery Challenge") }}</p>
      </div>
      <div class="header-right">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from "./LanguageSwitcher.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<style scoped>
.main-header {
  background: var(--mr-gradient-primary);
  padding: 1rem 2rem;
  color: var(--mr-color-text-inverse);
  box-shadow: var(--mr-shadow-md);
  transition: all 0.3s ease;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-left {
  flex: 1;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: var(--mr-color-text-inverse);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.08em;
  transition: color 0.3s ease;
}

.header-center {
  flex: 1;
  text-align: center;
}

.header-tagline {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
  color: var(--mr-color-text-inverse);
  transition: color 0.3s ease;
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.header-description {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 1rem;
}

.header-description p {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.85;
}

.cta-button {
  background-color: var(--mr-color-bg-primary);
  color: var(--mr-color-brand-primary);
  border: 2px solid transparent;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--mr-shadow-sm);
  white-space: nowrap;
  font-family: var(--font-secondary);
}

.cta-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--mr-shadow-md);
  background-color: var(--mr-color-bg-hover);
  border-color: var(--mr-color-bg-primary);
}

.cta-button:focus {
  outline: none;
  box-shadow: var(--mr-shadow-focus);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .header-left, 
  .header-center, 
  .header-right {
    flex: none;
  }
  
  .header-right {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
  
  .header-tagline {
    font-size: 1rem;
  }
}
</style>
