const express = require('express');
const {
  getAllCareers,
  getActiveCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected admin routes — must be before /:id to avoid "all" being treated as an ID
router.get('/all', authMiddleware, getAllCareers);
router.post('/', authMiddleware, createCareer);
router.put('/:id', authMiddleware, updateCareer);
router.delete('/:id', authMiddleware, deleteCareer);

// Public routes
router.get('/', getActiveCareers);
router.get('/:id', getCareerById);

module.exports = router;