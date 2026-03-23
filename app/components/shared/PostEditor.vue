<script setup>
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

import { watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue || {
    type: 'doc',
    content: []
  },
  extensions: [
    StarterKit,
    Image,
    Link.configure({
      openOnClick: false
    }),
    Placeholder.configure({
      placeholder: 'Empieza a escribir tu post...'
    })
  ]
})

/* 🔄 Sync con v-model */
watch(
  () => editor.value?.getJSON(),
  (value) => {
    if (value) emit('update:modelValue', value)
  }
)

/* 🧹 Cleanup */
onBeforeUnmount(() => {
  editor.value?.destroy()
})

/* 🖼️ Imagen (Cloudinary-ready) */
const uploadImage = async (file) => {
  // 🔥 aquí conectas tu backend o Cloudinary
  const formData = new FormData()
  formData.append('file', file)

  // ejemplo mock:
  const url = URL.createObjectURL(file)

  editor.value
    .chain()
    .focus()
    .setImage({ src: url })
    .run()
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) uploadImage(file)
}

/* 🔗 Link */
const setLink = () => {
  const url = prompt('Ingresa la URL')

  if (url) {
    editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }
}
</script>

<template>
  <div class="editor-wrapper">
    
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="editor.chain().focus().toggleBold().run()">B</button>
      <button @click="editor.chain().focus().toggleItalic().run()">I</button>

      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">H1</button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>

      <button @click="editor.chain().focus().toggleBulletList().run()">•</button>
      <button @click="editor.chain().focus().toggleOrderedList().run()">1.</button>

      <button @click="setLink">🔗</button>

      <!-- Imagen -->
      <label class="image-upload">
        🖼️
        <input type="file" accept="image/*" @change="onFileChange" hidden />
      </label>
    </div>

    <!-- Editor -->
    <EditorContent :editor="editor" class="editor-content" />

  </div>
</template>

<style scoped>
.editor-wrapper {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  overflow: hidden;
}

.toolbar {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}

.toolbar button {
  border: none;
  background: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.toolbar button:hover {
  background: #eee;
}

.editor-content {
  padding: 16px;
  min-height: 300px;
}

/* contenido */
.editor-content :deep(h1) {
  font-size: 28px;
  font-weight: bold;
}

.editor-content :deep(h2) {
  font-size: 22px;
  font-weight: bold;
}

.editor-content :deep(p) {
  margin: 10px 0;
}

.editor-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
</style>