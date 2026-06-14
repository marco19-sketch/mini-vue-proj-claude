# Corso Vue 3 — Da React a Vue

> **Prerequisiti:** JavaScript ES6+, async/await, esperienza con React
> **Obiettivo:** Padroneggiare Vue 3 con Composition API, partendo da zero ma
> senza perdere tempo sui fondamentali JS

---

<a id="home"></a>

## Indice

1. [Modulo 1 — Vue vs React: mentalità e differenze](#modulo-1)
2. [Modulo 2 — Setup e struttura di un progetto Vue 3](#modulo-2)
3. [Modulo 3 — Template syntax e reattività](#modulo-3)
4. [Modulo 4 — Composition API: ref, reactive, computed, watch](#modulo-4)
5. [Modulo 5 — Componenti: props, emit, slots](#modulo-5)
6. [Modulo 6 — Lifecycle hooks](#modulo-6)
7. [Modulo 7 — Vue Router](#modulo-7)
8. [Modulo 8 — Pinia (state management)](#modulo-8)
9. [Modulo 9 — Chiamate HTTP e async](#modulo-9)
10. [Modulo 10 — Mini-progetto finale: Todo App completa](#modulo-10)

---

<a id="modulo-1"></a>

## Modulo 1 — Vue vs React: mentalità e differenze 

### La differenza fondamentale

React è una **libreria** con un modello dichiarativo puro: tu descrivi l'UI in
funzione dello stato, e React si occupa del re-render. Vue è un **framework
progressivo** con un sistema di reattività integrato più "magico" ma anche più
automatico.

| Aspetto          | React                             | Vue 3                                |
| ---------------- | --------------------------------- | ------------------------------------ |
| Reattività       | Manuale (`useState`, `useEffect`) | Automatica (proxy-based)             |
| Template         | JSX (JS + HTML mescolati)         | Template separato + `<script setup>` |
| State management | Context, Redux, Zustand...        | Pinia (ufficiale)                    |
| Two-way binding  | Non esiste nativamente            | `v-model`                            |
| Stile componenti | Tutto in JS/JSX                   | Single File Component (.vue)         |

### Il concetto di Single File Component (SFC)

In Vue ogni componente vive in un file `.vue` con tre sezioni:

```vue
<template>
  <!-- L'HTML del componente -->
  <div>{{ message }}</div>
</template>

<script setup>
// La logica (Composition API)
import { ref } from "vue";
const message = ref("Ciao Vue!");
</script>

<style scoped>
/* CSS isolato al componente */
div {
  color: blue;
}
</style>
```

Se vieni da React, pensa a uno SFC come a un componente in cui il JSX è
sostituito da un template HTML vero, ma con direttive speciali.

### Options API vs Composition API

Vue 3 supporta due stili di scrittura. **Usa sempre la Composition API** (con
`<script setup>`): è il futuro, è più vicina a React Hooks, ed è più leggibile
per progetti complessi.

```vue
<!-- Options API (vecchio stile, Vue 2) -->
<script>
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>

<!-- Composition API (moderno, Vue 3) ✅ -->
<script setup>
import { ref } from "vue";
const count = ref(0);
const increment = () => count.value++;
</script>
```

---

[torna su](#home)
<a id="modulo-2"></a>

## Modulo 2 — Setup e struttura di un progetto Vue 3 

### Creare un progetto con Vite

```bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
```

Durante la creazione ti verrà chiesto di abilitare Router, Pinia, TypeScript,
ecc. Per iniziare scegli: **Router ✅ | Pinia ✅ | TypeScript ❌ (opzionale)**.

### Struttura del progetto

```text
my-app/
├── src/
│   ├── main.js          # Entry point
│   ├── App.vue          # Root component
│   ├── components/      # Componenti riusabili
│   ├── views/           # Pagine (usate dal router)
│   ├── stores/          # Pinia stores
│   └── router/
│       └── index.js     # Configurazione Vue Router
├── public/
└── vite.config.js
```

### main.js — come funziona l'avvio

```javascript
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App); // Crea l'istanza Vue
app.use(createPinia()); // Plugin Pinia
app.use(router); // Plugin Router
app.mount("#app"); // Monta sul DOM
```

In React avresti `ReactDOM.render(<App />, document.getElementById('root'))`. Il
concetto è lo stesso.

---

[torna su](#home) <a id="modulo-3"></a>

## Modulo 3 — Template syntax e reattività 

### Interpolazione e binding

```js
<template>
  <!-- Testo: doppi mustache {{ }} -->
  <p>{{ nome }}</p>

  <!-- Attributo dinamico: v-bind o shorthand : -->
  <img :src="imageUrl" :alt="nome" />
  <a :href="url">Link</a>

  <!-- Classe dinamica -->
  <div :class="{ attivo: isAttivo, 'testo-rosso': hasError }">...</div>

  <!-- Stile inline dinamico -->
  <div :style="{ color: coloreTesto, fontSize: '16px' }">...</div>
</template>

<script setup>
import { ref } from 'vue'
const nome = ref('Marco')
const imageUrl = ref('/avatar.png')
const isAttivo = ref(true)
const hasError = ref(false)
const coloreTesto = ref('blue')
</script>
```

### Direttive fondamentali

#### v-if, v-else-if, v-else

```js
<template>
  <div v-if="ruolo === 'admin'">Pannello Admin</div>
  <div v-else-if="ruolo === 'editor'">Pannello Editor</div>
  <div v-else>Solo lettura</div>
</template>

<script setup>
import { ref } from 'vue'
const ruolo = ref('editor')
</script>
```

> **vs React:** invece di `{condition && <Component />}` usi `v-if`. Più
> leggibile nell'HTML.

#### v-show

Simile a `v-if` ma non rimuove il DOM, aggiunge solo `display: none`. Usa
`v-show` per toggle frequenti, `v-if` per condizioni rare.

```js
<div v-show="isVisible">Sono sempre nel DOM</div>
```

#### v-for

```js
<template>
  <ul>
    <li v-for="utente in utenti" :key="utente.id">
      {{ utente.nome }} — {{ utente.email }}
    </li>
  </ul>

  <!-- Con indice -->
  <p v-for="(item, index) in items" :key="index">
    {{ index }}: {{ item }}
  </p>
</template>

<script setup>
import { ref } from 'vue'
const utenti = ref([
  { id: 1, nome: 'Alice', email: 'alice@example.com' },
  { id: 2, nome: 'Bob',   email: 'bob@example.com' },
])
</script>
```

> **Importante:** `:key` è obbligatorio in Vue esattamente come in React. Usa
> sempre un ID univoco, mai l'indice se la lista può cambiare ordine.

#### v-on e gestione eventi

```js
<template>
  <!-- v-on:click o shorthand @ -->
  <button @click="incrementa">Cliccami</button>
  <button @click="incrementaDi(5)">+5</button>

  <!-- Accedere al evento nativo -->
  <input @input="gestisciInput" />

  <!-- Modificatori -->
  <form @submit.prevent="invia">...</form>  <!-- preventDefault automatico -->
  <div @click.stop="...">...</div>          <!-- stopPropagation -->
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
const incrementa = () => count.value++
const incrementaDi = (n) => count.value += n
const gestisciInput = (event) => console.log(event.target.value)
const invia = () => console.log('form inviato')
</script>
```

#### v-model — two-way binding

Questo non esiste in React. `v-model` è zucchero sintattico per `:value` +
`@input`.

```js
<template>
  <input v-model="testo" placeholder="Scrivi qui..." />
  <p>Hai scritto: {{ testo }}</p>

  <!-- Checkbox -->
  <input type="checkbox" v-model="accettato" />
  <span>Accettato: {{ accettato }}</span>

  <!-- Select -->
  <select v-model="scelta">
    <option value="a">Opzione A</option>
    <option value="b">Opzione B</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'
const testo = ref('')
const accettato = ref(false)
const scelta = ref('a')
</script>
```

---

[torna su](#home) <a id="modulo-4"></a>

## Modulo 4 — Composition API: ref, reactive, computed, watch 

### ref vs reactive

`ref` è per valori primitivi (string, number, boolean) e array. `reactive` è per
oggetti.

```js
<script setup>
import { ref, reactive } from 'vue'

// ref — accedi sempre con .value nel JS (non nel template)
const count = ref(0)
count.value++           // JS
// Nel template: {{ count }} (Vue rimuove .value automaticamente)

// reactive — accesso diretto, come un oggetto normale
const stato = reactive({
  nome: 'Alice',
  eta: 30,
  preferenze: { tema: "dark" }
})
stato.eta++              // JS normale, nessun .value
stato.preferenze.tema = 'light'
</script>
```

**Regola pratica:** usa `ref` per quasi tutto. Usa `reactive` solo per oggetti
di stato complessi dove non vuoi il `.value`.

### computed

Equivalente a `useMemo` in React, ma più pulito: si ricalcola automaticamente
quando le dipendenze cambiano.

```js
<template>
  <p>Totale: {{ totale }}</p>
  <p>Filtrati: {{ elementiAttivi.length }}</p>
</template>

<script setup>
import { ref, computed } from "vue";

const prezzi = ref([10, 20, 30, 15]);
const items = ref([
  { nome: "A", attivo: true },
  { nome: "B", attivo: false },
  { nome: "C", attivo: true },
]);

// Si ricalcola solo quando prezzi cambia
const totale = computed(() => prezzi.value.reduce((a, b) => a + b, 0));

// Si ricalcola solo quando items cambia
const elementiAttivi = computed(() => items.value.filter(i => i.attivo));
</script>
```

### watch e watchEffect

`watch` è simile a `useEffect` di React ma più esplicito sulle dipendenze.

```js
<script setup>
import { ref, watch, watchEffect } from "vue";

const query = ref("");
const risultati = ref([]);

// watch — osserva una dipendenza specifica
watch(
  query,
  async (nuovoValore, vecchioValore) => {
    if (nuovoValore.length > 2) {
      risultati.value = await cercaAPI(nuovoValore);
    }
  },
  { immediate: true },
); // immediate: esegui subito al mount

// watchEffect — osserva automaticamente tutto ciò che usa
watchEffect(async () => {
  // Viene eseguito e ri-eseguito ogni volta che query.value cambia
  console.log("Query cambiata:", query.value);
});

// Osservare un oggetto profondo
const form = ref({ nome: "", email: "" });
watch(
  form,
  nuovo => {
    console.log("Form aggiornato:", nuovo);
  },
  { deep: true },
);
</script>
```

> **vs React `useEffect`:** in Vue non gestisci array di dipendenze manualmente.
> `watch` è esplicito, `watchEffect` le rileva da solo. Non c'è il problema del
> "deps array dimenticato".

---

[torna su](#home) <a id="modulo-5"></a>

## Modulo 5 — Componenti: props, emit, slots 

### Props

```js
<!-- Componente figlio: UserCard.vue -->
<template>
  <div class="card">
    <h2>{{ nome }}</h2>
    <p>Età: {{ eta }}</p>
    <p v-if="admin" class="badge">Admin</p>
  </div>
</template>

<script setup>
// defineProps — compila le props del componente
const props = defineProps({
  nome: {
    type: String,
    required: true,
  },
  eta: {
    type: Number,
    default: 0,
  },
  admin: {
    type: Boolean,
    default: false,
  }
})
</script>
```

```js
<!-- Componente genitore: App.vue -->
<template>
  <UserCard nome="Alice" :eta="30" :admin="true" />
  <UserCard nome="Bob" :eta="25" />
</template>

<script setup>
import UserCard from "./components/UserCard.vue";
</script>
```

> **Differenza da React:** gli attributi senza `:` sono sempre stringhe.
> `:eta="30"` passa il numero 30, `eta="30"` passa la stringa "30".

### Emit — comunicazione figlio → genitore

In React useresti una callback passata come prop. In Vue usi `emit`.

```js
<!-- Figlio: ModalConferma.vue -->
<template>
  <div class="modal">
    <p>Sei sicuro?</p>
    <button @click="$emit('conferma')">Sì</button>
    <button @click="$emit('annulla')">No</button>

    <!-- Emit con dato -->
    <button @click="$emit('seleziona', { id: 42, nome: 'Item' })">
      Seleziona
    </button>
  </div>
</template>

<script setup>
// Dichiarare gli eventi emettibili
const emit = defineEmits(["conferma", "annulla", "seleziona"]);

// Puoi anche emetterli da funzioni:
const gestisciConferma = () => {
  // logica...
  emit("conferma");
};
</script>
```

```js
<!-- Genitore -->
<template>
  <ModalConferma
    @conferma="handleConferma"
    @annulla="mostraModal = false"
    @seleziona="handleSelezione" />
</template>

<script setup>
import { ref } from "vue";
import ModalConferma from "./components/ModalConferma.vue";

const mostraModal = ref(false);
const handleConferma = () => console.log("Confermato!");
const handleSelezione = item => console.log("Selezionato:", item);
</script>
```

### Slots — equivalente di `children` in React

In React, un componente può ricevere e renderizzare contenuto arbitrario tramite `props.children`:

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>
}

<Card>
  <p>Contenuto generico</p>
</Card>
```

In Vue lo stesso concetto si chiama **slot**: il componente figlio definisce dei "buchi" nel proprio template, e il genitore decide cosa inserirci. Esistono due tipi:

- **Slot di default** — un unico "buco" generico, esattamente come `children`
- **Slot con nome (named slot)** — più "buchi" distinti, ognuno con un'etichetta, così il genitore può inserire contenuti diversi in punti diversi del componente

#### Slot di default

Il tag `<slot />` nel componente figlio è il punto dove verrà inserito qualsiasi contenuto messo tra i tag di apertura/chiusura del componente.

```js
<!-- Componente: Box.vue -->
<template>
  <div class="box">
    <slot />
  </div>
</template>
```

```js
<!-- Uso -->
<Box>
  <p>Questo testo finisce dentro &lt;slot /&gt;</p>
</Box>
```

#### Slot con nome (named slots)

Quando un componente ha più zone di contenuto personalizzabili (es. intestazione, corpo, piè di pagina), si usano slot con nome. Ogni `<slot name="...">` definisce una zona specifica.

```js
<!-- Componente: Card.vue -->
<template>
  <div class="card">
    <!-- Slot di default: contenuto "libero" senza nome -->
    <slot />

    <!-- Slot con nome "header" -->
    <header>
      <slot name="header">Titolo di default</slot>
    </header>

    <!-- Slot con nome "body" -->
    <main>
      <slot name="body" />
    </main>

    <!-- Slot con nome "footer" -->
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
```

> Nota: `<slot name="header">Titolo di default</slot>` ha un contenuto già scritto dentro. Questo è il **fallback**: se il genitore non fornisce nulla per quello slot, viene mostrato il testo di default ("Titolo di default"). Lo slot di default (`<slot />`) e gli slot con `name` possono coesistere nello stesso componente.

#### Come il genitore riempie gli slot

Per indicare a quale slot con nome è destinato un blocco di contenuto, il genitore usa `<template #nomeSlot>`. Il simbolo `#` è l'abbreviazione di `v-slot:`.

```js
<template>
  <!-- Caso 1: solo slot di default -->
  <Card>
    <p>Contenuto generico</p>
  </Card>

  <!-- Caso 2: tutti gli slot con nome -->
  <Card>
    <template #header>
      <h1>Il mio titolo</h1>
    </template>
    <template #body>
      <p>Il corpo della card</p>
    </template>
    <template #footer>
      <button>Azione</button>
    </template>
  </Card>
</template>
```

Ogni `<template #nome>...</template>` viene "iniettato" esattamente nel punto del componente figlio dove si trova `<slot name="nome" />`. Il contenuto senza `<template #...>` (come `<p>Contenuto generico</p>` nel Caso 1) finisce automaticamente nello slot di default `<slot />`.

**In sintesi:**

| Concetto | React | Vue |
|---|---|---|
| Contenuto generico passato dal genitore | `props.children` | `<slot />` |
| Più "zone" di contenuto personalizzabili | Props separate (es. `header`, `footer`) che ricevono JSX | Slot con nome (`<slot name="...">`) |
| Contenuto di fallback se non fornito | `children ?? <Default />` | Testo dentro `<slot>...</slot>` |

---

[torna su](#home)
 <a id="modulo-6"></a>

## Modulo 6 — Lifecycle hooks

| Hook Vue 3       | Equivalente React         | Quando viene chiamato       |
| ---------------- | ------------------------- | --------------------------- |
| `onMounted`      | `useEffect(() => {}, [])` | Dopo il mount nel DOM       |
| `onUnmounted`    | return di useEffect       | Prima della distruzione     |
| `onUpdated`      | `useEffect(() => {})`     | Dopo ogni aggiornamento     |
| `onBeforeMount`  | —                         | Prima del mount             |
| `onBeforeUpdate` | —                         | Prima di ogni aggiornamento |

```js
<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from "vue";

const dati = ref([]);
let intervallo = null;

onMounted(async () => {
  // Equivale a useEffect con [] — eseguito una volta al mount
  console.log("Componente montato!");
  dati.value = await fetchDati();

  // Avvia un timer
  intervallo = setInterval(() => {
    console.log("tick");
  }, 1000);
});

onUnmounted(() => {
  // Cleanup — equivale al return di useEffect
  clearInterval(intervallo);
  console.log("Componente rimosso dal DOM");
});

onUpdated(() => {
  // Eseguito dopo ogni re-render
  console.log("Componente aggiornato");
});
</script>
```

---

[torna su](#home) <a id="modulo-7"></a>

## Modulo 7 — Vue Router

### Configurazione base

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profilo from "../views/Profilo.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/profilo/:id", component: Profilo }, // Parametro dinamico
    { path: "/:pathMatch(.*)*", component: NotFound }, // 404
  ],
});

export default router;
```

### Navigazione nel template

```js
<template>
  <nav>
    <!-- RouterLink = <Link> di React Router -->
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profilo/42">Il mio profilo</RouterLink>

    <!-- Link attivo riceve automaticamente la classe "router-link-active" -->
  </nav>

  <!-- Dove vengono renderizzate le pagine -->
  <RouterView />
</template>
```

### Navigazione programmatica e parametri

```js
<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter(); // per navigare
const route = useRoute(); // per leggere params, query, ecc.

// Leggere i parametri dalla URL (/profilo/42)
console.log(route.params.id); // "42"
console.log(route.query.tab); // ?tab=settings → "settings"

// Navigazione programmatica
const vaiAlProfilo = () => router.push("/profilo/42");
const vaiIndietro = () => router.back();

// Con oggetto (più esplicito)
router.push({ path: "/profilo", params: { id: "42" } });
router.push({ path: "/ricerca", query: { q: "vue 3" } });
</script>
```

### Route guards (protezione delle pagine)

```javascript
// Guard globale — controlla ogni navigazione
router.beforeEach((to, from) => {
  const isAuth = localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuth) 
    return "/login"; // Redirect al login
  }
});

// Aggiungere meta alle routes
const routes = [
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
];
```

---

[torna su](#home) <a id="modulo-8"></a>

## Modulo 8 — Pinia (state management)

Pinia è lo state manager ufficiale di Vue 3. È molto più semplice di Redux:
niente actions/mutations/reducers separati.

### Creare uno store

```javascript
// src/stores/utente.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUtenteStore = defineStore("utente", () => {
  // STATE
  const utente = ref(null);
  const isLoading = ref(false);

  // GETTERS (computed)
  const isLoggato = computed(() => utente.value !== null);
  const nomeCompleto = computed(() =>
    utente.value ? `${utente.value.nome} ${utente.value.cognome}` : "",
  );

  // ACTIONS
  async function login(email, password) {
    isLoading.value = true;
    try {
      const data = await apiLogin(email, password);
      utente.value = data.user;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    utente.value = null;
  }

  return { utente, isLoading, isLoggato, nomeCompleto, login, logout };
});
```

### Usare lo store nei componenti

```vue
<template>
  <div v-if="utenteStore.isLoggato">
    <p>Benvenuto, {{ utenteStore.nomeCompleto }}!</p>
    <button @click="utenteStore.logout">Esci</button>
  </div>
  <div v-else>
    <button @click="utenteStore.login('a@b.com', '1234')">Login</button>
  </div>
</template>

<script setup>
import { useUtenteStore } from "../stores/utente";

const utenteStore = useUtenteStore();
</script>
```

> **vs Redux:** niente boilerplate. Niente `dispatch`, `mapStateToProps`, niente
> action types. Lo store è un normale composable reattivo.

### Persistenza con plugin

```bash
npm install pinia-plugin-persistedstate
```

```javascript
// main.js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Nello store, aggiungi:
export const useUtenteStore = defineStore('utente', () => { ... }, {
  persist: true  // Salva automaticamente in localStorage
})
```

---

[torna su](#home) <a id="modulo-9"></a>

## Modulo 9 — Chiamate HTTP e async

### Pattern base con fetch

```vue
<template>
  <div>
    <p v-if="loading">Caricamento...</p>
    <p v-else-if="error">Errore: {{ error }}</p>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts.value = await res.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>
```

### Composable riusabile — useFetch

In Vue, la logica riusabile si estrae in **composables** (equivalente degli
hooks custom di React).

```javascript
// src/composables/useFetch.js
import { ref } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data.value = await res.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
```

```vue
<!-- Uso del composable -->
<script setup>
import { onMounted } from "vue";
import { useFetch } from "../composables/useFetch";

const {
  data: posts,
  loading,
  error,
  execute,
} = useFetch("https://jsonplaceholder.typicode.com/posts");

onMounted(execute);
</script>
```

### Composable con parametro reattivo

```javascript
// src/composables/useUtente.js
import { ref, watch } from "vue";

export function useUtente(id) {
  const utente = ref(null);
  const loading = ref(false);

  watch(
    id,
    async nuovoId => {
      if (!nuovoId) return;
      loading.value = true;
      const res = await fetch(`/api/users/${nuovoId}`);
      utente.value = await res.json();
      loading.value = false;
    },
    { immediate: true },
  );

  return { utente, loading };
}
```

---

[torna su](#home) <a id="modulo-10"></a>

## Modulo 10 — Mini-progetto finale: Todo App completa

Costruiamo una Todo App con: lista, aggiunta, rimozione, filtro per stato, e
persistenza con Pinia.

### Store Pinia per i todo

```javascript
// src/stores/todos.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTodosStore = defineStore(
  "todos",
  () => {
    const todos = ref([
      { id: 1, testo: "Imparare Vue 3", completato: true },
      { id: 2, testo: "Costruire un progetto", completato: false },
    ]);

    const filtro = ref("tutti"); // 'tutti' | 'attivi' | 'completati'

    const todiFiltrati = computed(() => {
      if (filtro.value === "attivi")
        return todos.value.filter(t => !t.completato);
      if (filtro.value === "completati")
        return todos.value.filter(t => t.completato);
      return todos.value;
    });

    const contatore = computed(() => ({
      totale: todos.value.length,
      completati: todos.value.filter(t => t.completato).length,
      rimasti: todos.value.filter(t => !t.completato).length,
    }));

    function aggiungi(testo) {
      if (!testo.trim()) return;
      todos.value.push({
        id: Date.now(),
        testo: testo.trim(),
        completato: false,
      });
    }

    function rimuovi(id) {
      todos.value = todos.value.filter(t => t.id !== id);
    }

    function toggleCompletato(id) {
      const todo = todos.value.find(t => t.id === id);
      if (todo) todo.completato = !todo.completato;
    }

    function rimuoviCompletati() {
      todos.value = todos.value.filter(t => !t.completato);
    }

    return {
      todos,
      filtro,
      todiFiltrati,
      contatore,
      aggiungi,
      rimuovi,
      toggleCompletato,
      rimuoviCompletati,
    };
  },
  { persist: true },
);
```

### Componente TodoInput.vue

```html
<template>
  <form @submit.prevent="invia" class="todo-input">
    <input v-model="nuovoTesto" placeholder="Cosa devi fare?" autofocus />
    <button type="submit" :disabled="!nuovoTesto.trim()">Aggiungi</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTodosStore } from "../stores/todos";

const store = useTodosStore();
const nuovoTesto = ref("");

const invia = () => {
  store.aggiungi(nuovoTesto.value);
  nuovoTesto.value = "";
};
</script>
```

### Componente TodoItem.vue

```html
<template>
  <li :class="{ completato: todo.completato }">
    <input
      type="checkbox"
      :checked="todo.completato"
      @change="store.toggleCompletato(todo.id)" />
    <span>{{ todo.testo }}</span>
    <button @click="store.rimuovi(todo.id)" class="btn-rimuovi">✕</button>
  </li>
</template>

<script setup>
import { useTodosStore } from "../stores/todos";

defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const store = useTodosStore();
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
```

### Componente TodoFiltri.vue

```html
<template>
  <div class="filtri">
    <span>{{ store.contatore.rimasti }} rimasti</span>

    <div class="bottoni-filtro">
      <button
        v-for="f in filtri"
        :key="f.valore"
        :class="{ attivo: store.filtro === f.valore }"
        @click="store.filtro = f.valore">
        {{ f.etichetta }}
      </button>
    </div>

    <button
      v-if="store.contatore.completati > 0"
      @click="store.rimuoviCompletati">
      Rimuovi completati
    </button>
  </div>
</template>

<script setup>
import { useTodosStore } from "../stores/todos";

const store = useTodosStore();
const filtri = [
  { valore: "tutti", etichetta: "Tutti" },
  { valore: "attivi", etichetta: "Attivi" },
  { valore: "completati", etichetta: "Completati" },
];
</script>
```

### App.vue — composizione finale

```html
<template>
  <div class="app">
    <h1>Todo List</h1>
    <TodoInput />
    <ul class="todo-lista">
      <TodoItem
        v-for="todo in store.todiFiltrati"
        :key="todo.id"
        :todo="todo" />
      <li v-if="store.todiFiltrati.length === 0" class="vuoto">
        Nessun todo qui 🎉
      </li>
    </ul>
    <TodoFiltri v-if="store.contatore.totale > 0" />
  </div>
</template>

<script setup>
import { useTodosStore } from "./stores/todos";
import TodoInput from "./components/TodoInput.vue";
import TodoItem from "./components/TodoItem.vue";
import TodoFiltri from "./components/TodoFiltri.vue";

const store = useTodosStore();
</script>

<style>
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
```

---

## Prossimi passi consigliati

Ora che hai le basi solide, ecco cosa esplorare:

1. **`<Teleport>`** — rendere un componente fuori dalla gerarchia DOM (es.
   modali)
2. **`<Suspense>`** — loading states dichiarativi per componenti async
3. **Provide / Inject** — equivalente del Context API di React
4. **Transizioni e animazioni** — `<Transition>` e `<TransitionGroup>`
5. **TypeScript con Vue 3** — aggiunta progressiva dei tipi
6. **Nuxt 3** — il framework full-stack basato su Vue (equivalente di Next.js)

**Risorse ufficiali:**

- Documentazione: https://vuejs.org
- Pinia: https://pinia.vuejs.org
- Vue Router: https://router.vuejs.org
- Nuxt 3: https://nuxt.com
