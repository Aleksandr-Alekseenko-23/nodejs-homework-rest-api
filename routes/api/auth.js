const express = require("express");

const ctrl = require("../../controlles/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

console.log(schemas.registerSchema);

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
