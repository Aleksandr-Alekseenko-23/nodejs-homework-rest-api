const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateStatusSubscrition = require("./updateStatusSubscrition");
const refresh = require("./refresh");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateStatusSubscrition,
  refresh,
  updateAvatar,
  verify,
  resendEmail,
};
