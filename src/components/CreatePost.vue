<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()

function postCreate() {
  store.commit('posts/createPost')
  // router.push('/posts');
  router.push({ name: 'PostList' });
  // router.go(1);
}

const postTitle = computed({
  get() {
    return store.getters['posts/postTitle']
  },
  set() {
    store.commit('posts/updatePostTitle', event.target.value)
  }
})
const postContent = computed({
  get() {
    return store.getters['posts/postContent']
  },
  set() {
    store.commit('posts/updatePostContent', event.target.value)
  }
})
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Create a New Post</h5>
            <form @submit.prevent="postCreate()">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter the title"
                  v-model="postTitle"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="3"
                  placeholder="Enter the content"
                  v-model="postContent"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
