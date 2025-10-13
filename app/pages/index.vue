<template>
  <div class="home-page">
    <AppHeader />

    <section class="gallery-section">
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
  ogTitle: 'Madison Reed - Beautiful Image Gallery',
  ogDescription: 'Discover a stunning collection of high-quality images in our responsive gallery. Browse through 100 beautiful photos with smooth loading and modern design.',
  ogType: 'website',
  ogUrl: 'https://madison-reed-gallery.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Madison Reed - Beautiful Image Gallery',
  twitterDescription: 'Discover a stunning collection of high-quality images in our responsive gallery.',
  keywords: 'image gallery, photos, responsive design, modern UI, Madison Reed, photography'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
})
</script>


<style scoped>
.gallery-section {
  padding: 0 2rem 3rem 2rem;
  background-color: var(--mr-color-bg-secondary);
  transition: background-color 0.3s ease;
}
</style>
