import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { json } from "express";

export const tokenVerify = (req,res,next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return next(createError(401, "Not Authenticated!"))
    }

    jwt.verify(token,process.env.jwt, (error,user) => {
        if(error)
        return next(createError(403, "Not valid token!"));

        req.user = user; next();
   

    })
};

export const userVerify = (req, res, next) => {
    tokenVerify(req, res,  () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Not Authorized!"));
        }
    })
};

export const adminVerify = (req, res, next) => {
    tokenVerify(req, res,  () => {
        json(req);
        if(req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Not Authenticated!"));
        }
    })
}