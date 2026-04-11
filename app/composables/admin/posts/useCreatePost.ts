import adminApi from '~/api/admin-api';
import { useAuthStore } from '~/store/admin/auth/authStore';

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

  const auth = useAuthStore();

  const err = ref<string>('');
  const isLoading = ref<boolean>(false);

  const savePost = async (body: Payload) => {
    isLoading.value = true;
    err.value = '';

    try {

      await adminApi.post(
        `/posts`,
        {
          title:            body.title,
          excerpt:          body.excerpt,
          featured_image:   body.featuredImage,
          content:          body.content,
          conclusion:       body.conclusion,
          reading_time:     body.readTime,
          status:           body.status,
          profile_id:       auth.user?.id,
          meta_description: body.metaDescription,
          category_id:      body.category,
          tags:             body.tags,
          slug:             body.slug,
        },
        {
          headers: {
            Prefer:        'return=minimal',
          },
        }
      );

      navigateTo('/admin/blogs');

    } catch (e: any) {
      
      err.value = e.response?.data?.message ?? e.message;
      console.error(err.value);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    savePost,
    err,
    isLoading,
  };

};
