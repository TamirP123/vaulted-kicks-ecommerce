const { Schema, model } = require('mongoose');

const sneakerSchema = new Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex'],
    required: true,
  },
  sizes: [{
    size: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  releaseDate: {
    type: Date,
  },
  recommended: {
    type: Boolean,
    default: false,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  salePrice: {
    type: Number,
    min: 0,
  },
  autumn: {
    type: Boolean,
    default: false,
  },
});

const Sneaker = model('Sneaker', sneakerSchema);

module.exports = Sneaker;