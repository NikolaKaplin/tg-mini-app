import { viewport, viewportState, type ViewportState } from "@telegram-apps/sdk-vue";
import { defineStore } from "pinia"
import { on, off, type EventListener } from '@telegram-apps/bridge';
import { onMounted, ref } from "vue"
import WebApp from "@twa-dev/sdk";
import type { Platforms } from "@/lib/models/mini-app";

export const useMiniAppStore = defineStore('miniAppStore', () => {
    const isInitialized = ref<boolean>(false);
    const viewportStateLocal = ref<ViewportState | null>();
    const isKeyboardOpen = ref<boolean>(false)
    const platform = ref<Platforms>()
    const version = ref<number>()

    function init() {
        if (isInitialized.value && viewportStateLocal.value) return
        isInitialized.value = true

        if (viewport.isMounted()) {
            viewportStateLocal.value = viewportState()
            platform.value = WebApp.platform
            version.value = Number.parseFloat(WebApp.version)
        }

        on('viewport_changed', updateViewport);
    }

    const updateViewport: EventListener<'viewport_changed'> = (payload) => {
        console.log('Viewport changed:', payload);
        if (!viewportStateLocal.value) return;

        viewportStateLocal.value.stableHeight > viewportStateLocal.value.height ? isKeyboardOpen.value = true : isKeyboardOpen.value = false

        viewportStateLocal.value = {
            ...viewportStateLocal.value,
            height: payload.height,
            isExpanded: payload.is_expanded,
            stableHeight: viewportStateLocal.value.stableHeight,
            width: viewportStateLocal.value.width,
        };
    };

    init()
    return {
        viewportStateLocal, isInitialized, isKeyboardOpen, platform, version,
    }
}) 