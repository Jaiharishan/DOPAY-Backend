require("dotenv").config({ path: "./env/.env" });
const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  try {
    const { auth_token } = req.headers;
    if (!auth_token) {
      return res.status(401).json({
        msg: "No token",
      });
    }
    jwt.verify(auth_token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({
          msg: "Invalid token or token expired",
        });
      }
      req.jwt_payload = decoded;
    });
    return next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = { verifyJWT };
