const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "the-secretest-of-keys"; // use env var in production

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = authenticateToken;
