<template>
  <div>
    <h1>All Books</h1>
    <pre>{{ books }}</pre>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: null,
      error: null
    }
  },
  mounted() {
    this.getAllBooks()
  },
  methods: {
    async getAllBooks() {
      try {
        const response = await axios.get('https://getallbooks-niaadyuddq-uc.a.run.app')
        this.books = JSON.stringify(response.data, null, 2)
        this.error = null
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = 'Error fetching books.'
        this.books = null
      }
    }
  }
}
</script>
