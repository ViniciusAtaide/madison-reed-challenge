<template>
  <button
    class="theme-toggle"
    :aria-label="$t('Toggle between light and dark theme')"
    :title="
      $colorMode.value === 'light'
        ? $t('Switch to dark theme')
        : $t('Switch to light theme')
    "
    @click="toggleTheme"
  >
    <span class="theme-icon">
      {{ $colorMode.value === "light" ? "🌙" : "☀️" }}
    </span>
    <span class="theme-text">
      {{ $colorMode.value === "light" ? $t("Dark") : $t("Light") }}
    </span>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--mr-color-bg-secondary);
  border: 2px solid var(--mr-color-border-primary);
  color: var(--mr-color-text-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 0.875rem;
  min-height: 2.5rem; /* Match language switcher height */
}

.theme-toggle:hover {
  background: var(--mr-color-bg-hover);
  border-color: var(--mr-color-brand-primary);
  transform: translateY(-1px);
  box-shadow: var(--mr-shadow-md);
}

.theme-toggle:focus {
  outline: none;
  box-shadow: var(--mr-shadow-focus);
}

.theme-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .theme-icon {
  transform: scale(1.1);
}

.theme-text {
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .theme-toggle {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .theme-text {
    display: none; /* Hide text on mobile, show only icon */
  }
}
</style>
