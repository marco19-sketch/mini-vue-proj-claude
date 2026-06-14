<template>
  <div id="app">
    <h1>Todo List</h1>
    <p>{{ store.filtro }}</p>
    <TodoInput />
    <ul class="todo-lista">
      <TodoItem v-for="todo in store.todoFiltrati" :key="todo.id" :todo="todo" />
      <li v-if="store.todoFiltrati?.length === 0" class="vuoto">Nessun todo qui</li>
    </ul>
    <TodoFiltri v-if="store.contatore.totale > 0" />
  </div>
</template>

<script setup>
import TodoFiltri from './components/TodoFiltri.vue'
import TodoItem from './components/TodoItem.vue'
import { useTodoStore } from './stores/todos.js'
import TodoInput from './components/TodoInput.vue'

const store = useTodoStore()

</script>

<style scoped>
.app {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.todo-lista {
  list-style: none;
  padding: 0;
}
.todo-lista li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}
.vuoto {
  text-align: center;
  color: #aaa;
  padding: 2rem !important;
}
</style>
