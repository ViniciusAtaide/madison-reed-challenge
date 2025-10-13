import { defineStore } from "pinia";
import { ref } from "vue";
import type { ImageSchema } from "~/validators/image";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const selectedImage = ref<ImageSchema | null>(null);
  const imageRect = ref<DOMRect | null>(null);

  function openModal(image: ImageSchema, rect: DOMRect) {
    selectedImage.value = image;
    imageRect.value = rect;
    isOpen.value = true;
  }

  function closeModal() {
    isOpen.value = false;
    setTimeout(() => {
      imageRect.value = null;
      selectedImage.value = null;
    }, 300);
  }

  return { isOpen, selectedImage, imageRect, openModal, closeModal };
});
