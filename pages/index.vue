<template>
  <div class="home-page">
    hero
  </div>
</template>

<script setup>
// Component name for ESLint
defineOptions({
  name: 'HomePage'
})

// Set page meta
useHead({
  title: 'Madison Reed - Premium Hair Color',
  meta: [
    { name: 'description', content: 'Professional hair color and care products for beautiful, healthy hair.' }
  ]
})
</script>

<style scoped>
.home-page {
  width: 100%;
}

.hero-section {
  background: linear-gradient(135deg, #d63384 0%, #f8f9fa 100%);
  padding: 4rem 2rem;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background-color: white;
  color: #d63384;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.features-section {
  padding: 4rem 2rem;
  background-color: #f8f9fa;
}

.features-container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.features-container h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-card h3 {
  color: #d63384;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .features-container h2 {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>