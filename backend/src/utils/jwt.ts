import jwt, { SignOptions } from "jsonwebtoken";

export function generateToken(payload: object, expiresIn = 60 * 60 * 24) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  return jwt.verify(token, JWT_SECRET);
}