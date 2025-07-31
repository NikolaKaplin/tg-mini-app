<script lang="ts" setup>
import FormField from "@/components/ui/FormField.vue";
import Input from "@/components/ui/Input.vue";
import UButton from "@/components/ui/Button.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { z } from "zod";

const schema = z.object({
    nickname: z.string().min(3, "Никнейм должен содержать минимум 3 символа"),
});

type Schema = z.infer<typeof schema>;

const router = useRouter();
const formData = ref<Partial<Schema>>({
    nickname: "",
});

function submit() {
    const data = schema.parse(formData.value);

    router.push({
        name: "license",
        query: data,
    });
}
</script>

<template>
    <main class="flex w-full items-center justify-center">
        <form
            class="bg-bg-main mx-5 my-10 flex w-full max-w-[400px] flex-col items-center gap-3 rounded-4xl p-6"
            @submit.prevent="submit"
        >
            <h1 class="mt-6 text-3xl font-bold">Регистрация</h1>
            <FormField class="w-full" label="Никнейм" name="">
                <Input
                    v-model="formData.nickname"
                    class="border-muted-border min-w-[250px] bg-white"
                />
            </FormField>
            <UButton class="w-full rounded-lg">Зарегистрироваться</UButton>
        </form>
    </main>
</template>

<style>
body {
    background: var(--bg-gradient) var(--color-bg-primary);
}
</style>
