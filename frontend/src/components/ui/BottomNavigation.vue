<script lang="ts" setup>
import { HomeIcon, PlusIcon, UserIcon, WalletIcon } from "@/components/Icons";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppLink from "@/components/AppLink.vue";

const navs = [
  { name: "Главная", icon: HomeIcon, href: "posts" }, // Изменено с baseLayout на home
  { name: "Создать", icon: PlusIcon, href: "add-post" },
  { name: "Кошелек", icon: WalletIcon, href: "wallet" },
  { name: "Профиль", icon: UserIcon, href: "profile" },
];

function selected(href: string) {
  return route.name === href;
}

const router = useRouter();
const route = useRoute();
const index = computed(() => navs.findIndex((nav) => selected(nav.href)));

const c = computed(() => `${((44 * index.value) / 48) * 100}%`);
</script>

<template>
  <footer
    v-if="route.name !== 'register' && route.name !== 'license'"
    class="fixed bottom-0 z-50 flex w-full items-center justify-center pb-3 sm:hidden"
  >
    <div class="bg-dark flex items-center gap-3 rounded-full px-4 py-3">
      <AppLink
        v-for="nav in navs"
        :key="nav.name"
        :to="nav.href"
        :class="selected(nav.href) ? 'relative z-10 size-12' : 'bg-dark'"
        class="flex items-center justify-center rounded-full transition"
        @click="router.push({ name: nav.href })"
      >
        <component
          :is="nav.icon"
          :class="selected(nav.href) ? 'text-dark' : 'text-bg-main'"
          class="size-8 transition"
        />
      </AppLink>
      <div
        v-if="index !== -1"
        class="calculated bg-bg-main absolute size-12 rounded-full transition duration-500"
      />
    </div>
  </footer>
</template>

<style scoped>
.calculated {
  translate: v-bind(c) 0;
}
</style>
