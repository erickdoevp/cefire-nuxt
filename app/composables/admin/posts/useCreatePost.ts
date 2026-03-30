export interface Payload {
  title:           string;
  category:        number;
  content:         any;
  conclusion:      string;
  excerpt:         string;
  tags:            number[];
  readTime:        number;
  status:          'Draft' | 'Published';
  metaDescription: string;
  featuredImage:   string;
}

export const useCreatePost = () => {

  const { $supabase } = useNuxtApp();
  
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
        profile_id: '3e412a68-d2e9-4a58-a8d8-12ce5cfe357c',
        meta_description: body.metaDescription,
        category_id: body.category
      });

      if(error?.message) {
        err.value = error.message;
        console.log(err.value);
      }

      isLoading.value = false;

  }


  return {
    savePost,
    err
  }

}