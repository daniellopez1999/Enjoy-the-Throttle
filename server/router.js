const router = require('express').Router();
const userController = require('./controllers/user.js');
const authMiddleware = require('./middlewares/auth');

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.profile)

module.exports = router;