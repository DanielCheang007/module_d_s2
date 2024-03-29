<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

import { getJSON, postAuthJSON } from '@/api'

const route = useRoute()
const slug = computed(() => route.params.slug)

const BASE_URL = import.meta.env.VITE_BASE_URL

const loading = ref(false)
const game = ref(null)
const scores = ref(null)

const gameUrl = computed(() => BASE_URL + '/game/' + slug.value + '/index.html')

async function loadScores() {
	const url = `/games/${slug.value}/scores`
	const res = await getJSON(url)
	scores.value = res.data.scores
}

async function loadGameDetails() {
	loading.value = true

	const url = `/games/${slug.value}`
	const res = await getJSON(url)
	game.value = res.data

	await loadScores()

	loading.value = false
}

async function postSocre(score) {
	const url = `/games/${slug.value}/scores`
	const res = await postAuthJSON(url, { score })
	console.log(res)

	if (res.ok) loadScores()
}

function observeGame(event) {
	// TODO: for security, should check the origin in production!
	// if (event.origin !== 'http://localhost:5173') return

	if (event?.data.event_type === 'game_run_end') {
		if (confirm("Are you sure to publish the score?")) {
			postSocre(event?.data.score)
		}
	}
}

onMounted(() => {
	window.addEventListener("message", observeGame)
})

onBeforeUnmount(() => {
	window.removeEventListener("message", observeGame)
})


loadGameDetails()
</script>

<template>
	<div v-if="loading">loading...</div>
	<div v-else>
		<h2>{{ game.title }}</h2>
		<div>
			<iframe :src="gameUrl"></iframe>
		</div>

		<div class="game-details">
			<div>
				<h3>Top 10 Leaderboard</h3>

				<div v-for="(score, i) in scores" :key="score" class="score-item">
					<span class="score-user">
						# {{ i }} {{ score.username }}
					</span>
					<span class="score-num">
						{{ score.score }}
					</span>
				</div>

				<div style="display: flex;">
					<b>ActivePlayer</b>
					<span style="margin-left: auto;">
						{{ game.scoreCount }}
					</span>
				</div>
			</div>
			<div>
				<h3>Description</h3>
				{{ game.description }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.game-details {
	width: 60%;
	display: flex;
	margin: 2rem auto;
	gap: 0 6rem;
}

.game-details>* {
	flex: 1
}

iframe {
	border: 1px solid #ccc;
	display: block;

	width: 60%;
	margin: 0 auto;
	height: 400px;
}

.score-item {
	display: flex;
}

.score-item .score-num {
	text-align: right;
	margin-left: auto;
}
</style>