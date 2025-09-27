<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const analysis = ref([]);
const loading = ref(false);
const error = ref("");

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
    <h3 class="mb-3">📊 Stock Price Analysis</h3>

    <!-- Loading -->
    <div v-if="loading" class="d-flex align-items-center">
      <div class="spinner-border text-primary me-2" role="status"></div>
      <span>Loading analysis...</span>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <!-- Table -->
    <table v-if="!loading && analysis.length" class="table table-bordered table-striped mt-3">
      <thead>
      <tr>
        <th>Stock</th>
        <th>Price Gain</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in analysis" :key="item.stock">
        <td>{{ item.stock }}</td>
        <td>{{ Number(item.gain).toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>

    <!-- No Data -->
    <p v-if="!loading && !analysis.length" class="text-muted mt-3">No analysis data found.</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
}
</style>
