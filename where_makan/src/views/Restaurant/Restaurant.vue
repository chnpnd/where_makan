<template>
    <h1>Restaurants</h1>
    <ul>
        <li v-for="store in restaurants" :key="store.id" class="restaurants">
            {{ store.name }}
            <!-- {{ store.operating_hours }} -->
        </li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return{
            restaurants: []
        }
    },
    mounted() {
        // Fetch data when the component is mounted
        axios.get('../../../queries/getRestaurants.php')
        .then(response => {
            this.restaurants = response.data;
        })
        .catch(error => {
            // Handle errors
        });
  },
}
</script>

<style>

</style>
