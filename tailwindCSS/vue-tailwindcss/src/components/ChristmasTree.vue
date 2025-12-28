<script setup>
// 定義 emit 用於登出事件
const emit = defineEmits(['logout'])

// 登出處理函式
const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="christmas-container">
    <!-- 登出按鈕 -->
    <button
      @click="handleLogout"
      class="logout-button"
      aria-label="登出"
    >
      登出
    </button>

    <!-- 夜晚背景 -->
    <div class="night-sky"></div>

    <!-- 下雪效果 -->
    <div class="snowflakes" aria-hidden="true">
      <div
        v-for="n in 50"
        :key="n"
        class="snowflake"
        :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${10 + Math.random() * 10}s`,
          fontSize: `${10 + Math.random() * 10}px`
        }"
      >
        ❅
      </div>
    </div>

    <!-- 聖誕樹 -->
    <div class="tree-wrapper">
      <!-- 星星 -->
      <div class="star">⭐</div>

      <!-- 樹的三角形層次 -->
      <div class="tree-section">
        <!-- 第一層（最小） -->
        <div class="tree-layer layer-small">
          <div class="lights">
            <span class="light red">●</span>
            <span class="light yellow">●</span>
            <span class="light blue">●</span>
          </div>
        </div>

        <!-- 第二層 -->
        <div class="tree-layer layer-medium">
          <div class="lights">
            <span class="light yellow">●</span>
            <span class="light green">●</span>
            <span class="light red">●</span>
            <span class="light blue">●</span>
            <span class="light pink">●</span>
          </div>
        </div>

        <!-- 第三層（最大） -->
        <div class="tree-layer layer-large">
          <div class="lights">
            <span class="light blue">●</span>
            <span class="light red">●</span>
            <span class="light yellow">●</span>
            <span class="light green">●</span>
            <span class="light pink">●</span>
            <span class="light blue">●</span>
            <span class="light red">●</span>
          </div>
        </div>
      </div>

      <!-- 樹幹 -->
      <div class="trunk"></div>

      <!-- 禮物 -->
      <div class="gifts">
        <div class="gift">🎁</div>
        <div class="gift">🎁</div>
        <div class="gift">🎁</div>
      </div>
    </div>

    <!-- 祝福文字 -->
    <div class="message">
      <h1>🎄 聖誕快樂 🎄</h1>
      <p>Merry Christmas!</p>
    </div>
  </div>
</template>

<style scoped>
.christmas-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.night-sky {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0a1929 0%, #1a237e 50%, #283593 100%);
  z-index: 1;
}

/* 下雪效果 */
.snowflakes {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 110%;
  pointer-events: none;
  z-index: 2;
}

.snowflake {
  position: absolute;
  top: -10%;
  color: white;
  opacity: 0.8;
  user-select: none;
  animation: fall linear infinite;
  will-change: transform;
}

@keyframes fall {
  to {
    transform: translateY(110vh);
    opacity: 0.3;
  }
}

/* 聖誕樹 */
.tree-wrapper {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -20px;
}

.star {
  font-size: 4rem;
  animation: twinkle 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 10px gold);
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.tree-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -30px;
}

.tree-layer {
  position: relative;
  background: linear-gradient(to bottom, #2d5016, #1a3d0a);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.layer-small {
  width: 150px;
  height: 120px;
}

.layer-medium {
  width: 250px;
  height: 180px;
}

.layer-large {
  width: 350px;
  height: 240px;
}

.lights {
  position: absolute;
  width: 90%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}

.light {
  font-size: 1.2rem;
  animation: blink 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 5px currentColor);
}

.light.red {
  color: #ff4444;
  animation-delay: 0s;
}

.light.yellow {
  color: #ffeb3b;
  animation-delay: 0.3s;
}

.light.blue {
  color: #2196f3;
  animation-delay: 0.6s;
}

.light.green {
  color: #4caf50;
  animation-delay: 0.9s;
}

.light.pink {
  color: #ff69b4;
  animation-delay: 1.2s;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}

.trunk {
  width: 80px;
  height: 100px;
  background: linear-gradient(to bottom, #5d4037, #3e2723);
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.gifts {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.gift {
  font-size: 3rem;
  animation: bounce 2s ease-in-out infinite;
}

.gift:nth-child(1) {
  animation-delay: 0s;
}

.gift:nth-child(2) {
  animation-delay: 0.3s;
}

.gift:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.message {
  position: relative;
  z-index: 3;
  margin-top: 4rem;
  text-align: center;
  color: white;
}

.message h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  animation: colorChange 3s ease-in-out infinite;
}

.message p {
  font-size: 1.5rem;
}

@keyframes colorChange {
  0%, 100% {
    color: #ffffff;
  }
  33% {
    color: #ffeb3b;
  }
  66% {
    color: #ff4444;
  }
}

/* 登出按鈕樣式 */
.logout-button {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.logout-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 響應式設計 */
@media (max-width: 640px) {
  .logout-button {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}

/* 尊重使用者的動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .snowflake,
  .star,
  .light,
  .gift,
  .message h1 {
    animation: none;
  }
}
</style>
