const mongoose = require('mongoose');

// 1. Define the Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select:false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    otp:{
        type: String,
    },
    isVeryfide:{
      type:Boolean,
      default:false,
    },
    otpExpire:{
      type: Date,
    }
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true 
  }
);

// 2. Create the Model
const User = mongoose.model('User', userSchema);

module.exports = User;
