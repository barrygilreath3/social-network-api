const { ObjectId } = require('mongoose');
const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((error) => res.status(500).json(error));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((error) => res.status(500).json(error));
    },

    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findByIdAndUpdate({ _id: req.params.userId }, {$set:req.body}, {new: true, runValidators:true})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => {
            if(!user) {
                return res.status(404).json({msg: 'No user with this ID'})
            }
        })
          .then(() => res.json({ message: 'User and associated apps deleted!' }))
          .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends:req.params.friendId}}, {new:true})
        .then((user) => {
            if(!user) {
                return res.status(404).json({msg: 'No user with this ID'})
            }
        })
          .then(() => res.json({ message: 'User has added a friend' }))
          .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends:req.params.friendId}}, {new:true})
        .then((user) => {
            if(!user) {
                return res.status(404).json({msg: 'No user with this ID'})
            }
        })
          .then(() => res.json({ message: 'User has removed a friend' }))
          .catch((err) => res.status(500).json(err));
    },
};