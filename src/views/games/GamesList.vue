<script setup>
import GameItem from "./GameItem.vue"
</script>

<template>
    <div class="page-header">
        <h2>
            654 Games available
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
        <GameItem v-for="i in 10"></GameItem>
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