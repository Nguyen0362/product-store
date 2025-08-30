const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer();

const controller = require('../../controller/admin/account.controller');
const uploadCloud = require('../../middleware/uploadCloud.middleware');
const valiate = require("../../validates/admin/account.validate");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post('/create',
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  valiate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch('/edit/:id',
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  controller.editPatch
);

router.patch("/delete", controller.delete);

router.get("/change-password/:id", controller.changePassword);

router.patch("/change-password/:id", controller.changePasswordPatch);

router.get("/detail/:id", controller.detail);

router.get("/friends", controller.friend);

module.exports = router;