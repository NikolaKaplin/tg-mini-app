<script setup lang="ts">
import BottomNavigation from "@/components/ui/BottomNavigation.vue";
import { useViewportStore } from "@/composables/useViewportStore";
import GovnoLogger from "@/lib/logger";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { isValidate, validate } = useAuthStore();
const router = useRouter();
const isLoading = ref(true);
const viewportStore = useViewportStore(); // Add this line to get access to the viewport store

onMounted(async () => {
  if (!isValidate) {
    await validate();
    GovnoLogger.info("Пользователь валидирован успешно");
  }
  const token = useAuthStore().token;
  console.log("token: " + token);
  if (!token) {
    await router.replace({ name: "register" });
  }
  isLoading.value = false;
});
</script>

<template>
  <router-view v-if="!isLoading" />
  <BottomNavigation v-if="!isLoading && !viewportStore.isKeyboardOpen" />
</template>
