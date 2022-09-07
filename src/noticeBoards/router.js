const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.get("/boards", controller.getAll);
export default router;