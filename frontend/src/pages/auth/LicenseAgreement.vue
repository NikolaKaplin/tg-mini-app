<template>
    <main class="flex w-full items-center justify-center">
        <div
            class="bg-bg-main mx-5 my-10 flex w-full max-w-[700px] flex-col items-center gap-3 rounded-4xl p-3 sm:p-6"
      
        >
            <h1 class="mt-6 text-center text-3xl font-bold">Пользовательское соглашение</h1>
            <p class="text-gray-muted text-center">Условия использования</p>
            <div class="w-full space-y-3">
                <h2 class="ml-1 text-lg font-semibold">1. Общие положения</h2>
                <p class="text-gray-muted">
                    Добро пожаловать в Durov Fans! Данное соглашение регулирует использование нашей
                    платформы. Регистрируясь и используя наш сервис, вы соглашаетесь с условиями,
                    изложенными ниже.
                </p>
            </div>
            <div class="w-full space-y-3">
                <h2 class="ml-1 text-lg font-semibold">2. Возрастные ограничения</h2>
                <p class="text-gray-muted">
                    Для использования нашей социальной сети вам должно быть не менее 18 лет. Мы
                    серьезно относимся к защите несовершеннолетних и требуем подтверждения возраста
                    при регистрации.
                </p>
            </div>
            <div class="w-full space-y-3">
                <h2 class="ml-1 text-lg font-semibold">3. Контент и публикации</h2>
                <div>
                    <p class="text-gray-muted">
                        Вы несете полную ответственность за контент, который публикуете в социальной
                        сети.
                        <br />
                        Запрещается размещение:
                    </p>
                    <ul class="text-gray-muted ml-2 list-inside list-disc">
                        <li>Оскорбительного или дискриминационного контента</li>
                        <li>Материалов, нарушающих авторские права</li>
                        <li>Спама или рекламы без разрешения</li>
                    </ul>
                </div>
            </div>
            <div class="w-full space-y-3 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-6">
                <h2 class="text-lg font-semibold text-[#1E40AF]">Подтверждение возраста</h2>
                <p class="text-[#1D4ED8]">
                    Подтверждаю, что мне исполнилось 18 лет и я имею право заключать данное
                    соглашение.
                </p>
                <div class="flex gap-3">
                    <label class="flex items-center font-medium text-[#1E40AF]" for="agreement">
                        <input
                            id="agreement"
                            
                            class="peer"
                            hidden
                            required
                            name="agreement"
                            type="checkbox"
                        />
                        <span
                            class="mr-2 inline-flex size-5 items-center justify-center border-[0.5px] p-1 after:absolute peer-checked:after:content-['✖']"
                        />
                        Да, мне есть 18 лет
                    </label>
                </div>
            </div>
            <button class="w-full rounded-lg">Принять соглашение</button>
        </div>
    </main>
</template>

<style>
body {
    background: var(--bg-gradient) var(--color-bg-primary);
}
</style>
