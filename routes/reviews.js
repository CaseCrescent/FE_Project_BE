const express = require('express');
const { getReviews, addReview, updateReview, deleteReview, likeReview } = require('../controllers/reviews');

const router = express.Router({ mergeParams: true });

const { protect, checkBanned } = require('../middleware/auth');

router.route('/')
    .get(getReviews)
    .post(protect, checkBanned, addReview);

router.route('/:id')
    .put(protect, checkBanned, updateReview)
    .delete(protect, checkBanned, deleteReview);

router.route('/:id/like')
    .put(protect, checkBanned, likeReview);

module.exports = router;
