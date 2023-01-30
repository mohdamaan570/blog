const JWT = require('jsonwebtoken');
const userModel = require("../Models/userModel");

//Authenticating the User with Token from cookies.
module.exports.isAuthenticated = async (req, res, next) => {
    let { token } = req.cookies;
    if (!token) {
        return next(ErrorHandler.failure(res, 404, false, "Please login to access this resources!"));
    }
    let decodedData = await JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decodedData.id);
    next();
}


module.exports.isAuthorizedUser = async (req, res, next) => {
    if (!req.user.role.includes("admin")) {
        return next(ErrorHandler.failure(res, 404, false, "You are not authorized to access this resource!"));
    }
    next();
}