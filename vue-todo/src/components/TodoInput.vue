<template>
  <form @submit.prevent="invia" class="todo-input">
    <input v-model="nuovoTesto" placeholder="Cosa devi fare?" autofocus />
    <button type="submit" :disabled="!nuovoTesto.trim()">Aggiungi</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todos'

const store = useTodoStore()
const nuovoTesto = ref('')

const invia = () => {
  store.aggiungi(nuovoTesto.value)
  nuovoTesto.value = ''
}
</script>
