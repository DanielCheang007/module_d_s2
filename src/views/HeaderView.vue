<script setup>
</script>

<template>
    <header>
        <h1>
            <RouterLink to="/">
                WorldSkills: Games
            </RouterLink>
        </h1>

        <div class="user-utils">
            <nav>
                <RouterLink to="/sign_up">Sign Up</RouterLink>
                <RouterLink to="/sign_in">Sign In</RouterLink>
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