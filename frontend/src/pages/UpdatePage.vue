<script setup>
import { ref, onMounted } from "vue";
import { useMiniAppStore } from "@/composables/useMiniAppStore";

const { version } = useMiniAppStore();

const newVersion = ref("10.1.0"); // Актуальная версия Telegram
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <div class="text-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h1 class="text-2xl font-bold text-gray-800 mt-4">
          Устаревшая версия Telegram
        </h1>
      </div>

      <div class="space-y-4 text-gray-700 mb-6">
        <p>Ваша версия Telegram устарела и больше не поддерживается.</p>
        <p>
          Для продолжения работы с приложением необходимо установить последнюю
          версию.
        </p>
      </div>

      <div class="bg-gray-50 p-4 rounded-md mb-6">
        <div
          class="grid grid-cols-2 gap-2 text-sm font-medium text-gray-500 mb-2"
        >
          <div>Текущая версия:</div>
          <div>Доступная версия:</div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div class="text-red-500">{{ version || "Не определена" }}</div>
          <div class="text-green-500">{{ newVersion }}</div>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <p>
          Если у вас возникли проблемы с обновлением, обратитесь в
          <a
            href="https://telegram.org/support"
            class="text-blue-500 hover:underline"
            >поддержку</a
          >.
        </p>
      </div>
    </div>
  </div>
</template>
