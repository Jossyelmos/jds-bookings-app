const { Router } = require('express');
const {
    getRooms,
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom 
} = require('../controllers/roomController');

const router = Router();

// Get all rooms
router.get('/', getRooms);

// create rooom 
router.post('/', createRoom);

// get single room
router.get('/:id', getRoom);

// update room
router.put('/:id', updateRoom);

// delete room
router.delete('/:id', deleteRoom);

module.exports = router;