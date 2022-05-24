const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
      },
    username: {
        type: String,
        required: true
    }  ,
    reactions: [Reaction]     
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);

function formatDate (date) {
  const timeElapsed = Date;
  const today = new Date(timeElapsed);
  return today.toUTCString();
}

thoughtSchema.virtual('reactionCount')
.get(function () {
  return `Number of reaction ${this.reaction.length}`;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
