<template>
	<div class="">
		
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
	
export default {
	name: "Preview",
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