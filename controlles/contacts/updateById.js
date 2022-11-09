const contacts = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateById(id, req.body);
  res.json(result);
};

module.exports = updateById;
