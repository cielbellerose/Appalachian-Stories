export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`User ${req.user.id} authenticated`);
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
};
