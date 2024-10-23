<script setup lang="ts">
import type { User } from '#auth-utils'

definePageMeta({
  title: 'Login',
  name: 'login',
})

const form = ref()
const email = ref('')
const password = ref('')

const { session, loggedIn } = useUserSession()

const validate = async () => {
  const { valid } = await form.value.validate()

  return valid
}

const login = async () => {
  if (!(await validate())) return

  try {
    const { data } = await useFetch<{ access_token: string }>('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    localStorage.setItem('token', data.value!.access_token)

    const { data: profile } = await useFetch<User>('/api/user/profile', {
      method: 'POST',
      body: {
        token: data.value!.access_token,
      },
    })

    session.value.user = profile.value!

    navigateTo('/')
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  if (loggedIn.value) navigateTo('/')
})
</script>

<template>
  <div>
    <v-icon
      icon="custom:pacitan-logo"
      size="40"
      class="position-absolute"
      style="top: 36px; left: 48px"
    />
    <v-row no-gutters>
      <v-col
        cols="8"
        md="7"
        class="align-center px-15 d-none d-md-flex"
      >
        <div>
          <h1
            class="mb-5 text-uppercase font-weight-medium"
            style="font-size: 38px; font-family: 'Overpass', sans-serif; line-height: 1.3"
          >
            Visualisasi Spasial Temporal <br />
            Tingkat Kerawanan Hepatitis-A <br />
            Kabupaten Pacitan
          </h1>
          <h2
            class="text-uppercase font-weight-bold"
            style="font-size: 40px; font-family: 'Overpass', sans-serif"
          >
            Hepatitis-A Rate
          </h2>
        </div>
      </v-col>

      <v-col
        cols="12"
        md="5"
        class="d-flex align-items-center justify-center"
        style="height: 100vh"
      >
        <v-card
          flat
          class="w-100 d-flex align-center"
          rounded="0"
        >
          <v-card-text class="px-16">
            <h1 class="mb-5 font-weight-semibold text--primary mb-2">Selamat datang! 👋🏻</h1>
            <p class="mb-15 text-subtitle-1">Silahkan login terlebih dahulu.</p>

            <v-form
              ref="form"
              class="mt-4"
              @submit.prevent="login"
            >
              <v-row
                no-gutters
                class="email-phone-input flex-nowrap"
              >
                <v-text-field
                  v-model="email"
                  variant="outlined"
                  type="email"
                  required
                  :rules="[(v: string) => !!v || 'Email harus diisi']"
                  label="Email"
                  placeholder="Masukkan email"
                  hide-details="auto"
                  class="mb-6 email-input"
                />
              </v-row>

              <v-text-field
                v-model="password"
                type="password"
                variant="outlined"
                required
                :rules="[(v: string) => !!v || 'Password harus diisi']"
                label="Password"
                placeholder="Masukkan password"
                hide-details="auto"
                class="mb-2"
              />

              <div class="d-flex align-end justify-end text-caption flex-wrap mt-2">
                Lupa Password?
                <!-- <router-link to="/forgot-password"> Lupa Password? </router-link> -->
              </div>

              <v-btn
                block
                color="primary"
                type="submit"
                class="mt-9"
                rounded="md"
              >
                LOGIN
              </v-btn>

              <div class="d-flex align-center justify-center flex-wrap mt-5">
                Belum punya akun?
                <!-- <router-link to="/register"> Belum punya akun? </router-link> -->
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
