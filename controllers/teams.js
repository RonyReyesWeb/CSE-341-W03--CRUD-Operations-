const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const COLLECTION = 'teams';

const getAllTeams = async (req, res) => {
  try {
    const db = getDb();
    const teams = await db.collection(COLLECTION).find().toArray();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving teams', error: err.message });
  }
};

const getSingleTeam = async (req, res) => {
  try {
    const db = getDb();
    const team = await db.collection(COLLECTION).findOne({ _id: new ObjectId(req.params.id) });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving team', error: err.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const db = getDb();
    const newTeam = {
      name: req.body.name,
      country: req.body.country,
      league: req.body.league,
      foundedYear: req.body.foundedYear,
      stadium: req.body.stadium
    };

    const result = await db.collection(COLLECTION).insertOne(newTeam);
    res.status(201).json({ id: result.insertedId, ...newTeam });
  } catch (err) {
    res.status(500).json({ message: 'Error creating team', error: err.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const db = getDb();
    const teamId = new ObjectId(req.params.id);

    const updatedTeam = {
      name: req.body.name,
      country: req.body.country,
      league: req.body.league,
      foundedYear: req.body.foundedYear,
      stadium: req.body.stadium
    };

    const result = await db.collection(COLLECTION).replaceOne({ _id: teamId }, updatedTeam);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json({ id: req.params.id, ...updatedTeam });
  } catch (err) {
    res.status(500).json({ message: 'Error updating team', error: err.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting team', error: err.message });
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam
};
