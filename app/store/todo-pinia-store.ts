import { defineStore } from "pinia";
import type { Todo } from "~/interfaces/todo";

interface InputValues {
    name: string;
    color: string;
}

export const useTodoStore = defineStore('todo', () => {

const todos = ref<Todo []>([]);

  const draft = reactive<{ name: string; color: string }>({
      name: '',
      color: '#000000'
  });
  
  function addTodo({ name, color }: InputValues): void {
    if(!color || !name) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name,
      color,
      isEditing: false
    };

    todos.value.push(newTodo);
    console.log(todos.value);
    
  }

  function deleteTodo(id: string): void {
    if(!id) return;
    todos.value = todos.value.filter(t => t.id !== id);
  }

  function startEdit(todo: Todo) {
    draft.name = todo.name;
    draft.color = todo.color;
    todo.isEditing = true;
  };

  function saveEdit(todo: Todo) {
    todo.isEditing = false;
    todo.name = draft.name;
    todo.color = draft.color;
  }

  function cancelEdit(todo: Todo) {
    todo.isEditing = false;
    draft.color = '#000000';
    draft.name = '';
  }

  return {
    todos,
    draft,
    addTodo,
    removeTodo: deleteTodo,
    startEdit,
    saveEdit,
    cancelEdit
  }

});