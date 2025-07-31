export interface Post {
    id: number;
    user_id: number;
    user_name: string;
    photo_url: string;
    description: string;
    media: string[];
    created_at: string;
    like_num: number;
    paid: boolean;
    sub_level: string;
}

export interface PostWithCommentsNum extends Post {
    comments_num: number
}

export interface PostWithFullComments extends Post {
    comments: Comment[]
}

export interface Comment {
    id: number
    userId: number
    postId: number
    description: string
    createdAt: Date
    updatedAt: Date
}

export interface ICreateComment {
    description: string,
    post_id: number
}

export interface IGetPost {
    post_id: number
}

export interface IGetPostByCreator {
    creator_id: number
}