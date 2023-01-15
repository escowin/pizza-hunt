const { Schema, model, SchemaType } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      // validation & whitespace removal
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      // validation & whitespace removal
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter | dateFormat() returns the new value of the reformatted default timestamp.
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      // validation | enumerates through the size array. prevents user from posting custom sizes
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Extra large'],
      default: "Large",
    },
    toppings: [],
    // parent-child association | Pizza tracks comments. the ref property tells Pizza which documents to search to find the right comments.
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      // tells mongoose to use specified getter functions
      getters: true
    },
    // id is set to false because this is a virtual that mongoose returns
    id: false,
  }
);

// virtual | adds virtual properties to a document that aren't stored in the db
// - total comment & reply count. reduce(accumlator, currentValue). 
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
