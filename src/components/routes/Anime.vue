<template>
	<div class="animearea">
		hi
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
import recent from '@/handlers/recent.js';
	
export default {
	name: "AnimePage",
	mounted() {
		progress.done()
		const receps = recent.getRecent(this.$route.params.anime)
		console.log(receps)
	}
}
</script>

<style>
.animearea {
	margin-top: 60px;
}
</style>