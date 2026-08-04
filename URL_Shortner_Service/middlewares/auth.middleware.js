import { validateUserToken } from "../utils/token.js";
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return next();

  if (!authHeader.startsWith("Bearer "))
    return res
      .status(400)
      .json({ error: "Authorization must starts with Bearer" });

  const token = authHeader.slice(7).trim();

  if (!token)
    return res
      .status(400)
      .json({ error: "Token is missing from Authorization header" });

  const payload = validateUserToken(token) ; 

  req.user = payload ; 

  next() ; 
};


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export const authValidator = async(req,res,next) => {
  if(!req.user || !req.user.id)  return res
      .status(401)
      .json({ error: "You must loggin to access this service" });

  next() ; 
} 
