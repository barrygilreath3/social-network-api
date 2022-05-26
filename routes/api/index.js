const router = require('express').Router();

const thoughtRoutes = require('./thoughts');
const userRoutes = require('./users');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;