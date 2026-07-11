const Gallery = require('../models/Gallery');
const cloudinary = require('../config/cloudinary');

// Get all gallery items
const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single gallery item
const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create gallery item
const createGallery = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'gallery',
    });
    
    const gallery = new Gallery({
      title,
      description,
      category,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });
    
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update gallery item
const updateGallery = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const gallery = await Gallery.findById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    if (req.file) {
      await cloudinary.uploader.destroy(gallery.cloudinaryId);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'gallery',
      });
      gallery.imageUrl = result.secure_url;
      gallery.cloudinaryId = result.public_id;
    }
    
    gallery.title = title || gallery.title;
    gallery.description = description || gallery.description;
    gallery.category = category || gallery.category;
    
    await gallery.save();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete gallery item
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    await cloudinary.uploader.destroy(gallery.cloudinaryId);
    await gallery.deleteOne();
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};