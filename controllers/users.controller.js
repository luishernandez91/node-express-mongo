const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../helpers/jwt");

/**
 * Retrieves all users in database
 */
const getUsers = async (req, res) => {
    const users = await User.find({}, 'name email role google');
    return res.status(200).json({users, consultant: req.uid});
};
/**
 * Creates new user with required params
 */
const createUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const notUniqueEmail = await User.findOne({email});

        if (notUniqueEmail) {
            return res.status(500).json({
                message: 'This email address has already been used'
            });
        }

        const user = new User(req.body);
        // Crypt password
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        // Store user
        await user.save();

        const token = await generateJWT(user.id);

        return res.status(200).json({message: 'creating user', user, token});
    } catch (e) {
        return res.status(500).json({...e});
    }
};
/**
 * Updates user info by id
 */
const updateUser = async (req, res) => {

    const uid = req.params.id;

    try {
        const dbUser = await User.findById(uid);
        if (!dbUser) {
            return res.status(404).json({
                message: `User with id ${uid} does not exist`
            });
        }

        const {password, google, email, ...fields} = req.body;

        if (dbUser.email !== email) {
            // Validates unique email
            const uniqEmail = await User.findOne({email});
            if (uniqEmail) {
                return res.status(500).json({
                    message: 'This email account is already registered'
                });
            }
        }

        const updated = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.status(200).json({
            message: 'Updated user',
            user: updated
        });
    } catch (e) {
        return res.status(500).json({...e});
    }
};

/**
 * Delete user by id
 */
const deleteUser = async (req, res) => {
    const uid = req.params.id;
    try {
        const dbUser = await User.findById(uid);
        if (!dbUser) {
            return res.status(404).json({
                message: `User with id ${uid} does not exist`
            });
        }

        await User.findByIdAndDelete(uid);

        return res.status(200).json({
            message: `User with id ${uid} has been deleted`,
        });
    } catch (e) {
        return res.status(500).json({...e});
    }
};

module.exports = {getUsers, createUser, updateUser, deleteUser};
