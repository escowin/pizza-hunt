const router = require('express').Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller');

// duplicate route paths are combined, imported controller methods are implmented
// - route | /api/pizzas | GET all, POST
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

// - route | /api/pizzas/:id | GET one, PUT, DELETE
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;
