export const verifyAdmin = (req, res, next) => {
  try {
    const role = req.user.role;

    if (role === "user")
      return res
        .status(403)
        .json({ error: "you don't have permission to access this feature" });
    next();
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Internal server error",
    });
  }
};
