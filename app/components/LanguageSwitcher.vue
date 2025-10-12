<template>
  <div class="language-switcher">
    <select id="lang-switch" v-model="locale">
      <option v-for="availableLocale in locales" :key="availableLocale.code" :value="availableLocale.code">
        {{ availableLocale.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
</script>

<style scoped>
.language-switcher select {
  padding: 0.5rem 2.5rem 0.5rem 1rem; /* Add more padding-right for dropdown arrow */
  border: 2px solid var(--mr-color-brand-primary);
  border-radius: 0.375rem;
  background: var(--mr-color-bg-primary);
  color: var(--mr-color-brand-primary);
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-secondary);
  box-shadow: var(--mr-shadow-sm);
  transition: all 0.2s ease;
  font-size: 0.875rem; /* Match theme toggle font size */
  appearance: none; /* Remove default styling */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d63384' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  min-height: 2.5rem; /* Ensure consistent height */
}

.language-switcher select:hover {
  background-color: var(--mr-color-bg-hover);
  border-color: var(--mr-color-brand-hover);
  box-shadow: var(--mr-shadow-md);
}

.language-switcher select:focus {
  outline: none;
  box-shadow: var(--mr-shadow-focus);
  border-color: var(--mr-color-brand-primary);
}

@media (max-width: 768px) {
  .language-switcher select {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>
