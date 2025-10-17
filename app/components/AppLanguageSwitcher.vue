<template>
  <div class="language-switcher">
    <button
      class="language-button"
      :aria-label="`${locale}`"
      :value="locale"
      @click="switchToNextLanguage"
    >
      <span class="flag">{{ flagMap[locale] }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

const flagMap = {
  en: "🇺🇸",
  "pt-br": "🇧🇷",
};

const nextFlag = (locale: string) =>
  Object.keys(flagMap).find((key) => key !== locale) as "en" | "pt-br";

const switchToNextLanguage = async () =>
  setLocale(nextFlag(locale.value) ?? "en");

watch(locale, (newLocale) => {
  router.push(localePath({ name: "index" }, nextFlag(newLocale)));
});
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.language-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 0.375rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.language-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--mr-shadow-md);
}

.language-button:focus {
  outline: none;
  box-shadow: var(--mr-shadow-focus);
  border-color: var(--mr-color-brand-primary);
}

.language-button:active {
  transform: translateY(0);
}

.flag {
  font-size: 1.25rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

.language-button:hover .flag {
  transform: scale(1.1);
}

.language-button:active .flag {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .language-button {
    width: 2.25rem;
    height: 2.25rem;
  }

  .flag {
    font-size: 1.1rem;
  }
}
</style>
