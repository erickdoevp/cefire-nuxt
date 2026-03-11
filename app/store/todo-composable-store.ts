import type { Todo } from "~/interfaces/todo";

interface InputValues {
    name: string;
    color: string;
}

// Necesario sacar todos del composable para hacerlo global y compartir entre componentes
const todos = ref<Todo []>([]);

export const useTodos = () => {

  const draft = reactive<{ name: string; color: string }>({
    name: '',
    color: '#000000'
  });

  function addTodo({ name, color }: InputValues): void {
    if(!color.trim() || !name.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name,
      color,
      isEditing: false
    };

    // Mutacion directa del array 
    todos.value.push(newTodo);
    // Reasignacion del array
    // En Vue 3, ambos métodos funcionan correctamente porque 
    // Vue 3 usa Proxies que detectan tanto mutaciones como reasignaciones:
    // todos.value = [...todos.value, newTodo];
    // En Vue 2, solo la mutación con .push() funcionaba correctamente con arrays reactivos.
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
    if(!draft.name.trim() || !draft.color.trim()) return;
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

}