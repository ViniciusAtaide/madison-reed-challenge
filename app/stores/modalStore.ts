import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ImageSchema } from "~/validators/image";

export const useModalStore = defineStore("modal", () => {
  const isOpened = ref(false);
  const images = ref<ImageSchema[]>([]);
  const selectedImage = ref<ImageSchema | null>(null);
  const imageRect = ref<DOMRect | null>(null);
  const route = useRoute();
  const router = useRouter();

  watch([route, images], ([newRoute]) => {
    if (!newRoute.query.imageId || Array.isArray(newRoute.query.imageId))
      return closeModal();

    openModal(newRoute.query.imageId);
  }, { immediate: true });

  function loadImages(imageData: ImageSchema[]) {
    images.value = imageData;
  }

  function openModal(imageId: string, rect: DOMRect | null = null) {
    isOpened.value = true;
    selectedImage.value =
      images.value.find((image) => image.id === imageId) ?? null;

    imageRect.value = rect;
  }

  function closeModal() {
    isOpened.value = false;
    router.push({ query: {} });
    imageRect.value = null;
    selectedImage.value = null;
  }

  return {
    isOpened,
    selectedImage,
    imageRect,
    openModal,
    closeModal,
    images,
    loadImages,
  };
});
