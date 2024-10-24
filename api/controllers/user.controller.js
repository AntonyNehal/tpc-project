import User from "../models/user.model.js";
export const test=(req,res)=>{
    res.json({message:'api is working'});
};
export const registerStudent = async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: "Student registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registering student", error });
    }
  };