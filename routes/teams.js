const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const {
  validate,
  teamIdRules,
  teamCreateRules,
  teamUpdateRules
} = require('../middleware/teamValidation');

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams
 */
router.get('/', teamsController.getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a single team by id
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single team
 *       404:
 *         description: Team not found
 */
router.get('/:id', teamIdRules, validate, teamsController.getSingleTeam);

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, country, league, foundedYear, stadium]
 *             properties:
 *               name:
 *                 type: string
 *                 example: FC Awesome
 *               country:
 *                 type: string
 *                 example: Guatemala
 *               league:
 *                 type: string
 *                 example: Liga Nacional
 *               foundedYear:
 *                 type: integer
 *                 example: 1998
 *               stadium:
 *                 type: string
 *                 example: Estadio Central
 *     responses:
 *       201:
 *         description: Team created
 *       400:
 *         description: Validation error
 */
router.post('/', teamCreateRules, validate, teamsController.createTeam);

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update an existing team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, country, league, foundedYear, stadium]
 *             properties:
 *               name:
 *                 type: string
 *                 example: FC Awesome
 *               country:
 *                 type: string
 *                 example: Guatemala
 *               league:
 *                 type: string
 *                 example: Liga Nacional
 *               foundedYear:
 *                 type: integer
 *                 example: 1998
 *               stadium:
 *                 type: string
 *                 example: Estadio Central
 *     responses:
 *       200:
 *         description: Team updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Team not found
 */
router.put('/:id', teamIdRules, teamUpdateRules, validate, teamsController.updateTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Team deleted
 *       404:
 *         description: Team not found
 */
router.delete('/:id', teamIdRules, validate, teamsController.deleteTeam);

module.exports = router;
