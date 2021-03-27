<template>
	<div class="animearea">
		<div class="infoarea">
			<div class="animeinfo">
				<span class="animename">{{ animedata.name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="release dimdata">({{ animedata.released }})</span>
				<br>
				<div class="animegenres"> Genres: <span class="dimdata genretypes">{{ animedata.genres.join(' ') }}</span></div>
				<br>
				<div class="descarea">
					Description: <span class="description">{{ animedata.description }}</span>
				</div>
			</div>
			<div class="posterarea">
				<img :src="animedata.pic" alt="" align="right" class="animeposter">
			</div>
		</div>
		<div class="animeepisodes">
			<hr>
			<span class="animename" style="font-size: 25px;">Episodes</span> <span class="dimdata" style="font-size: 15px;">({{ animedata.totalEp }})</span><br><br>
			<span class="animename" style="font-size: 19px;">Recently watched:</span>
			<div class="recentepisodes">
				<div style="margin-left: 40px" v-if="receps.length === 0">
					You have not watched any recent episodes.
				</div>
				<div v-else class="recep" @click="moveToEpisode(episode.episode)" @mouseleave="editHover(null)" @mouseover="editHover(episode.episode)" :key="episode.episode" v-for="episode in receps">
					Episode {{ episode.episode }}
					<span class="timepercentagedata">{{ Math.round(episode.curTime*100/episode.totalTime) }}% watched</span>
					<div class="playbutcenter">
						<fontAws v-if="showplaybut === episode.episode" class="playbutton" icon="play"></fontAws>
					</div>
					<div :style="`width:${episode.curTime*100/episode.totalTime}%`" class="recentepbar"></div>
				</div>
			</div> 
			<br><br>
			<span class="animename" style="font-size: 19px;">Other episodes:</span><br>
			<input type="text" v-model="enteredEp" @keypress.enter="moveToEpisode(enteredEp)" placeholder="Type episode number and press enter" class="episodeSearchBox">
		</div>
	</div>
</template>

<script>
import progress from '@/handlers/progress.js';
import recent from '@/handlers/recent.js';
	
export default {
	name: "AnimePage",
	data() {
		return {
			animedata: null,
			receps: [],
			showplaybut: null,
			enteredEp: null
		}
	},
	methods: {
		editHover(episode) {
			this.showplaybut = episode
		},
		moveToEpisode(episode) {
			if (parseInt(episode) > this.animedata.totalEp) {
				return this.$emit("alert", `There are only ${this.animedata.totalEp} episodes in this anime. Please enter a number between 0 and ${this.animedata.totalEp}`)
			} else {
				window.location.href =  `/${this.$route.params.anime}/watch/${episode}`
			}
		},

	},
	mounted() {
		this.$socket.emit("getAnimeData", {
			name: this.$route.params.anime
		})
		const recenteps = recent.getRecent(this.$route.params.anime)
		const data = []
		for (const i of recenteps) {
			const smth = JSON.parse(window.localStorage.getItem(i))
			smth.episode = parseInt(i.split("<|>")[1])
			data.push(smth)
		}
		let least = null;
		const ordered = [];
		while (data.length > 0) {
			// ordering data acc to time
			for (const item of data) {
				if (!least) {
					least = item
				} else {
					if (least.lastUpdated < item.lastUpdated) {
						least = item
					}
				}
			}
			
			ordered.push(least)
			data.splice(data.indexOf(least), 1)
			least = null
		}
		this.receps = ordered
	},
	sockets: {
		retAnimeData(data) {
			this.animedata = data
			progress.done()
		}
	}
}
</script>

<style>
.episodeSearchBox {
	outline: none;
	width: 250px;
	margin-left: 40px;
	margin-top: 20px;
	border: none;
	padding: 7px 10px;
	color: white;
	border-radius: 5px;
    background-color: #333;
}

.timepercentagedata {
	margin: initial;
	font-size: 14px;
	position: absolute;
    color: #ffffff7d;
	right: 0;
	white-space: initial;
    height: initial;
    margin-right: 10px;
    line-height: initial;
    font-weight: normal;
}

.animearea {
	display: flex;
	flex-direction: column;
    width: 60%;
    margin: 90px auto 0 auto;
}

.playbutcenter {
	display: flex;
	justify-content: center;
	align-items: center;
}

.recentepbar {transition: all 200ms ease 0s;
    background: #ff0000;
    position: absolute;
    z-index: 1031;
    bottom: 0;
    left: 0;
    height: 4px;
}

.playbutton {
    font-size: 50px;
    color: #8c8c8c26;
}

.recentepisodes {
	display: grid;
	margin-top: 20px;
	grid-template-columns: repeat(4, 25%);
}

.recep {
	transition: background 0.5s;
	height: 120px;
	position: relative;
	background: #0000005e;
	padding: 10px;
	margin-left: 20px;
	margin-bottom: 20px;
	border-radius: 5px;
	border-top-color: initial;
	border-left-color: initial;
	border-right-color: initial;
}

.recep:hover {
	background: #000000cf;
	cursor: pointer;
}

.animeinfo {
	width: 100%;
	padding-right: 100px;
}

.description {
	margin: initial;
	font-size: 15px;
	position: initial;
    color: #ffffff7d;
	white-space: initial;
	word-spacing: 2px;
	letter-spacing: 0.3px;
    height: initial;
    margin-left: initial;
    line-height: initial;
    font-weight: normal;
}

.animename {
	margin: initial;
	font-size: 30px;
	position: initial;
	white-space: initial;
    height: initial;
    margin-left: initial;
    line-height: initial;
    font-weight: normal;
}

.posterarea {
	align-self:stretch
}

.release {
    font-size: 19px;
}

.genretypes {
    font-size: 15px;
}

.animeposter {
	width: 20vh;
}

.dimdata {
	margin: initial;
    color: #ffffff7d;
	position: initial;
	white-space: initial;
    height: initial;
    margin-left: initial;
    line-height: initial;
    font-weight: normal;
}

.animegenres {
	margin-top: 20px;
}

.infoarea {
	display: flex;
	margin-bottom: 50px;
}
</style>