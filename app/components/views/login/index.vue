<template>
  <div>
    <Card class="m-auto mt-[10%] max-w-sm">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl">Авторизация</CardTitle>
        <CardDescription>
          Введите свой логин и пароль, чтобы войти в свою учетную запись.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="login">Логин</Label>
            <Input id="login" v-model="form.login" type="text" placeholder="Логин" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Пароль</Label>
            </div>
            <Input id="password" v-model="form.password" type="password" required />
          </div>
          <Button type="submit" :disabled="isLoading" class="w-full" @click="login">Войти</Button>
          <p v-if="isError" class="text-red-500">Неверный логин или пароль</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>

const router = useRouter();

const isError = ref(false);
const isLoading = ref(false);

const form = ref({
  login: '',
  password: ''
})

async function login() {

  isError.value = false;
  isLoading.value = true;

  const { data, status } = await useApiService().Auth.AuthController_login(form.value)
  if (status.value === 'success') {
    localStorage.setItem('auth:access', data.value?.access_token);
    router.push('/admin/products');
  } else {
    isError.value = true
  }
  isLoading.value = false;
}
</script>
