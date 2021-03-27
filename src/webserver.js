const express = require("express");
const app = express();
const http = require('http').Server(app)
const fetch = require("node-fetch");
const io = require('socket.io')(5100, {
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
		allowedHeaders: ["*"],
		credentials: true
	}
});

async function text(url) {
	const web = await fetch(url)
	return (await web.text()).replace(/(\r\n|\n|\r)/gm,"").replace(/ +/g, " ")
}
async function getlink(page) {
	const match = page.match(/<li class="dowloads"><a href="https:\/\/gogo-play\.net\/download(.*)" target="_blank"><i class="icongec-dowload"><\/i><span>Download<\/span><\/a><\/li>/i);
	const dtext = await text(`https://gogo-play.net/download${match[1]}`)
	return `https://storage.googleapis.com${(dtext.match(/<a href="https:\/\/storage\.googleapis\.com(.*?)" download>/i))[1]}`
}
async function getdata(page) {
	const pic = page.match(/<meta property="og:image" content="(.*?)"\/>/i)
	const name = page.match(/<div class="title_name"> <h2>(.*?)<\/h2> <\/div>/i)
	return {
		name: name[1],
		pic: pic[1]
	}
}
async function getinfo(anime, episode) {
	const page = await text(`https://gogoanime.ai/${anime}-episode-${episode}`)
	return {
		url: await getlink(page),
		data: await getdata(page)
	}
}
async function getrecent(recent) {
	const li = recent.match(/<li>(.*?)<\/li>/g)
	const ret = []
	for (i of li) {
		const things = i.match(/<img src="(.*?)" alt="(.*?)" .*"><a href="\/(.*?)-episode-(.*?)"/i)
		ret.push({
			name: things[2],
			key: things[3],
			pic: things[1],
			episode: parseInt(things[4])
		})
	}
	return ret
}
async function mainpage() {
	const page = await text(`https://gogoanime.ai/`)
	const recent = page.match(/<ul class="items"> (.*?) <\/ul>/i)
	const recentlist = await getrecent(recent[1])
	return {
		recent: recentlist
	}
}
async function searchpage(query) {
	query = query.replace(/ +/g, "%20")
	const page = await text(`https://gogoanime.ai//search.html?keyword=${query}`)
	let results = page.match(/<ul class="items">(.*?)<\/ul>/i)[1]
	results = results.match(/<li>(.*?)<\/li>/g) 
	const ret = []
	for (i of results) {
		const stuff = i.match(/(.*?)\/category\/(.*?)" title="(.*?)"> <img src="(.*?)"(.*?)"released"> (.*?) <\/p>/i)
		ret.push({
			name: stuff[3],
			key: stuff[2],
			pic: stuff[4],
			release: stuff[6]
		})
	}
	
	return ret
}
async function getTotalEp(page) {
	let res = page.match(/ep_end = '(.*?)'/g)
	let req = parseInt(res[res.length - 1].match(/ep_end = '(.*?)'/i)[1])
	return req
}
async function extGenre(data) {
	const matches = data.match(/<a (.*?)>(.*?)<\/a>/ig)
	const ret = []
	for (const i in matches) {
		ret.push(matches[i].match(/<a (.*?)>(.*?)<\/a>/i)[2].replace(/ +/g, "").replace(/,/g, ""))
	}
	return ret
}
async function getAnimeInfo(anime) {
	const page = await text(`https://gogoanime.ai/category/${anime}`)
	const rawData = page.match(/<div class="anime_info_body_bg">(.*?)<img src="https:\/\/gogocdn\.net(.*?)">(.*?)<h1>(.*?)<\/h1>(.*?)<p class="type">(.*?)<span>Plot Summary: <\/span>(.*?)<\/p>(.*?)<p class="type"><span>Genre: <\/span>(.*?)<\/p>(.*?)<p class="type"><span>Released: <\/span>(.*?)<\/p>(.*?)<p class="type"><span>Status: <\/span> <a href="\/ongoing-anime\.html" title="Ongoing Anime">Ongoing<\/a> <\/p>/i)
	const totalEps = await getTotalEp(page)
	const genres = await extGenre(rawData[9].trim(" "))
	return {
		name: rawData[4],
		pic: `https://gogocdn.net${rawData[2]}`,
		genres: genres,
		totalEp: totalEps,
		description: rawData[7],
		released: rawData[11]
	}
}

io.on("connection", (socket) => {
	console.log("Client connected!")
	socket.on("getVideoLink", async (data) => {
		try {
			const thing = await getinfo(data.anime, data.episode)
			socket.emit("VideoLinkReturn", {
				notfound: false,
				url : thing.url,
				name: thing.data.name,
				pic : thing.data.pic
			})
		} catch (err) {
			console.error(err)
			socket.emit("VideoLinkReturn", {
				notfound: true
			})
		}
	})
	socket.on("getHomePage", async (data) => {
		socket.emit("homePage", await mainpage())
	})
	socket.on("searchAnime", async (data) => {
		try {
			const retdata = {
				found: true,
				results: await searchpage(data.query)
			}
			socket.emit("animeSearchResult", retdata)
		} catch (err) {
			console.log(err)
			const retdata = {
				found: false
			}
			socket.emit("animeSearchResult", retdata)
		}
	})
	socket.on("getAnimeData", async (data) => {
		socket.emit("retAnimeData", await getAnimeInfo(data.name))
	})
})

http.listen(5000, async () => {
	console.log("Server running at port 5000.")
}); 