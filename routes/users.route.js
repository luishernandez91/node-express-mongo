const {Router} = require('express');
const {getUsers, createUser, updateUser, deleteUser} = require("../controllers/users.controller");
const {newUserParams, updateUserParams} = require("../params/users.params");
const {validateToken} = require("../middlewares/validate-token");

const router = Router();

router.get('/', validateToken, getUsers);
router.post('/', [validateToken, ...newUserParams], createUser);
router.put('/:id', [validateToken, ...updateUserParams], updateUser);
router.delete('/:id', validateToken, deleteUser);

module.exports = router;
