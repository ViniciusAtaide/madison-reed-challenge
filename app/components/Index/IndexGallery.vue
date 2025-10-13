<template>
  <div class="gallery-container">
    <h1>{{ $t("Image Gallery") }}</h1>

    <div class="gallery-grid">
      <IndexGalleryItem
        v-for="image in data"
        :key="image.id"
        :image="image"
      />
    </div>

    <AppImageModal />
  </div>
</template>

<script setup lang="ts">
import { ImageDataArraySchema } from "~/validators/image";

const { data } = await useLazyFetch("https://picsum.photos/v2/list?limit=100", {
  key: "gallery-images",
  cache: "force-cache",
  default: () => [],
  transform: async (rawData) => {
    try {
      return ImageDataArraySchema.parseAsync(rawData);
    } catch (validationError) {
      throw createError({
        statusCode: 422,
        statusMessage: "Invalid image data received from API",
        data: validationError,
      });
    }
  },
});
</script>

<style scoped>
.gallery-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.gallery-container h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;
  color: var(--mr-color-text-primary);
  font-family: var(--font-secondary);
}

.gallery-grid {
  column-count: 4;
  column-gap: 1.5rem;
  column-fill: balance;
  padding: 1rem 0;
}

@media (max-width: 991px) {
  .gallery-grid {
    column-count: 2;
    column-gap: 1.25rem;
  }

  .gallery-container {
    padding: 1.5rem;
  }
}

@media (max-width: 767px) {
  .gallery-grid {
    column-count: 1;
    column-gap: 1rem;
  }

  .gallery-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    column-count: 1;
    column-gap: 0;
  }

  .gallery-container {
    padding: 0.75rem;
  }
}
</style>
