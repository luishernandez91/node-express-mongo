const {Router} = require('express');
const router = Router();
const {login} = require("../controllers/auth.controller");
const {loginParams} = require("../params/auth.params");

router.post('/', [...loginParams], login);

module.exports = router;
