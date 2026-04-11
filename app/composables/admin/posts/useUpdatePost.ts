import axios from 'axios';
import type { Payload } from './useCreatePost';
import adminApi from '~/api/admin-api';

export const useUpdatePost = () => {

  const config = useRuntimeConfig();

  const err = ref<string>('');
  const isLoading = ref<boolean>(false);

  const updatePost = async (id: number, body: Payload) => {
    isLoading.value = true;
    err.value = '';

    try {
      await adminApi.patch(
        `/posts`,
        {
          title:            body.title,
          excerpt:          body.excerpt,
          featured_image:   body.featuredImage,
          content:          body.content,
          conclusion:       body.conclusion,
          reading_time:     body.readTime,
          status:           body.status,
          meta_description: body.metaDescription,
          category_id:      body.category,
          tags:             body.tags,
          slug:             body.slug,
        },
        {
          params: {
            id: `eq.${id}`,
          },
          headers: {
            Prefer:        'return=minimal',
          },
        }
      );

      navigateTo('/admin/blogs');

    } catch (e: any) {
      
      err.value = e.response?.data?.message ?? e.message;

    } finally {

      isLoading.value = false;
      
    }
  };

  return {
    updatePost,
    err,
    isLoading,
  };

};
