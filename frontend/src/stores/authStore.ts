import GovnoLogger from "@/lib/logger";
import type { User } from "@/lib/models/user";
import { retrieveLaunchParams } from "@telegram-apps/sdk-vue";
import axios, { type AxiosRequestConfig } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";


type AuthResponse = {
    token: string,
    user: User
}

const { initDataRaw } = retrieveLaunchParams();

export const useAuthStore = defineStore('authStore', () => {
    const isValidate = ref<boolean>(false)
    const token = ref<string | null>(null)
    const user = ref<User | null>(null)

    const HttpStatusCode = axios.HttpStatusCode;
    const SERVER_URL = import.meta.env.VITE_API_URL;

    function setUser(userData: User) {
        user.value = userData;
        localStorage.setItem('user', JSON.stringify(userData))
    }

    function setToken(newToken: string) {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    }

    async function register(userName: string) {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: `${SERVER_URL}/auth/register`,
                data: {
                    initData: initDataRaw,
                    userNameLocale: userName,
                    serviceId: 1,
                },
            }
            const response = await axios.request<AuthResponse>(config);
            if (response.status == HttpStatusCode.Ok) {
                setToken(response.data.token)
            } else if (response.status == HttpStatusCode.Conflict) {
                await validate()
            }
        } catch (error) {
            GovnoLogger.error("Register error: " + error)
        }

    }

    async function validate() {
        GovnoLogger.info("Валидация пользователя")
        const router = useRouter()

        if (initDataRaw) {
            try {
                const config: AxiosRequestConfig = {
                    method: 'post',
                    url: `${SERVER_URL}/auth/validate`,
                    data: {
                        initData: initDataRaw,
                        serviceId: 1,
                    },

                }
                const response = await axios.request<AuthResponse>(config)
                if (response.status == HttpStatusCode.Ok && response.data.user.id != 0) {
                    setToken(response.data.token);
                    setUser(response.data.user);
                    token.value = response.data.token
                    GovnoLogger.info("Успех")
                } else if (response.status == HttpStatusCode.Unauthorized) {
                    await router.replace({ name: 'register' });
                }
            } catch (error) {
                GovnoLogger.error("Validate error: " + error)
            }
        } else {
            //Иди нахуй
        }
    }


    return { validate, register, isValidate, user, token }
})
