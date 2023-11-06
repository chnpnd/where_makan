<template>
    <div v-for="order in orders" >
        <img :src="order.qrCode">
    </div>
</template>

<script>
import auth from '../auth'

export default{
    data(){
        return{
            orders: {},
            userID: null
        };
    },
    methods: {
        fetchOrder() {
            const url = `https://stingray-app-4wa63.ondigitalocean.app/Order/api/get/order/${auth.getUserID()}`;
            axios.get(url)
                .then(response => {
                this.orders = response.data;
                console.log(this.orders);
            })
                .catch(error => {
                console.error('Error fetching order details:', error);
            });
        },
    }
};
</script>