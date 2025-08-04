import { useAuthStore } from "@/stores/auth";

export async function authedFetch(url: string, init?: RequestInit) {
    const authStore = useAuthStore();

    const tokenPromise = new Promise<string>((resolve) => {
        const interval = setInterval(() => {
            if (authStore.token) {
                clearInterval(interval);
                resolve(authStore.token);
            }
        }, 100);
    });

    return await fetch(url, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: `Bearer ${await tokenPromise}`,
        },
    });
}