<template>
    <h1>Restaurants</h1>
        <div>
            <!-- {{result}} -->
            <ul>
                <!-- <li v-for="store in result.result.records">
                    {{ store.name_of_centre }}
                </li> -->
                <li v-for="restaurant in restaurants" :key="restaurant.id">
                    {{ restaurant.name_of_centre }}
                </li>
            </ul>

        </div>
</template>

<script>

export default {
    data() {
        return{
            result: {
                result: {
                    records: []
                }
            }
        }
    },
    mounted() {
        this.GetAllHawkerCentres()
    },
    methods: {
        async GetAllHawkerCentres() {
            const res = await fetch("https://data.gov.sg/api/action/datastore_search?resource_id=8f6bba57-19fc-4f36-8dcf-c0bda382364d")
            this.result = await res.json()
          },
      },
  };

</script>

<style>

</style>
