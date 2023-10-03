<template>
    <div class="container mt-5">
        <h1 class="display-4">Restaurants</h1>
        <div class="searchContainer">
            <!-- Search input -->
            <input 
                type="text" 
                v-model="searchValue" 
                placeholder="Search food centre or locations"
                class="input input--biggest input--noborder input--shadow-large input--rounded">
        </div>
            <!-- Restaurant list -->
        <div class="list-group listContainer mt-3">

            <router-link
                v-for="store in filteredResults"
                :key="store.id"
                class="list-group-item list-group-item-action"
                :to="{ name: 'store-details', params: { storeId: store.id } }"
            >
                <img :src="store.photo_url" alt="Store Photo" class="mr-3" style="max-width: 50px; max-height: 50px;">
                {{ store.name }}
            </router-link>
        </div>

        <div class="video-container">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ERyJ_9IIfU8"
                frameborder="0"
                allowfullscreen
            ></iframe>
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
        this.GetAllHawkerCentres();
    },
    methods: {
        async GetAllHawkerCentres() {
            try {
                const url = `https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`;
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

<style>
    .listContainer {
        width: 900px;
        max-height: 300px; /* Set a maximum height for the container */
        overflow-y: auto; /* Add a vertical scrollbar when content overflows */
    }

    .searchContainer {
        margin-bottom: 20px;
        position: relative;
    }

    /* CSS for the search input */
    .input {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-size: 18px;
        outline: none;
        transition: box-shadow 0.3s ease-in-out;
    }

    /* Add styles for various states of the input */
    .input:focus {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .input--rounded {
        border-radius: 25px; /* Adjust the value to control the roundness */
    }
    .input::placeholder {
        font-style: italic;
    }

    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }

    /* Style for the embedded iframe */
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
