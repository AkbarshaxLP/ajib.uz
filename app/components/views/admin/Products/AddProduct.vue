<template>
  <div class="min-h-screen flex flex-col">

    <!-- Sticky action header -->
    <div class="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-border/60 shadow-sm">
      <div class="flex items-center justify-between px-6 h-14">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/admin/products"
            class="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Icon name="lucide:arrow-left" size="16" />
          </NuxtLink>
          <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground">Продукты</span>
            <Icon name="lucide:chevron-right" size="14" class="text-muted-foreground/50" />
            <span class="text-sm font-medium">{{ isEdit ? 'Изменить продукт' : 'Новый продукт' }}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="fillTestData"
            class="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium border border-dashed border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
          >
            <Icon name="lucide:flask-conical" size="14" />
            Тест
          </button>
          <NuxtLink
            to="/admin/products"
            class="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium border border-input bg-background hover:bg-muted transition-colors"
          >
            Отмена
          </NuxtLink>
          <button
            type="button"
            :disabled="isPending"
            @click="onSubmit"
            class="inline-flex items-center gap-2 justify-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon v-if="isPending" name="lucide:loader-2" size="14" class="animate-spin" />
            <Icon v-else name="lucide:check" size="14" />
            {{ isPending ? (isEdit ? 'Сохранение...' : 'Создание...') : (isEdit ? 'Сохранить' : 'Создать продукт') }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-1">
      <!-- Left nav -->
      <aside class="w-56 shrink-0 border-r border-border/60 bg-white">
        <nav class="sticky top-14 p-4 space-y-0.5">
          <p class="text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-widest px-2 mb-3">Разделы</p>
          <a
            v-for="(section, i) in sections"
            :key="section.id"
            :href="`#${section.id}`"
            :class="[
              'flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors group',
              activeSection === section.id
                ? 'bg-primary/8 text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            ]"
          >
            <span
              :class="[
                'flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 transition-colors',
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground group-hover:bg-muted-foreground/20'
              ]"
            >{{ i + 1 }}</span>
            {{ section.label }}
          </a>
        </nav>
      </aside>

      <!-- Form -->
      <main class="flex-1 overflow-y-auto">
        <form @submit.prevent="onSubmit" class="px-8 py-8 space-y-8 mx-auto">

          <!-- Loading overlay for edit fetch -->
          <Transition name="fade">
            <div v-if="loadingProduct" class="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-4">
              <Icon name="lucide:loader-2" size="16" class="animate-spin text-muted-foreground shrink-0" />
              <p class="text-sm text-muted-foreground">Загрузка данных продукта...</p>
            </div>
          </Transition>

          <!-- Error banner -->
          <Transition name="fade">
            <div v-if="displayError" class="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
              <Icon name="lucide:circle-alert" size="16" class="text-destructive mt-0.5 shrink-0" />
              <p class="text-sm text-destructive">{{ (displayError as any)?.message || (isEdit ? 'Ошибка при сохранении' : 'Ошибка при создании продукта') }}</p>
            </div>
          </Transition>

          <!-- 1. Основная информация -->
          <section :id="sections[0].id" class="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
            <div class="form-card-header px-5 py-4 border-b border-border/60 bg-muted/20" style="--accent: #6366f1">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #ede9fe; color: #6366f1">
                  <Icon name="lucide:smartphone" size="16" />
                </div>
                <div>
                  <h2 class="text-sm font-semibold leading-tight">Основная информация</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Название, цена и тип телефона</p>
                </div>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <field-group label="Название модели" required>
                  <Input v-model="form.model_name" placeholder="Ajib i25" required />
                </field-group>
                <field-group label="Slug" required>
                  <div class="relative">
                    <Input v-model="form.slug" placeholder="ajib-i25" class="pl-7" required />
                    <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 text-xs">/</span>
                  </div>
                </field-group>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <field-group label="Цена" required>
                  <div class="relative">
                    <Input v-model="form.price" placeholder="1 299 000" class="pr-12" required />
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">UZS</span>
                  </div>
                </field-group>
                <field-group label="Категория" required>
                  <Input v-model.number="form.category" type="number" min="1" required />
                </field-group>
              </div>

              <field-group label="Тип телефона" required>
                <div class="grid grid-cols-2 gap-3">
                  <label
                    v-for="opt in phoneTypeOptions"
                    :key="opt.value"
                    :class="[
                      'relative flex items-center gap-3 rounded-lg border-2 p-3.5 cursor-pointer transition-all',
                      form.phone_type === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30 hover:bg-muted/30'
                    ]"
                  >
                    <input type="radio" :value="opt.value" v-model="form.phone_type" class="sr-only" />
                    <Icon :name="opt.icon" size="18" :class="form.phone_type === opt.value ? 'text-primary' : 'text-muted-foreground'" />
                    <div>
                      <p :class="['text-sm font-medium', form.phone_type === opt.value ? 'text-primary' : '']">{{ opt.label }}</p>
                    </div>
                    <div v-if="form.phone_type === opt.value" class="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="lucide:check" size="10" class="text-white" />
                    </div>
                  </label>
                </div>
              </field-group>

              <div class="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Icon name="lucide:sparkles" size="14" class="text-amber-600" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">Новинка</p>
                    <p class="text-xs text-muted-foreground">Отображать бейдж «New» на карточке</p>
                  </div>
                </div>
                <toggle-switch v-model="form.is_new" />
              </div>

              <field-group label="Описание" required>
                <textarea
                  v-model="form.description"
                  rows="3"
                  placeholder="Краткое описание телефона..."
                  required
                  class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none transition-shadow"
                />
              </field-group>
            </div>
          </section>

          <!-- 2. Ссылки -->
          <section :id="sections[1].id" class="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
            <div class="form-card-header px-5 py-4 border-b border-border/60 bg-muted/20" style="--accent: #0ea5e9">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #e0f2fe; color: #0ea5e9">
                  <Icon name="lucide:link" size="16" />
                </div>
                <div>
                  <h2 class="text-sm font-semibold leading-tight">Ссылки</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Кнопки покупки и медиа</p>
                </div>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <field-group label='Кнопка "Купить"'>
                  <div class="relative">
                    <Input v-model="form.buy_button_link" placeholder="https://..." class="pl-8" />
                    <Icon name="lucide:shopping-cart" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  </div>
                </field-group>
                <field-group label="Ссылка Uzum">
                  <div class="relative">
                    <Input v-model="form.uzum_button_link" placeholder="https://..." class="pl-8" />
                    <Icon name="lucide:store" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  </div>
                </field-group>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <field-group label="Видео">
                  <div class="relative">
                    <Input v-model="form.video" placeholder="https://youtube.com/..." class="pl-8" />
                    <Icon name="lucide:video" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  </div>
                </field-group>
                <field-group label="Баннер в подвале">
                  <div class="relative">
                    <Input v-model="form.footer_banner_image" placeholder="https://..." class="pl-8" />
                    <Icon name="lucide:image" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  </div>
                </field-group>
              </div>
            </div>
          </section>

          <!-- 3. Hero секция -->
          <section :id="sections[2].id" class="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
            <div class="form-card-header px-5 py-4 border-b border-border/60 bg-muted/20" style="--accent: #10b981">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #d1fae5; color: #10b981">
                  <Icon name="lucide:layout-template" size="16" />
                </div>
                <div>
                  <h2 class="text-sm font-semibold leading-tight">Hero секция</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Главный баннер страницы продукта</p>
                </div>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <field-group label="Фото hero" required>
                <div class="flex gap-3">
                  <div class="relative flex-1">
                    <Input v-model="form.hero.photo" placeholder="https://cdn.example.com/hero.jpg" class="pl-8" required />
                    <Icon name="lucide:image" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  </div>
                  <div
                    v-if="form.hero.photo"
                    class="w-9 h-9 rounded-md border border-border overflow-hidden shrink-0 bg-muted"
                  >
                    <img :src="form.hero.photo" class="w-full h-full object-cover" @error="(e: Event) => (e.target as HTMLImageElement).style.display='none'" />
                  </div>
                </div>
              </field-group>
              <field-group label="Описание hero" required>
                <textarea
                  v-model="form.hero.description"
                  rows="2"
                  placeholder="Яркий слоган или описание для hero секции"
                  required
                  class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </field-group>
            </div>
          </section>

          <!-- 4. Средний баннер -->
          <section :id="sections[3].id" class="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
            <div class="form-card-header px-5 py-4 border-b border-border/60 bg-muted/20" style="--accent: #f59e0b">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #fef3c7; color: #f59e0b">
                  <Icon name="lucide:panel-top" size="16" />
                </div>
                <div>
                  <h2 class="text-sm font-semibold leading-tight">Средний баннер</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Баннер в середине страницы продукта</p>
                </div>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <field-group label="Изображение" required>
                <div class="flex gap-3">
                  <div class="relative flex-1">
                    <Input v-model="form.middle_banner.image" placeholder="https://..." class="pl-8" required />
                    <Icon name="lucide:image" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  </div>
                  <div v-if="form.middle_banner.image" class="w-9 h-9 rounded-md border overflow-hidden shrink-0 bg-muted">
                    <img :src="form.middle_banner.image" class="w-full h-full object-cover" @error="(e: Event) => (e.target as HTMLImageElement).style.display='none'" />
                  </div>
                </div>
              </field-group>
              <field-group label="Заголовок" required>
                <Input v-model="form.middle_banner.title" placeholder="Заголовок баннера" required />
              </field-group>
              <div class="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Icon name="lucide:shopping-bag" size="14" class="text-amber-600" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">Кнопка "Купить"</p>
                    <p class="text-xs text-muted-foreground">Показать на среднем баннере</p>
                  </div>
                </div>
                <toggle-switch v-model="form.middle_banner.buy_button" />
              </div>
            </div>
          </section>

          <!-- 5. Характеристики -->
          <section :id="sections[4].id" class="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
            <div class="form-card-header px-5 py-4 border-b border-border/60 bg-muted/20" style="--accent: #8b5cf6">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #ede9fe; color: #8b5cf6">
                  <Icon name="lucide:list-checks" size="16" />
                </div>
                <div>
                  <h2 class="text-sm font-semibold leading-tight">Характеристики</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Фотогалерея и параметры устройства</p>
                </div>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <field-group label="Фото галерея">
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <div class="relative flex-1">
                      <Input
                        v-model="photoInput"
                        placeholder="https://cdn.example.com/photo.jpg"
                        class="pl-8"
                        @keydown.enter.prevent="addPhoto"
                      />
                      <Icon name="lucide:image" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                    </div>
                    <button
                      type="button"
                      @click="addPhoto"
                      class="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-input bg-background text-sm hover:bg-muted transition-colors shrink-0"
                    >
                      <Icon name="lucide:plus" size="14" />
                      Добавить
                    </button>
                  </div>
                  <div v-if="form.characteristics.photos.length" class="flex flex-wrap gap-2">
                    <div
                      v-for="(photo, i) in form.characteristics.photos"
                      :key="i"
                      class="group relative w-14 h-14 rounded-lg border border-border overflow-hidden bg-muted"
                    >
                      <img :src="photo" class="w-full h-full object-cover" @error="(e: Event) => (e.target as HTMLImageElement).style.display='none'" />
                      <button
                        type="button"
                        @click="form.characteristics.photos.splice(i, 1)"
                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Icon name="lucide:x" size="14" class="text-white" />
                      </button>
                    </div>
                  </div>
                  <p v-else class="text-xs text-muted-foreground">Фото не добавлены</p>
                </div>
              </field-group>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label class="text-sm font-medium">Параметры</Label>
                  <button
                    type="button"
                    @click="form.characteristics.items.push({ key: '', value: '' })"
                    class="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Icon name="lucide:plus" size="12" />
                    Добавить
                  </button>
                </div>
                <div class="space-y-2">
                  <TransitionGroup name="list">
                    <div
                      v-for="(item, i) in form.characteristics.items"
                      :key="i"
                      class="flex gap-2 items-center group"
                    >
                      <div class="flex items-center justify-center w-6 h-6 rounded-md bg-muted text-muted-foreground text-xs font-medium shrink-0">{{ i + 1 }}</div>
                      <Input v-model="item.key" placeholder="Ключ (напр. Память)" class="flex-1" />
                      <Input v-model="item.value" placeholder="Значение (напр. 128 ГБ)" class="flex-1" />
                      <button
                        type="button"
                        @click="form.characteristics.items.splice(i, 1)"
                        class="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Icon name="lucide:trash-2" size="13" />
                      </button>
                    </div>
                  </TransitionGroup>
                  <div v-if="!form.characteristics.items.length" class="flex items-center gap-2 py-4 px-3 rounded-lg border border-dashed border-border/70 text-muted-foreground">
                    <Icon name="lucide:table-2" size="14" />
                    <p class="text-sm">Нет параметров. Нажмите «Добавить»</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 6. Параметры -->
          <section :id="sections[5].id" class="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
            <div class="form-card-header px-5 py-4 border-b border-border/60 bg-muted/20" style="--accent: #ef4444">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: #fee2e2; color: #ef4444">
                  <Icon name="lucide:sliders-horizontal" size="16" />
                </div>
                <div>
                  <h2 class="text-sm font-semibold leading-tight">Параметры</h2>
                  <p class="text-xs text-muted-foreground mt-0.5">Визуальное оформление секции параметров</p>
                </div>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <field-group label="Тип отображения" required>
                <div class="grid grid-cols-2 gap-3">
                  <label
                    v-for="opt in paramTypeOptions"
                    :key="opt.value"
                    :class="[
                      'relative flex items-center gap-3 rounded-lg border-2 p-3 cursor-pointer transition-all',
                      form.parametrs.type === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/30'
                    ]"
                  >
                    <input type="radio" :value="opt.value" v-model="form.parametrs.type" class="sr-only" />
                    <Icon :name="opt.icon" size="16" :class="form.parametrs.type === opt.value ? 'text-primary' : 'text-muted-foreground'" />
                    <span :class="['text-sm font-medium', form.parametrs.type === opt.value ? 'text-primary' : '']">{{ opt.label }}</span>
                    <div v-if="form.parametrs.type === opt.value" class="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="lucide:check" size="8" class="text-white" />
                    </div>
                  </label>
                </div>
              </field-group>

              <Transition name="fade">
                <div v-if="form.parametrs.type === 'gradient'" class="grid grid-cols-2 gap-4">
                  <field-group label="Цвет 1">
                    <div class="flex gap-2">
                      <div class="relative flex-1">
                        <Input v-model="form.parametrs.data.color1" placeholder="#6366f1" class="pl-9" />
                        <div
                          class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-sm border border-border/60"
                          :style="{ background: form.parametrs.data.color1 || '#e5e7eb' }"
                        />
                      </div>
                      <label class="cursor-pointer">
                        <input type="color" v-model="form.parametrs.data.color1" class="sr-only" />
                        <div class="w-9 h-9 rounded-md border border-input flex items-center justify-center hover:bg-muted transition-colors">
                          <Icon name="lucide:pipette" size="14" class="text-muted-foreground" />
                        </div>
                      </label>
                    </div>
                  </field-group>
                  <field-group label="Цвет 2">
                    <div class="flex gap-2">
                      <div class="relative flex-1">
                        <Input v-model="form.parametrs.data.color2" placeholder="#8b5cf6" class="pl-9" />
                        <div
                          class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-sm border border-border/60"
                          :style="{ background: form.parametrs.data.color2 || '#e5e7eb' }"
                        />
                      </div>
                      <label class="cursor-pointer">
                        <input type="color" v-model="form.parametrs.data.color2" class="sr-only" />
                        <div class="w-9 h-9 rounded-md border border-input flex items-center justify-center hover:bg-muted transition-colors">
                          <Icon name="lucide:pipette" size="14" class="text-muted-foreground" />
                        </div>
                      </label>
                    </div>
                  </field-group>
                </div>
              </Transition>

              <field-group label="Фото" required>
                <div class="flex gap-3">
                  <div class="relative flex-1">
                    <Input v-model="form.parametrs.data.photo" placeholder="https://..." class="pl-8" required />
                    <Icon name="lucide:image" size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  </div>
                  <div v-if="form.parametrs.data.photo" class="w-9 h-9 rounded-md border overflow-hidden shrink-0 bg-muted">
                    <img :src="form.parametrs.data.photo" class="w-full h-full object-cover" @error="(e: Event) => (e.target as HTMLImageElement).style.display='none'" />
                  </div>
                </div>
              </field-group>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label class="text-sm font-medium">Пункты</Label>
                  <button
                    type="button"
                    @click="form.parametrs.data.items.push({ title: '', value: '' })"
                    class="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Icon name="lucide:plus" size="12" />
                    Добавить
                  </button>
                </div>
                <div class="space-y-2">
                  <TransitionGroup name="list">
                    <div
                      v-for="(item, i) in form.parametrs.data.items"
                      :key="i"
                      class="flex gap-2 items-center group"
                    >
                      <div class="flex items-center justify-center w-6 h-6 rounded-md bg-muted text-muted-foreground text-xs font-medium shrink-0">{{ i + 1 }}</div>
                      <Input v-model="item.title" placeholder="Заголовок" class="flex-1" />
                      <Input v-model="item.value" placeholder="Значение" class="flex-1" />
                      <button
                        type="button"
                        @click="form.parametrs.data.items.splice(i, 1)"
                        class="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Icon name="lucide:trash-2" size="13" />
                      </button>
                    </div>
                  </TransitionGroup>
                  <div v-if="!form.parametrs.data.items.length" class="flex items-center gap-2 py-4 px-3 rounded-lg border border-dashed border-border/70 text-muted-foreground">
                    <Icon name="lucide:table-2" size="14" />
                    <p class="text-sm">Нет пунктов. Нажмите «Добавить»</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="pb-12" />
        </form>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{ id?: string | number }>()
const isEdit = computed(() => !!props.id)

/* ───── inline sub-components ───── */

const FieldGroup = defineComponent({
  props: { label: String, required: Boolean },
  setup(props, { slots }) {
    return () => h('div', { class: 'space-y-1.5' }, [
      h('label', {
        class: 'text-sm font-medium leading-none flex items-center gap-1'
      }, [
        props.label,
        props.required ? h('span', { class: 'text-destructive' }, '*') : null,
      ]),
      slots.default?.(),
    ])
  },
})

const ToggleSwitch = defineComponent({
  props: { modelValue: Boolean },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('label', { class: 'relative inline-flex items-center cursor-pointer' }, [
      h('input', {
        type: 'checkbox',
        class: 'sr-only peer',
        checked: props.modelValue,
        onChange: (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).checked),
      }),
      h('div', {
        class: [
          'w-10 h-5 rounded-full transition-colors duration-200',
          'bg-muted peer-checked:bg-primary',
          'relative after:content-[""] after:absolute after:top-0.5 after:left-0.5',
          'after:w-4 after:h-4 after:rounded-full after:bg-white after:shadow-sm',
          'after:transition-transform after:duration-200',
          'peer-checked:after:translate-x-5',
        ].join(' '),
      }),
    ])
  },
})

/* ───── options ───── */
const sections = [
  { id: 'section-basic',   label: 'Основная' },
  { id: 'section-links',   label: 'Ссылки' },
  { id: 'section-hero',    label: 'Hero секция' },
  { id: 'section-banner',  label: 'Средний баннер' },
  { id: 'section-chars',   label: 'Характеристики' },
  { id: 'section-params',  label: 'Параметры' },
]

const phoneTypeOptions = [
  { value: 'smartphone', label: 'Смартфон',   icon: 'lucide:smartphone' },
  { value: 'push_button', label: 'Кнопочный', icon: 'lucide:phone' },
]
const paramTypeOptions = [
  { value: 'simple',   label: 'Simple',   icon: 'lucide:square' },
  { value: 'gradient', label: 'Gradient', icon: 'lucide:blend' },
]

/* ───── active section (scroll spy) ───── */
const activeSection = ref(sections[0].id)

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      }
    },
    { rootMargin: '-30% 0px -60% 0px' }
  )
  sections.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
  onUnmounted(() => observer.disconnect())
})

/* ───── form state ───── */
const photoInput = ref('')

function addPhoto() {
  const url = photoInput.value.trim()
  if (url) {
    form.value.characteristics.photos.push(url)
    photoInput.value = ''
  }
}

const emptyForm = () => ({
  model_name: '',
  slug: '',
  description: '',
  price: '',
  category: 1,
  phone_type: 'smartphone' as 'smartphone' | 'push_button',
  is_new: false,
  buy_button_link: '',
  uzum_button_link: '',
  video: '',
  footer_banner_image: '',
  hero: { photo: '', description: '' },
  characteristics: {
    photos: [] as string[],
    items: [] as { key: string; value: string }[],
  },
  parametrs: {
    type: 'simple' as 'simple' | 'gradient',
    data: { photo: '', color1: '', color2: '', items: [] as { title: string; value: string }[] },
  },
  middle_banner: { image: '', title: '', buy_button: false },
})

const form = ref(emptyForm())

/* ───── edit mode: fetch existing product ───── */
const config = useRuntimeConfig()
const loadingProduct = ref(false)

onMounted(async () => {
  if (!props.id) return
  loadingProduct.value = true
  try {
    const product = await $fetch<any>(`/api/v1/phone/${props.id}`, {
      baseURL: config.public.apiBase,
      headers: { Authorization: `Bearer ${localStorage.getItem('auth:access')}` },
    })
    if (product) {
      form.value = {
        model_name: product.model_name ?? '',
        slug: product.slug ?? '',
        description: product.description ?? '',
        price: product.price ?? '',
        category: product.category ?? 1,
        phone_type: product.phone_type ?? 'smartphone',
        is_new: product.is_new ?? false,
        buy_button_link: product.buy_button_link ?? '',
        uzum_button_link: product.uzum_button_link ?? '',
        video: product.video ?? '',
        footer_banner_image: product.footer_banner_image ?? '',
        hero: product.hero ?? { photo: '', description: '' },
        characteristics: product.characteristics ?? { photos: [], items: [] },
        parametrs: product.parametrs ?? { type: 'simple', data: { photo: '', color1: '', color2: '', items: [] } },
        middle_banner: product.middle_banner ?? { image: '', title: '', buy_button: false },
      }
    }
  } catch (e) {
    console.error('Ошибка загрузки продукта:', e)
  } finally {
    loadingProduct.value = false
  }
})

/* ───── submit ───── */
const { execute, pending: createPending, error: createError } = useApiService({ immediate: false }).Phone.PhoneController_create(form)

const editPending = ref(false)
const editError = ref<any>(null)

const isPending = computed(() => isEdit.value ? editPending.value : createPending.value)
const displayError = computed(() => isEdit.value ? editError.value : createError.value)

function fillTestData() {
  form.value = {
    model_name: 'Ajib i25 Pro',
    slug: 'ajib-i25-pro',
    description: 'Флагманский смартфон нового поколения с мощным процессором и камерой 108 МП. Идеален для работы и творчества.',
    price: '1 299 000',
    category: 1,
    phone_type: 'smartphone',
    is_new: true,
    buy_button_link: 'https://ajib.uz/buy/i25-pro',
    uzum_button_link: 'https://uzum.uz/ajib-i25-pro',
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    footer_banner_image: 'https://picsum.photos/seed/banner/1200/400',
    hero: {
      photo: 'https://picsum.photos/seed/hero/800/600',
      description: 'Переосмысли возможности. Ajib i25 Pro — мощь в твоих руках.',
    },
    characteristics: {
      photos: [
        'https://picsum.photos/seed/p1/400/400',
        'https://picsum.photos/seed/p2/400/400',
        'https://picsum.photos/seed/p3/400/400',
      ],
      items: [
        { key: 'Процессор', value: 'Ajib A2 Bionic, 3.2 ГГц' },
        { key: 'Оперативная память', value: '12 ГБ' },
        { key: 'Встроенная память', value: '256 ГБ' },
        { key: 'Основная камера', value: '108 МП + 12 МП + 5 МП' },
        { key: 'Фронтальная камера', value: '32 МП' },
        { key: 'Аккумулятор', value: '5000 мАч, 67 Вт' },
        { key: 'Экран', value: '6.7" AMOLED, 120 Гц' },
        { key: 'ОС', value: 'Android 14' },
      ],
    },
    parametrs: {
      type: 'gradient',
      data: {
        photo: 'https://picsum.photos/seed/param/600/600',
        color1: '#6366f1',
        color2: '#8b5cf6',
        items: [
          { title: 'Тонкий корпус', value: '7.4 мм' },
          { title: 'Вес', value: '189 г' },
          { title: 'Защита', value: 'IP68' },
        ],
      },
    },
    middle_banner: {
      image: 'https://picsum.photos/seed/mid/1200/500',
      title: 'Ajib i25 Pro — Следующий уровень',
      buy_button: true,
    },
  }
}

async function onSubmit() {
  if (isEdit.value) {
    editPending.value = true
    editError.value = null
    try {
      await $fetch(`/api/v1/phone/${props.id}`, {
        method: 'PATCH',
        body: form.value,
        baseURL: config.public.apiBase,
        headers: { Authorization: `Bearer ${localStorage.getItem('auth:access')}` },
      })
      navigateTo('/admin/products')
    } catch (e) {
      editError.value = e
    } finally {
      editPending.value = false
    }
  } else {
    await execute()
    if (!createError.value) navigateTo('/admin/products')
  }
}
</script>

<style scoped>
.form-card-header {
  border-top: 3px solid var(--accent, #6366f1);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }

.list-enter-active, .list-leave-active { transition: all 0.2s; }
.list-enter-from { opacity: 0; transform: translateX(-8px); }
.list-leave-to { opacity: 0; transform: translateX(8px); }
</style>
