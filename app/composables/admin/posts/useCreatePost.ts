import { useAuthStore } from '~/store/admin/auth/authStore'

export interface Payload {
  title:           string;
  category:        number;
  content:         any;
  conclusion:      string;
  excerpt:         string;
  tags:            string[];
  readTime:        number;
  status:          'Draft' | 'Published';
  metaDescription: string;
  featuredImage:   string;
  slug:            string;
}

export const useCreatePost = () => {

  const { $supabase } = useNuxtApp();
  const auth = useAuthStore();
  
  const err = ref<string>('');
  const isLoading = ref<boolean>(false);

  const savePost = async (body: Payload) => {

    const { error } = await $supabase
      .from('posts')
      .insert({
        title: body.title,
        excerpt: body.excerpt,
        featured_image: body.featuredImage,
        content: body.content,
        conclusion: body.conclusion,
        reading_time: body.readTime,
        status: body.status,
        profile_id: auth.user?.id,
        meta_description: body.metaDescription,
        category_id: body.category,
        tags: body.tags,
        slug: body.slug
      });

      if(error?.message) {
        err.value = error.message;
        console.log(err.value);
      }

      isLoading.value = false;

  }


  return {
    savePost,
    err,
    isLoading
  }

}