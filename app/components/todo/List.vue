<script setup lang="ts">
import type { Todo } from '~/interfaces/todo';
import { useTodos } from '~/store/todo-composable-store';
// import { useTodoStore } from '~/store/todo-pinia-store';

const useTodo = useTodos();

const props = defineProps<{
  todos: Todo[]
}>();

</script>

<template>
  <div class="list">
    <div 
      v-for="todo in todos" 
      :key="todo.id" 
      class="list__item"
      :style="{ 'background-color': todo.color }"
      >
      <div>
        <template v-if="!todo.isEditing">
          <p class="list__item-todo">
            {{ todo.name }}
          </p>
        </template>

        <template v-else>
          <div class="list__item-edit">
            <input 
              v-model="useTodo.draft.name"
              type="text"
              >
            <input 
              v-model="useTodo.draft.color"
              type="color"
              >
          </div>
        </template>
      </div>
      <div class="list__item-actions">
        <template v-if="!todo.isEditing">
          <button :disabled="useTodo.todos.value.some(t => t.isEditing)" type="button" @click="useTodo.startEdit(todo)">Edit</button>
          <button type="button" @click="useTodo.removeTodo(todo.id)">Delete</button>
        </template>
        <template v-else>
          <button type="button" @click="useTodo.cancelEdit(todo)">Cancel</button>
          <button type="button" @click="useTodo.saveEdit(todo)">Accept</button>
        </template>
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
  width: 50px;
  height: 30px;
}

button {
  width: fit-content;
}

button:disabled {
  cursor: not-allowed;
}


.list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
  border: solid 1px #000000;
  border-radius: 8px;
}

.list__item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}

.list__item-actions {
  display: flex;
  gap: 2px;
  align-items: center;
}

.list__item-edit {
  display: flex;
  gap: 2px;
  align-items: center;
}
</style>