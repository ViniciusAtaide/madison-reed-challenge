<template>
  <div class="home-page">
    <MainHeader />

    <section class="gallery-section">
      <MainGallery />
    </section>
  </div>
</template>


<style scoped>
.gallery-section {
  padding: 3rem 2rem;
  background-color: var(--mr-color-bg-secondary);
  transition: background-color 0.3s ease;
}

.features-container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.features-container h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--mr-color-text-primary);
  transition: color 0.3s ease;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--mr-color-bg-elevated);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: var(--mr-shadow-sm);
  transition: all 0.3s ease;
  border: 1px solid var(--mr-color-border-primary);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--mr-shadow-lg);
}

.feature-card h3 {
  color: var(--mr-color-brand-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.feature-card p {
  color: var(--mr-color-text-body);
  line-height: 1.6;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .features-container h2 {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
