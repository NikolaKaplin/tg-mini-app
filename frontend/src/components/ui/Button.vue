<script lang="ts" setup>
import { cn } from "@/lib/utils";

defineProps<{
    variant?: keyof typeof variants;
}>();

const base =
    "inline-flex items-center justify-center rounded-2xl transition-colors focus:outline-none disabled:opacity-50 h-10 px-4 py-2";

const variants = {
    default: "bg-primary text-bg-main hover:bg-primary/90 active:bg-primary/80",
    ghost: "bg-transparent hover:bg-primary/10 active:bg-primary/20",
    solid: "border border-muted-border hover:bg-primary/10 active:bg-primary/20 rounded-lg",
};

defineOptions({
    inheritAttrs: false,
});
</script>

<template>
    <button
        :class="cn(base, variants[variant || 'default'], $attrs.class as string)"
        v-bind="$attrs"
    >
        <slot />
    </button>
</template>
