const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth');
const testimonialController = require('../controller/testimonialController');
const upload = require('../services/multer');


router.post('/api/testimonial',auth,upload.single('uploadImage'),testimonialController.addData);
router.get('/api/testimonial/find',auth,testimonialController.findData);
router.get('/api/testimonial/find/:id',auth,testimonialController.findDataByid);
router.put('/api/testimonial/update/:id',auth,upload.single('uploadImage'),testimonialController.editData);
router.delete('/api/testimonial/delete/:id',auth,testimonialController.deleteData);


module.exports = router;