import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  code: {
    type: String,
    required: true,
  },
    category: {
    type: String,
    required: true,
  },
    status: {
    type: Boolean,
    required: true,
  },
    thumbnails: {
    type: [String],
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
