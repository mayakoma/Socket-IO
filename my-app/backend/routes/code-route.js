const express = require("express");
const codeController = require("../controllers/codeController");

const router = express.Router();

router.get("/get/:id", codeController.getCode);
router.get("/getList", codeController.getListCode);
router.post("/edit", codeController.editCode);

module.exports = router;
