const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth');
const portfolioController = require('../controller/portfolioController');
const upload = require('../services/multer');

router.post('/api/portfolio',auth,upload.array('uploadImage'),portfolioController.addData);
router.get('/api/portfolio/find',auth,portfolioController.findData);
router.get('/api/portfolio/find/:id',auth,portfolioController.findDataByid);
router.put('/api/portfolio/update/:id',auth,upload.array('uploadImage'),portfolioController.editData);
router.delete('/api/portfolio/delete/:id',auth,portfolioController.deleteData);


module.exports = router;