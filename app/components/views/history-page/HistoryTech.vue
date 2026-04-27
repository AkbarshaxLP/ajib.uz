<template>
  <section class="tech-section">
    <div class="container">
      <div class="inner">
        <div class="text-col" v-scroll-animate="'fade-right'">
          <p class="eyebrow">Innovatsiya</p>
          <h2 class="heading">Innovatsion<br />texnologiyalar</h2>
          <p class="body-text">
            ajib mobile doimiy texnologik o'zgarishlarga moslashib, foydalanuvchilar uchun
            eng ilg'or yechimlarni taqdim etadi. Sun'iy intellekt, katta ma'lumotlar tahlili
            va IoT texnologiyalaridan foydalanib, qurilmalarimizni kelajak uchun tayyorlaymiz.
          </p>
          <p class="mission-text">
            "Bizning maqsadimiz nafaqat iste'molchilarimizga yangiliklarni taklif qilish,
            balki jamiyat va atrof-muhitga ham ijobiy ta'sir ko'rsatishdir."
          </p>
        </div>

        <div class="tech-grid" v-scroll-animate="{ animation: 'fade-left', delay: 100 }">
          <div
            v-for="tech in TECHS"
            :key="tech.label"
            class="tech-card"
          >
            <div class="tech-icon" v-html="tech.icon" />
            <p class="tech-label">{{ tech.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const TECHS = [
  {
    label: "Sun'iy intellekt",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/></svg>`,
  },
  {
    label: "Big Data",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  },
  {
    label: "IoT",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4"/><path d="M17.7 6.3a8 8 0 0 1 0 11.4"/><path d="M3.1 3.1a13 13 0 0 0 0 17.8"/><path d="M20.9 3.1a13 13 0 0 1 0 17.8"/></svg>`,
  },
  {
    label: "Kamera texnologiyasi",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  },
  {
    label: "Tezkor quvvatlash",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  },
  {
    label: "Kuchli himoya",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
]
</script>

<style scoped>
.tech-section { padding: 0 0 80px; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  background: #111;
  border-radius: 28px;
  padding: 64px 56px;
  color: #fff;
}

.text-col { display: flex; flex-direction: column; gap: 0; }

.eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(255,255,255,0.35);
  margin-bottom: 14px;
}
.heading {
  font-size: clamp(26px, 3vw, 42px); font-weight: 900;
  letter-spacing: -0.035em; line-height: 1.12;
  color: #fff; margin-bottom: 24px;
}
.body-text {
  font-size: 14px; line-height: 1.8;
  color: rgba(255,255,255,0.5); margin-bottom: 24px;
}
.mission-text {
  font-size: 15px; font-style: italic; line-height: 1.75;
  color: rgba(255,255,255,0.7);
  border-left: 3px solid #6a00f8;
  padding-left: 18px;
}

/* Tech grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tech-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  cursor: default;
}
.tech-card:hover {
  background: rgba(106,0,248,0.18);
  border-color: rgba(106,0,248,0.4);
  transform: translateY(-2px);
}

.tech-icon { color: #a855f7; display: flex; }
.tech-label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); line-height: 1.3; }

@media (max-width: 900px) {
  .inner { grid-template-columns: 1fr; gap: 40px; padding: 40px 32px; }
  .tech-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .tech-grid { grid-template-columns: repeat(2, 1fr); }
  .inner { padding: 32px 20px; border-radius: 20px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .tech-section { padding: 0 0 56px; }
}
</style>
