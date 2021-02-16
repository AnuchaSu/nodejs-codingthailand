var express = require("express");
var router = express.Router();
const staffController = require("../controller/staffController");
const passportJWT = require("../middleware/passportJWT");

/* GET users listing. */
router.get("/", [passportJWT.isLogin], staffController.index);
router.post("/", staffController.insert);
router.get("/:id", staffController.show);
router.delete("/:id", staffController.delete);
router.put("/:id", staffController.update);

module.exports = router;
