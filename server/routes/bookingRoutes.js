const { Router } = require('express');
const { getBookings, createBooking, updateBooking, deleteBooking, getSingleBooking } = require('../controllers/bookingController');

const router = Router();

router.get('/', getBookings);

router.post('/', createBooking);

router.get('/:id', getSingleBooking);

router.put('/:id', updateBooking);

router.delete('/:id', deleteBooking);

module.exports = router;