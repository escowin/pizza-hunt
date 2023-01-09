const { Comment, Pizza } = require("../models");

const commentController = {
  // comment methods
  // a comment does not stand alone. it needs to belong to a specific pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          // mongoDB-based function | adds comment id to the pizza
          { $push: { comments: _id } },
          // true | allows update to occur | pizza will include the new comment
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "pizza does not exist" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },

  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deleteComment) => {
        if (!deleteComment) {
          return res.status(404).json({ message: "comment does not exist" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "pizza does not exist " });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  }
};

module.exports = commentController;
