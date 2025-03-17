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
import { ref, computed, watch } from 'vue'
const props = defineProps({
  type: String,
  placeholder: String,
  autocomplete: String,
  modelValue: { type: String, default: null },
  minlength: { type: Number, default: 3 },
})

const emit = defineEmits(['update:modelValue'])

const hasError = ref(false)

const errorMessage = computed(() =>
  hasError.value ? `Must be at least ${props.minlength} characters` : '',
)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    hasError.value = newValue.length < props.minlength
  },
)
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
