const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// subdocument array for comments
const ReplySchema = new Schema(
  {
    // fields
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: { 
      type: String,
      required: true,
      trim: true
    },
    writtenBy: { 
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  {
    // fields
    writtenBy: { 
      type: String,
      required: true,
      trim: true
    },
    commentBody: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // this field associates replies with comments. uses replayschema to validate data for a reply
    replies: [ReplySchema],
  },
  {
    toJSON: {
      // virtual gets total reply count. combines reply & comment count to get full picture of pizza discussion.
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual | gets the total reply count
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
