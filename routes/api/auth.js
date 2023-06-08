const express = require("express");
const auth = require("../../controllers/auth");
const { validateBody } = require("../../decorators/index");
const { userJoiSchema } = require("../../schemasJoi/schemasJoi");
const { authenticate, upload } = require("../../middleware");
const { validateSubscription } = require("../../decorators");
const {
  subscriptionSchema,
  userEmailSchema,
} = require("../../schemasJoi/schemasJoi");

const router = express.Router();

router.post(
  "/register",
  validateBody(userJoiSchema.registerSchema),
  auth.register
);

router.get("/users/verify/:verificationToken", auth.verify);

router.post(
  "/users/verify",
  validateBody(userEmailSchema),
  auth.resendVerifyEmail
);

router.post("/login", validateBody(userJoiSchema.loginSchema), auth.login);

router.get("/users/current", authenticate, auth.getCurrent);

router.post("/logout", authenticate, auth.logout);

router.patch(
  "/users",
  authenticate,
  validateSubscription(subscriptionSchema),
  auth.subscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  auth.updateAvatar
);
module.exports = router;
