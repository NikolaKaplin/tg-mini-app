<script setup lang="ts">
defineProps<{ title: string; disclaimer?: string }>();
</script>

<template>
  <div class="page">
    <header
      class="fixed top-0 left-0 right-0 h-[10vh] bg-gray-900 shadow z-50 flex justify-center"
    >
      <p class="pt-[5vh] text-xl">{{ title }}</p>
    </header>
    <slot />
  </div>
</template>

<style>
.page {
  box-sizing: border-box;
}

.page__disclaimer {
  margin-bottom: 16px;
}
</style>
