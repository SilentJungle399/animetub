<template>
	<div id="app">
		<div class="supported" v-if="!unsupported">
			<!-- Application here -->
			<Notification :msg="notif"></Notification>
			<div class="titlebar">
				<div class="animesearchinputdiv">
					<input spellcheck="false" placeholder="Search for anime" v-model="animesearch" type="text" class="animesearch" @keypress.enter="searchAnime">
					<div @click="clearinput('animesearch')" v-show="animesearch" class="cancelicondiv">
						<fontAws v-show="animesearch" class="animesearchcancelicon" icon="times"></fontAws>
					</div>
				</div>
			</div>
			<router-view :searchres="searchresult"></router-view>
		</div>
		<div v-else class="unsupported">
			<h3>Unfortunately, your device is not supported for the webapp.</h3>
		</div>
	</div>
</template>

<script> 
import Notification from '@/components/utils/Notification.vue'
import progress from '@/handlers/progress.js';

export default {
	name: 'App',
	components: {
		Notification,
	},
	data() {
		return {
			notif: null,
			curnotif: null,
			unsupported: false,
			animesearch: null,
			searchresult: null
		}
	},
	methods: {
		searchAnime() {
			if (!this.animesearch) {
				this.makealert("Please enter anime name to search for!")
			} else {
				progress.start('load')
				this.makealert(`Searching for: ${this.animesearch}`)
				this.$socket.emit("searchAnime", {
					query: this.animesearch
				})
				if (this.$route.path !== "/search") {
					this.$router.push({
						path: "/search"
					})
				}
			}
		},
		clearinput(field) {
			if (field === "animesearch") {
				this.animesearch = null
			}
		},
		makealert(msg) {
			if (this.curnotif) {
				clearTimeout(this.curnotif)
				this.curnotif = null
			}
			this.notif = msg
			document.getElementById("notif").style.opacity = 1
			const comp = this;
			this.curnotif = setTimeout(function() {
				document.getElementById("notif").style.opacity = 0
			}, 2500)
		},
		checksize() {
			if (window.innerWidth > 1000) {
				if (this.unsupported) {
					progress.start('load')
				}
				this.unsupported = false
			} else {
				this.unsupported = true
			}
		}
	},
	mounted() {
			if (window.innerWidth > 1000) {
				this.unsupported = false
			} else {
				this.unsupported = true
				progress.done()
			}
	},
	sockets: {
		animeSearchResult(data) {
			if (data.found) {
				this.searchresult = data
			} else {
				this.searchresult = false
			}
			progress.done()
			console.log(data)
		}
	},
	watch: {
		animesearch (after, before) {
			if (!before) {
				this.makealert("Press enter after typing the query to initiate the search!")
			}
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
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');

body {
	background: #151516;
	color: rgb(255, 255, 255);
	font-family: 'Rubik', sans-serif;
}

.unsupported {
	text-align: center;
}

.cancelicondiv {
	border-left: 1px solid #555;
	padding: 0 15px;
	display: flex;
	align-items: center;
}

.cancelicondiv:hover {
	cursor: pointer;
}

.animesearch {
	width: 100%;
	background-color: #151516;
	outline: none;
	color: white;
	font-size: 18px;
	margin-left: 1px;
	border-color: #151516;
	border-radius: 2px;
	border-style: solid;
	transition: border 0.5s;
}

.animesearchinputdiv:focus-within {
	border-color: royalblue;
}

.animesearchcancelicon {
	font-size: 25px;
	transition: display 0.5s;
}

.animesearchinputdiv {
	display: flex;
	width: 485px;
	margin: 0 auto;
	padding: 0 3px;
	margin-top: 12px;
	height: 35px;
	background: #121215;
	border-radius: 8px;
	border-width: 2px;
	border-style: solid;
	border-color: #151516;
	transition: border 0.5s;
}

.searcharea {
	display: flex;
}

.progressing {
	height: 100%;
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	background-color: #151516;
}

.titlebar {
	position: absolute;
	width: 100%;
	height: 60px;
	left: 0px;
	top: 0px;
	background: #212223;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(0 26 26 / 1); 
  border-radius: 10px; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(0 38 38 / 1);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(0, 0, 0); 
}

</style>