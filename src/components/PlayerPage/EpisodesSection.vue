<template>
	<div>
		<div class="episode">
			<Preview v-if="nextepisode" :animekey="$route.params.anime" :nextep="true" :anime="name.match(/(.*?) Episode/i)[1]" :episode="parseInt($route.params.episode)+1" :poster="pic"></Preview>
		</div>
		<hr v-if="nextepisode" style="border-color: #ffffffa6">
		<div class="episode" :key="i" v-for="i in 10">
			<Preview :nextep="false" :animekey="homepage.recent[i].key" :anime="homepage.recent[i].name" :episode="parseInt(homepage.recent[i].episode)" :poster="homepage.recent[i].pic"></Preview>
		</div>
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
import Preview from '@/components/PlayerPage/Preview.vue'

export default {
	name: "EpisodeSection",
	components: {
		Preview
	},
	props: {
		pic: {
			required: true
		},
		nextepisode: {
			required: true
		},
		name: {
			required: true
		},
		homepage: {     // name, key, pic, episode number
			required: true
		}
	},
	data() {
		return {
			episodes: []
		}
	}
}
</script>

<style>
</style>