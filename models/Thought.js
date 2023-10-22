const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.count;
});

function formatDate(createdAt) {
  const year = createdAt.getFullYear();
  const month = (1 + createdAt.getMonth()).toString();
  const day = createdAt.getDate().toString();
  return month + "/" + day + "/" + year;
}

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
