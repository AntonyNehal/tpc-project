import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const test=(req,res)=>{
    res.json({message:'api is working'});
};
// export const registerStudent = async (req, res) => {
//     try {
//       const newUser = new User(req.body);
//       await newUser.save();
//       res.status(201).json({ message: "Student registered successfully!" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error registering student", error });
//     }
//   };
// 
export const registerStudent = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { name, dob, email, phone, registerNumber, image, password, ...otherFields } = req.body;

    // Validate required fields
    if (!name || !dob || !email || !phone || !registerNumber || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

    // Create a new student record
    const newUser = new User({
      name,
      dob,
      email,
      phone,
      registerNumber,
      image,
      password: hashedPassword, // Save the hashed password
      ...otherFields,
    });

    await newUser.save();
    res.status(201).json({ message: "Student registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Error registering student", error: error.message });
  }
};

export const Login = async (req, res) => {
  const { name, password } = req.body;

  // Check if both fields are provided
  if (!name || !password || name === '' || password === '') {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find user by name
    const validUser = await User.findOne({ name });
    if (!validUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid name or password' });
    }

    // Send response without password
    const { password: pass, ...rest } = validUser._doc;
    res.status(200).json({ ...rest }); // Send user data back
  } catch (err) {
    console.error('Login error:', err); // Log error details for debugging
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Route to get the current user
export const username = async (req, res) =>{
  try {
    const user = await User.findById(req.userId); // Ensure req.userId is correctly populated
    if (user) {
      res.json({
        name: user.name,
        image: user.image,
        branch: user.branch,
        semester: user.semester,
        phone: user.phone,
        email: user.email,
        address: user.address,
        gender: user.gender,
        dob: user.dob,
        nationality: user.nationality,
        skills: user.skills, // Assuming skills is an array in your user model
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
};