const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');
const {
  validate,
  playerIdRules,
  playerCreateRules,
  playerUpdateRules
} = require('../middleware/playerValidation');

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of players
 */
router.get('/', playersController.getAllPlayers);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a single player by id
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single player
 *       404:
 *         description: Player not found
 */
router.get('/:id', playerIdRules, validate, playersController.getSinglePlayer);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     responses:
 *       201:
 *         description: Player created
 *       400:
 *         description: Validation error
 */
router.post('/', playerCreateRules, validate, playersController.createPlayer);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Update an existing player
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Player updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Player not found
 */
router.put('/:id', playerIdRules, playerUpdateRules, validate, playersController.updatePlayer);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Player deleted
 *       404:
 *         description: Player not found
 */
router.delete('/:id', playerIdRules, validate, playersController.deletePlayer);

module.exports = router;
