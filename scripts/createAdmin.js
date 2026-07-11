const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
const nodeCrypto = require('crypto');

dotenv.config();

if (!globalThis.crypto && nodeCrypto.webcrypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
  global.crypto = nodeCrypto.webcrypto;
}

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123456',
    };
    
    const existingAdmin = await Admin.findOne({ username: adminData.username });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }
    
    const admin = new Admin(adminData);
    await admin.save();
    
    console.log('Admin created successfully!');
    console.log('Username:', adminData.username);
    console.log('Password:', adminData.password);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();