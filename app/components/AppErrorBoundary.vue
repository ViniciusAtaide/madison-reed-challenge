<template>
  <div class="error-state">
    <div class="error-content">
      <div class="error-icon">
        <ErrorIcon width="48" height="48" />
      </div>

      <h2 class="error-title">{{ title ?? $t("Something went wrong") }}</h2>
      <p class="error-message">
        {{
          message ?? $t("We encountered an error while loading the content.")
        }}
      </p>

      <details v-if="showDetails && error" class="error-details">
        <summary class="error-summary">{{ $t("Technical details") }}</summary>
        <pre class="error-code">{{ error }}</pre>
      </details>

      <div class="error-actions">
        <button
          v-if="showRefresh"
          class="refresh-button"
          @click="handleRefresh"
        >
          {{ $t("Refresh page") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import SVG icon as component
import ErrorIcon from "~/assets/icons/error.svg";

defineProps({
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  error: {
    type: [String, Error, Object],
    default: null,
  },
  showDetails: {
    type: Boolean,
    default: true,
  },
  showRefresh: {
    type: Boolean,
    default: true,
  },
});

function handleRefresh() {
  window.location.reload();
}
</script>

<style scoped>
.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 600px;
  background: var(--mr-color-bg-elevated);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: var(--mr-shadow-lg);
  border: 1px solid var(--mr-color-border-primary);
}

.error-icon {
  color: var(--mr-color-error);
  margin-bottom: 1.5rem;
}

.error-title {
  color: var(--mr-color-text-primary);
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.error-message {
  color: var(--mr-color-text-body);
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.error-details {
  text-align: left;
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--mr-color-bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--mr-color-border-primary);
}

.error-summary {
  cursor: pointer;
  font-weight: 500;
  color: var(--mr-color-text-primary);
  margin-bottom: 0.5rem;
}

.error-code {
  background: var(--mr-color-bg-elevated);
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
  color: var(--mr-color-text-body);
  margin: 0.5rem 0 0 0;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.refresh-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}


.refresh-button {
  background: var(--mr-color-bg-secondary);
  color: var(--mr-color-text-primary);
  border: 1px solid var(--mr-color-border-primary);
}

.refresh-button:hover {
  background: var(--mr-color-bg-elevated);
  transform: translateY(-1px);
}

.refresh-button:focus {
  outline: 2px solid var(--mr-color-brand-primary);
  outline-offset: 2px;
}
</style>
