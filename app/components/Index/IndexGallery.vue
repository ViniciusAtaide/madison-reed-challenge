<template>
  <div class="gallery-container">
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

.gallery-grid {
  column-count: 4;
  column-gap: 1.5rem;
  column-fill: balance;
  padding: 1rem 0;
}

@media (max-width: 992px) {
  .gallery-grid {
    column-count: 2;
    column-gap: 1.25rem;
  }

  .gallery-container {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
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
