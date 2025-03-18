<template>
  <div class="input-container">
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :minlength="minlength"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="handleInput"
      required
    />
    <p v-show="hasError" class="error-text">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const props = defineProps({
  type: String,
  placeholder: String,
  autocomplete: String,
  modelValue: { type: String, default: '' },
  minlength: { type: Number, default: 0 },
  pattern: { type: String, default: '' },
  passwordError: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const isTouched = ref(false)

const isTooShort = computed(() => {
  if (!isTouched.value || !props.minlength) return false
  return props.modelValue.length < props.minlength
})

const isInvalidPattern = computed(() => {
  if (!isTouched.value || !props.pattern) return false
  return !new RegExp(props.pattern).test(props.modelValue)
})

const hasError = computed(() => isTooShort.value || isInvalidPattern.value || props.passwordError)

const errorMessage = computed(() => {
  if (isTooShort.value) return `Must be at least ${props.minlength} characters`
  if (isInvalidPattern.value) return 'Invalid format'
  if (props.passwordError) return "Passwords don't match"
  return ''
})

const handleInput = (event: Event) => {
  if (!isTouched.value) isTouched.value = true
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
}
.input {
  background-color: var(--color-input);
  outline: none;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  width: 100%;
  font-size: inherit;
}

.error-text {
  margin-top: 5px;
  color: var(--color-error);
  text-shadow: var(--color-text-shadow);
}

@media (max-width: 768px) {
  .input-container {
    max-width: 80%;
  }
}
</style>
