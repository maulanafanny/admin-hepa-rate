<script setup lang="ts">
import type { User } from '#auth-utils'

const form = ref()
const email = ref('')
const password = ref('')

const validate = async () => {
  const { valid } = await form.value.validate()

  return valid
}

const { session } = useUserSession()

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
</script>

<template>
  <div>
    <v-card flat>
      <v-card-text>
        <p class="text-2xl font-weight-semibold text--primary mb-2">Selamat datang! 👋🏻</p>
        <p class="mb-8">Silahkan login terlebih dahulu.</p>

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
            class="mt-6"
          >
            Login
          </v-btn>

          <div class="d-flex align-center justify-center flex-wrap mt-4">
            Belum punya akun?
            <!-- <router-link to="/register"> Belum punya akun? </router-link> -->
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
