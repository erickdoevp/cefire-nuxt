import type { Todo } from "~/interfaces/todo";

interface State {

  todos: Todo[],
  addTodo: (todo: { color: string, name: string }) => void
  removeTodo: (id: string) => void

  draft: {
    name: string;
    color: string;
  },
  startEdit: (todo: Todo) => void,
  saveEdit: (todo: Todo) => void,
  cancelEdit: (todo: Todo) => void,

}

const state = reactive<State>({
  todos: [],
  draft: {
    name: '',
    color: ''
  },
  addTodo ({ name, color }) {
    if(!name || !color) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name,
      color,
      isEditing: false
    };
    this.todos.push(newTodo);
  },
  removeTodo(id) {
    if(!id) return;
    this.todos = this.todos.filter(t => t.id !== id);
  },
  startEdit(todo) {
    todo.isEditing = true;
    this.draft.name = todo.name;
    this.draft.color = todo.color;
  },
  saveEdit(todo) {
    if(!todo.name || !todo.color) return;
    todo.name = this.draft.name;
    todo.color = this.draft.color;
    todo.isEditing = false;
  },
  cancelEdit(todo) {
    this.draft.name = '';
    this.draft.color = '#000000';
    todo.isEditing = false;
  }
});

export default state;