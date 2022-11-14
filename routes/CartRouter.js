const express = require("express");
const router = express.Router();
const controller = require("../controllers/CartController");

router.get("/cart", controller.getData);
router.get("/cart/:id",  controller.getDataById);
router.post("/cart",  controller.insertData);
router.put("/cart/:id",  controller.updateData);
router.delete("/cart/:id",  controller.deleteData);

module.exports = router;