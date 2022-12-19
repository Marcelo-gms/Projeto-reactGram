const User = require("../models/User");

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ errors: ["acesso negado!"] });

  try {
    const varified = jwt.verify(token, jwtSecret);
    req.user = await User.findById(varified.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};


module.exports = authGuard