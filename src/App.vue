<template>
  <div>
    <div v-if="signUpResult !== null" class="message-container card">
      <p class="message">{{ signUpResult.message }}</p>
      <button @click="handleGoBack">Go Back</button>
    </div>
    <form v-else class="card" @submit.prevent="handleSubmit">
      <div class="form-title">
        <h1 class="form-heading">Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
      </div>
      <InputField
        v-for="field in formFields"
        :key="field.name"
        v-model="form[field.name]"
        :type="field.type"
        :placeholder="field.placeholder"
        :autocomplete="field.autocomplete"
        :errorMessage="errorMessage?.[field.name]"
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
import { useFormValidation } from '@/utils/useFormValidation'
import { reactive, ref } from 'vue'
import type { FormData, FormField } from '@/types/FormTypes'

const formFields: FormField[] = [
  { name: 'name', type: 'text', placeholder: 'Your name', autocomplete: 'given-name' },
  { name: 'firstname', type: 'text', placeholder: 'Your firstname', autocomplete: 'family-name' },
  { name: 'email', type: 'email', placeholder: 'Your email', autocomplete: 'email' },
  { name: 'phone', type: 'tel', placeholder: 'Your phone', autocomplete: 'tel' },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Your password',
    autocomplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
    autocomplete: 'new-password',
  },
]

const form = reactive<FormData>({
  name: '',
  firstname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const isSubmitting = ref(false)
const signUpResult = ref<{ success: boolean; message: string } | null>(null)
const errorMessage = ref<{ [key: string]: string } | null>(null)

const handleGoBack = () => {
  signUpResult.value = null
  errorMessage.value = null
}

const handleSubmit = async () => {
  const errors = useFormValidation(form)
  if (errors) {
    errorMessage.value = errors
    return
  }
  errorMessage.value = null
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
  width: 90vw;
  max-width: 600px;
  gap: 40px;
  padding: 20px 50px;
}

.message-container.card {
  padding: 30px 50px;
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
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .card {
    max-width: 450px;
    gap: 30px;
    padding: 20px;
  }
}
</style>
