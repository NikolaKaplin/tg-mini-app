import { swipeBehavior, viewport, viewportState, type ViewportState } from "@telegram-apps/sdk-vue";
import { defineStore } from "pinia"
import { on, off, type EventListener } from '@telegram-apps/bridge';
import { onMounted, ref } from "vue"

export const useViewportStore = defineStore('viewportStore', () => {
    const isInitialized = ref<boolean>(false);
    const viewport = ref<ViewportState | null>();
    const isKeyboardOpen = ref<boolean>(false)

    function init() {
        isInitialized.value = true

        console.log("Swipe status: " + swipeBehavior.enableVertical())
        viewport.value = viewportState()

        on('viewport_changed', updateViewport);
    }

    const updateViewport: EventListener<'viewport_changed'> = (payload) => {
        console.log('Viewport changed:', payload);
        if (!viewport.value) return;

        viewport.value.stableHeight > viewport.value.height ? isKeyboardOpen.value = true : isKeyboardOpen.value = false

        viewport.value = {
            ...viewport.value,
            height: payload.height,
            isExpanded: payload.is_expanded,
            stableHeight: viewport.value.stableHeight,
            width: viewport.value.width,
        };
    };

    init()
    return {
        viewport, isInitialized, isKeyboardOpen
    }
}) 