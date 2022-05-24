const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^.+@(?:[\w-]+\.)+\w+$/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    
  },
  { 
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendscount')
.get(function () {
  return `number of friends: ${this.friends.length}`
})

const Course = model('user', userSchema);

module.exports = User;
