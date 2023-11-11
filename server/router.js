const router = require('express').Router();
const userController = require('./controllers/user.js');
const groupController = require('./controllers/groups.js')
const authRequired = require('./middlewares/validateToken.js');

//user register, login, getprofile, logout
router.post('/register', userController.create);
router.post('/login', userController.login);
router.post('/logout', userController.logout)
router.get('/profile', authRequired,userController.profile)


//create group, join group
router.post('/createGroup', groupController.createGroup);
router.post('/joinGroup', groupController.joinGroup);

module.exports = router;