<template>
	<div class="vidcontainer">
		<div id="vidnotif" class="vidnotif">{{ msg }}</div>
		<video ref="video" class="player" id="player" controls>
			<source :src="link" type="video/mp4">
			<source :src="link" type="video/ogg">
		</video>
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';

export default {
	name: "VideoPlayer",
	components: {
	},
	props: {
		link: {
			required: true
		}
	},
	data() {
		return {
			msg: "",
			curclr: null
		}
	},
	methods: {
		timeupdate(event) {
			if (this.$refs.video) {
				window.localStorage.setItem(`${this.$route.params.anime}<|>${this.$route.params.episode}`, this.$refs.video.currentTime)
			}
		},
		notify(notif) {
			if (this.curclr) {
				clearInterval(this.curclr)
				this.curclr = null
			}
			this.msg = notif
			document.getElementById("vidnotif").style.visibility = "visible"
			this.curclr = setTimeout(function() {
				document.getElementById("vidnotif").style.visibility = "hidden"
			}, 1500)
		},
		vidWaiting(smth) {
			console.log(smth)
			console.log("waiting")
		}
	},
	mounted() {
		const comp = this;
		const waitTillExists = setInterval(() => {
			const player = document.getElementById('player')
			if (player) {
				player.addEventListener("timeupdate", this.timeupdate)
				player.addEventListener("waiting", this.vidWaiting)
				const currentTime = window.localStorage.getItem(`${this.$route.params.anime}<|>${this.$route.params.episode}`)
				if (currentTime) {
					player.currentTime = currentTime > 5 ? currentTime - 5 : 0
				}

				player.addEventListener('focus',function(){this.blur()},false);
				window.onkeydown = function(e) {
					if (document.activeElement.tagName === "BODY") {
						switch (e.code) {
							case "ArrowRight": {
								player.currentTime = player.currentTime + 5 < player.duration  ? player.currentTime + 5 : player.duration
								comp.notify(`Fast forward 5 sec.`)
								break;
							}
							case "ArrowLeft": {
								player.currentTime = player.currentTime - 5 > 0  ? player.currentTime - 5 : 0
								comp.notify(`Rewind 5 sec.`)
								break;
							}
							case "Space": {
								player.paused || player.ended ? player.play() : player.pause()
								break;
							}
							case "ArrowUp": {
								player.volume += player.volume >= 0.9 ? 1 - player.volume : 0.1
								comp.notify(`Volume ${Math.round(player.volume*100)}%`)
								break;
							}
							case "ArrowDown": {
								player.volume -= player.volume <= 0.1 ? player.volume : 0.1
								comp.notify(`Volume ${Math.round(player.volume*100)}%`)
								break;
							}
							default: {
								break;
							}
						}
					}
				};

				clearInterval(waitTillExists)
			}
		}, 100)
	}
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

.player {
	width: 100%;
	outline: none;
}

.vidnotif {
	z-index: 1;
	position: absolute;
	right: 0;
	margin-top: 8px;
	background: #00000040;
	font-size: 18px;
	padding: 2px 6px;
	white-space: nowrap;
	margin-right: 8px;
}
</style>