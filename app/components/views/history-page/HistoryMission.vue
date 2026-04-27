<template>
  <section class="mission-section">
    <div class="container">
      <div class="section-header" v-scroll-animate="'fade-up'">
        <p class="eyebrow">Kelajak</p>
        <h2 class="heading">Kelajak maqsadlari</h2>
      </div>

      <div class="goals-grid">
        <div
          v-for="(goal, i) in GOALS"
          :key="i"
          class="goal-card"
          v-scroll-animate="{ animation: 'fade-up', delay: i * 70 }"
        >
          <div class="goal-icon" v-html="goal.icon" />
          <h3 class="goal-title">{{ goal.title }}</h3>
          <p class="goal-text">{{ goal.text }}</p>
        </div>
      </div>

      <!-- Bottom banner -->
      <div class="status-banner" v-scroll-animate="'fade-up'">
        <div class="banner-left">
          <p class="banner-label">Bugungi kunda</p>
          <h3 class="banner-title">O'zbekiston bo'ylab kengayib bormoqda</h3>
          <p class="banner-sub">
            ajib mobile O'zbekiston bozorida ulushini kengaytirib, global bozorga chiqish
            yo'lida sifat, dizayn va innovatsiya orqali raqobatchilardan farqlanadi.
          </p>
        </div>
        <div class="banner-pills">
          <span v-for="p in PILLS" :key="p" class="pill">{{ p }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const GOALS = [
  {
    title: "Global bozorga chiqish",
    text: "Xalqaro bozorda ajib mobile brendini kengaytirish va yangi mamlakatlar bozorlariga kirish.",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
  {
    title: "Arzon narxda sifat",
    text: "Har bir foydalanuvchi eng so'nggi texnologiyalarga qulay narxda ega bo'lishi uchun sifat-narx nisbatini saqlash.",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  },
  {
    title: "Ekologik mahsulotlar",
    text: "Atrof-muhitga zarar yetkazmaydigan, energiya tejamkor va barqaror materiallardan foydalanib ishlab chiqarish.",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  },
  {
    title: "Jamiyatga ijobiy ta'sir",
    text: "Faqat foydalanuvchilarga emas, balki jamiyat va atrof-muhitga ham ijobiy ta'sir ko'rsatish.",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
]

const PILLS = [
  "O'sib borayotgan bozor ulushi",
  "Global kengayish",
  "Sifat va innovatsiya",
  "Qulay narx",
  "Ekologik yondashuv",
]
</script>

<style scoped>
.mission-section { padding: 0 0 80px; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.section-header { margin-bottom: 52px; }
.eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: #aaa; margin-bottom: 12px;
}
.heading {
  font-size: clamp(26px, 3.5vw, 46px); font-weight: 900;
  letter-spacing: -0.03em; color: #111;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.goal-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.goal-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(0,0,0,0.08);
}

.goal-icon {
  width: 48px; height: 48px;
  background: #f0ebff;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: #6a00f8;
  flex-shrink: 0;
}
.goal-title { font-size: 16px; font-weight: 700; color: #111; line-height: 1.3; }
.goal-text  { font-size: 13.5px; color: #666; line-height: 1.7; }

/* Status banner */
.status-banner {
  background: #fff;
  border-radius: 24px;
  padding: 40px 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.banner-label {
  font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: #6a00f8; margin-bottom: 10px;
}
.banner-title {
  font-size: clamp(18px, 2.2vw, 26px); font-weight: 800;
  letter-spacing: -0.02em; color: #111; margin-bottom: 12px;
}
.banner-sub { font-size: 14px; color: #666; line-height: 1.7; max-width: 520px; }

.banner-pills {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}
.pill {
  font-size: 13px; font-weight: 600;
  background: #f4f4f4; color: #333;
  border-radius: 50px; padding: 8px 16px;
  white-space: nowrap;
}

@media (max-width: 1100px) {
  .goals-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .mission-section { padding: 0 0 56px; }
  .status-banner { flex-direction: column; align-items: flex-start; padding: 28px 24px; gap: 24px; }
  .banner-pills { flex-direction: row; flex-wrap: wrap; }
}
@media (max-width: 600px) {
  .goals-grid { grid-template-columns: 1fr; gap: 12px; }
  .goal-card { padding: 22px 18px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .status-banner { padding: 20px 16px; border-radius: 16px; }
  .heading { font-size: 24px; }
}
</style>
