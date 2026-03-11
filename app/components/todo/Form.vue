<script setup lang="ts">
import { useTodos } from '~/store/todo-composable-store';
// import { useTodoStore } from '~/store/todo-pinia-store';
interface form {
  todo: string;
  color: string;
}
// const useTodo = useTodoStore();
const useTodo = useTodos();

const form = reactive<form>({
  todo: '',
  color: '#000000'
});

const handleSubmit = () => {
  useTodo.addTodo({ name: form.todo, color: form.color });
  form.todo = '';
  form.color = '#000000';
};

</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__control">
      <label for="todo">Todo: </label>
      <input 
        v-model="form.todo"
        type="text" 
        id="todo" 
        name="todo"
      >
    </div>
    <div class="form__control">
      <label for="color">Pick a color:</label>
      <input 
        v-model="form.color"
        type="color" 
        name="color" 
        id="color"
      >
    </div>
    <div class="form__actions">
      <button 
        type="submit"
        :disabled="!form.todo.trim()"
      >
        Add
      </button>
    </div>
  </form>
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


.form {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: solid 1px #000000;
  border-radius: 8px;
}

.form__control {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form__actions {
  margin-left: auto;
}
</style>