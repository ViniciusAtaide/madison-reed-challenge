<template>
      <div class="loading-content">
        <div class="spinner" />
        <p>{{ $t("Loading images...") }}</p>
      </div>

</template>

<style scoped>
.loading-content,
.error-content {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--mr-color-border-primary);
  border-top: 4px solid var(--mr-color-brand-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem auto;
}
</style>