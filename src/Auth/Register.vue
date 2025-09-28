<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import {auth} from "../composables/auth.js";
const {base_url} = auth()
const router = useRouter()

// Reactive form state
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
})

const loading = ref(false)
const error = ref(null)

const handleRegister = async () => {
  error.value = null
  loading.value = true

  try {
    const response = await axios.post(base_url.value + 'register', {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation
    })

    // Save token in localStorage
    localStorage.setItem("token", response.data.token)

    // Redirect after successful registration
    await router.push("/analysis")
  } catch (err) {
    if (err.response && err.response.data) {
      error.value = err.response.data.message || "Registration failed"
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
      <h2 class="text-center">Register Page</h2>

      <!-- Error -->
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="name" class="form-label">Username</label>
          <input 
            type="text" 
            class="form-control" 
            id="name"
            v-model="form.name"
            required
          >
        </div> 

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
        <div class="mb-3">
          <label for="password_confirmation" class="form-label">Confirm Password</label>
          <input 
            type="password" 
            class="form-control" 
            id="password"
            v-model="form.password_confirmation"
            required
          >
        </div>

        <button 
          type="submit" 
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          {{ loading ? "Registering..." : "Register" }}
        </button>

        <p class="mt-3 text-center">
          Have an account?  
          <router-link to="/login" class="btn btn-link btn-sm">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
