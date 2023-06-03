const { HttpError } = require("../helpers");

const validateSubscription = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(400, "invalid subscription"));
    }
    next();
  };
};

module.exports = validateSubscription;
