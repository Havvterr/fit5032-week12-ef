const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()
const db = admin.firestore()

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = db.collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size
      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})

exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { title, author } = req.body
      if (!title || !author) {
        res.status(400).send('Title and Author are required')
        return
      }

      const capitalizedTitle = title.toUpperCase()
      const capitalizedAuthor = author.toUpperCase()

      await db.collection('books').add({
        title: capitalizedTitle,
        author: capitalizedAuthor
      })

      res.status(200).send('Book added successfully')
    } catch (error) {
      console.error('Error adding book:', error.message)
      res.status(500).send('Error adding book')
    }
  })
})

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = db.collection('books')
      const snapshot = await booksCollection.get()
      const books = snapshot.docs.map((doc) => doc.data())
      res.status(200).json(books)
    } catch (error) {
      console.error('Error fetching books:', error.message)
      res.status(500).send('Error fetching books')
    }
  })
})
