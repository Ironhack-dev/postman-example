const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.use('/movies', require('./movies.routes'));
router.use('/comments', require('./comment.routes'));
router.use('/auth', require('./auth.routes'));

module.exports = router;
