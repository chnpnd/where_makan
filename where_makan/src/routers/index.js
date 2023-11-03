import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Home from '../views/Home.vue';
import Login from '../views/About.vue'
import Search from '../components/Searchbar.vue'
import Explore from '../components/Home/GoogleMap.vue'
import Analytics from '../views/Analytics.vue';
import CenterDetails from '../views/HawkerCenters/CenterDetails.vue';
import GeolocationTracker from '../components/GeolocationTracker.vue';
import StallDetails from '../views/HawkerStalls/StallDetails.vue';
import FoodDetails from '../views/Food/FoodDetails.vue';
import Review from '../components/LeaveReview.vue';
import Order from '../components/FoodOrder.vue';
import Profile from '../views/Profile/Profile.vue';
import EditProfile from '../views/Profile/EditProfile.vue';
import MyRewards from '../views/Rewards/MyRewards.vue';
import ExchangeRewards from '../views/Rewards/ExchangeRewards.vue';

const routes = [
    { path: '/', component: Home, name: "Home" },
    { path: '/login', component: Login, name: "Login" },
    { path: '/search', component: Search, name: "Search" },
    { path: '/explore', component: Explore, name: "Explore" },
    { path: '/analytics', component: Analytics, name: "Analytics" },
    { path: '/GeolocationTracker', component: GeolocationTracker},
    { path: '/stall/:stallId', name: 'stall-details', component: StallDetails, props: true },
    { path: '/review', name: 'review', component: Review},
    { path: '/order', name: 'order', component: Order},
    // { path: '/stall-/:stallId', name: 'stall-details', component: StallDetails, props: true}
    // Dynamic Routes for search details
    { path: '/center/:centerId', name: 'center-details', component: CenterDetails, props: true },
    { path: '/food-details/:foodId', name: 'food-details', component: FoodDetails, props: true },
    { path: '/stall-details/:stallId', name: 'stall-details', component: StallDetails, props: true},
    { path: '/profile', component: Profile, name: "Profile" },    
    { path: '/editprofile', component: EditProfile, name: "EditProfile" },    
    { path: '/myrewards', component: MyRewards, name: "MyRewards" },    
    { path: '/exchangerewards', component: ExchangeRewards, name: "ExchangeRewards" },    
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
