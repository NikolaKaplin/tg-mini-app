import { ref, onMounted, onUnmounted } from 'vue';

const isKeyboardInput = (elem: HTMLElement): boolean => {
    return (
        (elem.tagName === 'INPUT' &&
            !['button', 'submit', 'checkbox', 'file', 'image'].includes(
                (elem as HTMLInputElement).type
            )) ||
        elem.hasAttribute('contenteditable')
    );
};

export const useIsOnScreenKeyboardOpen = () => {
    const isOpen = ref(false);

    const handleFocusIn = (e: FocusEvent) => {
        if (!e.target) return;
        const target = e.target as HTMLElement;
        if (isKeyboardInput(target)) {
            isOpen.value = true;
        }
    };

    const handleFocusOut = (e: FocusEvent) => {
        if (!e.target) return;
        const target = e.target as HTMLElement;
        if (isKeyboardInput(target)) {
            isOpen.value = false;
        }
    };

    onMounted(() => {
        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);
    });

    onUnmounted(() => {
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('focusout', handleFocusOut);
    });

    return isOpen;
};