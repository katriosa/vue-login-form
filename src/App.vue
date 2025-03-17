<template>
  <form class="form-container">
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
    <div class="button-container">
      <button type="submit">Sign Up</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  firstname: '',
  email: '',
  phone: '',
  password: '',
})

// const hasErrors = computed(() => {
//   return (
//     form.name.length < 3 ||
//     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
//     form.phone.length < 10 ||
//     form.password.length < 6
//   )
// })
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
