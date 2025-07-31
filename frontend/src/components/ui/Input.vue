<script lang="ts" setup>
import { cn } from "@/lib/utils.js";
import { inject } from "vue";
import { FormField } from "@/shared/keys";

const props = defineProps<{ size?: keyof typeof sizes; name?: string }>();

const base = "rounded-md border-muted-border bg-white border p-2 focus:ring-0 focus:outline-none";

const sizes = {
    default: "h-10 w-full",
    sm: "h-8 w-full",
    lg: "h-12 w-full",
};

const value = defineModel();

const { name } = inject(FormField, {
    name: props.name,
});

defineOptions({
    inheritAttrs: false,
});
</script>

<template>
    <div class="relative flex w-full items-center">
        <div
            v-if="$slots['left-icon']"
            class="absolute left-1 inline-flex size-7 items-center justify-center"
        >
            <slot name="left-icon" />
        </div>
        <input
            :id="name"
            v-model="value"
            :class="
                cn(
                    base,
                    sizes[size || 'default'],
                    $slots['left-icon'] ? 'pl-8' : '',
                    $slots['right-icon'] ? 'pr-8' : '',
                    $attrs.class as string,
                )
            "
            :name="name"
            enterkeyhint="done"
            v-bind="$attrs"
            @focus="(e) => e.target?.scrollIntoView()"
            @keydown.enter="(e) => e.target?.blur()"
        />
        <div
            v-if="$slots['right-icon']"
            class="absolute right-1 inline-flex size-7 items-center justify-center"
        >
            <slot name="right-icon" />
        </div>
    </div>
</template>
