const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer();

const controller = require('../../controller/admin/product.controller');
const uploadCloud = require('../../middleware/uploadCloud.middleware');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create',
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  controller.createPost
);

router.patch('/change-status', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', 
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  controller.editPatch
);

router.patch('/delete', controller.delete);

router.patch('/change-position', controller.changePosition);

module.exports = router;