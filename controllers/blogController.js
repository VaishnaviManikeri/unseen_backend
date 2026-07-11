const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blogs for admin
const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single blog by slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single blog by id (admin)
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create blog
const createBlog = async (req, res) => {
  try {
    const { title, slug, metaTitle, metaDescription, content, author, tags, status } = req.body;
    
    let featuredImage = '';
    let cloudinaryId = '';
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blogs',
      });
      featuredImage = result.secure_url;
      cloudinaryId = result.public_id;
    }
    
    // Calculate reading time (approx 200 words per minute)
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    
    const blog = new Blog({
      title,
      slug,
      metaTitle,
      metaDescription,
      content,
      author: author || 'Admin',
      featuredImage,
      cloudinaryId,
      readingTime,
      tags: tags ? tags.split(',') : [],
      status: status || 'published',
    });
    
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    const { title, slug, metaTitle, metaDescription, content, author, tags, status } = req.body;
    
    if (req.file) {
      if (blog.cloudinaryId) {
        await cloudinary.uploader.destroy(blog.cloudinaryId);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blogs',
      });
      blog.featuredImage = result.secure_url;
      blog.cloudinaryId = result.public_id;
    }
    
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    
    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.metaTitle = metaTitle || blog.metaTitle;
    blog.metaDescription = metaDescription || blog.metaDescription;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.tags = tags ? tags.split(',') : blog.tags;
    blog.status = status || blog.status;
    blog.readingTime = readingTime;
    
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    if (blog.cloudinaryId) {
      await cloudinary.uploader.destroy(blog.cloudinaryId);
    }
    
    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};