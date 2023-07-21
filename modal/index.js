const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: String,
  image: String,
  readyInMinutes: Number,
  servings: Number,
  sourceUrl: String,
  ingredients: [{
    name: String,
    original: String,
    amount: Number,
    unit: String,
  }],
  instructions:{
    type:String,
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;