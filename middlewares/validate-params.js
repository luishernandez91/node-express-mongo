const {validationResult} = require("express-validator");

const validateParams = (req, res, next) => {
    const paramsError = validationResult(req);

    if (!paramsError.isEmpty()) {
        return res.status(400).json({
            message: 'Params errors',
            error: paramsError.mapped()
        });
    }
    next();
};

module.exports = {validateParams};
