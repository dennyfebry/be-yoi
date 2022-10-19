const express = require("express");
const router = express.Router();
const controller = require("../controllers/BannerController");
const upload = require("multer")();

router.get("/banner", upload.any(), controller.getData);
router.get("/banner/:id", upload.any(), controller.getDataById);
router.post("/banner", controller.insertData);
router.put("/banner/:id", controller.updateData);
router.delete("/banner/:id", upload.any(), controller.deleteData);

module.exports = router;
