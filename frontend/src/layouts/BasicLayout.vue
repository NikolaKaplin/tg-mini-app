<script setup lang="ts">
import BottomNavigation from '@/components/ui/BottomNavigation.vue';
import { useAuthStore } from '@/stores/auth';
  const { isValidate, validate, token } = useAuthStore();
      console.log('is valodate: ', isValidate);

    if (!isValidate) {
        await validate()
      }

</script>

<template>
  <router-view />
<BottomNavigation/>
</template>