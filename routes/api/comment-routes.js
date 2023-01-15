const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// - route | /api/comments/:pizzaId | POST
router.route('/:pizzaId').post(addComment);

// - route | /api/comments/:pizzaId/:commentId | DELETE
// -- two parameters are needed since deleting a specific comment will always originate from a specific pizza
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;