const { Pizza } = require("../models");

const pizzaController = {
  // Mongoose ODM methods | restful api
  // - read | GET /api/pizzas | equivalent to Sequelize .findAll()
  getAllPizza(req, res) {
    Pizza.find({})
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // - read | GET /api/pizzas:id | destructured params out of req object bc it's the only data needed for request
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "pizza does not exist" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // - create | POST /api/pizzas | destructured body out of express req object bc it's the only data needed for request
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },
  // - update | PUT /api/pizzas:id | parameter { new: true } is needed to return new version of document
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "pizza does not exist" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // - delete | DELETE /api/pizzas:id | this method covers both deleteOne() and deleteMany()
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "pizza does not exist" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
