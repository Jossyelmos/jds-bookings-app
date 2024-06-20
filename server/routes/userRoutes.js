const { Router } = require('express');
const { getUsers, createUser, loginUser, logoutUser } = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', auth, getUsers)

router.post('/', createUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;