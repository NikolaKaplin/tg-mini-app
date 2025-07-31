<script lang="ts" setup>
import { provide } from "vue";
import { FormField } from "@/shared/keys";

const { name } = defineProps<{
    label?: string;
    errors?: string[];
    name: string;
}>();

provide(FormField, {
    name: name,
});
</script>

<template>
    <div class="space-y-1.5">
        <div class="flex flex-col gap-1">
            <label v-if="label" :for="name">{{ label }}</label>
            <slot />
        </div>
        <div v-if="errors" class="text-error">
            <p v-for="err in errors ?? []" :key="err">{{ err }}</p>
        </div>
    </div>
</template>
