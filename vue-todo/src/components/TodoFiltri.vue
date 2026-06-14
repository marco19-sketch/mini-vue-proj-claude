<script setup>
import { useTodoStore } from '@/stores/todos'

const store = useTodoStore()

const filtri = [
  { valore: 'tutti', etichetta: 'Tutti' },
  { valore: 'attivi', etichetta: 'Attivi' },
  { valore: 'completati', etichetta: 'Completati' },
]
</script>

<template>
  <div class="filtri">
    <span>{{ store.contatore.rimasti }} rimasti</span>

    <div class="bottoni-filtro">
      <button
        v-for="f in filtri"
        :key="f.valore"
        :class="{ attivo: store.filtro === f.valore }"
        @click="store.filtro = f.valore"
      >
        {{ f.etichetta }}
      </button>
    </div>

    <button v-if="store.contatore.completati > 0" @click="store.rimuoviCompletati">
      Rimuovi completati
    </button>
  </div>
</template>
