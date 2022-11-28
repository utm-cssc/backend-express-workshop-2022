const express = require("express")
const router = express.Router()

// logging middleware
function logger(req, res, next) {
  console.log(`the original url of the request is: ${req.originalUrl}`)
  next()
}  

router.use(logger)

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

router.post('/addItem', (req, res) => {
  database.items.push({'id': nextId, 'itemName': req.body.itemName, 'price': req.body.price})
  res.render('items.ejs', database)
  nextId += 1
})

router.delete('/:id', (req, res) => {
  for (var i = 0; i < database.items.length; i++) {
    if (database.items[i].id.toString() === req.params.id) {
      database.items.splice(i, 1)
      res.sendStatus(200)
      return
    }
  }
  res.sendStatus(404)
})

// attach the given callback arrow function to the placeholder param 'id'
// this is middleware code that will run everytime we get a /:id in our request 
router.param('id', (req, res, next, id) => {
  console.log(`deleted item with id ${id}`)
  next()
})

module.exports = router
