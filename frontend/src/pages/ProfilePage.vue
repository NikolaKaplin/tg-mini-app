<template>
  <div :class="`bg-gray-100 relative`">
    <!-- Banner -->
    <div
      v-if="!loading && profile.banner_url"
      :class="`h-40 z-30 duration-300 relative ${
        drawerOpen ? 'blur-xl' : ''
      } bg-cover bg-center relative`"
      :style="{ backgroundImage: `url(${profile.banner_url})` }"
    ></div>
    <div v-else class="h-40 bg-gray-300 animate-pulse"></div>

    <!-- Profile Info -->
    <div
      :class="`bg-white duration-300 z-40 relative rounded-t-3xl -mt-10 ${
        drawerOpen ? 'blur-xl' : ''
      } p-4 pb-20`"
    >
      <div class="flex items-center space-x-4">
        <div v-if="!loading && profile.avatar_url">
          <img
            class="w-20 h-20 rounded-full border-4 border-white"
            :src="profile.avatar_url"
            alt="avatar"
          />
        </div>
        <div
          v-else
          class="w-20 h-20 rounded-full bg-gray-300 animate-pulse"
        ></div>

        <div>
          <h2 class="text-lg font-semibold">
            <span v-if="!loading"
              >@{{ profile.display_name || "Пользователь" }}</span
            >
            <span
              v-else
              class="block w-24 h-4 bg-gray-300 animate-pulse rounded"
            ></span>
          </h2>
          <div class="flex space-x-4 text-sm text-gray-600">
            <span v-if="!loading">{{ posts.length }} Постов</span>
            <span
              v-else
              class="block w-12 h-3 bg-gray-300 animate-pulse rounded"
            ></span>
            <span v-if="!loading"
              >{{ profile.subs_amount || 0 }} Подписчиков</span
            >
            <span
              v-else
              class="block w-16 h-3 bg-gray-300 animate-pulse rounded"
            ></span>
          </div>
        </div>
      </div>
      <p class="mt-4 text-sm text-gray-700">
        <span v-if="!loading">{{ profile.description || "Нет описания" }}</span>
        <span
          v-else
          class="block w-2/3 h-4 bg-gray-300 animate-pulse rounded"
        ></span>
      </p>
      <div class="mt-4 flex gap-3">
        <button
          v-if="!loading"
          @click="openSubscriptionDrawer"
          class="flex-1 bg-indigo-800 text-white py-2 rounded-full"
        >
          + Подписаться
        </button>
        <div
          v-else
          class="flex-1 h-10 bg-gray-300 rounded-full animate-pulse"
        ></div>
        <button
          v-if="!loading"
          class="flex-1 border border-indigo-800 text-indigo-800 py-2 rounded-full"
        >
          $ Отправить донат
        </button>
        <div
          v-else
          class="flex-1 h-10 bg-gray-300 rounded-full animate-pulse"
        ></div>
      </div>

      <!-- Posts Grid -->
      <div class="grid grid-cols-2 gap-3 mt-6">
        <template v-if="!loading">
          <div
            v-for="(post, i) in posts"
            :key="post.id || i"
            @click="router.push({ name: 'posts', params: { id: post.id } })"
            class="aspect-square cursor-pointer rounded-xl flex items-center justify-center text-center text-white text-sm"
            :class="i % 2 === 0 ? 'bg-white border' : 'bg-black'"
          >
            <img
              v-if="post.media && post.media[0]"
              :src="post.media[0]"
              class="w-full h-full object-cover rounded-xl"
              alt="Post image"
            />
            <div v-else class="text-gray-500">Нет изображения</div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="i in 4"
            :key="i"
            class="aspect-square bg-gray-300 animate-pulse rounded-xl"
          ></div>
        </template>
      </div>
    </div>

    <!-- Subscription Drawer -->
    <transition name="slide-up-full">
      <div
        v-if="drawerOpen"
        class="fixed inset-0 z-[100]"
        @click.self="closeDrawer"
      >
        <div
          ref="drawer"
          class="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl p-4 pb-8 z-[110] max-h-[90%] overflow-y-auto touch-pan-y"
          :style="{ transform: `translateY(${translateY}px)` }"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
        >
          <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 class="text-lg font-semibold mb-4 text-center">
            Выберите уровень подписки
          </h3>

          <div class="space-y-2">
            <div
              v-for="(tier, index) in subscriptionTiers"
              :key="index"
              :class="[
                'border rounded-xl p-3 cursor-pointer',
                selectedTierIndex === index
                  ? 'border-indigo-600'
                  : 'border-gray-300',
              ]"
              @click="selectTier(index)"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-semibold">
                    {{ tier?.tier_name || "Без названия" }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ tier?.description || "Нет описания" }}
                  </div>
                </div>
                <div class="text-[#393781] font-bold">
                  ${{ tier?.tier_price || 0 }}/месяц
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedTier" class="mt-4 border rounded-xl p-3">
            <div class="flex justify-between items-center">
              <div>
                <div class="font-medium">{{ selectedTier?.tier_name }}</div>
                <div class="text-sm text-gray-500">Ежемесячное продление</div>
              </div>
              <div class="text-[#393781] font-bold">
                ${{ selectedTier?.tier_price }}
              </div>
            </div>
            <div
              class="mt-2 bg-green-100 text-green-800 px-3 py-2 rounded-xl flex items-center justify-between"
            >
              <div class="font-medium">Ваш баланс</div>
              <div class="font-bold">Баланс$</div>
            </div>
          </div>

          <button
            class="w-full mt-4 bg-tabs-active text-white py-3 rounded-full"
            @click="submitSubscription"
          >
            Оформить подписку
          </button>

          <p class="text-xs text-center text-gray-500 mt-2">
            Подписка будет автоматически продлеваться каждый месяц. Вы можете
            отменить её в любое время в настройках профиля.
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { DisplayUser } from "@/lib/models/user";
import { useAuthStore } from "@/stores/auth";
import authedAxios from "@/lib/axiosClient";

const profile = ref<DisplayUser>({
  display_name: "",
  description: "",
  avatar_url: "",
  banner_url: "",
});

const drawerOpen = ref(false);
const subscriptionTiers = ref<Array<any>>([]);
const selectedTierIndex = ref<number | null>(null);
const loading = ref(true);
const router = useRouter();
const drawer = ref<HTMLElement | null>(null);
const translateY = ref(0);
const posts = ref<Array<any>>([]);
const route = useRoute();

const { user } = useAuthStore();

let startY = 0;
let currentY = 0;
let dragging = false;

const fetchData = async () => {
  try {
    loading.value = true;

    if (!user?.id) {
      console.error("User ID is not available");
      return;
    }

    const [userRes, subRes, postRes] = await Promise.all([
      authedAxios.get("/creator/user/get_user", {
        params: { user_id: user.id },
      }),
      authedAxios.get("/creator/profile/get_subs", {
        params: { user_id: user.id },
      }),
      authedAxios.post("/posts/allPostByCreator", {
        creator_id: user.id,
      }),
    ]);
    console.log(userRes.data);
    // profile.value = userRes.data[0] || {};
    posts.value = postRes.data?.posts || [];
    subscriptionTiers.value = subRes.data || [];
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const selectedTier = computed(() => {
  return selectedTierIndex.value !== null
    ? subscriptionTiers.value[selectedTierIndex.value]
    : null;
});

const openSubscriptionDrawer = () => {
  translateY.value = 0;
  drawerOpen.value = true;
};

const closeDrawer = () => {
  drawerOpen.value = false;
};

const selectTier = (index: number) => {
  selectedTierIndex.value = index;
};

const startDrag = (e: TouchEvent) => {
  dragging = true;
  startY = e.touches[0].clientY;
};

const onDrag = (e: TouchEvent) => {
  if (!dragging) return;
  currentY = e.touches[0].clientY;
  const diff = currentY - startY;
  if (diff > 0) translateY.value = diff;
};

const endDrag = () => {
  dragging = false;
  if (translateY.value > 100) {
    closeDrawer();
  } else {
    translateY.value = 0;
  }
};

const submitSubscription = async () => {
  if (!selectedTier.value) return;

  try {
    const payload = {
      tier_id:
        selectedTierIndex.value !== null ? selectedTierIndex.value + 1 : 0,
    };
    await authedAxios.post("/subscriptions", payload);
    closeDrawer();
  } catch (error) {
    console.error("Ошибка оформления подписки:", error);
  }
};
</script>

<style scoped>
.slide-up-full-enter-active,
.slide-up-full-leave-active {
  transition: all 0.3s ease;
}
.slide-up-full-enter-from,
.slide-up-full-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
