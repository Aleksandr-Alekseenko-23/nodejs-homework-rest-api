const express = require("express");

const ctrl = require("../../controlles/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateStatusSubscrition)
);

router.post(
  "/refresh",
  validateBody(schemas.refreshSchema),
  ctrlWrapper(ctrl.refresh)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validateBody(schemas.verifySchema),
  ctrlWrapper(ctrl.resendEmail)
);

module.exports = router;
