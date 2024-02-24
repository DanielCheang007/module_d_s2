<script setup>
import { ref } from 'vue'
import GameItem from "./GameItem.vue"

const games = ref([])

// TODO: A Page also a object
const page = ref(0)
const size = ref(10)
const totalElements = ref(0)

const loading = ref(true)

const API_URL = import.meta.env.VITE_API_URL

async function loadGames() {
    loading.value = true

    const url = API_URL + '/games'

    const res = await fetch(url)
    const data = await res.json()

    page.value = data.page
    size.value = data.size
    totalElements.value = data.totalElements

    // TODO: suppose to convert to class?
    games.value = data.content

    loading.value = false
}

loadGames()

</script>

<template>
    <div class="page-header">
        <h2>
            {{ totalElements }} Games available
        </h2>

        <div class="games-nav">
            <nav>
                <RouterLink to="/">Popurlarity</RouterLink>
                <RouterLink to="/">Recently Updated</RouterLink>
                <RouterLink to="/">Alphabetically</RouterLink>
            </nav>
            <nav>
                <RouterLink to="/">ASC</RouterLink>
                <RouterLink to="/">DESC</RouterLink>
            </nav>
        </div>
    </div>

    <div class="page-content">
        <div v-if="loading">Loading...</div>
        <template v-else>
            <GameItem v-for="game in games" :key="game.slug" :game="game"></GameItem>
        </template>
    </div>
</template>

<style scoped>
nav {
    background: #eee;
    border-radius: 5px;
    display: flex;
    gap: 0 1px;
}

nav a {
    padding: .25rem .5rem;
}

nav a:hover {
    background: #ccc;
    text-decoration: none;
}

nav a:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

nav a:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.page-header,
.page-content {
    padding: 1rem;
}

.page-header {
    display: flex;
    font-size: smaller;
}

.games-nav {
    margin-left: auto;
    display: flex;
    gap: 0 .5rem;
}
</style>