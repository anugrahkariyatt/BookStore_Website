import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken; 
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const secretKey = process.env.JWT_SECRET;

    const decode = jwt.verify(token, secretKey);

    req.user = decode;
    console.log(">>>>>>hhh>>>>>>", req.user);

    next();
  } catch (err) {
    console.log("error", err.message);

    return res.status(401).json({
      error: err.message || "Invalid token",
    });
  }
};
