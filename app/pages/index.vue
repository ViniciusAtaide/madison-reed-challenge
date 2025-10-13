<template>
  <div class="home-page">
    <AppHeader />

    <section class="gallery-section">
      <h1 class="page-title">{{ $t("Image Gallery") }}</h1>
      
      <NuxtErrorBoundary>
        <Suspense>
          <IndexGallery />
          <template #fallback>
            <AppLoadingSpinner />
          </template>
        </Suspense>
        <template #error="{ error, clearError }">
          <AppErrorBoundary 
            :error="error" 
            :on-retry="clearError"
            :title="$t('Gallery Error')"
            :message="$t('We encountered an error while loading the gallery.')"
          />
        </template>
      </NuxtErrorBoundary>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Madison Reed - Beautiful Image Gallery',
  description: 'Discover a stunning collection of high-quality images in our responsive gallery. Browse through 100 beautiful photos with smooth loading and modern design.',
  
  // Open Graph / Facebook / WhatsApp
  ogTitle: 'Madison Reed - Beautiful Image Gallery',
  ogDescription: 'Discover a stunning collection of high-quality images in our responsive gallery. Browse through 100 beautiful photos with smooth loading and modern design.',
  ogType: 'website',
  ogUrl: 'https://viniciusataide.github.io/',
  ogImage: 'https://viniciusataide.github.io/whatsapp.svg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Madison Reed Image Gallery - Beautiful collection of photos',
  ogSiteName: 'Madison Reed',
  ogLocale: 'en_US',
  
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Madison Reed - Beautiful Image Gallery',
  twitterDescription: 'Discover a stunning collection of high-quality images in our responsive gallery.',
  twitterImage: 'https://viniciusataide.github.io/og-image.svg',
  twitterImageAlt: 'Madison Reed Image Gallery - Beautiful collection of photos',
  
  // WhatsApp uses Open Graph properties
  // articleAuthor: ['Madison Reed'], // Commented out due to type issues
  
  // General SEO
  keywords: 'image gallery, photos, responsive design, modern UI, Madison Reed, photography, visual portfolio'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { property: 'og:image:type', content: 'image/svg+xml' },
    { property: 'og:image:secure_url', content: 'https://viniciusataide.github.io/whatsapp.svg' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'robots', content: 'index, follow' },
  ]
})
</script>

<style scoped>
.page-title {
  text-align: center;
  margin: 0 0 2rem 0;
  padding-top: 2rem;
  color: var(--mr-color-text-primary);
  font-family: var(--font-secondary);
}

.gallery-section {
  padding: 0 2rem 3rem 2rem;
  background-color: var(--mr-color-bg-secondary);
  transition: background-color 0.3s ease;
}
</style>
