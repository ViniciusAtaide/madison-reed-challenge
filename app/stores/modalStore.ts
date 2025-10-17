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
    if (!newRoute.query.image || Array.isArray(newRoute.query.image))
      return closeModal();

    openModal(newRoute.query.image);
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
    // remove the `image` param from the current query without mutating the store state
    const newQuery = { ...route.query };
    if (newQuery.image) delete newQuery.image;
    router.push({ query: newQuery });

    isOpened.value = false;

    setTimeout(() => {
      imageRect.value = null;
      selectedImage.value = null;
    }, 300);
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
