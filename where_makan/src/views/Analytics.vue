<template>
  <div>
    <div v-if="chartData">
      <Pie class="chart-container" :data="chartData" :options="options" />
    </div>
    <div v-else>
      Loading data...
    </div>
  </div>
</template>

<script lang="ts">
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs';
  import { data, options } from './chartConfig.js'; // Import your chart configuration
  ChartJS.register(ArcElement, Tooltip, Legend);

  export default {
    name: 'Analytics',
    components: {
      Pie
    },
    data() {
    // Use the imported data object
      return {
        chartData: data, // Initialize with initial data
        options,
      };
    },
    async created() {
      await this.fetchDataAndUpdateChart();
    },
    methods: {
      // Function to fetch data and update chart
      async fetchDataAndUpdateChart() {
        try {
          const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Hawker/api/get/all/hawkers/`);
          if (response.ok) {
            const data = await response.json();
            // Update the chart data with the fetched data
            this.updateChartWithData(data);
          } else {
            console.error('Failed to fetch data:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred while fetching data:', error);
        }
      },
      updateChartWithData(newData) {
          let eastTotal = 0;
          let westTotal = 0;
          let northTotal = 0;
          let centralTotal = 0;

          for (const store of newData) {
            const region = store.region; // Replace with the actual property containing the region
            const noOfStalls = store.no_Of_Stalls; // Replace with the actual property for no. of stalls

            // Update totals based on region
            switch (region) {
              case 'East':
                eastTotal += noOfStalls;
                break;
              case 'West':
                westTotal += noOfStalls;
                break;
              case 'North':
                northTotal += noOfStalls;
                break;
              case 'Central':
                centralTotal += noOfStalls;
                break;
              default:
                // Handle any other regions or cases as needed
                break;
            }
          }
          // Update the chart data with region totals
          this.chartData = {
            labels: ['East', 'West', 'North', 'Central'],
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [eastTotal, westTotal, northTotal, centralTotal]
              }
            ]
          };
      },
    }
  };
</script>

<style scoped>
  .chart-container {
    width: 400px; /* Set a fixed width */
    height: 400px; /* Set a fixed height */
  }
</style>