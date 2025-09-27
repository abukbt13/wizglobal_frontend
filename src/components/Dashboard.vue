<script setup>
import { ref } from "vue";
import axios from "axios";

const file = ref(null);
const loading = ref(false);
const message = ref("");
const token = localStorage.getItem("token");

function onFileChange(event) {
  file.value = event.target.files[0];
}

const uploadFile = async (e) => {
  e.preventDefault(); // prevent form refresh

  if (!file.value) {
    message.value = "Please select a file first.";
    return;
  }

  let formData = new FormData();
  formData.append("file", file.value);

  try {
    loading.value = true;
    message.value = "";

    const response = await axios.post(
        "http://127.0.0.1:8000/api/stock-prices/upload",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
    );

    // delay hiding spinner by 2s
    setTimeout(() => {
      loading.value = false;
      message.value = response.data.message;
    }, 3000);

  } catch (error) {
    setTimeout(() => {
      if (error.response) {
        message.value = error.response.data.message || "Upload failed.";
        console.error(error.response.data);
      } else {
        message.value = "An unexpected error occurred.";
      }
      loading.value = false;
    }, 2000);
  }
};
</script>

<template>
  <div class="dashboard-view w-100 vh-100 d-flex align-items-center justify-content-center">
    <div class="content border p-3 w-50 mx-auto text-center">
      <h2>Upload stock prices for analysis</h2>
      <form @submit.prevent="uploadFile">
        <div class="mb-3">
          <label for="formFile" class="form-label">Choose CSV file</label>
          <input @change="onFileChange" class="form-control" type="file" id="formFile" />
        </div>
        <!-- Show button only if not loading -->

       <button  v-if="!loading" type="submit" class="btn btn-primary">
         Upload
       </button>

        <!-- Show spinner when loading -->
        <div v-else class="d-flex align-items-center">
          <strong class="me-2">Processing...</strong>
          <div class="spinner-border" role="status" aria-hidden="true"></div>
        </div>

        <div v-if="message" class="mt-3">
          <p class="text-info">{{ message }}</p>
          <router-link to="/analysis">Click here to view Analysis</router-link>
        </div>
        <h2>Click the button </h2>
      </form>
    </div>
  </div>
</template>
