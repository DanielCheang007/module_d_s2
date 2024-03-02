<script setup>
import { ref } from 'vue'

import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()
const { signinUser } = userStore

const API_URL = import.meta.env.VITE_API_URL

// blank template for form and error messge
const blankTmpl = {
    username: null,
    password: null
}

const formData = ref({...blankTmpl})

const errors = ref(null)

const result = ref(null)

async function signin() {

    // clear error messages
    errors.value = null

    const url = API_URL + '/auth/signin'

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value)
    })

    const json = await res.json()

    if (json.status === 'invalid') {
        errors.value = json?.message
    } else if (json.status === 'success') {
        signinUser(formData.value.username, json.token)
    }

    result.value = json

    formData.value = {...blankTmpl}
}

</script>

<template>
    <div class="page-header">
        <h1>Sign In</h1>
    </div>
    <div class="page-content">
        <div>
            {{ formData }}
        </div>
        <div>
            {{ result }}
        </div>
        <form @submit.prevent.stop="signin">
            <div class="error">{{ errors }}</div>
            <div>
                <label>
                    <span>@</span>
                    <input type="text" placeholder="username" v-model="formData.username">
                </label>
            </div>
            <div class="field">
                <label>
                    <span>#123</span>
                    <input type="password" placeholder="password" v-model="formData.password">
                </label>
            </div>
            <div class="actions">
                <input type="submit" value="Sign In">
                <a href="#" @click.prevent="cancel">Cancel</a>
            </div>
        </form>
    </div>
</template>

<style scoped>
    form {
        width: 300px;
        margin: 0 auto;
    }
    label {
        display: inline-flex;
    }
    label > span {
        background: #ccc;
        width: 3rem;
    }

    .field {
        margin: .5rem 0;
    }

    .actions a {
        margin-left: 6rem;
    }

    .error {
        color: red;
    }
</style>