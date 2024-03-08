<script setup>
import { ref } from 'vue'

import { useUserStore } from '@/stores/user.js'

import { postJSON } from '@/api';

const userStore = useUserStore()
const { signinUser } = userStore

// blank template for form and error messge
const blankTmpl = {
	username: null,
	password: null
}

const formData = ref({ ...blankTmpl })

const errors = ref(null)

async function signin() {

	// clear error messages
	errors.value = null

	const url = '/auth/signin'

	const res = await postJSON(url, formData.value)
	const { status, message, token } = res.data

	if (status === 'invalid') {
		errors.value = message
	} else if (status === 'success') {
		signinUser(formData.value.username, token)
	}

	formData.value = { ...blankTmpl }
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

label>span {
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