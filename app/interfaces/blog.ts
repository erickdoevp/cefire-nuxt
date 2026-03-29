export interface Blog {
    id:         number;
    title:      string;
    updated_at: Date;
    status:     string;
    category:   Category;
    user:       User;
}

export interface Category {
    id:                 number;
    name:               string;
    chip_color:         string; 
    text_chip_color:    string;
}

export interface User {
    name: string;
    first_last_name:    string;
    second_last_name:   string;
}