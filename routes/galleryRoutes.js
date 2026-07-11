const express = require('express');
const multer = require('multer');
const {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllGallery);
router.get('/:id', getGalleryById);
router.post('/', authMiddleware, upload.single('image'), createGallery);
router.put('/:id', authMiddleware, upload.single('image'), updateGallery);
router.delete('/:id', authMiddleware, deleteGallery);

module.exports = router;