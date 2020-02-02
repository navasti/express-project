const express = require('express');
const router = express.Router();
const Author = require('../models/author');

/* All authors route */
router.get('/', async (req, res, next) => {
  let searchOptions = {}
  if(req.query.name !== null && req.query.name !== ''){
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try{
    const authors = await Author.find(searchOptions);
    res.render('authors/index', {authors, searchOptions: req.query});
  }catch{
    res.redirect('/');
  }
});

/* New author route */
router.get('/new', (req, res, next) => {
  res.render('authors/new', {author: new Author() });
});

// Create Author route
router.post('/', async (req, res, next) => {
  const author = new Author({
    name: req.body.name
  })
  try{
    const newAuthor = await author.save();
    res.redirect(`authors`)
  }catch{
    res.render('authors/new', {
      author,
      errorMessage: 'Creating author error'
    })
  }
});

// Delete author route
router.delete('/:id', async (req, res) => {
  let author;
  try{
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect(`/authors`)
  }catch{
    res.redirect(`/authors`)
  }
})

module.exports = router;
