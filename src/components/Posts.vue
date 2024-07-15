<script setup>
import { onMounted } from "vue";
import LayoutContent from "./LayoutContent.vue";

onMounted(()=>{
  console.log('haaaa');
})
</script>

<template>
  <LayoutContent>
    <div class="posts mt-4">
      <div class="container">
        <div v-if="false" class="d-flex justify-content-center">
          <div class="spinner-border m-5" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <RouterView />
      </div>
    </div>
  </LayoutContent>
</template>
