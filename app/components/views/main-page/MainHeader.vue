<template>
  <header :class="['site-header', { scrolled }]">
    <div class="container header-inner">
      <!-- Logo -->
      <a href="/" class="logo-link">
        <img
          v-if="!logoFailed"
          src="https://ajib.uz/wp-content/uploads/2024/09/logo-ajib-new.png"
          alt="Ajib"
          class="logo-img"
          @error="logoFailed = true"
        />
        <span v-else class="logo-text">ajib</span>
      </a>

      <!-- Desktop nav -->
      <nav class="main-nav">
        <div
          v-for="item in NAV_ITEMS"
          :key="item.label"
          class="nav-item"
          @mouseenter="openMenu = item.label"
          @mouseleave="openMenu = null"
        >
          <a :href="item.href" :class="['nav-link', { active: openMenu === item.label }]">
            {{ item.label }}
            <svg v-if="item.children" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <polyline points="2,4 6,8 10,4"/>
            </svg>
          </a>
          <div v-if="item.children && openMenu === item.label" class="dropdown">
            <a v-for="child in item.children" :key="child.label" :href="child.href" class="dropdown-item">
              {{ child.label }}
            </a>
          </div>
        </div>
      </nav>

      <!-- Desktop search -->
      <div ref="searchWrapEl" class="search-wrap">
        <input
          type="text"
          placeholder="Qidirish..."
          v-model="searchVal"
          :class="['search-input', { focused: searchFocused, expanded: searchFocused || !!searchVal }]"
          :style="{
            borderRadius: showDropdown ? '20px 20px 0 0' : '50px',
            borderBottom: showDropdown ? '1.5px solid #f0f0f0' : undefined,
          }"
          @focus="searchFocused = true"
        />
        <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <Transition name="dropdown">
        <div v-if="showDropdown" class="search-dropdown">
          <template v-if="searchResults.length > 0">
            <a
              v-for="p in searchResults"
              :key="p.id"
              href="#"
              class="search-result-item"
              @click.prevent="selectResult(p.name)"
            >
              <img :src="p.img" :alt="p.name" class="result-img" @error="(e: Event) => ((e.target as HTMLElement).style.display = 'none')" />
              <div>
                <p class="result-name">{{ p.name }}</p>
                <p class="result-price">{{ p.price }}</p>
              </div>
            </a>
          </template>
          <div v-else class="no-results">Hech narsa topilmadi</div>
        </div>
        </Transition>
      </div>

      <!-- Hamburger -->
      <button class="hamburger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-menu">
        <!-- Mobile search -->
        <div class="mobile-search-wrap">
          <div class="mobile-search-field">
            <input
              type="text"
              placeholder="Qidirish..."
              v-model="searchVal"
              class="mobile-search-input"
              @focus="searchFocused = true"
            />
            <svg class="mobile-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <Transition name="dropdown">
          <div v-if="showDropdown" class="mobile-search-dropdown">
            <template v-if="searchResults.length > 0">
              <a
                v-for="p in searchResults"
                :key="p.id"
                href="#"
                class="search-result-item"
                @click.prevent="selectResult(p.name); mobileOpen = false"
              >
                <img :src="p.img" :alt="p.name" class="result-img" @error="(e: Event) => ((e.target as HTMLElement).style.display = 'none')" />
                <div>
                  <p class="result-name">{{ p.name }}</p>
                  <p class="result-price">{{ p.price }}</p>
                </div>
              </a>
            </template>
            <div v-else class="no-results">Hech narsa topilmadi</div>
          </div>
          </Transition>
        </div>

        <!-- Mobile nav -->
        <nav class="mobile-nav">
          <div v-for="item in NAV_ITEMS" :key="item.label" class="mobile-nav-item">
            <button
              class="mobile-nav-link"
              @click="mobileOpenMenu = mobileOpenMenu === item.label ? null : item.label"
            >
              {{ item.label }}
              <svg v-if="item.children" width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                :style="{ transform: mobileOpenMenu === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }">
                <polyline points="2,4 6,8 10,4"/>
              </svg>
            </button>
            <div v-if="item.children" class="accordion-wrap" :class="{ open: mobileOpenMenu === item.label }">
              <nav class="mobile-dropdown">
                <a v-for="child in item.children" :key="child.label" :href="child.href" class="mobile-dropdown-item" @click="mobileOpen = false">
                  {{ child.label }}
                </a>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

type NavChild = { label: string; href: string }
type NavItem = { label: string; href: string; children?: NavChild[] }

const { data: categoriesData } = useApiService().Dictionary.CategoryController_findAll()
const { data: phonesData } = useApiService().Phone.PhoneController_findAll()

const categories = computed<any[]>(() => (categoriesData.value as any[] | null) ?? [])
const phones = computed<any[]>(() => (phonesData.value as any[] | null) ?? [])

const NAV_ITEMS = computed<NavItem[]>(() => {
  const items: NavItem[] = categories.value.map((cat) => {
    const children: NavChild[] = phones.value
      .filter((p) => (p.category?.id ?? p.category_id) === cat.id)
      .map((p) => ({
        label: p.model_name ?? '',
        href: `/products/${p.id}`,
      }))
    const item: NavItem = { label: cat.name, href: `/category/${cat.id}` }
    if (children.length) item.children = children
    return item
  })
  items.push({ label: 'Hamkorlik uchun', href: '#' })
  return items
})

const scrolled = ref(false)
const openMenu = ref<string | null>(null)
const logoFailed = ref(false)
const mobileOpen = ref(false)
const mobileOpenMenu = ref<string | null>(null)

const searchWrapEl = ref<HTMLElement | null>(null)
const searchFocused = ref(false)
const searchVal = ref('')

const searchResults = computed(() => {
  const q = searchVal.value.trim().toLowerCase()
  if (!q) return []
  return phones.value
    .filter((p) => (p.model_name ?? '').toLowerCase().includes(q))
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      name: p.model_name ?? '',
      price: p.price ? `${p.price} So'm` : '',
      img: p.hero?.photo ?? p.characteristics?.photos?.[0] ?? '',
    }))
})
const showDropdown = computed(() => searchFocused.value && searchVal.value.trim().length > 0)
const selectResult = (name: string) => { searchVal.value = name; searchFocused.value = false }

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })

  const onClickOutside = (e: MouseEvent) => {
    if (searchWrapEl.value && !searchWrapEl.value.contains(e.target as Node)) {
      searchFocused.value = false
    }
  }
  document.addEventListener('mousedown', onClickOutside)

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('mousedown', onClickOutside)
  })
})
</script>

<style scoped>
.container { max-width: 1600px; margin: 0 auto; padding: 0 24px; }

.site-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: #fff; box-shadow: 0 1px 0 #e5e5e5;
  transition: box-shadow 0.3s ease, background 0.3s ease;
}
.site-header.scrolled {
  background: rgba(255,255,255,0.98);
  box-shadow: 0 2px 20px rgba(0,0,0,0.08);
  backdrop-filter: blur(10px);
}
.header-inner { display: flex; align-items: center; gap: 32px; height: 70px; }

.logo-link { display: flex; align-items: center; flex-shrink: 0; text-decoration: none; }
.logo-img { height: 36px; object-fit: contain; }
.logo-text { font-size: 22px; font-weight: 900; letter-spacing: -0.04em; color: #0a0a0a; }

/* ─── Desktop nav ─── */
.main-nav { display: flex; align-items: center; gap: 4px; flex: 1; }
.nav-item { position: relative; }
.nav-link {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 16px; font-size: 14px; font-weight: 500; color: #333;
  border-radius: 8px; text-decoration: none; transition: all 0.15s; white-space: nowrap;
}
.nav-link:hover, .nav-link.active { color: #000; background: #f5f5f5; }
.dropdown {
  position: absolute; top: 100%; left: 0; min-width: 200px;
  background: #fff; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  border: 1px solid #f0f0f0; padding: 8px 0; overflow: hidden; z-index: 100;
}
.dropdown-item {
  display: block; padding: 9px 18px; font-size: 13.5px; color: #333;
  text-decoration: none; transition: background 0.12s;
}
.dropdown-item:hover { background: #f8f8f8; }

/* ─── Desktop search ─── */
.search-wrap { position: relative; flex-shrink: 0; }
.search-input {
  width: 160px; padding: 9px 16px 9px 38px;
  border: 1.5px solid #e0e0e0; background: #f6f6f6;
  font-size: 13.5px; outline: none; font-family: inherit;
  transition: width 0.25s ease, border-color 0.15s; color: #111;
}
.search-input.focused, .search-input.expanded { width: 240px; border-color: #111; background: #fff; }
.search-icon {
  position: absolute; left: 12px; top: 50%;
  transform: translateY(-50%); opacity: 0.4; pointer-events: none;
}
.search-dropdown {
  position: absolute; top: 100%; left: 0; right: 0;
  background: #fff; border: 1.5px solid #111; border-top: none;
  border-radius: 0 0 16px 16px; overflow: hidden;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12); z-index: 2000;
}

/* ─── Shared search result styles ─── */
.search-result-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; border-bottom: 1px solid #f5f5f5;
  text-decoration: none; color: inherit; transition: background 0.12s;
}
.search-result-item:hover { background: #f9f9f9; }
.result-img { width: 40px; height: 40px; object-fit: contain; border-radius: 8px; background: #f2f2f2; flex-shrink: 0; }
.result-name { font-size: 13px; font-weight: 600; color: #111; }
.result-price { font-size: 12px; color: #666; margin-top: 2px; }
.no-results { padding: 16px 14px; font-size: 13px; color: #aaa; text-align: center; }

/* ─── Dropdown animation ─── */
.dropdown-enter-active { animation: dropdown-in 0.18s ease-out forwards; }
.dropdown-leave-active { animation: dropdown-in 0.14s ease-in reverse forwards; }
@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─── Hamburger ─── */
.hamburger {
  display: none; flex-direction: column; justify-content: center;
  gap: 5px; width: 36px; height: 36px; padding: 6px;
  background: none; border: none; cursor: pointer; margin-left: auto; flex-shrink: 0;
}
.hamburger span {
  display: block; width: 100%; height: 2px; background: #111;
  border-radius: 2px; transition: all 0.25s ease; transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ─── Mobile menu ─── */
.mobile-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 16px 20px 24px;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.mobile-menu-enter-active { animation: menu-slide 0.25s ease forwards; }
.mobile-menu-leave-active  { animation: menu-slide 0.2s ease reverse forwards; }

@keyframes menu-slide {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.mobile-search-wrap { margin-bottom: 20px; }
.mobile-search-field { position: relative; }
.mobile-search-input {
  width: 100%; padding: 11px 16px 11px 40px;
  border: 1.5px solid #e0e0e0; border-radius: 50px;
  background: #f6f6f6; font-size: 14px; outline: none; font-family: inherit; color: #111;
}
.mobile-search-input:focus { border-color: #111; background: #fff; }
.mobile-search-icon {
  position: absolute; left: 14px; top: 50%;
  transform: translateY(-50%); opacity: 0.4; pointer-events: none;
}
.mobile-search-dropdown {
  margin-top: 6px; background: #fff; border: 1.5px solid #111;
  border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.mobile-nav { display: flex; flex-direction: column; }
.mobile-nav-item { border-bottom: 1px solid #f4f4f4; }
.mobile-nav-link {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 14px 4px; font-size: 15px; font-weight: 600; color: #111;
  background: none; border: none; cursor: pointer; font-family: inherit; text-align: left;
}
.accordion-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.22s ease-in;
}
.accordion-wrap.open {
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.28s ease-out;
}
.accordion-wrap > .mobile-dropdown { overflow: hidden; min-height: 0; }
.mobile-dropdown-item {
  display: block; padding: 8px 8px; font-size: 14px; color: #555;
  text-decoration: none; transition: color 0.12s;
}
.mobile-dropdown-item:hover { color: #111; }

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .main-nav { display: none; }
  .search-wrap { display: none; }
  .hamburger { display: flex; }
  .header-inner { gap: 16px; }
}
</style>
