import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useAdaptiveStore = defineStore("adaptiveStore", () => {
    const menuVisible = ref(true);

    const isKeyboardOpen = ref(false);
    const lastScrollPosition = ref(0);
    const inputFocusLocked = ref(false);
    const isTelegram = ref(false);
    const isIOS = ref(false);
    const isAndroid = ref(false);
    const platform = ref<"ios" | "android" | "unknown">("unknown");



    const initTelegram = () => {
        if (window.Telegram?.WebApp) {
            isTelegram.value = true;

            // Определение платформы
            const tgPlatform = window.Telegram.WebApp.platform?.toLowerCase();
            platform.value =
                tgPlatform === "ios" || tgPlatform === "android"
                    ? tgPlatform
                    : "unknown";

            isIOS.value = platform.value === "ios";
            isAndroid.value = platform.value === "android";

            console.log(`Detected platform: ${platform.value}`);
        }
    };
    const changeVisible = () => {
        menuVisible.value = !menuVisible.value;
    };

    const focusScroll = (e: Event) => {
        menuVisible.value = false;
        isKeyboardOpen.value = true;
        lastScrollPosition.value = window.scrollY;

        if (e.target) {
            const target = e.target as HTMLElement;
            target.dataset.scrollPosition = window.scrollY.toString();
        }
    };

    const focusScrollUnlock = (e: Event) => {
        menuVisible.value = true;
        isKeyboardOpen.value = false;

        if (e.target) {
            const target = e.target as HTMLElement;
            const savedPosition = target.dataset.scrollPosition;
            if (savedPosition) {
                setTimeout(() => {
                    window.scrollTo({
                        top: parseInt(savedPosition),
                        behavior: "smooth",
                    });
                }, 200);
            }
        }
    };

    const setInputFocusLock = (state: boolean) => {
        inputFocusLocked.value = state;
    };

    return {
        menuVisible,
        changeVisible,
        focusScroll,
        focusScrollUnlock,

        isKeyboardOpen,
        isTelegram,
        setInputFocusLock,
        initTelegram,

        isIOS,
        isAndroid,
        platform,

        get inputFocusLocked() {
            return inputFocusLocked.value;
        },
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdaptiveStore, import.meta.hot));
}