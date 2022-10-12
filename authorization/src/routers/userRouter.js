const Router = require("express");
const router = Router();
const controller = require("../controllers/userController");
const getMeMeddleware = require("../middleware/getMeMiddleware");
const refreshMiddleware = require("../middleware/refreshMiddleware");

router.post("/sign_up", controller.signUp);
router.post("/login?:credentials", controller.signIn);
router.post("/refresh", refreshMiddleware, controller.refresh);
router.get("/me[0-9]", getMeMeddleware, controller.getMe);

module.exports = router;