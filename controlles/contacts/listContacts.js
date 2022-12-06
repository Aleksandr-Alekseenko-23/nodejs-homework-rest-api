const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  if (page <= 0) {
    next(HttpError(400, "Invalid page number,should start with 1"));
  }
  // if (favorite !== true || favorite !== false) {
  //   next(
  //     HttpError(
  //       400,
  //       `Invalid favorite value, please select a valid favorite value`
  //     )
  //   );
  // }
  const skip = (page - 1) * 20;
  const result = await Contact.find(
    {
      owner,
      favorite: favorite === undefined ? { $in: [true, false] } : favorite,
    },
    "",
    {
      skip,
      limit: +limit,
    }
  ).populate("owner", "name email");
  res.json(result);
};

module.exports = listContacts;
