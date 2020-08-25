const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {generateJWT} = require("../helpers/jwt");

const login = async (req, res) => {
    const {email, password} = req.body;
    try {

        const userDb = await User.findOne({email});

        if (!userDb) {
            return res.status(500).json({
                message: 'Invalid credentials'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDb.password);

        if (!validPassword) {
            return res.status(500).json({
                message: 'Invalid credentials (pass)'
            });
        }

        const token = await generateJWT(userDb.id);

        return res.status(200).json({message: 'in login', ...req.body, token});
    } catch (e) {
        return res.status(500).json({...e});
    }
};

module.exports = {login};
