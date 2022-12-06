const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateStatusSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = updateStatusSubscription;
