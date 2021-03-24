import VueRouter from 'vue-router';
import Vue from 'vue';
import Episode from '@/components/routes/Episode.vue';

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: "/:anime/watch/:episode",
			component: Episode
		}
	]
})

export default router