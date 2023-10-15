import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Home from '../views/Home.vue';
import Login from '../views/About.vue'
import HawkerCenters from '../views/HawkerCenters/HawkerCenters.vue'
import Explore from '../components/Home/GoogleMap.vue'
import Analytics from '../views/Analytics.vue';
import CenterDetails from '../views/HawkerCenters/CenterDetails.vue';
import GeolocationTracker from '../components/GeolocationTracker.vue';
import HawkerStall from '../views/HawkerStall.vue';
import StoreDetailsStall from '../views/StoreDetailsStall.vue';
import Review from '../components/LeaveReview.vue';
import Order from '../components/FoodOrder.vue';

const routes = [
    { path: '/', component: Home, name: "Home" },
    { path: '/login', component: Login, name: "Login" },
    { path: '/hawkerCenters', component: HawkerCenters, name: "HawkerCenters" },
    { path: '/center/:centerId', name: 'center-details', component: CenterDetails, props: true }, // Dynamic route for store details
    { path: '/explore', component: Explore, name: "Explore" },
    { path: '/analytics', component: Analytics, name: "Analytics" },
    { path: '/GeolocationTracker', component: GeolocationTracker},
    { path: '/hawkerstall', component: HawkerStall },
    { path: '/store/:storeId', name: 'store-details-stall', component: StoreDetailsStall, props: true },
    { path: '/review', name: 'review', component: Review},
    { path: '/order', name: 'order', component: Order}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
