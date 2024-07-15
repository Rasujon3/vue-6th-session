<script setup>
import { computed } from 'vue'
import moment from 'moment'
import CommentSection from './CommentSection.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter();
const route = useRoute();

const post = computed(() => store.getters['posts/getPost'](route.params.id));

function increaseLikeCount(postId) {
  store.commit('posts/increaseLikeCount', postId)
}

function deletePost(postId) {
  store.commit('posts/deletePost', postId)
  router.push({ name: 'PostList' })
}
</script>

<template>
  <div class="posts mt-4">
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body" v-if="post">
              <h5 class="card-title">{{ post.title }}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
                {{ moment(post.date).fromNow() }}
              </h6>
              <p class="card-text">{{ post.content }}</p>
              <p class="card-text">
                <span :style="{ color: post.likes >= 10 ? 'green' : 'black' }">
                  <small v-if="post.likes > 1">{{ post.likes }} likes, </small>
                  <small v-else-if="post.likes > 0">{{ post.likes }} like, </small>
                  <small v-else>No Likes, </small>
                </span>
                <small :style="{ color: post.comments.length >= 3 ? 'green' : 'black' }" class="cursor-pointer"
                  @click="post.showCommentSection = !post.showCommentSection">
                  {{ post.comments.length }} comments</small>
              </p>

              <CommentSection :post="post" v-model:comment="post.commentFormData" />

              <button class="btn btn-sm btn-primary" @click="increaseLikeCount(post.id)">
                Like
              </button>
              <button class="btn btn-sm btn-danger float-end" @click="deletePost(post.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>
