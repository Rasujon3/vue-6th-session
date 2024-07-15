<script setup>
import { computed } from 'vue'
import moment from 'moment'
import { useStore } from 'vuex'

const store = useStore()

const posts = computed(() => store.getters['posts/getPosts']);

const reversedPosts = computed(() => {
  return [...posts.value].reverse()
})

function increaseLikeCount(postId) {
  store.commit('posts/increaseLikeCount', postId)
}

function deletePost(postId) {
  store.commit('posts/deletePost', postId)
}
</script>

<template>
  <div class="posts mt-4">
    <div class="container">
      <div class="nav nav-tabs mb-4">
        <h3>
          Posts <span :class="{ 'text-danger': posts.length <= 0 }">{{ posts.length }}</span>
        </h3>
      </div>

      <div class="row">
        <div class="col-md-4" v-for="(post) in reversedPosts" :key="post.id">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                {{ moment(post.date).fromNow() }}
              </h6>
              <p class="card-text">{{ post.content.substr(0, 99) }}<span v-if="post.content?.length > 100">... </span>
                <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">Read More</router-link>
              </p>
              <p class="card-text">
                <span :style="{ color: post.likes >= 10 ? 'green' : 'black' }">
                  <small v-if="post.likes > 1">{{ post.likes }} likes</small>
                  <small v-else-if="post.likes > 0">{{ post.likes }} like</small>
                  <small v-else>No Likes</small>
                </span>
              </p>

              <button class="btn btn-sm btn-primary" @click="increaseLikeCount(post.id)">
                Like
              </button>
              <button class="btn btn-sm btn-danger float-end" @click="deletePost(post.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
