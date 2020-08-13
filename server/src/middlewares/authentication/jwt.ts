import { Request, Response, NextFunction } from "express";
import { HTTP401Error } from "../../lib/httpErrors";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "HAHAHA"

declare global {
  namespace Express {
    interface Request {
      user: {
        username: string,
        name: string,
        email: string,
        role: string,
        id: string,
      }
    }
  }
}

export function extractUserFromHeader(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const validUser = jwt.verify(token, SECRET);
    const { username, name, email, role, id } = validUser;
    req.user = { username, name, email, role, id };
    next()
  } catch (e) {
    if (e.message.includes("jwt expired")) {
      throw new HTTP401Error("Login session expired. Please re-login.");
    }
    req.user = null;
    next()
  }
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  if (req.user != null) {
    next()
  } else {
    throw new HTTP401Error("Authentication failed for this protected route. Please Login and retry.")
  }
}

export function generateJWToken (user) {
  console.log(user);
  const SIGN_OPTIONS = { 
    expiresIn: "24h",
    issuer: "issue-tracker"
  }
  const token = jwt.sign(user, SECRET, SIGN_OPTIONS)
  return token
}

export default authenticate;
