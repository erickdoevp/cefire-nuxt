<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
// import Underline from '@tiptap/extension-underline' // yarn add @tiptap/extension-underline
import { ref, computed, onBeforeUnmount } from 'vue'
import { useCreatePost } from '~/composables/admin/posts/useCreatePost'
type Level = 1 | 2 | 3 | 4 | 5 | 6;

const emit = defineEmits(['save-draft', 'publish'])

/* ─── Post state ─────────────────────────────────────────── */
const title = ref('')
const excerpt = ref('')
const conclusion = ref('')
const category = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')
const status = ref('Draft')
const metaDescription = ref('')
const featuredImage = ref<File | null>(null)
const featuredImagePreview = ref<string | null>(null)

const categories = [
  'Recovery Tips',
  'Fitness',
  'Joint & Arthritis',
  'Pain Management',
  'Sports Medicine',
]

const createPost = useCreatePost();

/* ─── TipTap editor ─────────────────────────────────────── */
const editor = useEditor({
  content: { type: 'doc', content: [] },
  extensions: [
    StarterKit,
    Image,
    Link.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: 'Empieza a escribir tu post...' }),
    // Underline,
  ],
})

/* ─── Stats ─────────────────────────────────────────────── */
const wordCount = computed(() => {
  const text = editor.value?.getText() ?? ''
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
})
const charCount = computed(() => editor.value?.getText().length ?? 0)
const readTime = computed(() => Math.max(1, Math.ceil(wordCount.value / 200)))

/* ─── Tags ──────────────────────────────────────────────── */
const addTag = () => {
  const t = tagInput.value.trim()
  if (t && !tags.value.includes(t)) tags.value.push(t)
  tagInput.value = ''
}
const removeTag = (tag: string) => {
  tags.value = tags.value.filter((t) => t !== tag)
}

/* ─── Featured image ────────────────────────────────────── */
const onFeaturedImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if(!target.files) return;
  const file = target.files[0]
  if (!file) return
  featuredImage.value = file
  featuredImagePreview.value = URL.createObjectURL(file)
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  const file = e.dataTransfer?.files[0]
  if (!file) return
  featuredImage.value = file
  featuredImagePreview.value = URL.createObjectURL(file)
}

/* ─── Editor image upload ───────────────────────────────── */
const onEditorImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const url = URL.createObjectURL(file)
  editor.value?.chain().focus().setImage({ src: url }).run()
}

/* ─── Link ──────────────────────────────────────────────── */
const setLink = () => {
  const url = prompt('Ingresa la URL')
  if (url) {
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }
}

/* ─── Actions ───────────────────────────────────────────── */
const postData = () => ({
  title: title.value,
  category: 1,
  content: editor.value?.getJSON(),
  conclusion: conclusion.value,
  excerpt: excerpt.value,
  tags: [1,2],
  readTime: readTime.value,
  status: status.value,
  metaDescription: metaDescription.value,
  featuredImage: 'wwww.lorem.com'
})

const saveDraft = () => {
  console.log(postData());
  createPost.savePost(postData());
  emit('save-draft', postData())
}
const publish = () => {
  status.value = 'Published'
  createPost.savePost(postData());
  emit('publish', postData())
}

/* ─── Cleanup ───────────────────────────────────────────── */
onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-950">

    <!-- ── Header ──────────────────────────────────────────────── -->
    <div class="flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 bg-white">
      <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Crear Nuevo Post</h1>
      <div class="flex items-center gap-2">
        <UButton variant="outline" color="neutral" @click="saveDraft">
          Guardar Borrador
        </UButton>
        <UButton color="primary" icon="i-lucide-send" @click="publish">
          Publicar
        </UButton>
      </div>
    </div>

    <!-- ── Body: two-column ────────────────────────────────────── -->
    <div class="flex flex-1 gap-6 p-6 overflow-auto">

      <!-- ── Left: title + editor ──────────────────────────────── -->
      <div class="flex flex-col flex-1 gap-4 min-w-0">

        <!-- Post Title -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Título del post</label>
          <UInput
            v-model="title"
            placeholder="Ingresa el título del post..."
            size="lg"
            class="w-full"
          />
        </div>

        <!-- Extract -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Resumen del post</label>
          <UInput
            v-model="excerpt"
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
            v-model="conclusion"
            placeholder="Ingresa la conclusión del post..."
            rows="4"
            class="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <!-- ── Right: sidebar ─────────────────────────────────────── -->
      <div class="flex flex-col gap-4 w-72 shrink-0">

        <!-- Category -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Categoría</h3>
          <USelectMenu
            v-model="category"
            :options="categories"
            placeholder="Select a category"
            class="w-full"
          />
        </div>

        <!-- Tags -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Tags</h3>
          <div class="flex flex-wrap gap-1.5 mb-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            >
              {{ tag }}
              <button class="hover:text-primary-900" @click="removeTag(tag)">
                <UIcon name="i-lucide-x" class="w-3 h-3" />
              </button>
            </span>
          </div>
          <UInput
            v-model="tagInput"
            placeholder="Agrega un tag..."
            size="sm"
            @keydown.enter.prevent="addTag"
          >
            <template #trailing>
              <button class="text-gray-400 hover:text-gray-600" @click="addTag">
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
              </button>
            </template>
          </UInput>
        </div>

        <!-- Featured Image -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Imagen destacada</h3>
          <label
            class="flex flex-col items-center justify-center gap-2 w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-400 transition-colors overflow-hidden"
            @dragover.prevent
            @drop="onDrop"
          >
            <template v-if="featuredImagePreview">
              <img :src="featuredImagePreview" class="w-full h-full object-cover" alt="Featured">
            </template>
            <template v-else>
              <UIcon name="i-lucide-upload-cloud" class="w-7 h-7 text-gray-400" />
              <span class="text-xs text-gray-500 text-center">
                Arrastra aquí la imagen<br>
                <span class="text-gray-400">JPG, PNG, up to 5MB</span>
              </span>
            </template>
            <input type="file" accept="image/*" class="hidden" @change="onFeaturedImageChange">
          </label>
        </div>

        <!-- Status -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Estatus</h3>
          <div class="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              class="flex-1 py-1.5 text-sm font-medium transition-colors"
              :class="status === 'Draft'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'"
              @click="status = 'Draft'"
            >
              Borrador
            </button>
            <button
              class="flex-1 py-1.5 text-sm font-medium transition-colors"
              :class="status === 'Published'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'"
              @click="status = 'Published'"
            >
              Publicado
            </button>
          </div>
        </div>

        <!-- SEO Settings -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">Ajustes SEO</h3>
          <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Meta Description</label>
          <textarea
            v-model="metaDescription"
            rows="4"
            placeholder="Escribe una descripción corta para SEO..."
            class="w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p class="text-xs text-gray-400 mt-1 text-right">{{ metaDescription.length }}/160</p>
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
