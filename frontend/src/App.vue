<script setup lang="ts">
import { useBackButton } from "@/composables/useBackButton";
import { onMounted } from "vue";
import { useMiniAppStore } from "./composables/useMiniAppStore";

useBackButton();
</script>

<template>
  <RouterView />
</template>
