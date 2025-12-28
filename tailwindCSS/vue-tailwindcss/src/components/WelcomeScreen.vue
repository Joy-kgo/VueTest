<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  }
})

const show = ref(true)

onMounted(() => {
  // 3秒後隱藏
  setTimeout(() => {
    show.value = false
  }, 3000)
})
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="welcome-overlay">
      <div class="welcome-content">
        <h1 class="welcome-title">歡迎登入！</h1>
        <p class="welcome-subtitle">{{ username }}</p>
        <div class="welcome-icon">🎄</div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.welcome-content {
  text-align: center;
  color: white;
  animation: slideUp 0.6s ease-out;
}

.welcome-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.welcome-icon {
  font-size: 5rem;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
