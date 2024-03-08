<script setup>
defineProps(['game'])

const BASE_URL = import.meta.env.VITE_BASE_URL

function thumb(game) {
	return BASE_URL + `/game/${game.slug}/thumbnail.png`
}

</script>

<template>
	<div class="game">
		<div class="game-item-header">
			<div class="game-title">
				<router-link :to="`/game/${game.slug}`">
					{{ game.title }}
				</router-link>
			</div>
			<div class="game-scores"># scores submitted: {{ game.scoreCount }}</div>
		</div>
		<div class="game-item-body">
			<div class="game-thumbnail">
				<img :src="thumb(game)" alt="game thumbnail">
			</div>
			<div clsas="game-desc">
				{{ game.description }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.game {
	border: 1px solid #ccc;
	padding: 1rem;
	margin: 1rem 0;

	position: relative;
}

.game-title {
	font-size: 1.25rem;
}

.game-auther {
	font-size: .875rem;
}

.game-scores {
	font-size: smaller;

	position: absolute;
	top: 1rem;
	right: 1rem;
}

.game-item-body {
	display: flex;
	gap: 0 .5rem;
	margin-top: .5rem;
}

.game-thumbnail {
	flex: 0 0 30%;
}

.game-thumbnail img {
	max-width: 100%;
}
</style>