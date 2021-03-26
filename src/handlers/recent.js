export default {
	getRecent(anime) {
		const ws = window.localStorage;
		const results = []
		for (let i in ws) {
			if (/(.*?)<|>(.*?)/.test(i)) {
				const things = i.split("<|>")
				if (anime === things[0] || anime === true) {
					results.push(i)
				}
			}
		}
		return results
	}
}