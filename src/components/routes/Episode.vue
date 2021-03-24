<template>
	<div>
		<div class="video-section">
			<PlayerSection :nextepisode="nextepis" :name='name' :link='link'></PlayerSection>	
		</div>
		<div class="episodes-section">
			<div class="episodes">
				<EpisodesSection :nextepisode="nextepis" :homepage="homepage" :name='name' :pic='pic'></EpisodesSection>
			</div>
		</div>
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
import PlayerSection from "@/components/PlayerPage/PlayerSection.vue";
import EpisodesSection from "@/components/PlayerPage/EpisodesSection.vue";

export default {
	name: "Episode",
	components: {
		PlayerSection,
		EpisodesSection
	},
	data() {
		return {
			link: null,
			name: null,
			pic : null,
			homepage: null,
			nextepis: true
		}
	},
	watch: {
		$route (to, from) {
			progress.start('page')
			this.link = null
			this.name = null
			this.pic = null
			this.homepage = null
			this.nextepis = true

			this.$socket.emit("getVideoLink", {
				anime: this.$route.params.anime,
				episode: this.$route.params.episode
			})
			this.$socket.emit("getHomePage", {})

			document.getElementById("progressbar").style.background = "transparent"
		}
	},
	mounted() {
		this.$socket.emit("getVideoLink", {
			anime: this.$route.params.anime,
			episode: this.$route.params.episode
		})
		this.$socket.emit("getHomePage", {})
		document.getElementById("progressbar").style.background = "transparent"
	},
	sockets: {
		VideoLinkReturn(data) {
			if (data.notfound) {
				this.link = false
			} else {
				this.link = data.url
				this.name = data.name
				this.pic  = data.pic
			}
			progress.done()
		},
		homePage(data) {
			this.homepage = data
			console.log(data)
		}
	}
}
</script>

<style>
.video-section {
	position: absolute;
	width: 71%;
	left: 0px;
	top: 60px;
	bottom: 0px;
}

.episodes-section {
	position: absolute;
	width: 29%;
	right: 0px;
	top: 60px;
	bottom: 0px;
}

.episodes {
	position: absolute;
	right: 50px;
	width: 80%;
	left: 0px;
	top: 30px;
	overflow-y: auto;
	bottom: 20px;
}
</style>