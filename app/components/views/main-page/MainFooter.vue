<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div v-for="col in FOOTER_COLS" :key="col.brand" class="footer-col">
          <p class="footer-col-title">{{ col.brand }}</p>
          <a v-for="link in col.links" :key="link" href="#" class="footer-link">{{ link }}</a>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Bog'lanish</p>
          <a href="tel:+998951288884" class="footer-phone">+998 95 128 88 84</a>
          <p class="footer-label">Servis markazi:</p>
          <a href="tel:+998950808881" class="footer-phone" style="margin-bottom: 16px;">+998 95 080 88 81</a>
          <div class="social-links">
            <a v-for="s in ['T','I','Y']" :key="s" href="#" class="social-btn">{{ s }}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 ajib.uz — Barcha Huquqlar Himoyalngan.</p>
        <a href="#">Maxfiylik siyosati</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const FOOTER_COLS = [
  { brand: 'ajib mobile', links: ['Smartfonlar', 'Tugmali telefonlar', 'Hamkorlik uchun'] },
  { brand: 'Corn mobile', links: ['Tarix', 'Servis markazlari', "Qo'shimcha kontaktlar", 'Blog'] },
  { brand: 'Kompaniya haqida', links: ['Tarix', 'Servis markazlari', "Qo'shimcha kontaktlar", 'Blog'] },
]
</script>

<style scoped>
.container { max-width: 1600px; margin: 0 auto; padding: 0 24px; }

.site-footer { background: #0a0a0a; color: #fff; padding: 60px 24px 30px; border-top: 1px solid #1a1a1a; }

.footer-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 40px; margin-bottom: 48px;
}
.footer-col-title { font-weight: 700; font-size: 15px; margin-bottom: 16px; opacity: 0.9; }
.footer-link {
  display: block; font-size: 13px; opacity: 0.45; margin-bottom: 10px;
  text-decoration: none; color: inherit; transition: opacity 0.15s;
}
.footer-link:hover { opacity: 0.85; }
.footer-phone { display: block; font-size: 13px; opacity: 0.65; margin-bottom: 6px; text-decoration: none; color: inherit; }
.footer-label { font-size: 12px; opacity: 0.35; margin-bottom: 4px; }
.social-links { display: flex; gap: 10px; }
.social-btn {
  width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; opacity: 0.6; color: #fff; text-decoration: none; transition: opacity 0.15s;
}
.social-btn:hover { opacity: 1; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.07); padding-top: 24px;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
}
.footer-bottom p, .footer-bottom a { font-size: 12px; opacity: 0.3; color: #fff; text-decoration: none; }

@media (max-width: 768px) {
  .site-footer { padding: 40px 20px 24px; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 32px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 6px; }
}

@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; gap: 24px; }
}
</style>
