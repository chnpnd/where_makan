import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Home from '../views/Home.vue';
import Login from '../views/About.vue'
import Restaurant from '../views/Restaurant/Restaurant.vue'
import Explore from '../GoogleMap.vue'
import Analytics from '../views/Analytics.vue';

const routes = [
    { path: '/', component: Home, name: "Home" },
    { path: '/login', component: Login, name: "Login" },
    { path: '/restaurant', component: Restaurant, name: "Restaurant" },
    { path: '/explore', component: Explore, name: "Explore" },
    { path: '/analytics', component: Analytics, name: "Analytics" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
