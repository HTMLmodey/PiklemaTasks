<template>
  <div class="app">
    <h1>To-Do List</h1>
    <input
      v-model="newTodoText"
      placeholder="Enter a new task"
      @keyup.enter="addNewTodo"
    />
    <ul>
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleCompletion(todo.id)"
        />
        <span>{{ todo.text }}</span>
        <button @click="editTodo(todo.id)">Edit</button>
        <button @click="todoStore.removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTodoStore } from './stores/useTodoStore';

const newTodoText = ref('');
const todoStore = useTodoStore();

const addNewTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = '';
  }
};

const toggleCompletion = (id: number) => {
  todoStore.toggleTodoCompletion(id);
};

const editTodo = (id: number) => {
  const newText = prompt('Edit task:');
  if (newText) {
    todoStore.editTodo(id, newText);
  }
};
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

input {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

li.completed span {
  text-decoration: line-through;
  color: gray;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
