const express = require('express') ;
const controller = require('../controllers/author.controller')
const router = express.Router() ; 

router.get('/',controller.getAllAuthors);
router.get('/:id',controller.getAuthorById) ; 
router.post('/',controller.addAuthor);
router.get('/:id/books',controller.getAllBooksByAuthor)

module.exports = router ; 