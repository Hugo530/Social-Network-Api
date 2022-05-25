const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
  //  getting all users
  getUsers(req, res) {
    User.find()
    .then(async (users) => {
      const userObj = {
        users,
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  // getting a single user
  getSingleUser(req, res) {
    User.findOne({_id: req.params.userID})
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})

    .then((user) =>
    !user
    ? res.status(404).json({message: 'Didnt find a user with that ID'})
    : res.json({

    })

    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  
}