const Career = require('../models/Career');

// Get all careers (admin)
const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    console.error('Error fetching all careers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get active careers (public frontend)
const getActiveCareers = async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    console.error('Error fetching active careers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single career by ID
const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (error) {
    console.error('Error fetching career by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper: normalise requirements to a string array
const parseRequirements = (requirements) => {
  if (!requirements) return [];
  if (Array.isArray(requirements)) return requirements.map((r) => r.trim()).filter(Boolean);
  if (typeof requirements === 'string') {
    return requirements.split(',').map((r) => r.trim()).filter(Boolean);
  }
  return [];
};

// Create career
const createCareer = async (req, res) => {
  try {
    console.log('Received career data:', req.body);

    const { title, department, location, type, description, requirements, salary, isActive } = req.body;

    if (!title || !department || !location || !description) {
      return res.status(400).json({ message: 'Please provide all required fields: title, department, location, description' });
    }

    const career = new Career({
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: type || 'Full-time',
      description: description.trim(),
      requirements: parseRequirements(requirements),
      salary: salary || '',
      isActive: isActive !== undefined ? isActive : true,
    });

    await career.save();
    console.log('Career created successfully:', career._id);
    res.status(201).json(career);
  } catch (error) {
    console.error('Error creating career:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update career
const updateCareer = async (req, res) => {
  try {
    console.log('Updating career:', req.params.id);
    console.log('Update data:', req.body);

    const { title, department, location, type, description, requirements, salary, isActive } = req.body;

    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    if (title !== undefined) career.title = title.trim();
    if (department !== undefined) career.department = department.trim();
    if (location !== undefined) career.location = location.trim();
    if (type !== undefined) career.type = type;
    if (description !== undefined) career.description = description.trim();
    if (requirements !== undefined) career.requirements = parseRequirements(requirements);
    if (salary !== undefined) career.salary = salary;
    if (isActive !== undefined) career.isActive = isActive;

    await career.save();
    console.log('Career updated successfully:', career._id);
    res.json(career);
  } catch (error) {
    console.error('Error updating career:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete career
const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    await career.deleteOne();
    console.log('Career deleted successfully:', req.params.id);
    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    console.error('Error deleting career:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllCareers,
  getActiveCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
};