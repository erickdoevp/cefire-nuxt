<script setup lang="ts">
import { useTodos } from '~/store/todo-composable-store';

// import { useTodoStore } from '~/store/todo-pinia-store';

// const useTodo = useTodoStore();
const useTodo = useTodos();

</script>

<template>
  <div class="container">
    <h1>TODO APP</h1>
    <ClientOnly>
      <div class="todo">
        <TodoForm />
        <TodoList v-if="useTodo.todos.value.length > 0" :todos="useTodo.todos.value" />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.todo {
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>