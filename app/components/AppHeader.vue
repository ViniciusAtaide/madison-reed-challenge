<template>
  <header class="main-header">
    <div class="header-content">
      <div class="header-left">
        <div class="logo">
          <h1 class="logo-text">{{ $t("Madison Reed") }}</h1>
        </div>
      </div>
      <div class="header-right">
        <AppThemeToggle />
        <AppLanguageSwitcher />
      </div>
    </div>
  </header>
</template>


<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 1001;
  background: linear-gradient(
    to bottom,
    rgba(74, 144, 164, 0.85) 0%,
    rgba(74, 144, 164, 0.70) 30%,
    rgba(74, 144, 164, 0.45) 60%,
    rgba(74, 144, 164, 0.20) 80%,
    transparent 100%
  );
  backdrop-filter: blur(0.5rem);
  padding: 1rem 4rem;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-left {
  flex: 1;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: white;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.7),
    0 0 10px rgba(74, 144, 164, 0.3);
  letter-spacing: 0.08em;
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

@media (max-width: 768px) {
  .main-header {
    padding: 0.75rem 1rem;
  }
  
  .header-content {
    flex-direction: row;
    text-align: left;
    gap: 1rem;
    justify-content: space-between;
  }
  
  .header-left, 
  .header-center, 
  .header-right {
    flex: none;
  }
  
  .header-left {
    flex-shrink: 0;
  }
  
  .header-right {
    justify-content: flex-end;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
    letter-spacing: 0.04em;
  }
}

@media (max-width: 480px) {
  .main-header {
    padding: 0.5rem 0.75rem;
  }
  
  .header-content {
    gap: 0.75rem;
  }
  
  .header-right {
    gap: 0.375rem;
  }
  
  .logo-text {
    font-size: 1.125rem;
    letter-spacing: 0.02em;
  }
}
</style>
