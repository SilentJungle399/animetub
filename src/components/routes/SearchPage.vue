<template>
	<div class="resultsarea">
		<div v-if="searchres === null">
			Type the anime name in the input above and click enter to see the results.
		</div>
		<div v-else-if="searchres === false">
			No results found for: {{ searchitem }}
		</div>
		<div class="searchresults" v-else> 
			<div :key="res.key" v-for="res in searchres">
				<Preview :data="res"></Preview>
				<!-- {{ res }} -->
			</div>
		</div>
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
import Preview from '@/components/SearchPage/Preview.vue';
	
export default {
	name: "SearchPage",
	components: {
		Preview
	},
	props: {
		searchres: {
			required: true
		},
		searchitem: {
			required: true
		}
	},
	data () {
		return {
			smth: {
				key: "key",
				pic: "https://gogocdn.net/cover/black-clover-tv-dub.png",
				release: "release",
				name: "name"
			}
		}
	},
	mounted() {
		progress.done()
	}
}
</script>

<style>
.resultsarea {
	display: flex;
    justify-content: center;
    width: 80%;
    margin: 120px auto 0 auto;
}

.searchresults {
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 200px));
	/* flex-wrap: wrap; */
}
</style>