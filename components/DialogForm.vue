<script setup lang="ts">
defineProps({
  maxWidth: {
    type: String,
    default: '600px',
  },
})

const dialog = ref(false)
const confirmed = ref(false)

let resolve: (value: boolean) => void

watch(dialog, (v) => {
  if (!v) {
    resolve(confirmed.value)
  }
})

const form = ref({
  title: '',
  valid: false,
  modelValue: {} as any,
  onSubmit: (value: any) => {
    console.log('submit', value)
  },
  submit() {
    if (this.valid) {
      this.onSubmit(this.modelValue)
      dialog.value = false
    }
  },
})

const close = () => {
  dialog.value = false
  form.value.modelValue = {}
}

const open = (title: string, modelValue: any, onSubmit: (value: any) => void) => {
  confirmed.value = false
  dialog.value = true
  form.value.title = title
  form.value.modelValue = Object.assign({}, modelValue)
  form.value.onSubmit = onSubmit

  return new Promise<boolean>((resolveFn) => {
    resolve = resolveFn
  })
}

defineExpose({ open })
</script>

<template>
  <v-dialog
    v-model="dialog"
    :max-width="maxWidth"
  >
    <v-card>
      <v-card-item>
        <v-card-title>
          {{ form.title }}
        </v-card-title>
      </v-card-item>

      <v-card-text>
        <v-form
          v-model="form.valid"
          @submit.prevent="form.submit()"
        >
          <slot v-bind="form" />
        </v-form>
      </v-card-text>

      <v-card-actions class="ms-auto px-4 pb-4">
        <v-btn
          color="primary darken-1"
          @click="close"
        >
          Batal
        </v-btn>
        <v-btn
          color="primary darken-1"
          :disabled="!form.valid"
          @click="form.submit()"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
