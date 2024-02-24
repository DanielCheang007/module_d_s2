<script setup>
</script>

<template>
    <header>
        <h1>WorldSkills: Games</h1>

        <div class="user-utils">
            <nav>
                <RouterLink to="/">Sign Up</RouterLink>
                <RouterLink to="/about">Sign In</RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    border: 1px solid #ccc;
    padding: 1rem;
    display: flex;
}

h1 {
    border: 1px solid #ccc;
    margin: 1rem 0;
    padding: .5rem;
}

.user-utils {
    margin-left: auto;
}

.user-utils nav {
    display: flex;
    gap: 0 .5rem;
}
</style>