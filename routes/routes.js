let express = require('express');
let userController = require('../controllers/user');
let passport = require('passport');
let UPLOAD_PATH = 'uploads';

let router = express.Router();
let requireAuth = passport.authenticate('jwt', {session: false});

/**
 * Users
 */
router.post('/authenticate', userController.authenticate);
router.post('/adduser', userController.addNew);
router.post('/getuser', requireAuth, userController.getUser);
router.post('/updateuser', requireAuth, userController.updateUser);

/**
 * Check protected
 */
router.get('/protected', requireAuth, function (req, res) {
  res.send({success: true});
});

module.exports = router;

