const express = require("express");
const auth = require("../../controllers/auth");

const router = express.Router();

const { validateBody } = require("../../decorators/index");
const { userJoiSchema } = require("../../schemasJoi/schemasJoi");

router.post(
  "/register",
  validateBody(userJoiSchema.registerSchema),
  auth.register
);

router.post("/login", validateBody(userJoiSchema.loginSchema), auth.login);

module.exports = router;
