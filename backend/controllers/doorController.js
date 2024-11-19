const Door = require('../models/Door');

const createDoor = async (req, res) => {
  const { doorCode, doorName, location } = req.body;

  try {
    const newDoor = new Door({
      doorCode,
      doorName,
      location,
    });

    const savedDoor = await newDoor.save();
    res.status(201).json(savedDoor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoorById = async (req, res) => {
  const { id } = req.params;

  try {
    const door = await Door.findById(id);
    if (!door) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.status(200).json(door);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDoor = async (req, res) => {
  const { id } = req.params;
  const { doorCode, doorName, location } = req.body;

  try {
    const updatedDoor = await Door.findByIdAndUpdate(
      id,
      { doorCode, doorName, location },
      { new: true, runValidators: true }
    );
    if (!updatedDoor) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.status(200).json(updatedDoor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDoor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoor = await Door.findByIdAndDelete(id);
    if (!deletedDoor) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.status(200).json({ message: 'Door deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDoor,
  getDoorById,
  updateDoor,
  deleteDoor,
};