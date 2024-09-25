import asyncHandler from "express-async-handler";
import Jwt from "jsonwebtoken";

export const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer"
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    try {
      // Verify token using the secret
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);

      // Attach the decoded user info to the request object
      req.user = decoded.user;
    
      // Proceed to the next middleware or route handler
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401);
      throw new Error("User is not authorized, token verification failed");
    }
    
  } else {
    res.status(401);
    throw new Error("Authorization token is missing or invalid");
  }
});
