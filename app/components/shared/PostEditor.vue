<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
// import Underline from '@tiptap/extension-underline' // yarn add @tiptap/extension-underline
import { computed, onBeforeUnmount } from 'vue'
import type { JSONContent } from '@tiptap/vue-3'
import { useUploadImage } from '~/composables/admin/cloudinary/useUploadImage'
import { useDeleteImage } from '~/composables/admin/cloudinary/useDeleteImage'
import type { Payload } from '~/composables/admin/posts/useCreatePost'
import type { BlogById } from '~/interfaces/fetch-blog-id'

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const emit = defineEmits(['post-data']);
const props = defineProps<{
  categoryList: { label: string, value: number }[],
  isLoading: boolean,
  post?: BlogById
}>();

const { upload, uploading, uploadError } = useUploadImage();
const { deleteImage } = useDeleteImage();

const featuredImage = ref<File | null>(null);
const form = reactive<{
  title: string,
  category: number | undefined,
  excerpt: string,
  conclusion: string,
  tags: string[],
  status: 'Draft' | 'Published',
  metaDescription: string,
  featuredImage: string | null,
  featuredImagePreview: string | null,
  slug: string | undefined
}>({
  title: '',
  excerpt: '',
  conclusion: '',
  category: undefined as number | undefined,
  tags: [] as string[],
  status: 'Draft',
  metaDescription: '',
  featuredImage: '',
  featuredImagePreview: null as string | null,
  slug: undefined,
});

const editor = useEditor({
  content: { type: 'doc', content: [] },
  extensions: [
    StarterKit,
    Image,
    Link.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: 'Empieza a escribir tu post...' }),
    // Underline,
  ],
  editorProps: {
    transformPastedHTML(html) {
      const el = document.createElement('div')
      el.innerHTML = html

      // Reemplaza divs por párrafos para que Tiptap los entienda
      el.querySelectorAll('div').forEach(node => {
        const p = document.createElement('p')
        p.innerHTML = node.innerHTML
        node.replaceWith(p)
      })

      // Elimina elementos no soportados por StarterKit
      el.querySelectorAll('table, thead, tbody, tr, td, th, iframe, script, style, form').forEach(node => {
        node.replaceWith(document.createTextNode(node.textContent ?? ''))
      })

      // Limpia atributos de estilo y clase que pueden traer CSS externo
      el.querySelectorAll('[style], [class]').forEach(node => {
        node.removeAttribute('style')
        node.removeAttribute('class')
      })

      return el.innerHTML
    },
  },
})

const wordCount = computed(() => {
  const text = editor.value?.getText() ?? ''
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
})
const charCount = computed(() => editor.value?.getText().length ?? 0)
const readTime = computed(() => Math.max(1, Math.ceil(wordCount.value / 200)))

const replaceFeaturedImage = (file: File) => {
  // Si ya había una imagen en Cloudinary, la eliminamos
  if (form.featuredImage) {
    deleteImage(form.featuredImage)
    form.featuredImage = null
  }
  featuredImage.value = file
  form.featuredImagePreview = URL.createObjectURL(file)
}

const onFeaturedImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if(!target.files) return;
  const file = target.files[0]
  if (!file) return
  replaceFeaturedImage(file)
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  const file = e.dataTransfer?.files[0]
  if (!file) return
  replaceFeaturedImage(file)
}

const onEditorImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  editor.value?.chain().focus().setImage({ src: URL.createObjectURL(file) }).run()
}

const setLink = () => {
  const url = prompt('Ingresa la URL')
  if (url) {
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }
}

const replaceBlobImages = async (node: JSONContent): Promise<JSONContent> => {
  if (node.type === 'image' && node.attrs?.src?.startsWith('blob:')) {
    const blob = await fetch(node.attrs.src).then(r => r.blob())
    const file = new File([blob], 'image', { type: blob.type })
    const url = await upload(file)
    return { ...node, attrs: { ...node.attrs, src: url ?? node.attrs.src } }
  }
  if (node.content?.length) {
    return { ...node, content: await Promise.all(node.content.map(replaceBlobImages)) }
  }
  return node
}

const uploadPendingImages = async (): Promise<boolean> => {
  if (featuredImage.value) {
    const url = await upload(featuredImage.value)
    if (!url) return false
    form.featuredImage = url
  }

  const content = editor.value?.getJSON()
  if (content) {
    const updated = await replaceBlobImages(content)
    editor.value?.commands.setContent(updated)
  }

  return !uploadError.value
}

const postData = (): Payload => ({
  title: form.title,
  category: form.category!,
  content: editor.value?.getJSON(),
  conclusion: form.conclusion,
  excerpt: form.excerpt,
  tags: form.tags.map(t => t.trim()).filter(Boolean),
  readTime: readTime.value,
  status: form.status,
  metaDescription: form.metaDescription,
  featuredImage: form.featuredImage!,
  slug: form.slug!
});

const hadleSubmit = async (status: 'Draft' | 'Published') => {
  form.status = status
  const ok = await uploadPendingImages()
  console.log(ok);
  
  if (!ok) return
  emit('post-data', postData())
};

/* ─── Populate form when editing ───────────────────────── */
watch(() => props.post, (post) => {
  
  if (!post) return

  form.title                = post.title
  form.excerpt              = post.excerpt
  form.conclusion           = post.conclusion
  form.category             = post.category.id
  form.tags                 = post.tags ?? []
  form.status               = post.status
  form.metaDescription      = post.metaDescription
  form.featuredImage        = post.featuredImage
  form.featuredImagePreview = post.featuredImage
  form.slug                 = post.slug

  if (editor.value && post.content) {
    editor.value.commands.setContent(post.content)
  }
}, { immediate: true })

// Si el editor no estaba listo cuando llegó el post, lo setea al inicializarse
watch(editor, (instance) => {
  if (instance && props.post?.content) {
    instance.commands.setContent(props.post.content)
  }
}, { once: true })

onBeforeUnmount(() => editor.value?.destroy());

</script>

<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-950">

    <!-- ── Header ──────────────────────────────────────────────── -->
    <div class="flex items-center flex-wrap gap-4 md:gap-0 md:justify-between border-b border-gray-200 dark:border-gray-800 bg-white pb-6">
      <div class="flex gap-4">
        <UButton 
          icon="mdi:keyboard-backspace" 
          class="w-6 h-6 text-black cursor-pointer hover:text-gray-600" 
          to="/admin/blogs"
          variant="link"
          />
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Crear Nuevo Post</h1>
      </div>
      <div class="flex items-center gap-2">
        <UButton :disabled="isLoading" variant="outline" :icon="isLoading ? 'i-lucide-loader' : 'mdi:eraser'" color="neutral" @click="hadleSubmit('Draft')">
          Guardar Borrador
        </UButton>
        <UButton :disabled="isLoading" color="primary" :icon="isLoading ? 'i-lucide-loader' : 'i-lucide-send'" @click="hadleSubmit('Published')">
          Publicar
        </UButton>
      </div>
    </div>

    <!-- ── Body: two-column ────────────────────────────────────── -->
    <div class="flex flex-col md:flex-row gap-6 p-0 md:p-6 overflow-auto">

      <!-- ── Left: title + editor ──────────────────────────────── -->
      <div class="flex flex-col flex-1 gap-4 min-w-0">

        <!-- Post Title -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Título del post</label>
          <UInput
            v-model="form.title"
            placeholder="Ingresa el título del post..."
            size="lg"
            class="w-full"
          />
        </div>

        <!-- Extract -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Extracto del post</label>
          <UInput
            v-model="form.excerpt"
            placeholder="Ingresa un resumen corto del post..."
            size="lg"
            class="w-full"
          />
        </div>

        <!-- Rich Text Editor -->
        <div class="flex flex-col flex-1 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

          <!-- Toolbar -->
          <div class="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">

            <!-- Text format -->
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('bold') }"
              title="Bold" @click="editor?.chain().focus().toggleBold().run()"
            >
              <span class="font-bold text-sm">B</span>
            </button>
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('italic') }"
              title="Italic" @click="editor?.chain().focus().toggleItalic().run()"
            >
              <span class="italic text-sm">I</span>
            </button>
            <!-- Underline: uncomment after installing @tiptap/extension-underline -->
            <!-- <button class="toolbar-btn" :class="{ 'is-active': editor?.isActive('underline') }"
              title="Underline" @click="editor?.chain().focus().toggleUnderline().run()">
              <span class="underline text-sm">U</span>
            </button> -->
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('strike') }"
              title="Strikethrough" @click="editor?.chain().focus().toggleStrike().run()"
            >
              <span class="line-through text-sm">S</span>
            </button>
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('code') }"
              title="Inline code" @click="editor?.chain().focus().toggleCode().run()"
            >
              <UIcon name="i-lucide-code" class="w-4 h-4" />
            </button>

            <div class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

            <!-- Headings -->
            <button
              v-for="level in [1, 2, 3, 4, 5, 6]"
              :key="level"
              class="toolbar-btn text-xs font-semibold"
              :class="{ 'is-active': editor?.isActive('heading', { level }) }"
              :title="`Heading ${level}`"
              @click="editor?.chain().focus().toggleHeading({ level: level as Level }).run()"
            >
              H{{ level }}
            </button>

            <div class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

            <!-- Lists & blocks -->
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('blockquote') }"
              title="Blockquote" @click="editor?.chain().focus().toggleBlockquote().run()"
            >
              <UIcon name="i-lucide-quote" class="w-4 h-4" />
            </button>
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('codeBlock') }"
              title="Code block" @click="editor?.chain().focus().toggleCodeBlock().run()"
            >
              <UIcon name="i-lucide-terminal" class="w-4 h-4" />
            </button>
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('bulletList') }"
              title="Bullet list" @click="editor?.chain().focus().toggleBulletList().run()"
            >
              <UIcon name="i-lucide-list" class="w-4 h-4" />
            </button>
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('orderedList') }"
              title="Ordered list" @click="editor?.chain().focus().toggleOrderedList().run()"
            >
              <UIcon name="i-lucide-list-ordered" class="w-4 h-4" />
            </button>

            <div class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

            <!-- Link & image -->
            <button
              class="toolbar-btn" :class="{ 'is-active': editor?.isActive('link') }"
              title="Insert link" @click="setLink"
            >
              <UIcon name="i-lucide-link" class="w-4 h-4" />
            </button>
            <label class="toolbar-btn cursor-pointer" title="Insert image">
              <UIcon name="i-lucide-image" class="w-4 h-4" />
              <input type="file" accept="image/*" class="hidden" @change="onEditorImageChange">
            </label>

            <div class="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

            <!-- Undo / Redo -->
            <button
              class="toolbar-btn" title="Undo"
              @click="editor?.chain().focus().undo().run()"
            >
              <UIcon name="i-lucide-undo-2" class="w-4 h-4" />
            </button>
            <button
              class="toolbar-btn" title="Redo"
              @click="editor?.chain().focus().redo().run()"
            >
              <UIcon name="i-lucide-redo-2" class="w-4 h-4" />
            </button>
          </div>

          <!-- Content area -->
          <EditorContent :editor="editor" class="editor-content flex-1 px-5 py-4" />

          <!-- Footer: stats -->
          <div class="flex items-center justify-between px-5 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-gray-400">
            <span>{{ wordCount }} words · {{ charCount }} characters</span>
            <span>{{ readTime }} min read</span>
          </div>
        </div>

        <!-- Conclusión -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Conclusión del post</label>
          <textarea
            v-model="form.conclusion"
            placeholder="Ingresa la conclusión del post..."
            rows="4"
            class="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <!-- ── Right: sidebar ─────────────────────────────────────── -->
      <div class="flex flex-col gap-4 w-full md:w-72 shrink-0">

        <!-- Status -->
        <!-- <div class="sidebar-card">
          <h3 class="sidebar-title">Estatus</h3>
          <div class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              class="flex-1 py-1.5 text-sm font-medium transition-colors"
              :class="form.status === 'Draft'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'"
            >
              Borrador
            </button>
            <button
              class="flex-1 py-1.5 text-sm font-medium transition-colors"
              :class="form.status === 'Published'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'"
            >
              Publicado
            </button>
          </div>
        </div> -->

        <div class="sidebar-card">
          <h3 class="sidebar-title">Slug</h3>
          <UInput
            v-model="form.slug"
            placeholder="Ingresa el slug del post..."
            size="md"
            class="w-full"
          />
        </div>

        <!-- Category -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Categoría</h3>
          <USelect
            v-model="form.category"
            :items="categoryList"
            placeholder="Selecciona una categoría"
            class="w-full"
          />
        </div>

        <!-- Tags -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Tags</h3>
          <UInputTags v-model="form.tags" color="neutral" />
        </div>

        <!-- Featured Image -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Imagen destacada</h3>
          <label
            class="flex flex-col items-center justify-center gap-2 w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-400 transition-colors overflow-hidden"
            @dragover.prevent
            @drop="onDrop"
          >
            <template v-if="uploading">
              <UIcon name="i-lucide-loader-circle" class="w-7 h-7 text-primary-400 animate-spin" />
              <span class="text-xs text-gray-500">Subiendo imagen...</span>
            </template>
            <template v-else-if="form.featuredImagePreview">
              <img :src="form.featuredImagePreview" class="w-full h-full object-cover" alt="Featured">
            </template>
            <template v-else>
              <UIcon name="i-lucide-upload-cloud" class="w-7 h-7 text-gray-400" />
              <span class="text-xs text-gray-500 text-center">
                Arrastra aquí la imagen<br>
                <span class="text-gray-400">JPG, PNG, up to 5MB</span>
              </span>
            </template>
            <p v-if="uploadError" class="text-xs text-red-500 text-center px-2">{{ uploadError }}</p>
            <input type="file" accept="image/*" class="hidden" @change="onFeaturedImageChange">
          </label>
        </div>

        <!-- SEO Settings -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Ajustes SEO</h3>
          <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Meta Description</label>
          <textarea
            v-model="form.metaDescription"
            rows="4"
            placeholder="Escribe una descripción corta para SEO..."
            class="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p class="text-xs text-gray-400 mt-1 text-right">{{ form.metaDescription.length }}/160</p>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Toolbar buttons ─────────────────────────── */
.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  color: #6b7280;
  transition: background 0.1s, color 0.1s;
  cursor: pointer;
  background: transparent;
  border: none;
}

.toolbar-btn:hover {
  background: #e5e7eb;
  color: #111827;
}

.toolbar-btn.is-active {
  background: #dbeafe;
  color: #2563eb;
}

/* ── Editor content ──────────────────────────── */
.editor-content {
  min-height: 360px;
}

.editor-content :deep(.tiptap) {
  outline: none;
  min-height: 360px;
}

.editor-content :deep(h1) { font-size: 28px; font-weight: 700; margin: 16px 0 8px; }
.editor-content :deep(h2) { font-size: 22px; font-weight: 700; margin: 14px 0 6px; }
.editor-content :deep(h3) { font-size: 18px; font-weight: 600; margin: 12px 0 4px; }
.editor-content :deep(h4) { font-size: 16px; font-weight: 600; margin: 10px 0 4px; }
.editor-content :deep(p)  { margin: 8px 0; line-height: 1.7; }

.editor-content :deep(ul) { list-style: disc; padding-left: 20px; margin: 8px 0; }
.editor-content :deep(ol) { list-style: decimal; padding-left: 20px; margin: 8px 0; }
.editor-content :deep(li) { margin: 4px 0; }

.editor-content :deep(blockquote) {
  border-left: 3px solid #6b7280;
  margin: 12px 0;
  padding: 8px 16px;
  color: #6b7280;
  font-style: italic;
}

.editor-content :deep(code) {
  background: #f3f4f6;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.875em;
  font-family: monospace;
}

.editor-content :deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px 0;
  overflow-x: auto;
}

.editor-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.editor-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 8px 0;
}

.editor-content :deep(.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
  float: left;
  height: 0;
}

/* ── Sidebar cards ───────────────────────────── */
.sidebar-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-title {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

:is(.dark) .sidebar-card {
  border-color: #374151;
}

:is(.dark) .sidebar-title {
  color: #d1d5db;
}

:is(.dark) .toolbar-btn:hover {
  background: #374151;
  color: #f9fafb;
}

:is(.dark) .toolbar-btn.is-active {
  background: #1e3a5f;
  color: #60a5fa;
}
</style>
