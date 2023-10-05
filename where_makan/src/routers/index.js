import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue'
import Restaurant from '../views/Restaurant/Restaurant.vue'
import Login from '../GoogleMap.vue'
import Analytics from '../views/Analytics.vue';
import StoreDetails from '../views/Restaurant/StoreDetails.vue';
import Recommendations from '../views/Recommendations.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/restaurant', component: Restaurant },
    { path: '/store/:storeId', name: 'store-details', component: StoreDetails, props: true }, // Dynamic route for store details
    { path: '/login', component: Login },
    { path: '/analytics', component: Analytics },
    { path: '/recommendations', component: Recommendations },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
