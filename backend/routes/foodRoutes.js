import express from 'express';
import Food from '../models/food.js';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const foodRoutes = express.Router();

// Set storage destination and filename for the uploaded image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as filename
  },
});

const upload = multer({ storage: storage });

// Add new food item (Admin Only)
// Existing route for file uploads
foodRoutes.post('/add-with-file', upload.single('image'), async (req, res) => {
  const { name, calories, category } = req.body;

  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newFood = new Food({
      name,
      calories,
      category,
      imageUrl,
    });

    await newFood.save();
    res.status(201).json({ message: 'Food item added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// New route for URL submissions
foodRoutes.post('/add', async (req, res) => {
  try {
    console.log('Received data:', req.body);  // Debug log
    
    const { name, calories, category, imageUrl } = req.body;
    
    const newFood = new Food({
      name,
      calories,
      category,
      imageUrl: imageUrl || ''  // Use empty string if imageUrl is not provided
    });

    const savedFood = await newFood.save();
    console.log('Saved food:', savedFood);  // Debug log
    
    res.status(201).json({ 
      message: 'Food item added successfully',
      food: savedFood 
    });
  } catch (err) {
    console.error('Error saving food:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all food items
foodRoutes.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// In your foodRoutes.js
foodRoutes.get('/search?', async (req, res) => {
  try {
    const { name } = req.query;

    let searchData = {};

    if(name) {
      searchData.name = { $regex: name, $options: 'i' };
    }

    const data = await Food.find(searchData);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
});

export default foodRoutes;
