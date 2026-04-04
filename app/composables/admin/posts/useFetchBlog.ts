import type { BlogById } from "~/interfaces/fetch-blog-id";

export const useFetchBlog = (id: number) => {
  const { $supabase } = useNuxtApp();

  const blog = ref<BlogById | null>(null);
  const loading = ref<boolean>(false);

  const fetchBlog = async () => {

  loading.value = true;

  const { data, error } = await $supabase
    .from('posts')
    .select(`
      id,
      title,
      category:categories (id, name),
      content,
      conclusion,
      excerpt,
      readTime:reading_time,
      status,
      metaDescription:meta_description,
      featuredImage:featured_image,
      tags,
      slug
    `)
    .eq('id', id)
    .single();

    if(error) {
      console.error('Error fetching blog:', error);
      blog.value = null;
    } else {
      blog.value = {...data, category: data.category as unknown as BlogById['category']};
    }
    loading.value = false;

  }
  
  return {
    blog,
    loading,
    fetchBlog
  }

};