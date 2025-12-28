<script setup>
import { ref } from 'vue'
import LoginPage from './components/LoginPage.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import ChristmasTree from './components/ChristmasTree.vue'

const isLoggedIn = ref(false)
const showWelcome = ref(false)
const username = ref('')

const handleLoginSuccess = (data) => {
  username.value = data.username
  showWelcome.value = true

  // 3秒後隱藏歡迎畫面並顯示聖誕樹
  setTimeout(() => {
    showWelcome.value = false
    isLoggedIn.value = true
  }, 3000)
}

// 登出處理函式
const handleLogout = () => {
  // 重置所有狀態
  isLoggedIn.value = false
  showWelcome.value = false
  username.value = ''

  // 清除 localStorage
  localStorage.removeItem('rememberMe')
  localStorage.removeItem('username')
}
</script>

<template>
  <div>
    <!-- 登入頁面 -->
    <LoginPage v-if="!isLoggedIn && !showWelcome" @login-success="handleLoginSuccess" />

    <!-- 歡迎畫面 -->
    <WelcomeScreen v-if="showWelcome" :username="username" />

    <!-- 聖誕樹頁面 -->
    <ChristmasTree v-if="isLoggedIn && !showWelcome" @logout="handleLogout" />
  </div>
</template>

<style scoped>
/* 移除原有的 logo 樣式（不再需要） */
</style>
