const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.get("/boards", controller.getAll);
router.get("/boards/:id", controller.getOne);
router.post("/boards", controller.post);
router.patch("/boards/:id", controller.patch);
router.delete("/boards/:id", controller.delete);
module.exports = router;
