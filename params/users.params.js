const {validateParams} = require("../middlewares/validate-params");
const {check} = require("express-validator");
/**
 * Required params to create new user
 */
const newUserParams = [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Invalid email pattern').isEmail(),
    validateParams
];
/**
 * Required params to update user info
 */
const updateUserParams = [
    check('name', 'Name is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Invalid email pattern').isEmail(),
    validateParams
];

module.exports = {newUserParams, updateUserParams};
