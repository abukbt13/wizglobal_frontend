<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

// Reactive form state
const form = ref({
  email: "",
  password: ""
})

const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  error.value = null
  loading.value = true

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email: form.value.email,
      password: form.value.password
    })

    // Save token to localStorage for authentication
    localStorage.setItem("token", response.data.token)

    // Redirect to dashboard (or home)
    router.push("/dashboard")
  } catch (err) {
    if (err.response && err.response.data) {
      error.value = err.response.data.message || "Invalid credentials"
    } else {
      error.value = "Something went wrong. Try again!"
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-view w-100 vh-100 d-flex align-items-center">    
    <div class="content border p-3 w-50 mx-auto">
      <h2 class="text-center">Login Page</h2>

      <!-- Error -->
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input 
            type="email" 
            class="form-control" 
            id="email"
            v-model="form.email"
            required
          >
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input 
            type="password" 
            class="form-control" 
            id="password"
            v-model="form.password"
            required
          >
        </div>

        <button 
          type="submit" 
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>

        <p class="mt-3 text-center">
          Don’t have an account?  
          <router-link to="/register" class="btn btn-link btn-sm">Register here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
