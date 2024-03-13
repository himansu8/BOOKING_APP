import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { createError } from '../utils/error.js';


const private_key = config.JWT;

export function verifyToken(req, res, next) {
  //console.log("header------------",req.headers.authorization);
  //console.log(req.headers)
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  // const decoded = jwt.verify(token, private_key);
  jwt.verify(token, private_key, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
 
  });
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
