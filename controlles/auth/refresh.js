const { User } = require("../../models/user");

const jwt = require("jsonwebtoken");

const { HttpError, createTokens } = require("../../helpers");
const { Error } = require("mongoose");

const { SECRET_KEY_REFRESH } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, SECRET_KEY_REFRESH);
    const user = await User.findById(id);
    if (!user && user.refreshToken !== token) {
      throw new Error("token expired");
    }

    const { accessToken, refreshToken } = await createTokens(id);

    await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = refresh;
