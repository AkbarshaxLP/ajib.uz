<template>
  <section class="timeline-section">
    <div class="container">
      <div class="section-header" v-scroll-animate="'fade-up'">
        <p class="eyebrow">Bizning yo'l</p>
        <h2 class="heading">Kompaniya tarixi</h2>
      </div>

      <div class="timeline">
        <div
          v-for="(item, i) in EVENTS"
          :key="i"
          :class="['timeline-item', i % 2 === 0 ? 'left' : 'right']"
          v-scroll-animate="{ animation: i % 2 === 0 ? 'fade-right' : 'fade-left', delay: 80 }"
        >
          <div class="timeline-card">
            <div class="card-year">{{ item.year }}</div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-text">{{ item.text }}</p>
            <div v-if="item.tags" class="card-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="timeline-dot">
            <span v-html="item.icon" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const EVENTS = [
  {
    year: '2023',
    title: "Asos solingan",
    text: "Toshkent shahrida ajib mobile brendi tashkil etildi. Maqsad — foydalanuvchi qulayligi, zamonaviy dizayn va ilg'or texnologiyalarni birlashtirgan sifatli telefonlar ishlab chiqarish.",
    tags: ['Toshkent', "O'zbekiston"],
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  {
    year: 'Noyabr 2023',
    title: "Birinchi mahsulot",
    text: "Birinchi mahsulot — ajib 1010 tugmali telefon bozorga chiqarildi. Sifatli ekran, qulay interfeys va kuchli batareya tufayli tez ommalashdi. Bu brendning bozorda mustahkamlanishida muhim rol o'ynadi.",
    tags: ['ajib 1010'],
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  },
  {
    year: '2024',
    title: "O'sish va rivojlanish",
    text: "Yangi smartfon modellari — ajib X1 va i1 seriyasi, shuningdek ajib Style va ajib Case mahsulotlari taqdim etildi. Marketplace savdolarida top o'rinlarni egalladi va ichki bozorda o'z mavqeini mustahkamladi.",
    tags: ['ajib X1', 'ajib i1', 'ajib Style', 'ajib Case'],
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  },
  {
    year: '2024–2025',
    title: "Kengayish davri",
    text: "ajib i10, i15, i25 series va Premier P50 liniyalari ishga tushirildi. O'zbekiston bo'ylab 13 ta rasmiy servis markazi ochildi. Xalqaro bozorga chiqish yo'nalishida faol qadamlar qo'yildi.",
    tags: ['ajib i25', 'Premier P50', '13 servis markazi'],
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
]
</script>

<style scoped>
.timeline-section { padding: 80px 0; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.section-header { margin-bottom: 72px; }
.eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: #aaa; margin-bottom: 12px;
}
.heading {
  font-size: clamp(28px, 3.5vw, 48px); font-weight: 900;
  letter-spacing: -0.03em; color: #111;
}

/* Timeline */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Centre line */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #e0e0e0 8%, #e0e0e0 92%, transparent);
  transform: translateX(-50%);
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 48px 1fr;
  align-items: start;
  gap: 0;
  padding: 0 0 52px;
}
.timeline-item:last-child { padding-bottom: 0; }

/* Card on left side */
.timeline-item.left  .timeline-card { grid-column: 1; grid-row: 1; text-align: right; padding-right: 40px; }
.timeline-item.left  .timeline-dot  { grid-column: 2; grid-row: 1; }

/* Card on right side */
.timeline-item.right .timeline-card { grid-column: 3; grid-row: 1; padding-left: 40px; }
.timeline-item.right .timeline-dot  { grid-column: 2; grid-row: 1; }

.timeline-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(0,0,0,0.08);
}

.card-year {
  font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #6a00f8; margin-bottom: 10px;
}
.card-title {
  font-size: 20px; font-weight: 800; color: #111;
  letter-spacing: -0.02em; margin-bottom: 10px; line-height: 1.25;
}
.card-text { font-size: 14px; color: #555; line-height: 1.75; margin-bottom: 16px; }

.card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.timeline-item.left .card-tags { justify-content: flex-end; }

.tag {
  font-size: 11px; font-weight: 600; color: #111;
  background: #f2f2f2; border-radius: 50px; padding: 3px 10px;
}

/* Dot */
.timeline-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: #6a00f8;
  color: #fff;
  position: relative;
  z-index: 1;
  margin-top: 28px;
  flex-shrink: 0;
  box-shadow: 0 0 0 6px #ebedec, 0 0 0 8px rgba(106,0,248,0.2);
}

/* Mobile: single column */
@media (max-width: 860px) {
  .timeline::before { left: 24px; }

  .timeline-item {
    grid-template-columns: 48px 1fr;
    padding-bottom: 40px;
  }

  .timeline-item.left  .timeline-card,
  .timeline-item.right .timeline-card {
    grid-column: 2; grid-row: 1;
    text-align: left;
    padding-left: 28px;
    padding-right: 0;
  }
  .timeline-item.left  .timeline-dot,
  .timeline-item.right .timeline-dot {
    grid-column: 1; grid-row: 1;
  }
  .timeline-item.left  .card-tags { justify-content: flex-start; }
  .timeline-dot { margin-top: 28px; width: 40px; height: 40px; }
}

@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .timeline-section { padding: 56px 0; }
  .timeline-card { padding: 20px 18px; border-radius: 14px; }
  .card-title { font-size: 17px; }
  .card-text  { font-size: 13px; }
  .section-header { margin-bottom: 48px; }
}
</style>
