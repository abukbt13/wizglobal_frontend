<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Chart.js imports
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "vue-chartjs";

// Register chart.js modules
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const analysis = ref([]);
const loading = ref(false);
const error = ref("");

// Chart state
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Stock Price Gain",
      data: [],
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"], // colors
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Top 5 Stock Gainers" },
  },
};

// fetch analysis data from backend
const fetchAnalysis = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/stock-prices/analysis", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth is needed
      },
    });
    analysis.value = response.data;

    // Map API response to chart data
    chartData.value.labels = analysis.value.map(item => item.stock);
    chartData.value.datasets[0].data = analysis.value.map(item => item.gain);
  } catch (err) {
    error.value = "Failed to fetch analysis data.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// load on page mount
onMounted(() => {
  fetchAnalysis();
});
</script>

<template>
  <div class="container mt-4">
    <h3 class="mb-3 text-center">Stock Price Analysis</h3>

    <!-- Loading -->
    <div v-if="loading" class="d-flex align-items-center">
      <div class="spinner-border text-primary me-2" role="status"></div>
      <span>Loading analysis...</span>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <!-- Chart -->
    <div v-if="!loading && analysis.length" class="mt-4">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <!-- No Data -->
    <div v-if="!loading && !analysis.length" class="text-muted mt-3">
      <p>No analysis data found !</p>
      <p>Upload data for analysis <router-link to="dashboard">here</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
}
</style>
