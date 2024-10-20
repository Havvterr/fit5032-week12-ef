<template>
  <div id="app">
    <h1>Add a New Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="author">Author:</label>
        <input type="text" v-model="author" id="author" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      author: '',
      message: null,
      error: null
    }
  },
  methods: {
    async addBook() {
      try {
        const response = await axios.post('https://addbook-niaadyuddq-uc.a.run.app', {
          title: this.title,
          author: this.author
        })
        this.message = response.data
        this.error = null
        this.title = ''
        this.author = ''
      } catch (error) {
        console.error('Error adding book:', error)
        this.error = 'Error adding book.'
        this.message = null
      }
    }
  }
}
</script>
