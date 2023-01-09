const { Schema, model, SchemaType } = require("mongoose");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
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
    },
    // id is set to false because this is a virtual that mongoose returns
    id: false,
  }
);

// virtual | adds virtual properties to a document that aren't stored in the db
// - comment count
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
