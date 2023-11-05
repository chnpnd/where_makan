<template>
  <div class="dashboard-container">
    <!-- Revenue and Quantity Cards -->
    <div class="dashboard-section">
      <h2 class="dashboard-section-title">Sales Overview</h2>
      <hr>
      <div class="dashboard-card">
        <h5 class="dashboard-card-title">Total Revenue </h5>
        <p class="dashboard-card-value">${{ totalMoneyMade.toFixed(2) }}</p>
      </div>
      <div class="dashboard-card">
        <h5 class="dashboard-card-title">Total Quantity Sold</h5>
        <p class="dashboard-card-value">{{ totalQuantitySold }}</p>
      </div>
    </div>

    <!-- Food Item Sales -->
    <div class="dashboard-section">
      <h2 class="dashboard-section-title">Food Item Sales</h2>
      <hr>
      <div class="dashboard-food-cards">
        <div v-for="(value, name) in foodSales" :key="name" class="dashboard-card">
          <h5 class="dashboard-card-title">{{ name }}</h5>
          <p class="dashboard-card-value">${{ value.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- Top Selling Food Items -->
    <div class="dashboard-section">
      <h2 class="dashboard-section-title">Top Selling Food Items</h2>
      <bar-chart :data="topSellingFoodData" :download="topSellingFoodData" style="height: 500px;"></bar-chart>
      <button class="btn btn-outline-dark mt-6" @click="downloadTopSellingData">Download Top Selling Data</button>
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
    downloadTopSellingData() {
    const dataToDownload = this.topSellingFoodData; // Replace with your data
    // Implement the download logic here, such as creating a download link and triggering the download
    const blob = new Blob([JSON.stringify(dataToDownload)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'topSellingFoodData.json';
    a.click();
    URL.revokeObjectURL(url);
  },
},

};
</script>



<style>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  
}

.dashboard-section {
  margin: 1rem;
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 1rem;
  text-align: center;
  
}

.dashboard-section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.dashboard-card {
  display: inline-block;
  margin: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: 0.3s;
  text-align: center;
  
  
}

.dashboard-card-title {
  font-size: 1.25rem;
}

.dashboard-card-value {
  font-size: 1rem;
}
</style>