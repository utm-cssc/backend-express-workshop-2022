const express = require("express")
const router = express.Router()

var nextId = 13
const database = {
  'items': [
    {'id': 10, 'itemName': 'calculator', 'price': 4.99},
    {'id': 11, 'itemName': 'textbook', 'price': 99.99},
    {'id': 12, 'itemName': 'clicker', 'price': 24.99}
  ]
}

router.get('/', (req, res) => {
  res.render('items.ejs', database)
})

// attach the given callback arrow function to the placeholder param 'id'
// this is middleware code that will run everytime we get a /:id in our request 
router.param('id', (req, res, next, id) => {
  console.log(`deleted item with id ${id}`)
  next()
})

module.exports = router
