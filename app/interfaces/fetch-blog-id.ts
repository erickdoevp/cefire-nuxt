export interface BlogById {
  id:               number;
  title:            string;
  category:         Category;
  content:          any;
  conclusion:       string;
  excerpt:          string;
  tags:             string[];
  readTime:         number;
  status:           'Draft' | 'Published';
  metaDescription:  string;
  featuredImage:    string;
}

export interface Category {
  id:               number;
  name:             string;
};