const jwt = require("jsonwebtoken");

const { User } = require("../models/user.js");

const { SECRET_KEY_ACCESS } = process.env;

const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, accessToken] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(accessToken, SECRET_KEY_ACCESS);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, "User not found"));
    }
    if (!user.accessToken) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authenticate;
