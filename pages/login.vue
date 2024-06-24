<script setup lang="ts">
const login = async (name: string, email: string) => {}
</script>

<template>
  <div>
    <v-card flat>
      <v-card-text>
        <p class="text-2xl font-weight-semibold text--primary mb-2">Selamat datang! 👋🏻</p>
        <p class="mb-8">Silahkan login terlebih dahulu.</p>

        <v-form class="mt-4">
          <v-row
            no-gutters
            class="email-phone-input flex-nowrap"
          >
            <v-text-field
              variant="outlined"
              type="email"
              label="Email"
              placeholder="Masukkan email"
              hide-details="auto"
              class="mb-6 email-input"
            />
          </v-row>

          <v-text-field
            variant="outlined"
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
            @click="login"
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
