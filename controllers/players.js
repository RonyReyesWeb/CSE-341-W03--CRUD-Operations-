const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const COLLECTION = 'players';

const getAllPlayers = async (req, res) => {
  try {
    const db = getDb();
    const players = await db.collection(COLLECTION).find().toArray();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving players', error: err.message });
  }
};

const getSinglePlayer = async (req, res) => {
  try {
    const db = getDb();
    const player = await db.collection(COLLECTION).findOne({ _id: new ObjectId(req.params.id) });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving player', error: err.message });
  }
};

const createPlayer = async (req, res) => {
  try {
    const db = getDb();
    const newPlayer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      team: req.body.team,
      nationality: req.body.nationality,
      age: req.body.age,
      jerseyNumber: req.body.jerseyNumber,
      heightCm: req.body.heightCm
    };

    const result = await db.collection(COLLECTION).insertOne(newPlayer);
    res.status(201).json({ id: result.insertedId, ...newPlayer });
  } catch (err) {
    res.status(500).json({ message: 'Error creating player', error: err.message });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const db = getDb();
    const playerId = new ObjectId(req.params.id);

    const updatedPlayer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      team: req.body.team,
      nationality: req.body.nationality,
      age: req.body.age,
      jerseyNumber: req.body.jerseyNumber,
      heightCm: req.body.heightCm
    };

    const result = await db.collection(COLLECTION).replaceOne({ _id: playerId }, updatedPlayer);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json({ id: req.params.id, ...updatedPlayer });
  } catch (err) {
    res.status(500).json({ message: 'Error updating player', error: err.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting player', error: err.message });
  }
};

module.exports = {
  getAllPlayers,
  getSinglePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer
};
