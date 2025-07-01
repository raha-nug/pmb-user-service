import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden (token tidak valid)
    }

    // Penting: Lampirkan payload user dari token ke objek request
    // agar bisa digunakan oleh controller selanjutnya.
    req.user = user;

    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next(); // User is admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Access denied. Admins only." }); // Forbidden
  }
};
