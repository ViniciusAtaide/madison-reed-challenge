<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="switchLanguage">
      <option value="en">English</option>
      <option value="pt-br">Português (Brasil)</option>
    </select>
  </div>
</template>

<script setup>
const route = useRoute()

// Detect current locale from route
const getCurrentLocale = () => {
  const path = route.path
  if (path.startsWith('/pt-br')) {
    return 'pt-br'
  }
  return 'en' // Default to English for root path
}

// Make selector reactive to route changes
const currentLocale = ref(getCurrentLocale())

// Watch route changes to update selector
watch(() => route.path, () => {
  currentLocale.value = getCurrentLocale()
})

function switchLanguage(event) {
  const newLocale = event.target.value
  currentLocale.value = newLocale
  
  // Use client-side navigation instead of page reload
  if (newLocale === 'en') {
    navigateTo('/')  // Default locale has no prefix
  } else {
    navigateTo(`/${newLocale}`)  // Other locales have prefix
  }
}
</script>

<style scoped>
.language-switcher {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
}

.language-switcher select {
  padding: 0.5rem 1rem;
  border: 2px solid var(--mr-color-brand-primary);
  border-radius: 0.5rem;
  background: var(--mr-color-bg-primary);
  color: var(--mr-color-brand-primary);
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-secondary);
  box-shadow: var(--mr-shadow-sm);
  transition: all 0.2s ease;
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
  .language-switcher {
    top: 1rem;
    right: 1rem;
  }
  
  .language-switcher select {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>