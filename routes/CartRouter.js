const express = require("express");
const router = express.Router();
const controller = require("../controllers/CartController");

router.get("/cart/:id",  controller.getData);
router.post("/cart",  controller.addData);
router.put("/cart/:id",  controller.updateData);
router.delete("/cart/:id",  controller.deleteData);

module.exports = router;