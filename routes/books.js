const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

/* All books route */

router.get('/', async (req, res, next) => {
  let searchOptions = {}
  if(req.query.title !== null && req.query.title !== ''){
    searchOptions.title = new RegExp(req.query.title, 'i')
  }
  try{
    const books = await Book.find(searchOptions);
    res.render('books/index', {books, searchOptions: req.query})
  }catch{
    res.redirect('/')
  }
});

/* New book route */
router.get('/new', async (req, res, next) => {
  renderNewPage(res, new Book())
});

// Create book route
router.post('/', async (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    pageCount: req.body.pageCount,
    description: req.body.description
  })
  console.log(req.body)
  try{
    const newBook = await book.save()
    res.redirect(`books`)
  }catch{
    renderNewPage(res, book, true)
  }

});

async function renderNewPage(res, book, hasError=false){
  try{
    const authors = await Author.find({})
    const params = {
      authors,
      book
    }
    if(hasError) params.errorMessage = 'Creating book error'
    res.render('books/new', params)
  }catch{
    res.redirect('/books')
  }
}

module.exports = router;
