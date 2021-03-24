<template>
	<div @click="moveToEpisode" class="previewdiv">
		<img :src="poster" alt="" class="poster">
		<table class="previewdatatable">
			<tr>
				<td>
					<span class="episodenumber">
						{{ nextep ? 'Next' : '' }} Episode: {{ episode }}
					</span>
				</td>
			</tr>
			<tr>
				<td>
					<span class="anime" :title="anime">
						{{ anime.length > 40 ? `${anime.substring(0, 39)}...` : anime }}
					</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: "Episode",
	props: {
		poster: {
			required: true
		}, 
		animekey: {
			required: true
		}, 
		nextep: {
			required: true
		}, 
		episode: {
			required: true
		},
		anime: {
			required: true
		}
	},
	methods: {
		moveToEpisode() {
			window.location.href = `/${this.animekey}/watch/${this.episode}`
		}
	}
}
</script>

<style>
table {
	border-spacing: 0;
}

img {
	width: 20%;
}

span {
	position: absolute;
	white-space: nowrap;
	height: 19px;
	margin-left: 15px;
	line-height: 0;

	font-weight: normal;
	font-size: 0.75vw;
}

.previewdatatable {
	margin-top: 5px;
}

.episodenumber {
	color: #FFFAFA;
	position: relative;
}

.anime {
	color: rgba(255, 255, 255, 0.2);
	position: relative;
}

.previewdiv:hover {
	background: #00000099;
	cursor: pointer;
}

.previewdiv {
	margin-bottom: 10px;
	display: flex;
	transition: background 0.5s;
}
</style>