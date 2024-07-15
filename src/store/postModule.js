import axios from "axios";
import moment from "moment"

const postModule = {
  namespaced: true,
  state: {
    posts: [],
    postTitle: '',
    postContent: '',
  },
  getters: {
    getPosts(state) {
      return state.posts
    },
    getPost(state) {
      return (postId) => state.posts.find((post) => post.id === Number(postId));
    },
    getPostTitle(state) {
        return state.postTitle;
    },
    getPostContent(state) {
        return state.postContent;
    },
  },
  mutations: {
    createPost(state) {
      const post = {
        id: state.posts.length + 1,
        title: state.postTitle,
        content: state.postContent,
        likes: 0,
        comments: [],
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      }

      state.posts.push(post)
    },
    async addComment(state, { postId, comment }) {
      const post = state.posts.find((post) => post.id === postId)
      post.comments.push(comment)
      post.showCommentSection = true
    },
    updatePostTitle(state, title) {
        state.postTitle = title;
    },
    updatePostContent(state, content) {
        state.postContent = content;
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId)
    },
    increaseLikeCount(state, postId) {
      const post = state.posts.find((post) => post.id === postId)
      post.likes++
    },
    deleteComment(state, { postId, commentId }) {
      const post = state.posts.find((post) => post.id === postId)
      post.comments = post.comments.filter((comment) => comment.id !== commentId)
    },
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    async addComment({ commit, rootState }, { postId, comment }) {
      comment.userName = rootState.userName
      commit('addComment', { postId: postId, comment: comment })
    },
    async getPosts({commit}) {
      commit('setPosts', []);
    }
  }
}

export default postModule