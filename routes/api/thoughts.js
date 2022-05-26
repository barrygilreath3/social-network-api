const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,

} = require ('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').put(updateThought).delete(deleteThought);

// router.route('/:thoughtId/reactions/:reactionId').post(addReaction).delete(deleteReaction);

module.exports = router;