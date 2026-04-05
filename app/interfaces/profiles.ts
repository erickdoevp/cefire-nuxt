export interface Profile {
    id: string;
    name: string;
};

export interface UserProfile {
    id: string;
    name: string;
    first_last_name: string;
    second_last_name?: string | undefined;
    username: string;
    email: string;
    password?: string;
    role: string;
    phone?: string | undefined;
    avatar_img_url: string | null;
};
