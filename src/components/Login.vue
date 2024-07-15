<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const formData = ref({
  userName: '',
  password: ''
})
const isLoading = ref(false)

function login() {
  isLoading.value = true
  store.dispatch('login', formData.value).then(() => {
    isLoading.value = false
    router.push('/')
  }).catch(() => {
    isLoading.value = false
  })
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h5 class="card-title text-center">Login</h5>
            <form @submit.prevent="login()">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" v-model="formData.userName" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="formData.password" />
              </div>
              <button v-if="isLoading" class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status"> Loading...</span>
              </button>
              <button v-else type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>
