// this file imports all api routes to prefix their endpoint names
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// prefixes to imported packaged api routes
router.use('/pizzas', pizzaRoutes);

module.exports = router;
