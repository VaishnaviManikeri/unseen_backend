const express = require('express');
const multer = require('multer');
const {
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllBlogs);
router.get('/admin/all', authMiddleware, getAllBlogsAdmin);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);
router.post('/', authMiddleware, upload.single('featuredImage'), createBlog);
router.put('/:id', authMiddleware, upload.single('featuredImage'), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;