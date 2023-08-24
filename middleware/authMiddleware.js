const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization || req.headers.Authorization;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).send("Not Authorized, no token");
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err) {
        return res.status(401).send("Not Authorized, invalid token");
      }
      req.decodedUser = decodedUser;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateAccessToken = ({ id, email }) => {
  const accessToken = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return {
    accessToken,
  };
};

const generateRefreshToken = ({ id, username }) => {
  const refreshToken = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return {
    refreshToken,
  };
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
