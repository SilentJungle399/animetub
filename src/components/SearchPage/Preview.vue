<template>
	<div @click="moveToEpisode" class="resultpreviewcard">
		<img :src="data.pic" alt="" class="resultposter">
		<div class="animetitle">{{ data.name }}</div>
		<div class="released">{{ data.release }}</div>
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
	
export default {
	name: "Preview",
	props: {
		data: {
			required: true
		}
	},
	mounted() {
		progress.done()
	},
	methods: {
		moveToEpisode() {
			window.location.href = `/anime/${this.data.key}`
		}
	}
}
</script>

<style>
.resultpreviewcard {
	display: flex;
	margin: 0px 0px 10px 15px;
	padding: 10px 15px 10px 15px;
	/* margin: 10px; */
	transition: background 0.5s;
	text-align: center;
	flex-direction: column;
}

.resultpreviewcard:hover {
	background: #00000099;
	cursor: pointer;
}

.resultposter {
	height: 24vh;
	width: initial;
}

.animetitle {
	margin: 8px 0 2px 0;
	font-size: 15px;
	position: initial;
	white-space: initial;
    height: initial;
    margin-left: initial;
    line-height: initial;
    font-weight: normal;
}

.released {
	font-size: 15px;
	position: initial;
	color: #ffffff42;
	white-space: initial;
    height: initial;
    margin-left: initial;
    line-height: initial;
    font-weight: normal;
}
</style>