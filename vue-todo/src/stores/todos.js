import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore(
  'todos',
  () => {
    const todos = ref([
      { id: 1, testo: 'Imparare Vue 3', completato: true },
      { id: 2, testo: 'Configurare il progetto', completato: true },
      { id: 3, testo: 'Creare il componente TodoList', completato: false },
      { id: 4, testo: 'Aggiungere lo stato reattivo', completato: false },
      { id: 5, testo: "Implementare l'aggiunta di nuovi todo", completato: false },
      { id: 6, testo: 'Gestire il completamento dei todo', completato: false },
      { id: 7, testo: 'Filtrare i todo per stato', completato: false },
      { id: 8, testo: 'Salvare i todo nel localStorage', completato: false },
      { id: 9, testo: 'Aggiungere animazioni', completato: false },
      { id: 10, testo: 'Scrivere i test', completato: false },
    ])

    const filtro = ref('tutti') //tutti - attivi - completati

    const todoFiltrati = computed(() => {
      if (filtro.value === 'attivi') {
        return todos.value.filter((t) => !t.completato)
      }
      if (filtro.value === 'completati') {
        return todos.value.filter((t) => t.completato)
      }
      console.log(todos.value)
      return todos.value
    })

    const contatore = computed(() => ({
      totale: todos.value.length,
      completati: todos.value.filter((t) => t.completato).length,
      rimasti: todos.value.filter((t) => !t.completato).length,
    }))

    function aggiungi(testo) {
      if (!testo.trim()) return
      todos.value.push({
        id: Date.now(),
        testo: testo.trim(),
        completato: false,
      })
    }

    function rimuovi(id) {
      todos.value = todos.value.filter((t) => t.id !== id)
    }

    function toggleCompletato(id) {
      const todo = todos.value.find((t) => t.id === id)
      if (todo) todo.completato = !todo.completato
    }

    function rimuoviCompletati() {
      todos.value = todos.value.filter((t) => !t.completato)
    }

    return {
      todos,
      filtro,
      todoFiltrati,
      contatore,
      aggiungi,
      rimuovi,
      toggleCompletato,
      rimuoviCompletati,
    };
  },
  { persist: true },
);
