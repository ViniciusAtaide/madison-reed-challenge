<template>
  <figure class="gallery-item">
    <div
      class="image-container"
      ref="imageRef"
      :style="{ aspectRatio: `${image.width} / ${image.height}` }"
    >
      <NuxtImg
        v-if="shouldLoadImage"
        :src="image.download_url"
        :alt="`Photo by ${image.author}`"
        :width="image.width"
        :height="image.height"
        class="gallery-image"
        loading="lazy"
        placeholder
        format="webp"
        quality="80"
        sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 25vw"
        :style="{ aspectRatio: `${image.width} / ${image.height}` }"
      />
      <div class="image-overlay">
        <div class="overlay-background" />
        <div class="overlay-content">
          <div class="image-actions">
            <button
              class="action-button expand-button"
              :aria-label="$t('Expand')"
              @click="handleExpandClick(image.id)"
            >
              <ExpandIcon class="icon" />
            </button>
          </div>
          <div class="image-info">
            <div class="author-info">
              <span class="author-name">{{ image.author }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </figure>
</template>

<script setup lang="ts">
import ExpandIcon from "~/assets/icons/expand.svg";
import { useModalStore } from "~/stores/modalStore";

import type { ImageSchema } from '~/validators/image';

const { image } = defineProps<{ image: ImageSchema }>();

const modalStore = useModalStore();
const imageRef = ref<HTMLImageElement | null>(null);
const isInViewport = ref(false);
const shouldLoadImage = ref(false);
const router = useRouter();

onMounted(() => {
  if (!imageRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isInViewport.value = entry.isIntersecting;
        if (entry.isIntersecting) {
          shouldLoadImage.value = true;
        }
      });
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 0.1
    }
  );

  observer.observe(imageRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});

const handleExpandClick = (imageId: string) => {
  if (!imageRef.value) return;

  modalStore.openModal(imageId, imageRef.value.getBoundingClientRect());
  router.push({ query: { image: imageId } });
};
</script>

<style scoped>
.gallery-item {
  margin: 0;
  margin-bottom: 1.5rem;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--mr-color-bg-elevated);
  box-shadow: var(--mr-shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  break-inside: avoid;
  display: block;
}

.gallery-item:hover {
  box-shadow: var(--mr-shadow-lg);
}

.image-container {
  position: relative;
  width: 100%;
}

.gallery-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.gallery-item:hover .image-overlay {
  opacity: 1;
  pointer-events: auto;
}

.overlay-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
}

.overlay-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  z-index: 1;
}

.image-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.action-button {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.375rem;
  border: none;
  background: var(--mr-color-bg-elevated);
  color: var(--mr-color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--mr-shadow-sm);
}

.action-button:hover {
  background: var(--mr-color-bg-hover);
  box-shadow: var(--mr-shadow-md);
}

.action-button svg,
.action-button .icon {
  width: 1.125rem;
  height: 1.125rem;
  fill: currentColor;
}

.image-info {
  display: flex;
  align-items: flex-end;
}

.author-info {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: white;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 992px) {
  .gallery-item {
    margin-bottom: 1.25rem;
  }
}

@media (max-width: 768px) {
  .gallery-item {
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .gallery-item {
    margin-bottom: 1rem;
  }

  .image-actions {
    gap: 0.375rem;
  }

  .action-button {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  .action-button svg,
  .action-button .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
