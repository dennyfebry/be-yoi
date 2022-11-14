const express = require("express");
const router = express.Router();
const controller = require("../controllers/WishlistController");

router.get("/wishlist", controller.getData);
router.get("/wishlist/:id",  controller.getDataById);
router.post("/wishlist",  controller.insertData);
router.delete("/wishlist/:id",  controller.deleteData);

module.exports = router;