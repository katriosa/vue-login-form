<template>
  <div class="input-container">
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="handleInput"
      required
    />
    <p v-show="errorMessage" class="error-text">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: String,
  placeholder: String,
  autocomplete: String,
  modelValue: { type: String, default: '' },
  errorMessage: String,
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
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
  position: relative;
}
.input {
  background-color: var(--color-input);
  outline: none;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
}

.error-text {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  color: var(--color-error);
  text-shadow: var(--color-text-shadow);
}

@media (max-width: 768px) {
  .input-container {
    max-width: 80%;
  }
  .input {
    padding: 8px 10px;
  }
}
</style>
