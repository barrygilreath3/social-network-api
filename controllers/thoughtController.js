const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find().then((response) => res.json(response)).catch(error => res.status(500).json(error))
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => thought ? res.json(thought) : res.status(404).json({ message: 'No thought with that ID' }))
        .catch((error) => res.status(500).json(error));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'Thought created, but found no user with that ID',
          })
          : res.json('Created the thought')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true, runValidators: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'There is no thought here to find.',
            })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions:req.params.reactionId}}, {new:true})
    .then((thought) => {
        if(!thought) {
            return res.status(404).json({msg: 'No thought with this ID'})
        }
    })
      .then(() => res.json({ message: 'Thought has been interacted with!' }))
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends:req.params.friendId}}, {new:true})
    .then((thought) => {
        if(!thought) {
            return res.status(404).json({msg: 'No thought with this ID'})
        }
    })
      .then(() => res.json({ message: 'This thought reaction has been DELETED!' }))
      .catch((err) => res.status(500).json(err));
  },
  
}