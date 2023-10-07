<template>
 <div class="container mt-5">
        <h1 class="display-4">Hawker Stalls</h1>
        <div class="searchContainer">
            <!-- Search input -->
            <input 
                type="text" 
                v-model="searchValue" 
                placeholder="Search Hawker Stalls"
                class="input input--biggest input--noborder input--shadow-large input--rounded">
        </div>
            <!-- Restaurant list -->
        <div class="list-group listContainer mt-3">

            <router-link
                v-for="store1 in filteredResults"
                :key="store1.owner_id"
                class="list-group-item list-group-item-action"
                :to="{ name: 'store-details-stall', params: { storeIdStall: store1.owner_id } }"
            >
                <img :src="store1.store_url" alt="Store Photo" class="mr-3" style="max-width: 50px; max-height: 50px;">
                {{ store1.name }}
            </router-link>
        </div>
  </div>
</template>

<script>

export default {
    data() {
        return{
            searchValue: '', // Stores the user's search input
            result: {
            },
        }
    },
    created() {
        // Use the created lifecycle hook to fetch data when the component is created
        this.GetAllHawkerStalls();
    },
    methods: {
        async GetAllHawkerStalls() {
            try {
                const url = `https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkerstore/`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    // Store the fetched data in the result array
                    this.result = data;
                } 
                else {
                // Handle any errors here
                console.error("Failed to fetch data");
                }
            } 
            catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        },
        storePosition(store1) {
            return { lat: store1.lat, lng: store1.long };
        },
    },
    
    computed: {
        filteredResults() {
            if (!this.searchValue) {
            // Return an empty array if searchValue is empty
            return [];
            }

            return this.result.filter((store1) =>
                store1.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                store1.address.toLowerCase().includes(this.searchValue.toLowerCase())
            );
        }
    },
  };

</script>
