const express = require('express');
const router = express();
const userController = require('../controller/userController');
const { auth, generateAuthToken } = require('../middleware/auth')
const upload = require('../services/multer');

    
 router.post('/register',upload.single('uploadImage'),userController.register);

 router.post('/login',generateAuthToken,userController.login);
 
 router.post('/forgetPassword',userController.forgetPassword);

 router.post('/verifyOtp', userController.verifyOtp);
 
 router.put('/updatePassword',userController.updatePassword);

 router.put('/resetPassword',auth,userController.resetPassword);

 router.get('/viewProfile',auth,userController.viewProfile);

 router.put('/editProfile', auth,upload.single('uploadImage'), userController.editProfile);

 router.get('/logout',auth,userController.logout);

module.exports=router;