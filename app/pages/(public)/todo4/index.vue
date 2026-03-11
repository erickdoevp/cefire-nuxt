<script setup lang="ts">
import state from '~/store/todo-reactive-store';

interface FormValues {
  color: string;
  name: string;
}

const form = reactive<FormValues>({
  color: '#000000',
  name: ''
});

</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="mr-4 mb-4">TODO APP 4</h1>
    <form 
      class="form" 
      @submit.prevent="state.addTodo({ name: form.name, color: form.color })"
    >
      <div class="form__control">
        <label for="todo">Todo: </label>
        <input 
          type="text" 
          name="todo"
          id="todo"
          v-model="form.name" 
          >
      </div>  
      <div class="form__control">
        <label for="color">Pick a color:</label>
        <input 
          v-model="form.color" 
          class="color-input"
          type="color" 
          id="color" 
          name="color">
      </div>
       <div class="ml-auto">
          <button 
            type="submit"
            style="margin-left: auto;"
            :disabled="!form.name || !form.color"
            >
            Add todo
          </button>
       </div>
    </form>

    <div v-if="state.todos.length > 0" class="list">
      <p class="text-center">List of todos</p>
      <div 
        v-for="todo in state.todos" 
        class="list__element"
        :style="{ 'background-color': todo.color }"
        :key="todo.id"
        >
        
        <p v-if="!todo.isEditing">
          {{ todo.name }}
        </p>

        <div v-else class="editig">
          <input 
            type="text"
            v-model="state.draft.name"
            :class="{ 'white': todo.color === 'blue' }"
          >
          <input 
            class="color-input"
            type="color"
            v-model="state.draft.color"
          >
        </div>
        
        <div class="list__element-actions">

          <template v-if="!todo.isEditing">
            <button 
              type="button"
              @click="state.startEdit(todo)"
              :disabled="state.todos.some(t => t.isEditing)"
              >
              Edit
            </button>

            <button 
              type="button"
              @click="state.removeTodo(todo.id);"
              >
              Delete
            </button>
          </template>

          <template v-else>
            <button 
              @click="state.saveEdit(todo)"
              >
              Aceptar
            </button>

            <button
              @click="state.cancelEdit(todo)"
            >
              Cancelar
            </button>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

button, input {
  border: solid 1px black;
  border-radius: 6px;
  padding: 6px;
  background-color: white;
  color: black;
  cursor: pointer;
}

input {
  cursor: text;
}

input[type="color"] {
  cursor: pointer;
}

button {
  width: fit-content;
}

button:disabled {
  cursor: not-allowed;
}

.form {
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: solid 1px black;
  padding: 10px;
  border-radius: 10px;
}

.form__control {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.list {
  width: 700px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: solid 1px black;
  padding: 10px;
  border-radius: 10px;
}

.list__element {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 12px;
  align-items: center;
} 

.list__element-actions {
  display: flex;
  gap: 12px;
}

.editig {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.color-input {
  width: 100px;
  height: 40px;
}

</style>