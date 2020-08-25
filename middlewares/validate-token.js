const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'No provided token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (e) {
        return res.status(500).json({message: 'Invalid token'});
    }
};

module.exports = {validateToken};
