<template>
	<div id="video" class="video">
		<div class="viderr" v-if="link === null">
			Loading...
		</div>
		<div class="viderr" v-else-if="link === false">
			No episode found.
		</div>
		<div v-else>
			<VideoPlayer ref="video" class="player" :link="link"></VideoPlayer>
			<div class="vidstuff">
				<span class="title">{{ name }}</span>
				<div style="display: flex;right: 0;position: absolute;">
					<button class="download"><a class="dwlink" :href="link">Download</a></button>
					<button class="download"><router-link v-if="nextepisode" class="dwlink" :to="`/${$route.params.anime}/watch/${parseInt($route.params.episode) + 1}`">Next Episode</router-link></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
import VideoPlayer from '@/components/PlayerPage/VideoPlayer.vue';

export default {
	name: "PlayerSection",
	components: {
		VideoPlayer
	},
	props: {
		nextepisode: {
			required: true
		},
		link: {
			required: true
		},
		name: {
			required: true
		}
	},
	data() {
		return {
		
		}
	},
	methods: {
		checksize() {
			const video = document.getElementById('video')
			if (!this.link) {
				video.style.height = `${56*video.getBoundingClientRect().width/100}px`
			} else {
				video.style.height = 0
			}
		}
	},
	mounted() {
		const video = document.getElementById('video')
		if (!this.link) {
			video.style.height = `${56*video.getBoundingClientRect().width/100}px`
			const checkExists = setInterval(() => {
				const player = document.getElementById('player')
				if (player) {
					video.style.height = "0px"
					clearInterval(checkExists)
				}
			}, 2000)
		}
	},
	created() {
		window.addEventListener("resize", this.checksize);
	},
	destroyed() {
		window.removeEventListener("resize", this.checksize);
	},
}
</script>

<style>
.video {
	position: absolute;
	width: 90%;
	left: 60px;
	top: 30px;
	outline: none;
	font-size: 25px;
}

.viderr {
	text-align: center;
}

.vidstuff {
	margin-top: 10px;
}

.title {
	position: relative;
	left: 0;
	top: 0;
	height: 0;
	margin-left: 0;
	font-weight: normal;
	font-size: 23px;
	color: #FFFFFF;
}

.download {
	margin-left: 10px;
	padding: 5px 10px;
	background: rgba(0, 0, 0, 0.54);
	border-color: rgba(0, 0, 0, 0.54);
	border-radius: 2px;
	border-style: solid;
	transition: border 0.5s;
}

.download:hover {
	cursor: pointer;
	border-color: royalblue;
}

.dwlink {
	text-decoration: none;
	color: #fff;
	font-size: 17px;
}
</style>