import VueRouter from 'vue-router';
import Vue from 'vue';
import Episode from '@/components/routes/Episode.vue';
import SearchPage from '@/components/routes/SearchPage.vue';
import AnimePage from '@/components/routes/Anime.vue';

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/:anime/watch/:episode",
			component: Episode
		},
		{
			path: "/search",
			component: SearchPage
		},
		{
			path: "/anime/:anime",
			component: AnimePage
		}
	]
})

export default router