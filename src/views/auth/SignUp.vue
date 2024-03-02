<script setup>
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// blank template for form and error messge
const blankTmpl = {
    username: null,
    password: null
}

const errorBlankTmpl = {
    username: null,
    password: null,
    base: null
}

const formData = ref({...blankTmpl})

const errors = ref({...errorBlankTmpl})

const result = ref(null)

async function signup() {
    if (!confirm("Are you sure?")) return false

    // clear error messages
    errors.value = {...errorBlankTmpl}

    const url = API_URL + '/auth/signup'

    console.log(url)
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value)
    })

    const json = await res.json()

    if (json.status === 'invalid') {
        errors.value.base = json?.message
        errors.value.username = json?.violations?.username?.message
        errors.value.password = json?.violations?.password?.message
    }

    result.value = json

    formData.value = {...blankTmpl}
}

</script>

<template>
    <div class="page-header">
        <h1>Sign Up</h1>
    </div>
    <div class="page-content">
        <div>
            {{ formData }}
        </div>
        <div>
            {{ result }}
        </div>
        <form @submit.prevent.stop="signup">
            <div class="error">{{ errors.base }}</div>
            <div>
                <label>
                    <span>@</span>
                    <input type="text" placeholder="username" v-model="formData.username">
                </label>
                <div class="error">{{ errors.username }}</div>
            </div>
            <div class="field">
                <label>
                    <span>#123</span>
                    <input type="password" placeholder="password" v-model="formData.password">
                </label>
                <div class="error">{{ errors.password }}</div>
            </div>
            <div class="actions">
                <input type="submit" value="Sign Up">
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