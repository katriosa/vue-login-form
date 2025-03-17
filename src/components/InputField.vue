<template>
  <input
    class="input"
    :type="type"
    :placeholder="placeholder"
    :minlength="minlength"
    :autocomplete="autocomplete"
    required
  />
</template>

<script setup lang="ts">
defineProps({
  type: String,
  placeholder: String,
  label: String,
  minlength: String,
  autocomplete: String,
})
</script>

<style scoped>
.input {
  background-color: var(--color-input);
  outline: none;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  font-size: inherit;
}

@media (max-width: 768px) {
  .input-container {
    max-width: 80%;
  }
}
</style>
