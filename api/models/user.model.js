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
    required: true,
  },
  gender: {
    type: String,
    enum: ["female", "male", "other"],
    required: true,
  },
  differentlyAbled: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  areaOfInterest: {
    type: String,
    required: true,
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
  registerNumber: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
