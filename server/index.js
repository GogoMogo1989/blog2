const express = require('express')
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

// init app & middleware
const app = express()
app.use(express.json()) //post

// db connection
let db

connectToDb((err) => {
  if(!err){
    app.listen('8000', () => {
      console.log('app listening on port 8000')
    })
    db = getDb()
  }
})

// routes
app.get('/blog', (req, res) => {

  const page = req.query.p || 0
  const booksPerPage = 3



  let books = []

  db.collection('blog')
    .find()
    .sort({author: 1})
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

app.get('/blog/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)){
        db.collection('blog')
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc => {
          res.status(200).json(doc)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not fetch the document'})
        })
    } else {
        res.status(500).json({error: 'Not valid id'})
    }
})

app.post('/blog', (req, res) => {
    const book = req.body
  
    db.collection('blog')
      .insertOne(book)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({err: 'Could not create new document'})
      })
  })

  app.delete('/blog/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
  
    db.collection('blog')
      .deleteOne({ _id:  ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not delete document'})
      })
  
    } else {
      res.status(500).json({error: 'Could not delete document'})
    }

  })

  app.patch('/blog/:id', (req, res) => {
    const updates = req.body
  
    if (ObjectId.isValid(req.params.id)) {
  
      db.collection('blog')
        .updateOne({ _id:  ObjectId(req.params.id) }, {$set: updates})
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not update document'})
        })
  
    } else {
      res.status(500).json({error: 'Could not update document'})
    }
  })