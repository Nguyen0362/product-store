const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer();

const controller = require("../../controller/admin/banner.controller");
const uploadCloud = require("../../middleware/uploadCloud.middleware");


router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", 
  upload.array('thumbnail', 4),
  uploadCloud.uploadMulti,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", 
  upload.array('thumbnail', 4),
  uploadCloud.uploadMulti,
  controller.editPatch
);

router.patch('/change-status', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.patch('/delete', controller.delete);

router.patch('/change-position', controller.changePosition);

router.get('/detail/:id', controller.detail);

module.exports = router;