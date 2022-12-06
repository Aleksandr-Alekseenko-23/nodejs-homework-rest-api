const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateById;
