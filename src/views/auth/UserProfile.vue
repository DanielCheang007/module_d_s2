<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.js'

import GameManageItem from "@/views/games/GameManageItem.vue"

import { getAuthJSON } from '@/api';

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const loading = ref(true)
const profile = ref(null)

async function loadProfile() {
	loading.value = true

	if (!user.value) return

	const res = await getAuthJSON(`/users/${user.value.username}`)
	if (res.ok) profile.value = res.data

	console.log(profile.value)

	loading.value = false
}

watch(user, loadProfile)
</script>
<template>
	<div class="page-content">
		<div v-if="loading">
			Loading...
		</div>
		<div v-else>
			<h2>{{ user.username }}</h2>

			<section>
				<h3>Authorized Games</h3>

				<div>
					<GameManageItem v-for="game in profile.authoredGames" :game="game" :key="game.slug">
					</GameManageItem>
				</div>
			</section>

			<section>
				<h3>Highscore per Game</h3>
				<div>
					<div v-for="item in profile.highscores" :key="item">
						<span>
							{{ item.game.title }}
						</span>
						<span>
							{{ item.score }}
						</span>
					</div>
				</div>
			</section>

		</div>
	</div>
</template>