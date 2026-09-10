const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const teamIdRules = [
  param('id').isMongoId().withMessage('Invalid team id format')
];

const teamCreateRules = [
  body('name').trim().notEmpty().withMessage('name is required').isString(),
  body('country').trim().notEmpty().withMessage('country is required').isString(),
  body('league').trim().notEmpty().withMessage('league is required').isString(),
  body('foundedYear').notEmpty().withMessage('foundedYear is required').isInt({ min: 1850, max: 2026 }).withMessage('foundedYear must be a valid year'),
  body('stadium').trim().notEmpty().withMessage('stadium is required').isString()
];

const teamUpdateRules = teamCreateRules;

module.exports = {
  validate,
  teamIdRules,
  teamCreateRules,
  teamUpdateRules
};
