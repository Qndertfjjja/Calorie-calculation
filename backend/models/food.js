import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, default: '' }  // Set default empty string
});

const Food = mongoose.model('Food', foodSchema);

export default Food;