import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as HTTP-only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  return token;
};

/*
 Generate Random JWT Secret: crypto.randomBytes(256).toString('base64');
*/
