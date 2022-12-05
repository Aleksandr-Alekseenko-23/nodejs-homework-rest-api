const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: _id });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
