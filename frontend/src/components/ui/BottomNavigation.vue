<script lang="ts" setup>
import { HomeIcon, PlusIcon, UserIcon, WalletIcon } from "@/components/Icons";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppLink from "@/components/AppLink.vue";

const navs = [
  { name: "Главная", icon: HomeIcon, href: "baseLayout" }, // Изменено с baseLayout на home
  { name: "Создать", icon: PlusIcon, href: "init-data" },
  { name: "Кошелек", icon: WalletIcon, href: "theme-params" },
  { name: "Профиль", icon: UserIcon, href: "ton-connect" },
];

const route = useRoute();
const activeIndex = computed(() => 
  navs.findIndex(nav => route.name === nav.href)
);
</script>

<template>
  <footer 
    v-if="route.name !== 'Register' && route.name !== 'license'"
    class="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4"
  >
    <div class="relative flex items-center rounded-2xl bg-white/10 backdrop-blur-lg px-6 py-3 shadow-lg ring-1 ring-white/10">
      <div class="flex gap-6">
        <AppLink 
          v-for="(nav, index) in navs"
          :key="nav.name"
          :to="{ name: nav.href }"
          class="group relative flex flex-col items-center"
        >
          <div class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
            :class="{
              'bg-indigo-500 shadow-lg shadow-indigo-500/30': route.name === nav.href,
              'hover:bg-white/10': route.name !== nav.href
            }"
          >
            <component
              :is="nav.icon"
              class="h-6 w-6 transition-all duration-300"
              :class="{
                'text-white scale-110': route.name === nav.href,
                'text-gray-300 group-hover:text-white': route.name !== nav.href
              }"
            />
          </div>
          <span class="mt-1 text-xs font-medium transition-all duration-300"
            :class="{
              'text-indigo-400': route.name === nav.href,
              'text-gray-400 group-hover:text-gray-200': route.name !== nav.href
            }"
          >
            {{ nav.name }}
          </span>
        </AppLink>
      </div>
      
      <!-- Анимированный индикатор -->
      <!-- <div
        v-if="activeIndex !== -1"
        class="absolute -bottom-1 h-1 rounded-full bg-indigo-400 transition-all duration-500"
        :style="{
          width: `calc(100% / ${navs.length} - 15px)`,
          left: `calc(${activeIndex * (100 / navs.length)}% + 12px)`
        }"
      /> -->
    </div>
  </footer>
</template>