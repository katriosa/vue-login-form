<template>
  <div>
    <div v-if="signUpResult !== null" class="message-container card">
      <p class="message">{{ signUpResult.message }}</p>
      <button @click="signUpResult = null">Back</button>
    </div>
    <form v-else class="form-container card" @submit.prevent="handleSubmit">
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
      />
      <div class="button-container">
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Signing up...' : 'Sign Up' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import { mockApiRequest } from '@/services/mockApiRequest.ts'
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  firstname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const isSubmitting = ref(false)
const signUpResult = ref<{ success: boolean; message: string } | null>(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const signUpResponse = await mockApiRequest.submitForm(form)
    signUpResult.value = signUpResponse
  } catch (error) {
    console.log(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.card {
  background-color: var(--color-form);
  box-shadow: var(--color-box-shadow);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60cqi;
  max-width: 600px;
  gap: 40px;
}
.form-container {
  padding: 20px 50px;
}

.message-container {
  padding: 30px;
}

.message {
  font-size: 1.4em;
  text-align: center;
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
