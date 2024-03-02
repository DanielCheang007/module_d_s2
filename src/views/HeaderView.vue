<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()
const { signout } = userStore
const { user, loading: loadingProfile, isUserSignedIn } = storeToRefs(userStore)
</script>

<template>
    <header>
        <h1>
            <RouterLink to="/">
                WorldSkills: Games
            </RouterLink>
        </h1>

        <div class="user-utils">
            <template v-if="loadingProfile">loading...</template>
            <template v-else>
                <nav v-if="isUserSignedIn">
                    <span>{{ user.username }}</span>
                    <a href="" @click.prevent="signout()">Sign Out</a>
                </nav>
                <nav v-else>
                    <RouterLink to="/sign_up">Sign Up</RouterLink>
                    <RouterLink to="/sign_in">Sign In</RouterLink>
                </nav>
            </template>
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