const crypto = require('crypto');
global.crypto = crypto;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
const corsMiddleware = require('./middleware/corsMiddleware');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const careerRoutes = require('./routes/careerRoutes');
const blogRoutes = require('./routes/blogRoutes');

const { createDefaultAdmin } = require('./controllers/adminController');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Allowed Origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

// CORS Middleware
app.use(corsMiddleware);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Enable preflight requests
app.options('*', cors());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/blogs', blogRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB successfully');

    await createDefaultAdmin();

    console.log('✅ Default admin created/verified');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);

    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. Run "mongod" in a separate terminal');
    console.log('3. Check MONGODB_URI inside .env');
  });

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  console.log(
    `✅ CORS enabled for origins: ${allowedOrigins.join(', ')}`
  );
});