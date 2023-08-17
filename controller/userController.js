const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// @desc  Register new user
// @route POST /user/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // verify that all fields were field
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "A user with that email already exists" });
      } else {
        return res
          .status(400)
          .json({ message: "Username taken. Please choose another username" });
      }
    }

    const newUser = await User.create({ username, email, password });

    if (newUser) {
      res.status(200).json({
        user: {
          id: newUser._id,
          username: newUser.username,
          favorites: newUser.favorites,
        },
        token: generateToken({ id: newUser._id, email: newUser.email }),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc  Register new user
// @route POST /user/register
// @access Public
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // verify that all fields were field
    if (!username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // check that user exist
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // compare password
    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        favorites: user.favorites,
      },
      token: generateToken({ id: user._id, email: user.email }),
    });
  } catch (error) {
    console.log(error);
  }
};

const generateToken = ({ id, email }) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser };
