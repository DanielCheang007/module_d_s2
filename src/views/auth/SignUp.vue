<script setup>
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// blank template for form and error messge
const blankTmpl = {
    username: null,
    password: null
}

// validation setting
const USERNAME_MIN = 4
const USERNAME_MAX = 60
const PASSWORD_MIN = 8
const PASSWORD_MAX = 2 ** 16

const formData = ref({...blankTmpl})

const errors = ref({...blankTmpl})

const result = ref(null)

function validate() {
    const {username, password} = formData.value 
    errors.value = {...blankTmpl}

    // validation
    if (!username || username.length < USERNAME_MIN) {
        errors.value.username = `At least ${USERNAME_MIN} characters`
    }

    if (username && username.length > USERNAME_MAX) {
        errors.value.username = `Maximum ${USERNAME_MAX} characters`
    }

    if (!password || password.length < PASSWORD_MIN) {
        errors.value.password = `At least ${PASSWORD_MIN} characters`
    }

    if (password && password.length > PASSWORD_MAX) {
        errors.value.password = `Maximum ${PASSWORD_MAX} characters`
    }

    // if any error occurs, validation failed.
    return (!errors.value.username && !errors.value.password) 
}

async function signup() {
    if (!validate()) return false

    if (!confirm("Are you sure?")) return false

    const url = API_URL + '/auth/signup'

    console.log(url)
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value)
    })

    result.value = await res.json()
    

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
            <div>
                <label>
                    <span>@</span>
                    <input type="text" placeholder="username" @input="validate" v-model="formData.username">
                </label>
                <div class="error">{{ errors.username }}</div>
            </div>
            <div class="field">
                <label>
                    <span>#123</span>
                    <input type="password" placeholder="password" @input="validate" v-model="formData.password">
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