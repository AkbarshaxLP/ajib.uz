<template>
  <section class="newsletter-section">
    <div class="newsletter-logo">
      <img
        src="https://ajib.uz/wp-content/uploads/2024/09/logo-ajib-new-white.png"
        alt="Ajib"
        class="newsletter-logo-img"
        @error="(e: Event) => ((e.target as HTMLElement).style.display = 'none')"
      />
    </div>
    <h2 class="newsletter-title">Maxsus mijozlar klubiga qo'shilmoqchimis?</h2>
    <p class="newsletter-sub">Ajoyib chegirmalar va yangiliklar bilan doimiy tanishib borasiz!</p>
    <form v-if="!sent" @submit.prevent="submit" class="newsletter-form">
      <input
        v-model="email"
        type="email"
        placeholder="Email manzilingiz"
        required
        class="newsletter-input"
      />
      <button type="submit" class="newsletter-btn">Yuborish</button>
    </form>
    <div v-else class="newsletter-success">✓ Muvaffaqiyatli yuborildi!</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const sent = ref(false)
const submit = () => { if (email.value) sent.value = true }
</script>

<style scoped>
.newsletter-section { padding: 80px 24px; background: #0a0a0a; color: #fff; text-align: center; }
.newsletter-logo { display: flex; justify-content: center; margin-bottom: 28px; }
.newsletter-logo-img { height: 36px; object-fit: contain; }
.newsletter-title { font-size: clamp(24px, 3vw, 36px); font-weight: 700; margin-bottom: 12px; letter-spacing: -0.02em; }
.newsletter-sub { font-size: 16px; opacity: 0.55; margin: 0 auto 36px; max-width: 480px; }
.newsletter-form { display: flex; gap: 10px; max-width: 420px; margin: 0 auto; flex-wrap: wrap; }
.newsletter-input {
  flex: 1; min-width: 200px; padding: 13px 18px; border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.08);
  color: #fff; font-size: 14px; outline: none; font-family: inherit;
}
.newsletter-input::placeholder { color: rgba(255,255,255,0.4); }
.newsletter-btn {
  padding: 13px 28px; border-radius: 50px; background: #fff; color: #111;
  font-size: 14px; font-weight: 600; border: none; cursor: pointer;
  font-family: inherit; transition: opacity 0.15s;
}
.newsletter-btn:hover { opacity: 0.85; }
.newsletter-success { font-size: 16px; font-weight: 600; color: #7ef7a0; }

@media (max-width: 768px) {
  .newsletter-section { padding: 52px 20px; }
  .newsletter-title { font-size: 22px; }
  .newsletter-sub { font-size: 14px; }
  .newsletter-form { flex-direction: column; }
  .newsletter-input { min-width: unset; }
  .newsletter-btn { width: 100%; }
}
</style>
