const express = require("express");
const router = express.Router();
const controller = require("../controllers/WishlistController");
const upload = require("multer")();

// router.get("/wishlist", upload.any(), controller.getData);
router.get("/wishlist/:userId", upload.any(), controller.getDataByUserId);
router.post("/wishlist", upload.any(), controller.insertData);
router.put("/wishlist/:id", upload.any(), controller.updateData);
router.delete("/wishlist/:id", upload.any(), controller.deleteData);

module.exports = router;
