<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modalStore.isOpened"
        class="modal-overlay"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="modalTitleId"
        @click="modalStore.closeModal"
        @keydown.esc="modalStore.closeModal"
      >
        <div
          ref="modalContentRef"
          :style="imageModalStyle"
          class="modal-content"
          @click.stop
        >
          <div v-if="modalStore.selectedImage" class="image-container">
            <button
              ref="closeBtnRef"
              class="close-button"
              :aria-label="$t('Close this modal')"
              @click="modalStore.closeModal"
            >
              <span aria-hidden="true">×</span>
            </button>

            <img
              :id="modalTitleId"
              :style="imageStyle"
              class="modal-image"
              :src="modalStore.selectedImage?.download_url"
              :alt="
                $t('Photo by {author}', {
                  author: modalStore.selectedImage?.author,
                })
              "
            />

            <div class="image-info">
              <span class="author-label">{{ $t("By") }}</span>
              <span class="author-name">{{
                modalStore.selectedImage?.author
              }}</span>
              <span
                class="image-dimensions"
                :aria-label="$t('Image dimensions')"
              >
                {{ modalStore.selectedImage?.width }}×{{
                  modalStore.selectedImage?.height
                }}
              </span>

              <button
                class="download-button"
                :aria-label="$t('Download')"
                @click="handleDownload"
              >
                <DownloadIcon class="icon" />
              </button>
            </div>
          </div>
          <div v-else class="image-container">
            <AppLoadingSpinner />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import DownloadIcon from "~/assets/icons/download.svg";
import { useModalStore } from "~/stores/modalStore";

import { onMounted, onUnmounted, ref, watch, computed } from "vue";

const closeBtnRef = ref<HTMLButtonElement | null>(null);
const modalStore = useModalStore();
const modalContentRef = ref<HTMLElement | null>(null);
const modalTitleId = ref();
const currentSelectedImage = computed(() => modalStore.selectedImage);
const imageStyle = ref({});

watch(
  () => modalStore.selectedImage,
  (selectedImage) => {
    closeBtnRef.value?.focus();
    modalTitleId.value = `modal-image-${selectedImage?.id}`;
  }
);

const viewPortWidth = ref(window.innerWidth);
const viewPortHeight = ref(window.innerHeight);

onMounted(() => window.addEventListener("resize", onResize, { passive: true }));
onUnmounted(() => window.removeEventListener("resize", onResize));
const timeoutId = ref<number | null>(null);

function onResize() {
  if (timeoutId.value) window.clearTimeout(timeoutId.value);
  timeoutId.value = setTimeout(() => {
    viewPortWidth.value = window.innerWidth;
    viewPortHeight.value = window.innerHeight;
  }, 300);
}

const imageModalStyle = computed(() => {
  if (!modalStore.imageRect) return {};

  const rect = modalStore.imageRect;

  return {
    "--image-x": `${rect.x}px`,
    "--image-y": `${rect.y}px`,
  };
});

watch(
  () => modalStore.isOpened,
  (isOpened) => {
    if (!import.meta.client) return;

    // simple way to avoid scrolling when modal is opened
    document.body.style.overflow = isOpened ? "hidden" : "";
  }
);

watch(
  [viewPortWidth, viewPortHeight, currentSelectedImage],
  ([viewPortWidth, viewPortHeight, selectedImage]) => {
    if (!selectedImage) return;

    const { width: imgW, height: imgH } = selectedImage;
    const aspectRatio = imgW / imgH;

    const maxWidth = viewPortWidth * 0.9; // 90vw
    const maxHeight = viewPortHeight * 0.9; // 90vh

    let newWidth = imgW;
    let newHeight = imgH;

    if (newWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = newWidth / aspectRatio;
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = newHeight * aspectRatio;
    }

    imageStyle.value = {
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      "aspect-ratio": `${aspectRatio}`,
    };
  },
  { immediate: true }
);

const handleDownload = () => {
  if (!modalStore.selectedImage) return;

  const link = document.createElement("a");
  link.href = modalStore.selectedImage.download_url;
  link.download = `photo-by-${modalStore.selectedImage.author
    .replace(/\s+/g, "-")
    .toLowerCase()}.jpg`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.modal-overlay {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(0.25rem);
  display: flex;
  justify-content: center;
  align-items: center;
  overscroll-behavior: contain;
  z-index: 1002;
}
:global(#app.modal-overlay) {
  overflow: hidden;
  height: 100vh;
}

.modal-content {
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  max-height: 90vh;
  background: var(--mr-color-bg-elevated);
  border-radius: 0.75rem;
  box-shadow: var(--mr-shadow-lg);
  transition: 0.3s ease;
  transform-origin: center;
  position: relative;
}

.image-container {
  display: flex;
  align-items: center;
  max-height: inherit;
  max-width: inherit;
  justify-content: center;
  overflow-x: hidden;
  position: relative;
  object-fit: contain;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
}

.image-info {
  position: absolute;
  bottom: 5vh;
  padding: 1rem 1.5rem;
  background: color-mix(in srgb, var(--mr-color-bg-elevated) 50%, transparent);
  border: 0.0625rem solid var(--mr-color-border-primary);
  border-radius: 0.5rem;
  backdrop-filter: blur(0.5em);
  z-index: 2;
  text-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.25);
  box-shadow: var(--mr-shadow-lg), 0 0.5rem 2rem rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  justify-content: space-around;
  font-size: 0.9375rem;
  color: var(--mr-color-text-primary);
}

.image-title {
  font-family: var(--font-secondary);
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  letter-spacing: -0.025em;
  text-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.5);
}

.author-label {
  font-weight: 600;
  color: var(--mr-color-text-muted);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 1;
}

.author-name {
  font-weight: 700;
  color: var(--mr-color-text-primary);
  font-size: 1.125rem;
  text-shadow: 0 0.0625rem 0.375rem rgba(0, 0, 0, 0.5);
}

.image-dimensions {
  padding: 0.5rem 0.875rem;
  background: var(--mr-color-bg-secondary);
  border: 0.0625rem solid var(--mr-color-border-primary);
  border-radius: 0.375rem;
  font-family: var(--font-primary);
  font-weight: 600;
  color: var(--mr-color-text-secondary);
  font-size: 0.8125rem;
  text-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.5rem);
}

.close-button {
  position: absolute;
  top: 1.125rem;
  right: 50%;
  transform: translateX(50%);
  background: var(--mr-color-bg-elevated);
  color: var(--mr-color-text-primary);
  border: 0.0625rem solid var(--mr-color-border-primary);
  border-radius: 50%;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: all 0.2s ease;
  width: 2.75rem;
  height: 2.75rem;
  z-index: 1003;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--mr-shadow-md);
}

.download-button {
  background: var(--mr-color-bg-elevated);
  color: var(--mr-color-text-primary);
  border: 0.0625rem solid var(--mr-color-border-primary);
  border-radius: 50%;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: all 0.2s ease;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--mr-shadow-sm);
}

.close-button:hover,
.download-button:hover {
  background: var(--mr-color-bg-hover);
  border-color: var(--mr-color-border-secondary);
  color: var(--mr-color-text-secondary);
  box-shadow: var(--mr-shadow-lg);
}

.close-button:focus,
.download-button:focus {
  box-shadow: var(--mr-shadow-focus);
}

.modal-enter-from .modal-content {
  transform: translateX(calc(var(--image-x, 50vw) - 50vw))
    translateY(calc(var(--image-y, 50vh) - 50vh)) scale(0.1);
}

.modal-leave-to .modal-content {
  transform: translateX(calc(var(--image-x, 50vw) - 50vw))
    translateY(calc(var(--image-y, 50vh) - 50vh)) scale(0.1);
}

@media (max-width: 768px) {
  .modal-content {
    width: 100vw;
    max-width: 95vw;
    max-height: 90vh;
    margin: 1rem;
  }

  .image-info {
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    min-width: auto;
    max-width: none;
    padding: 1.25rem 1.5rem;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
  }

  .image-container {
    position: initial;
  }

  .author-name {
    font-size: 1rem;
  }

  .modal-enter-to .modal-content,
  .modal-leave-from .modal-content {
    width: 95vw;
    height: 90vh;
  }
}

@media (max-width: 640px) {
  .image-info {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    margin: 0;
  }

  .author-name {
    font-size: 0.9375rem;
  }

  .modal-enter-to .modal-content,
  .modal-leave-from .modal-content {
    width: 100vw;
    height: 100vh;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .modal-content {
    height: 95vh;
    width: 90vw;
  }

  .close-button {
    top: 1rem;
    right: 1rem !important;
  }
  .modal-enter-to .modal-content,
  .modal-leave-from .modal-content {
    height: 95vh;
    width: 90vw;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-content {
    transition: none;
  }

  .modal-enter-active .modal-content,
  .modal-leave-active .modal-content {
    transition: none;
  }

  .close-button {
    transition: none;
  }
}
</style>
