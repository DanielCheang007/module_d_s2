<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GameItem from "./GameItem.vue"



const API_URL = import.meta.env.VITE_API_URL

// TODO: A Page also a object

// Current Page
const currentPage = ref(0)

// How many pages been loaded to the page
const loadedPages = ref(0)

// items per page
const itemsPerPage = ref(10)

// total items
const totalElements = ref(0)

const loading = ref(false)

const games = ref([])

async function loadGames(page = null) {
    // void multiple loading
    if (loading.value) return

    loading.value = true

    let url = API_URL + '/games'

    if (page !== null) {
        url += `?page=${page}&size=${itemsPerPage.value}`
    }

    const res = await fetch(url)
    const data = await res.json()

    currentPage.value = data.page
    if (data.size > 0) {
        itemsPerPage.value = data.size
    }
    totalElements.value = data.totalElements

    loadedPages.value = currentPage.value

    // TODO: suppose to convert to class?
    // append only, don't replace
    games.value.push(...data.content)

    loading.value = false
}

loadGames()


// ---------------




function onScroll() {
    console.log('here')
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        console.log("this is the end...")
        loadGames(loadedPages.value + 1)
    }
}

onMounted(() => {
    window.addEventListener("scroll", onScroll)
})

// remember to clear the listener!
onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll)
})

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
        <template v-if="games.length > 0">
            <GameItem v-for="game in games" :key="game.slug" :game="game"></GameItem>
        </template>

        <div v-if="loading">Loading...</div>
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