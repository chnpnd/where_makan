<template>

</template>

<script>
import auth from '../auth'

export default{
    data(){
        return{
            order: {},
            userID: null
        };
    },
    methods:{
        fetchOrder(userId) {
      const url = `https://stingray-app-4wa63.ondigitalocean.app/Order/api/get/order/${userId}`;
      axios.get(url)
        .then(response => {
          this.order = response.data;
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
        });
    },
    }
}
</script>