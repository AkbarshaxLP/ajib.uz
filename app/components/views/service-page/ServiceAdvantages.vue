<template>
  <section class="advantages-section">
    <div class="container">
      <div class="section-header" v-scroll-animate="'fade-up'">
        <p class="eyebrow">Nima uchun biz?</p>
        <h2 class="heading">ajib xizmat ko'rsatish<br />markazlarining afzalliklari</h2>
      </div>

      <div class="cards-grid">
        <div
          v-for="(item, i) in ADVANTAGES"
          :key="i"
          class="adv-card"
          v-scroll-animate="{ animation: 'fade-up', delay: i * 80 }"
        >
          <div class="adv-icon">
            <span v-html="item.icon" />
          </div>
          <h3 class="adv-title">{{ item.title }}</h3>
          <p class="adv-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const ADVANTAGES = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: "Kafolat va kafolatsiz ta'mirlash",
    text: "Barcha ajib qurilmalariga 1 yillik rasmiy kafolat beriladi. Kafolat va kafolatsiz ta'mirlash xizmatlarini adolatli narxlarda taqdim etamiz.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    title: "13 ta rasmiy markaz",
    text: "O'zbekiston bo'ylab 13 ta rasmiy xizmat markazimiz mavjud. Qulay joylashuv va ish vaqti bilan xizmatdan foydalanish oson.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    title: "Tezkor va sifatli xizmat",
    text: "Faqat original ehtiyot qismlardan foydalangan holda yuqori sifatli va tezkor xizmatni taklif etamiz.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    title: "Professional ustalar",
    text: "Smartfonlar va yirik qurilmalarni ta'mirlash bo'yicha professional ustalarimiz har qanday muammoni hal etadi.",
  },
]
</script>

<style scoped>
.advantages-section { padding: 80px 0; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.section-header { margin-bottom: 52px; }
.eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: #aaa; margin-bottom: 12px;
}
.heading {
  font-size: clamp(26px, 3.5vw, 46px); font-weight: 900;
  letter-spacing: -0.03em; color: #111; line-height: 1.15;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.adv-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px 28px;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.adv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
}

.adv-icon {
  width: 52px; height: 52px;
  background: #f0ebff;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: #6a00f8;
  margin-bottom: 20px;
}

.adv-title {
  font-size: 16px; font-weight: 700; color: #111;
  margin-bottom: 10px; line-height: 1.3;
}
.adv-text { font-size: 13.5px; color: #666; line-height: 1.7; }

@media (max-width: 1024px) {
  .cards-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .advantages-section { padding: 56px 0; }
  .section-header { margin-bottom: 36px; }
}
@media (max-width: 600px) {
  .cards-grid { grid-template-columns: 1fr; gap: 12px; }
  .adv-card { padding: 24px 20px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .heading { font-size: 24px; }
}
</style>
