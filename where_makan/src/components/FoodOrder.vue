<template>
  <div class="container mt-5 vintage-border p-4">
    <h2 class="text-center mb-4 vintage-text">Order from FoodStall</h2>
    
    <div class="food-options text-center row">
      <div v-for="food in foods" :key="food.id" class="food-item mb-4 col-12 col-md-6">
        <div class="card vintage-border mb-3">
          <!-- Image of the food -->
          <img :src="food.image" :alt="food.name" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title vintage-text">{{ food.name }}</h5>
            <button @click="addToOrder(food)" class="btn btn-outline-dark vintage-button">
              Add to cart - ${{ food.price.toFixed(2) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="checkout mt-5 text-center">
      <button class="btn btn-outline-success vintage-button px-4 py-2" @click="initiateCheckout">
        Checkout (${{ total.toFixed(2) }})
      </button>
    </div>

    <!-- Checkout Modal -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content vintage-border shadow-lg rounded p-4">
        <h4 class="text-center mb-4 vintage-text">Checkout</h4>

        <div class="form-group">
          <!-- Card Holder Name -->
          <label class="vintage-text" for="cardName">Card Holder Name</label>
          <input type="text" id="cardName" v-model="cardName" placeholder="John Doe" class="form-control vintage-input mb-2">

          <!-- Card Number -->
          <label class="vintage-text" for="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" v-model="cardNumber" placeholder="1234 5678 1234 5678" class="form-control vintage-input mb-2">

          <div class="row">
            <div class="col-md-6">
              <!-- Card Expiry -->
              <label class="vintage-text" for="cardExpiry">Expiry Date</label>
              <input type="text" id="cardExpiry" v-model="cardExpiry" placeholder="MM/YY" class="form-control vintage-input mb-2">
            </div>
            <div class="col-md-6">
              <!-- Card CVC -->
              <label class="vintage-text" for="cardCVC">CVC</label>
              <input type="text" id="cardCVC" v-model="cardCVC" placeholder="123" class="form-control vintage-input mb-2" maxlength="3">
            </div>
          </div>

          <!-- Address -->
          <label class="vintage-text" for="address">Address</label>
          <input type="text" id="address" v-model="address" placeholder="123 Main St" class="form-control vintage-input mb-2">

          <!-- Postal Code -->
          <label class="vintage-text" for="postalCode">Postal Code</label>
          <input type="text" id="postalCode" v-model="postalCode" placeholder="12345" class="form-control vintage-input mb-2">
        </div>

        <div class="text-center mt-4">
          <button @click="processOrder" class="btn btn-primary vintage-button px-4 py-2 mb-2">Confirm Order</button>
          <button @click="showModal = false" class="btn btn-outline-secondary ml-2 vintage-button px-4 py-2 mb-2">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      showModal: false,
      cardDetails: ''
    };
  },
  computed: {
    total() {
      return this.order.reduce((acc, food) => acc + food.price, 0);
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
    }
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
  color: #6B5E4F;
  font-family: 'Courier New', Courier, monospace;
}

.vintage-button {
  transition: all 0.3s ease;
}

.vintage-button:hover {
  background-color: #D1C3A7;
  color: #F9F6F2;
}

.vintage-input {
  border: 2px solid #D1C3A7;
  background-color: #F9F6F2;
  color: #6B5E4F;
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
  width: 300px;
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

.card-title {
  font-family: 'Times New Roman', Times, serif;
}

</style>
