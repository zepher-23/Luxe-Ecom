const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authUser, registerUser, getUserProfile } = require('../controllers/userController');

router.post('/login', authUser);
router.post('/', registerUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
