<template>
  <router-view v-if="!isLoading" />
  <BottomNavigation />
</template>

<script setup lang="ts">
import BottomNavigation from "@/components/ui/BottomNavigation.vue";
import { useMiniAppStore } from "@/composables/useMiniAppStore";
import { latest_tg_version } from "@/lib/constants";
import GovnoLogger from "@/lib/logger";
import { useAuthStore } from "@/stores/authStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { isValidate, validate } = useAuthStore();
const router = useRouter();
const isLoading = ref(true);
const { version, isKeyboardOpen } = useMiniAppStore();

onMounted(async () => {
  if (version && version < latest_tg_version)
    await router.push({ name: "update" });

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
