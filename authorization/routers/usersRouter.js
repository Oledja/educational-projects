const Router = require('express');
const router = Router();
const controller = require('../controllers/usersController');
const usersMiddelware = require('../middleware/usersMiddleware');
const refreshMiddleware = require('../middleware/refreshMiddleware');

router.post("/sign_up", controller.signUp);
router.post("/login", controller.login);
router.post("/refresh", refreshMiddleware, controller.refresh);
router.get("/me[0-9]", usersMiddelware, controller.getMe);

module.exports = router;