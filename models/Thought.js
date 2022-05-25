const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

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
    const timeElapsed = date;
    const today = new Date(timeElapsed);
    return today.toUTCString();
  }

thoughtSchema.virtual('reactionCount')
.get(function () {
    return `Number of reaction: ${this.reactions.length}`;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
