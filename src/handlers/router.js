import VueRouter from 'vue-router';
import Vue from 'vue';
import Episode from '@/components/routes/Episode.vue';
import SearchPage from '@/components/routes/SearchPage.vue';

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
		}
	]
})

export default router