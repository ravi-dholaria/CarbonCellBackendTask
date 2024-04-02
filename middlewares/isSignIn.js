import JWT from "jsonwebtoken";
import blacklist from "../data/blacklistedToken.js";

export const isSignIn = async (req, res, next) => {
  try {
    // Check if token is in the header
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized. Please login to continue.",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    // Check if token is in blacklist
    if (blacklist.has(token)) {
      return res.status(401).json({
        message: "Unauthorized. Please login to continue.",
      });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    next();
    req.user = decode;
  } catch (error) {
    // Check if token is expired or invalid and return appropriate message with status code 401.
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message: "Unauthorized. Please login to continue.",
        error: error,
      });
    }

    // Catch any other errors
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};
