<template>
	<div class="searcharea">
		
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
	
export default {
	name: "SearchPage",
	props: {
		searchres: {
			required: true
		}
	},
	mounted() {
		progress.done()
	}
}
</script>

<style>
	
</style>