<template>
  <li :class="{ completato: todo.completato }">
    <input type="checkbox" :checked="todo.completato" @change="store.toggleCompletato(todo.id)" />
    <span>{{ todo.testo }}</span>
    <button @click="store.rimuovi(todo.id)" class="btn-rimuovi">X</button>
  </li>
</template>

<script setup>
import { useTodoStore } from '@/stores/todos'

defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const store = useTodoStore()
</script>

<style scoped>
li.completato span {
  text-decoration: line-through;
  opacity: 0.5;
}
.btn-rimuovi {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #e53e3e;
}
</style>
