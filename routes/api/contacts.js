const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const router = express.Router();

const { schemas } = require("../../models/contact");

const { validateBody, validateFavorite } = require("../../decorators");

const { isValidId } = require("../../helpers");

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
