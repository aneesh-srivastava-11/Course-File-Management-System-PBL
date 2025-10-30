// middleware/errorMiddleware.js - generic error handler
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err);
  res.status(500).json({ message: "Server error", error: err.message || err });
};
