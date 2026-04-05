export interface PublicBlog {
    slug:       string;
    title:      string;
    excerpt:    string;
    updatedAt: Date;
    status:     string;
    readingTime: number;
    featuredImage: string;
    category:   Category;
    user:       User;
}

export interface Category {
    name:               string;
    chip_color:         string; 
    text_chip_color:    string;
}

export interface User {
    name: string;
    first_last_name:    string;
    second_last_name:   string;
}