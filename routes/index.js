const router = require('express').Router();

router.use('/teams', require('./teams'));
router.use('/players', require('./players'));

router.get('/', (req, res) => {
  res.status(200).send(
    'Soccer API is running. Visit /api-docs for documentation, /teams and /players for data.'
  );
});

module.exports = router;
