// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other','Male'],
    required: true,
  },
  differentlyAbled: {
    type: String,
    enum: ["yes", "no"],
  },
  areaOfInterest: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  cgpa: {
    type: String,
    required: true,
  },
  registerNumber: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
},
skills: { type: [String], default: [] }, // Array for skills
documents: { type: [String], default: [] }, // Array for documents URLs
resume: { type: String }, // URL for the uploaded resume
isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
