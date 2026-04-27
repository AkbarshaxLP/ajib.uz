<template>
  <section class="centers-section">
    <div class="container">
      <div class="section-header" v-scroll-animate="'fade-up'">
        <p class="eyebrow">13 ta filial</p>
        <h2 class="heading">Rasmiy xizmat ko'rsatish<br />markazlari ro'yxati</h2>
        <p class="sub">Hurmatli haridor! Quyida barcha rasmiy ajib servis markazlari ro'yxati keltirilgan.</p>
      </div>

      <div class="centers-grid">
        <div
          v-for="(center, i) in CENTERS"
          :key="center.city"
          class="center-card"
          v-scroll-animate="{ animation: 'fade-up', delay: (i % 3) * 80 }"
        >
          <div class="card-top">
            <div class="city-badge">{{ center.region }}</div>
            <div class="card-num">{{ String(i + 1).padStart(2, '0') }}</div>
          </div>
          <h3 class="city-name">{{ center.city }}</h3>
          <p class="responsible">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {{ center.name }}
          </p>
          <a :href="`tel:${center.phone.replace(/\s/g, '')}`" class="phone-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.6 4.55 2 2 0 0 1 3.57 2.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.4z"/></svg>
            {{ center.phone }}
          </a>
        </div>
      </div>

      <!-- CTA block -->
      <div class="cta-block" v-scroll-animate="'fade-up'">
        <div class="cta-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.6 4.55 2 2 0 0 1 3.57 2.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.4z"/>
          </svg>
        </div>
        <div class="cta-text">
          <h3>Qo'shimcha savollar bormi?</h3>
          <p>Bosh servis markazi bilan bog'laning</p>
        </div>
        <a href="tel:+998950808881" class="cta-btn">+998 95 080 88 81</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const CENTERS = [
  { city: "Toshkent",   region: "Toshkent shahri", name: "Gafur",     phone: "+998 95 080 88 81" },
  { city: "Sirdaryo",   region: "Sirdaryo viloyati", name: "Nodir",    phone: "+998 91 500 99 92" },
  { city: "Nukus",      region: "Qoraqalpog'iston", name: "Dilmurod",  phone: "+998 97 968 98 00" },
  { city: "Samarqand",  region: "Samarqand viloyati", name: "Jaxongir",phone: "+998 88 394 83 33" },
  { city: "Xorazm",     region: "Xorazm viloyati",  name: "Feruzbek", phone: "+998 91 437 27 77" },
  { city: "Navoiy",     region: "Navoiy viloyati",  name: "Mansurjon",phone: "+998 94 488 44 48" },
  { city: "Namangan",   region: "Namangan viloyati", name: "Jobirxon", phone: "+998 93 676 54 00" },
  { city: "Andijon",    region: "Andijon viloyati",  name: "Azizbek",  phone: "+998 90 211 97 76" },
  { city: "Jizzax",     region: "Jizzax viloyati",   name: "Jasur",    phone: "+998 93 301 13 13" },
  { city: "Qarshi",     region: "Qashqadaryo viloyati", name: "Baxodir",phone: "+998 97 747 45 32" },
  { city: "Buxoro",     region: "Buxoro viloyati",   name: "Azamat",   phone: "+998 90 612 36 66" },
  { city: "Farg'ona",   region: "Farg'ona viloyati", name: "Nazirjon", phone: "+998 91 325 46 11" },
]
</script>

<style scoped>
.centers-section { padding: 0 0 80px; background: #ebedec; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 32px; }

.section-header { margin-bottom: 52px; }
.eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: #aaa; margin-bottom: 12px;
}
.heading {
  font-size: clamp(26px, 3.5vw, 46px); font-weight: 900;
  letter-spacing: -0.03em; color: #111; line-height: 1.15; margin-bottom: 16px;
}
.sub { font-size: 15px; color: #666; max-width: 540px; line-height: 1.6; }

/* Grid */
.centers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

.center-card {
  background: #fff;
  border-radius: 20px;
  padding: 28px 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.center-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.city-badge {
  font-size: 11px;
  font-weight: 600;
  color: #6a00f8;
  background: #f0ebff;
  border-radius: 50px;
  padding: 4px 10px;
  letter-spacing: 0.02em;
}

.card-num {
  font-size: 13px;
  font-weight: 700;
  color: #ddd;
  letter-spacing: 0.05em;
}

.city-name {
  font-size: 22px;
  font-weight: 800;
  color: #111;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.responsible {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #888;
  font-weight: 500;
}
.responsible svg { flex-shrink: 0; opacity: 0.6; }

.phone-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 15px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
  margin-top: 4px;
  transition: color 0.15s;
}
.phone-link:hover { color: #6a00f8; }
.phone-link svg { flex-shrink: 0; }

/* CTA */
.cta-block {
  background: #111;
  border-radius: 20px;
  padding: 32px 36px;
  display: flex;
  align-items: center;
  gap: 24px;
  color: #fff;
}
.cta-icon {
  width: 56px; height: 56px;
  border-radius: 14px;
  background: rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #fff;
}
.cta-text { flex: 1; }
.cta-text h3 { font-size: 17px; font-weight: 700; margin-bottom: 4px; }
.cta-text p  { font-size: 13px; color: rgba(255,255,255,0.45); }
.cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  border-radius: 50px;
  background: #6a00f8;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.18s;
  flex-shrink: 0;
}
.cta-btn:hover { background: #5800d4; }

@media (max-width: 1024px) {
  .centers-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .centers-section { padding: 0 0 56px; }
  .section-header { margin-bottom: 36px; }
  .cta-block { flex-wrap: wrap; gap: 16px; padding: 24px; }
  .cta-btn { width: 100%; justify-content: center; }
}
@media (max-width: 600px) {
  .centers-grid { grid-template-columns: 1fr; gap: 12px; }
  .center-card { padding: 22px 18px; }
  .city-name { font-size: 20px; }
}
@media (max-width: 480px) {
  .container { padding: 0 16px; }
  .heading { font-size: 24px; }
  .cta-block { padding: 20px 16px; border-radius: 16px; }
  .cta-icon { display: none; }
}
</style>
