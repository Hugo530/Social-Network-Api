const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction} = require('../models');

module.exports = {
  //  getting all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  
  
  // getting a single thought
  getSingleThought(req, res) {
    Thought.findOne({_id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'Theres no thought with that ID'})
      :res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  
  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        {username: req.body.username},
        {$addToSet: {thoughts: thought._id}},
        {new: true}
      );
    }).then((user) => {
      !user? res.status(404).json({message: 'Thought created, but no user with that ID'})
      :res.json(`Created thought, assigned it to ${user.username}`)
    })
    .catch((err) => res.status(500).json(err));
  },
  
  
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((thought) =>
    !thought
    ? res.status(404).json({message: 'No thought found with that ID'})
    : res.json({ message: `Thought id:${req.params.thoughtId} successfully delted`})
    )
    .catch((err) => res.status(500).json(err));
  },
  
  
  // Updating a thought
  updateThought(req, res) {
    Thought.findOneAndUpdtate(
      {_id: req.params.thoughtId },
      {$set: req.body},
      {runValidators: true, new: true}

    )
     .then((thought) =>
     !thought
      ? res.status(404).json({message: ' didnt find a thought with that ID'})
      : res.json(thought)
     )
     .catch((err) => res.status(500).json(err));
  },
  
  
  createReaction(req, res) {
    Thought.findOneAndUpdtate(
      {_id: req.params.thoughtId},
      {$addToSet: {Reactions: req.body}},
      {runValidators: true, new: true}
    )
    .then((thought) =>
    !thought
    ? res
    .status(404)
    .json({message: 'No thought with that ID: (' })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  
  
  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      {_id: req.params.thoughtID},
      {$pull: {reactions: {reactionID: req.params.reactionID}}},
      {runValidators: true, new: true}
    )
    .then((thought) =>
    !thought
    ? res.status(404).json({message: 'didnt find a thought with that ID'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
};