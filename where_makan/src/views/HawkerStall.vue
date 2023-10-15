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
                v-for="store in filteredResults"
                :key="store.owner_id"
                class="list-group-item list-group-item-action"
                :to="{ name: 'store-details-stall', params: { storeId: store.owner_id } }"
            >
                <img :src="store.store_url" alt="Store Photo" class="mr-3" style="max-width: 50px; max-height: 50px;">
                {{ store.name }}
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
                const url = `https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore/`;
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
        storePosition(store) {
            return { lat: store.lat, lng: store.long };
        },
    },
    
    computed: {
        filteredResults() {
            if (!this.searchValue) {
            // Return an empty array if searchValue is empty
            return [];
            }

            return this.result.filter((store) =>
                store.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                store.address.toLowerCase().includes(this.searchValue.toLowerCase())
            );
        }
    },
  };

</script>
