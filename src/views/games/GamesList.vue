<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import GameItem from "./GameItem.vue"

const route = useRoute()

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

// const sortBy = ref(null)
// const sortDir = ref(null)

// retrieve values from url `?sortBy=xx&sortDir=xx`
const sortBy = computed(() => route.query.sortBy || 'popular')
const sortDir = computed(() => route.query.sortDir || 'desc')

const loading = ref(false)

const games = ref([])

async function loadGames(page = null) {
    // void multiple loading
    if (loading.value) return

    loading.value = true

    // TODO: repalce with vue-router
    const params = {
        page,
        size: itemsPerPage.value,
        sortBy: sortBy.value,
        sortDir: sortDir.value
    }

    const paramsStr = Object.entries(params).map(([k, v]) => {
        if (v !== null && v !== undefined) {
            return `${k}=${v}`
        }
    }).filter(v => v).join("&")

    const url = API_URL + '/games?' + paramsStr

    console.log(url)

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


// ---------------------

function clearPage() {
    games.value.splice(0)

    currentPage.value = 0
    itemsPerPage.value = 10
    totalElements.value = 0

    loadedPages.value = 0
}


// function changeSortBy(val) {
//     clearPage()

//     sortBy.value = val
//     loadGames()
// }

// function changeSortDir(dir) {
//     clearPage()

//     sortDir.value = dir
//     loadGames()
// }

// watch the route changes, apply the loadGames function to retrieve new data
watch(sortBy, () => {
    clearPage()
    loadGames()
})

watch(sortDir, () => {
    clearPage()
    loadGames()
})

</script>

<template>
    <div class="page-header">
        <h2>
            {{ totalElements }} Games available
        </h2>

        <div class="games-nav">
            <nav>
                <!-- <a @click.prevent="changeSortBy('popular')">Popurlarity</a>
                <a @click.prevent="changeSortBy('uploaddate')">Recently Updated</a>
                <a @click.prevent="changeSortBy('title')">Alphabetically</a> -->
                <RouterLink :to="{path: 'games', query: {sortBy: 'popular', sortDir}}" :class="{active: sortBy === 'popular'}">Popurlarity</RouterLink>
                <RouterLink :to="{path: 'games', query: {sortBy: 'uploaddate', sortDir}}" :class="{active: sortBy === 'uploaddate'}">Recently Updated</RouterLink>
                <RouterLink :to="{path: 'games', query: {sortBy: 'title', sortDir}}" :class="{active: sortBy === 'title'}">Alphabetically</RouterLink>
            </nav>
            <nav>
                <RouterLink :to="{path: 'games', query: {sortBy, sortDir: 'asc'}}"  :class="{active: sortDir === 'asc'}">ASC</RouterLink>
                <RouterLink :to="{path: 'games', query: {sortBy, sortDir: 'desc'}}"  :class="{active: sortDir === 'desc'}">DESC</RouterLink>
                <!-- <a @click.prevent="changeSortDir('asc')">ASC</a>
                <a @click.prevent="changeSortDir('desc')">DESC</a> -->
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

nav a.active {
    background: #aaa;
}

nav a:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

nav a:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.games-nav {
    margin-left: auto;
    display: flex;
    gap: 0 .5rem;
}
</style>