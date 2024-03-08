<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/user.js'

import { getJSON, postHTML } from '@/api'

import GameEditableItem from './GameEditableItem.vue';

const userStore = useUserStore()


const route = useRoute()
const slug = computed(() => route.params.slug)

const loading = ref(true)
const game = ref(null)

async function loadGameDetails() {
	loading.value = true

	const url = `/games/${slug.value}`
	const res = await getJSON(url)
	game.value = res.data
	console.log(res.data)

	loading.value = false
}
loadGameDetails()


const form = ref(null)
const fileField = ref(null)
async function onSubmit() {
	const formData = new FormData()
	formData.append("zipfile", fileField.value.files[0])
	formData.append("token", userStore.token)
	// console.log(formData)

	const url = `/games/${slug.value}/upload`
	const res = await postHTML(url, formData)

	// refresh the thumbnail
	if (res.ok) loadGameDetails()
}
</script>
<template>
	<div class="page-header">
		<div v-if="loading">Loading...</div>
		<div v-else>
			<h2>Manage Game</h2>

			<GameEditableItem :game="game"></GameEditableItem>

			<div>
				<form ref="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
					<div>
						<input ref="fileField" type="file" name="file" required>
					</div>

					<button>Upload new version</button>
					<button>Delete</button>
				</form>
			</div>

		</div>
	</div>
</template>