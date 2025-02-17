const fs = require("fs/promises");
const path = require("path");
const { HTTPError } = require("../../helpers");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  try {
    Jimp.read(tempUpload, (err, avatar) => {
      if (err) HTTPError(400);
      avatar.resize(250, 250).quality(60).write(resultUpload);
    });
  } catch (error) {
    return next(HTTPError(400, "Something went wrong!"));
  }
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
