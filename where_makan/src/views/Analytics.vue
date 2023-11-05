<template>
  <div class="container py-5">
    <!-- Revenue and Quantity Cards -->
    <h2 class="mb-3">Sales Overiew</h2>
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total Revenue</h5>
            <p class="card-text">${{ totalMoneyMade.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total Quantity Sold</h5>
            <p class="card-text">{{ totalQuantitySold }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2 class="mb-3">Food Item Sales</h2>
      </div>
      <div class="col-md-4 mb-3" v-for="(value, name) in foodSales" :key="name">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ name }}</h5>
            <p class="card-text">${{ value.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Top Selling Food Items -->
    <div class="row">
      <div class="col-12">
        <h2 class="mb-3">Top Selling Food Items</h2>
        <bar-chart :data="topSellingFoodData" :download="topSellingFoodData"></bar-chart>
      </div>
    </div>
  </div>
</template>


<script>
import auth from '../auth';

export default {
  data() {
    return {
      hawkerStalls: [],
      salesData: [],
      foodItems: {},
      topSellingFoodData: [],
      totalSalesData: [],
      totalQuantitySold: 0,
      totalMoneyMade: 0,
    };
  },
  async created() {
    await this.fetchHawkerStall();
  },
  computed: {
    // Computed property to calculate total sales for each food item
    foodSales() {
      const sales = {};
      for (const sale of this.salesData) {
        const foodItem = this.foodItems[sale.food_id];
        if (foodItem) {
          const revenue = (foodItem.price || 0) * sale.amount;
          if (sales[foodItem.name]) {
            sales[foodItem.name] += revenue;
          } else {
            sales[foodItem.name] = revenue;
          }
        }
      }
      return sales;
    }
  },
  methods: {
    async fetchHawkerStall() {
      const userID = auth.getUserID();
      try {
        const response = await fetch('https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/all/hawkerstore');
        const data = await response.json();
        const userStall = data.find(stall => stall.owner_id === userID);
        if (userStall) {
          await this.fetchSales(userStall.id);
        }
      } catch (error) {
        console.error('Error fetching hawker stalls:', error);
      }
    },
    async fetchSales(hawkerID) {
      try {
        const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Sales/api/get/all/sales/${hawkerID}`);
        this.salesData = await response.json();
        await this.setFoodItems(this.salesData);
        this.totalQuantitySold = this.calculateTotalQuantitySold(this.salesData);
        this.totalMoneyMade = this.calculateTotalSales(this.salesData);
        this.topSellingFoodData = this.prepareTopSellingFoodData(this.salesData);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    },
    async setFoodItems(salesData) {
      const uniqueFoodIDs = [...new Set(salesData.map(sale => sale.food_id))];
      const foodItemsData = await Promise.all(uniqueFoodIDs.map(id =>
        fetch(`https://stingray-app-4wa63.ondigitalocean.app/Food/api/get/food/${id}`)
          .then(response => response.json())
      ));

      this.foodItems = foodItemsData.reduce((items, item) => {
        items[item.id] = item;
        return items;
      }, {});
    },
    prepareTopSellingFoodData(salesData) {
      const topSelling = {};
      salesData.forEach(sale => {
        const foodName = this.foodItems[sale.food_id]?.name || 'Unknown';
        if (topSelling[foodName]) {
          topSelling[foodName] += sale.amount;
        } else {
          topSelling[foodName] = sale.amount;
        }
      });
      return Object.entries(topSelling).sort((a, b) => b[1] - a[1]); // Sorted by amount
    },
    calculateTotalSales(salesData) {
      return salesData.reduce((total, sale) => {
        return total + (this.foodItems[sale.food_id]?.price || 0) * sale.amount;
      }, 0);
    },
    calculateTotalQuantitySold(salesData) {
      return salesData.reduce((total, sale) => total + sale.amount, 0);
    },
  },
};
</script>



<style>
.card {
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.card-body {
  padding: 2px 16px;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 1rem;
}
</style>