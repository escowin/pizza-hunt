const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// route | /api/comments/:pizzaId | POST
router.route('/:pizzaId').post(addComment);

// route | /api/comments/:pizzaId/:commentId | PUT, DELETE
// - put : adding replies is an update to the existing comment resource.
// - delete : deleting a specific comment will always originate from a specific pizza
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);

// route | /:pizzaId/:commentId/:replyId | DELETE
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;