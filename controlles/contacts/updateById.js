const { Contact } = require("../../models/contact");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json(result);
};

module.exports = updateById;
