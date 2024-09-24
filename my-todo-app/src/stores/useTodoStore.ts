import { defineStore } from 'pinia';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos') || '[]') as Todo[],
  }),
  actions: {
    addTodo(text: string) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveTodos();
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
    },
    toggleTodoCompletion(id: number) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
      }
    },
    editTodo(id: number, text: string) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
        this.saveTodos();
      }
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
  },
});
  