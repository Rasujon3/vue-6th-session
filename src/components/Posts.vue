<script setup>
import { onMounted, ref } from "vue";
import LayoutContent from "./LayoutContent.vue";
import { useStore } from "vuex";

const store = useStore();
const isLoading = ref(false);

onMounted(()=>{
  isLoading.value = true
  store.dispatch('posts/getPosts').then(()=>{
    isLoading.value = false
  }).catch(()=>{
    isLoading.value = true
  })
})
</script>

<template>
  <LayoutContent>
    <div class="posts mt-4">
      <div class="container">
        <div v-if="isLoading" class="d-flex justify-content-center">
          <div class="spinner-border m-5" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <RouterView v-else />
      </div>
    </div>
  </LayoutContent>
</template>
