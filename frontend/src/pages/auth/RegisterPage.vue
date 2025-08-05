<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { z } from "zod";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const { register } = useAuthStore();
const currentStep = ref<"nickname" | "agreement">("nickname");

const schema = z.object({
  nickname: z.string().min(3, "Никнейм должен содержать минимум 3 символа"),
});

type Schema = z.infer<typeof schema>;

const formData = ref<Partial<Schema>>({
  nickname: "",
});

const isAgreed = ref(false);
const isLoading = ref(false); // Для состояния загрузки

function submitNickname() {
  try {
    schema.parse(formData.value);
    currentStep.value = "agreement";
  } catch (err) {
    console.error(err);
  }
}

async function acceptAgreement() {
  if (!isAgreed.value || !formData.value.nickname) return;
  isLoading.value = true;
  try {
    await register(formData.value.nickname);
    router.push({ name: "posts" });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="flex min-h-screen w-full items-center justify-center p-4">
    <div
      class="absolute top-45 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-[#38367F] shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
    <div class="w-full max-w-md space-y-6">
      <!-- Шаг 1: Ввод никнейма -->
      <div v-if="currentStep === 'nickname'" class="space-y-6">
        <div class="text-center">
          <h1 class="text-3xl font-old-standard tracking-tight text-white">
            Durov Fans
          </h1>
          <p class="mt-2 text-sm text-purple-200">
            Создайте уникальный никнейм для вашего профиля
          </p>
        </div>

        <form
          @submit.prevent="submitNickname"
          class="space-y-4 rounded-xl bg-gray-800/80 backdrop-blur-sm p-6 shadow-lg border border-gray-700"
        >
          <div class="space-y-2">
            <Label for="nickname" class="text-purple-100">Никнейм</Label>
            <Input
              id="nickname"
              v-model="formData.nickname"
              placeholder="Введите ваш никнейм"
              class="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <Button
            type="submit"
            class="w-full bg-[#38367F] bg-[#38367F] text-white font-medium"
          >
            Продолжить
          </Button>
        </form>
      </div>

      <!-- Шаг 2: Пользовательское соглашение -->
      <div v-else class="space-y-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-white">
            Пользовательское соглашение
          </h1>
          <p class="mt-2 text-sm text-purple-200">Завершите регистрацию</p>
        </div>

        <div
          class="space-y-6 rounded-xl bg-gray-800/80 backdrop-blur-sm p-6 shadow-lg border border-gray-700"
        >
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-white">1. Общие положения</h2>
            <p class="text-purple-200">
              Добро пожаловать в наше сообщество! Данное соглашение регулирует
              использование нашей платформы.
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-white">
              2. Возрастные ограничения
            </h2>
            <p class="text-purple-200">
              Для использования сервиса вам должно быть не менее 18 лет.
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-white">
              3. Контент и публикации
            </h2>
            <p class="text-purple-200">
              Вы несете ответственность за публикуемый контент.
            </p>
            <ul class="ml-6 list-disc space-y-2 text-purple-200">
              <li>Запрещён оскорбительный контент</li>
              <li>Запрещено нарушение авторских прав</li>
              <li>Запрещён спам</li>
            </ul>
          </div>

          <div
            class="rounded-lg border border-purple-500/30 bg-purple-1000/20 p-6"
          >
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-purple-300">
                Подтверждение
              </h2>
              <p class="text-purple-200">
                Подтверждаю, что мне исполнилось 18 лет и я принимаю условия
                соглашения.
              </p>
              <div class="flex items-center space-x-2">
                <Checkbox
                  id="agreement"
                  v-model:checked="isAgreed"
                  @click="isAgreed = !isAgreed"
                  required
                  class="border-purple-400 data-[state=checked]:bg-purple-500"
                />
                <Label for="agreement" class="text-purple-300"
                  >Я согласен с условиями</Label
                >
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <Button
              variant="outline"
              class="flex-1 border-none bg-[#38367F]"
              @click="
                () => {
                  currentStep = 'nickname';
                  if (isAgreed) isAgreed = !isAgreed;
                }
              "
            >
              Назад
            </Button>
            <Button
              @click="acceptAgreement"
              :disabled="!isAgreed || isLoading"
              class="flex-1 bg-[#38367F] hover:bg-purple-700 text-white font-medium"
              :class="{
                'cursor-not-allowed opacity-50': !isAgreed || isLoading,
              }"
            >
              <span v-if="!isLoading">Завершить регистрацию</span>
              <span v-else>Обработка...</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
