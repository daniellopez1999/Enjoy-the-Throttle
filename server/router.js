const router = require('express').Router();
const userController = require('./controllers/user.js');
const authRequired = require('./middlewares/validateToken.js');

router.post('/register', userController.create);
router.post('/login', userController.login);
router.post('/logout', userController.logout)
router.get('/profile', authRequired,userController.profile)

module.exports = router;