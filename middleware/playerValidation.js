const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const playerIdRules = [
  param('id').isMongoId().withMessage('Invalid player id format')
];

const playerCreateRules = [
  body('firstName').trim().notEmpty().withMessage('firstName is required').isString(),
  body('lastName').trim().notEmpty().withMessage('lastName is required').isString(),
  body('position')
    .trim()
    .notEmpty()
    .withMessage('position is required')
    .isIn(['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Winger'])
    .withMessage('position must be one of Goalkeeper, Defender, Midfielder, Forward, Winger'),
  body('team').trim().notEmpty().withMessage('team is required').isString(),
  body('nationality').trim().notEmpty().withMessage('nationality is required').isString(),
  body('age').notEmpty().withMessage('age is required').isInt({ min: 14, max: 50 }).withMessage('age must be an integer between 14 and 50'),
  body('jerseyNumber').notEmpty().withMessage('jerseyNumber is required').isInt({ min: 1, max: 99 }).withMessage('jerseyNumber must be an integer between 1 and 99'),
  body('heightCm').notEmpty().withMessage('heightCm is required').isFloat({ min: 100, max: 250 }).withMessage('heightCm must be a number between 100 and 250')
];

// For PUT, allow the same rules but do not require every field to be resent if you prefer
// partial updates; here we require the full resource, matching typical PUT semantics.
const playerUpdateRules = playerCreateRules;

module.exports = {
  validate,
  playerIdRules,
  playerCreateRules,
  playerUpdateRules
};
