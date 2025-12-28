<script setup>
import { ref } from 'vue'

// 定義 emit 用於登入成功事件
const emit = defineEmits(['login-success'])

// 表單資料
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

// 表單提交處理
const handleLogin = () => {
  errorMessage.value = ''

  // 驗證欄位
  if (!username.value.trim()) {
    errorMessage.value = '請輸入帳號'
    return
  }

  if (!password.value.trim()) {
    errorMessage.value = '請輸入密碼'
    return
  }

  // 簡單驗證（未來可接 API）
  if (username.value === 'admin' && password.value === 'password') {
    // 處理記住我功能
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
      localStorage.setItem('username', username.value)
    }

    // 觸發登入成功事件
    emit('login-success', { username: username.value })
  } else {
    errorMessage.value = '帳號或密碼錯誤'
  }
}

// 切換密碼顯示狀態
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 flex items-center justify-center overflow-hidden">
    <!-- 下雪效果 -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="i in 40"
        :key="i"
        class="snowflake"
        :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${10 + Math.random() * 10}s`,
          fontSize: `${10 + Math.random() * 10}px`,
        }"
      >
        ❄
      </div>
    </div>

    <!-- 登入卡片 -->
    <div class="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-11/12 sm:max-w-md border border-white/20">
      <h1 class="text-3xl font-bold text-white text-center mb-8">登入</h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- 帳號輸入框 -->
        <div>
          <label for="username" class="block text-white text-sm font-medium mb-2">帳號</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="請輸入帳號"
          />
        </div>

        <!-- 密碼輸入框 -->
        <div>
          <label for="password" class="block text-white text-sm font-medium mb-2">密碼</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
              placeholder="請輸入密碼"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
            >
              <span v-if="showPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>
        </div>

        <!-- 記住我 -->
        <div class="flex items-center">
          <input
            id="remember"
            v-model="rememberMe"
            type="checkbox"
            class="w-4 h-4 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-2 focus:ring-blue-400"
          />
          <label for="remember" class="ml-2 text-white text-sm">記住我</label>
        </div>

        <!-- 錯誤訊息 -->
        <div v-if="errorMessage" class="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <!-- 登入按鈕 -->
        <button
          type="submit"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
        >
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.snowflake {
  position: absolute;
  top: -10px;
  color: white;
  opacity: 0.8;
  user-select: none;
  animation: fall linear infinite;
  will-change: transform;
}

@keyframes fall {
  to {
    transform: translateY(100vh);
  }
}

/* 尊重使用者的動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .snowflake {
    animation: none;
  }
}
</style>
