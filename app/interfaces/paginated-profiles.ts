export interface PaginatedUserProfile {
    id: string;
    name: string;
    first_last_name: string;
    second_last_name?: string | undefined;
    username: string;
    email: string;
    role: string;
    phone?: string | undefined;
};
