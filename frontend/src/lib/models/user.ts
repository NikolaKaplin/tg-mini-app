export interface User {
    id: number;
    tgid: string;
    first_name: string;
    last_name: string;
    user_name: string;
    user_name_locale: string;
    photo_url: string;
    is_banned: boolean;
}

export interface DisplayUser {
    display_name: string
    description: string
    avatar_url: string
    banner_url: string
}

export interface History {
    amount: number,
    history_type: boolean
}