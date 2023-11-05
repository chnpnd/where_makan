<template>
<div class="container mt-5" >
  <div class="container">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-md-9">
          <div class="card" style="border-radius: 0; padding:20px;">
            <h5 class="text-center">({{ totalItems }}) Items in your cart:</h5>
          </div>
          <div class="row">
            <div class="col-md-12">
              <!-- Use a flex container to arrange card items horizontally -->
              <div class="d-flex flex-wrap">
                <div class="card mb-3" v-for="food in foods" :key="food.id" style="border-radius: 0;">
                  <div class="row g-0">
                    <div class="col-md-3">
                      <img :src="food.image" :alt="food.name" class="card-img-top p-3" style="width: 100%; border-radius: 0;">
                    </div>
                    <div class="col-md-9">
                      <div class="card-body">
                        <div class="d-flex justify-content-between">
                          <h4 class="card-title font-weight-bold">{{ food.name }}</h4>
                          <div>
                            <span >Quantity:
                              <input type="text" v-model="userInput[food.id]" class="form-control text-center" placeholder="1" style="width: 50px;">
                            </span>
                          </div>
                          <div><span class="">Total Price: <h4 class="text-center"> {{ calculateTotalPrice(food) }}</h4></span></div>
                        </div>
                        <div class="m-t-sm"  style="margin-top: 50px;">
                          <button class="btn text-muted mb-2" @click="removeItem(food.id)"><Icon icon="mynaui:trash" style="font-size: 24px; "/>Remove item</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
              <div class="card pb-2 pt-0">
                <div class="d-flex justify-content-between">
                  <backButton style="top:0; font-size: 10px;"/>
                </div>
              </div>
            </div>

            </div>
          </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <div class="card-title">
            <h4 class="text-center mt-3">Cart Summary</h4>
          </div>
          <hr class="mt-1">
          <div class="card-body">
            <h5>Total Amount: <span class="h4">${{ total.toFixed(2) }}</span></h5>
            <hr>
            <button class="btn btn-outline-danger mx-3" @click="initiateCheckout"><Icon icon="material-symbols:shopping-cart" style="font-size: 25px;"/> Checkout</button>
            <button class="btn btn-outline-primary">Cancel</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content vintage-border shadow-lg rounded p-4">
        <h4 class="text-center mb-4 vintage-text">Checkout</h4> 

        <div class="form-group">
        
          <label class="vintage-text" for="cardName">Card Holder Name</label>
          <input type="text" id="cardName" v-model="cardName" placeholder="John Doe" class="form-control vintage-input mb-2">

          
          <label class="vintage-text" for="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" v-model="cardNumber" placeholder="1234 5678 1234 5678" class="form-control vintage-input mb-2">

          <div class="row">
            <div class="col-md-6">
              
              <label class="vintage-text" for="cardExpiry">Expiry Date</label>
              <input type="text" id="cardExpiry" v-model="cardExpiry" placeholder="MM/YY" class="form-control vintage-input mb-2">
            </div>
            <div class="col-md-6">
              
              <label class="vintage-text" for="cardCVC">CVC</label>
              <input type="text" id="cardCVC" v-model="cardCVC" placeholder="123" class="form-control vintage-input mb-2" maxlength="3">
            </div>
          </div>

          
          <label class="vintage-text" for="address">Address</label>
          <input type="text" id="address" v-model="address" placeholder="123 Main St" class="form-control vintage-input mb-2">

        
          <label class="vintage-text" for="postalCode">Postal Code</label>
          <input type="text" id="postalCode" v-model="postalCode" placeholder="12345" class="form-control vintage-input mb-2">
        </div> 

        <div class="text-center mt-4">
          <button @click="processOrder" class="btn btn-danger px-4 py-2 mb-2">Confirm Order</button>
          <button @click="showModal = false" class="btn btn-outline-secondary ml-2  px-4 py-2 mb-2">Cancel</button>
        </div> 
      </div>
    </div>
</div>

</template>

<script>
import { Icon } from '@iconify/vue';
import backButton from '@/components/BackButton/backButton.vue';


export default {
  data() {
    return {
      foods: [
        { id: 1, name: 'Burger', price: 5.00, image: './img/homecardimg/wantonfood.jpg' },
        { id: 2, name: 'Pizza Slice', price: 3.00, image: './img/homecardimg/wantonfood.jpg' },
        { id: 3, name: 'Sandwich', price: 4.00, image: './img/homecardimg/wantonfood.jpg' },
        { id: 4, name: 'Salad', price: 4.50, image: './img/homecardimg/wantonfood.jpg' },
      ],
      order: [],
      userInput: {},
      showModal: false,
      cardDetails: '',
      foodTotalAmount: {},
    };
  },
  
  components:{
    Icon,
    backButton,
  },
  computed: {
    total() {
      return this.order.reduce((acc, food) => acc + food.price, 0);
    },
    totalItems() {
      return this.order.reduce((acc, food) => acc + food.length, 0);
    },
    totalAmount() {
    const totalAmounts = {};
    for (const food of this.foods) {
      const quantity = this.userInput[food.id] || 0;
      totalAmounts[food.id] = (food.price * quantity).toFixed(2);
    }
    return totalAmounts;
    }
  },
  methods: {
    addToOrder(food) {
      this.order.push(food);
    },
    initiateCheckout() {
      this.showModal = true;
    },
    processOrder() {
      if (this.cardDetails.trim()) {
        alert('Order processed successfully!');
        this.showModal = false;
        this.order = [];
        this.cardDetails = '';
      } else {
        alert('Please enter valid card details.');
      }
    },
      goBack() {
            this.$router.go(-1);
    },
    calculateTotalPrice(food) {
    const quantity = this.userInput[food.id] || 1; // Default to 1 if no quantity is entered
    return (food.price * quantity).toFixed(2);
  },
  removeItem(foodId) {
    const index = this.order.indexOf(foodId);
      if (index !== -1) {
        this.order.splice(index, 1);
        delete this.userInput[foodId]; // Remove the associated user input
      }
  },
  }
}
</script>

<style scoped>
.vintage-border {
  border: 2px solid #D1C3A7;
  padding: 20px;
  background-color: #F9F6F2;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.vintage-text {
  color: black;
  font-size: 18px;
}

.vintage-button {
  transition: all 0.3s ease;
}

.vintage-button:hover {
  background-color: #D1C3A7;
  color: #F9F6F2;
}

.vintage-input {
  border: 2px solid black;
  background-color: #e0dfde;
  border-radius:0;
  font-size: 18px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.food-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.card {
  background: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

body{margin-top:20px;
    background:#eee;
}
h3 {
    font-size: 16px;
}

</style>
