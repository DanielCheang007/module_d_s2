<script setup>
import { postJSON } from '@/api'
import { ref } from 'vue'

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

const formData = ref({ ...blankTmpl })

const errors = ref({ ...errorBlankTmpl })

const result = ref(null)

async function signup() {
	if (!confirm("Are you sure?")) return false

	// clear error messages
	errors.value = { ...errorBlankTmpl }

	const url = '/auth/signup'
	const res = await postJSON(url, formData.value)

	const { status, message, violations } = res.data

	if (status === 'invalid') {
		errors.value.base = message
		errors.value.username = violations?.username?.message
		errors.value.password = violations?.password?.message
	}

	formData.value = { ...blankTmpl }
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