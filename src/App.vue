<template>
  <form class="form-container" @submit.prevent="submit">
    <div class="form-title">
      <h1 class="form-heading">Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
    </div>
    <InputField
      v-model="form.name"
      type="text"
      placeholder="Your name"
      :minlength="3"
      autocomplete="given-name"
    />
    <InputField
      v-model="form.firstname"
      type="text"
      placeholder="Your firstname"
      :minlength="3"
      autocomplete="family-name"
    />
    <InputField
      v-model="form.email"
      type="email"
      placeholder="Your email"
      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
      autocomplete="email"
    />
    <InputField
      v-model="form.phone"
      type="tel"
      placeholder="Your phone"
      pattern="^\+?\d+$"
      autocomplete="tel"
    />
    <InputField
      v-model="form.password"
      type="password"
      placeholder="Your password"
      autocomplete="new-password"
      :minlength="6"
    />
    <InputField
      v-model="form.confirmPassword"
      type="password"
      placeholder="Confirm your password"
      autocomplete="new-password"
      :passwordError="passwordError"
    />
    <div class="button-container">
      <button type="submit">Sign Up</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  firstname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const passwordError = ref(false)

const submit = () => {
  if (form.password !== form.confirmPassword) {
    passwordError.value = true
  } else {
    passwordError.value = false
    console.log('submit', form)
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 50cqi;
  max-width: 500px;
  padding: 20px 50px;
  border-radius: 20px;
  background-color: var(--color-form);
  box-shadow: var(--color-box-shadow);
}

.form-title {
  text-align: center;
}

.form-heading {
  text-shadow: var(--color-text-shadow);
  margin-bottom: 0.5rem;
}

.button-container {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .form-container {
    width: 80cqi;
    max-width: none;
    gap: 20px;
  }
}
</style>
