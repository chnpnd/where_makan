<template>
    <div class="container custom-container">
            <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
        <div v-if="foodOrders">
                <div class="row">
                    <div class = "col-2">
                        No.
                    </div>
                    <div class = "col-3">
                        Food Name
                    </div>
                    <div class = "col-2">
                        Amount
                    </div>
                    <div class = "col-3">
                        Order Date
                    </div>
                    <div class="col-2">
                        Order Status
                    </div>
                </div>
                <div v-for="(order,index) in foodOrders" :key="order.consumer_id" max-width="400" max-height="400" style="margin:10px; background-color: #ffffff;">
                    <div class="row">
                        <div class = "col-2">
                            {{index+1}}
                        </div>
                        <div class = "col-3">
                            {{ filterFood[index] }}
                        </div>
                        <div class = "col-2">
                            ${{ order.total_amount }}
                        </div>
                        <div class = "col-3">
                            {{ order.order_date.slice(0,10) }}
                        </div>
                        <div class="col-2">
                            {{ order.status }}
                        </div>
                    </div>
                   
                </div>
        </div> 
        <div v-else><h1>No recent activity</h1></div>
</div>


</template>

<script>

export default {
props: ['consumerId'], // This prop is automatically passed by Vue Router
data() {
  return {
    consumerID: 10,
    center: null, // Initialize center as null
    favFoodorder: [],
    foodOrders: [],
    allFood: [], //id
    filterFood: [],
  };
},
created() {
    this.getAllData();  
    this.getAllFood();
},
methods: {
    async getAllData() {
        try {
        const response = await fetch(
            `https://stingray-app-4wa63.ondigitalocean.app/Order/api/get/order/${this.consumerID}`
        );
        console.log("User: "+ this.consumerId)
        if (response.ok) {
            this.foodOrders = await response.json();
            console.log(this.foodOrders);
        } else {
            console.error('Failed to fetch all order details:', response.statusText);
        }
        } catch (error) {
        console.error('An error occurred while fetching all order details:', error);
        }
    },

    async getAllFood() {
        try {
        const response = await fetch(
            `https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/all/food`
        );
        console.log("User: "+ this.consumerId)
        if (response.ok) {
            this.allFood = await response.json();
            this.filterFoodfunc();
            console.log(this.allFood);
        } else {
            console.error('Failed to fetch all food details:', response.statusText);
        }
        } catch (error) {
        console.error('An error occurred while fetching all food details:', error);
        }
    },
    filterFoodfunc(){
        for (let i=0; i<this.allFood.length; i++){
            var food = this.allFood[i];
            for (let x=0; x<this.foodOrders.length; x++){
                var order = this.foodOrders[x];
                if (order.food_id == food.id){
                    this.filterFood.push(food.name);
                }
            }
        }
    }

}

};

</script>

<style>

.card-container .v-card {
background-color: #f5e8d7;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
/* Add any other desired styling here */
}

.card-container .v-card-title {
font-size: 24px;
margin-bottom: 15px;
text-transform: uppercase;
letter-spacing: 2px;
border-bottom: 2px solid #5a4134;
padding-bottom: 10px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.card-container .v-card-text {
font-size: 10px;
margin-bottom: 15px;
letter-spacing: 2px;
border-bottom: 2px solid #5a4134;
padding-bottom: 10px;
white-space: normal;
}

.card-container .v-card-title:hover {
white-space: normal;
text-overflow: unset;
}

.img {
height: 10px;
width: 10px;   
}

.custom-container {
padding: 0;
}

</style>