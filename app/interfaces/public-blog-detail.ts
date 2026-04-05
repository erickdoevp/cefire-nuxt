export interface PublicBlogDetail {
  slug:             string;
  title:            string;
  excerpt:          string;
  conclusion:       string;
  content:          any;
  tags:             string[];
  readTime:         number;
  featuredImage:    string;
  metaDescription:  string;
  status:           string;
  createdAt:        string;
  category:         PublicBlogDetailCategory;
  author:           PublicBlogDetailAuthor;
}

export interface PublicBlogDetailCategory {
  id:              number;
  name:            string;
  chip_color:      string;
  text_chip_color: string;
}

export interface PublicBlogDetailAuthor {
  name:             string;
  first_last_name:  string;
  second_last_name: string | null;
}
