const {validateParams} = require("../middlewares/validate-params");
const {check} = require("express-validator");
/**
 * Required params to login
 */
const loginParams = [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateParams
];

module.exports = {loginParams};
