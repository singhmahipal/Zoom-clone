import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      
      return res.status(httpStatus.OK).json({ 
        token: token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username
        }
      });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid password" });
    }
  } catch (error) {
    return res.status(500).json({ message: `something went wrong ${error}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "user created" });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    res.status(500).json({ message: "Registration failed" });
  }
};

export { login, register };