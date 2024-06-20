const { Router } = require('express');
const { getBookings, createBooking, updateBooking, deleteBooking, getSingleBooking } = require('../controllers/bookingController');
const { auth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', auth, getBookings);

router.post('/', auth, createBooking);

router.get('/:id', getSingleBooking);

router.put('/:id', auth, updateBooking);

router.delete('/:id', auth, deleteBooking);

module.exports = router;