import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { createError } from "../utils/error.js";
import { tokenVerify, userVerify, adminVerify } from "../utils/tokenVerify.js"; 
import rateLimit from 'express-rate-limit';
const router = express.Router();

const apiLimitMin = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,  
    message:
        'You sent too many requests, please try again later.',
    standardHeaders: true, 
    legacyHeaders: false, 
})

//AUTHENTICATION CHECK 
router.get("/authenticationcheck", apiLimitMin, tokenVerify, (req, res, next) => {
    req.apiLimitMin;
    res.send("You are logged!")
});

//USER CHECK
router.get("/usercheck/:id", apiLimitMin, userVerify, (req, res, next) => {
    req.apiLimitMin;
    res.send("hello user");
});

//ADMIN CHECK
router.get("/admincheck/:id", apiLimitMin, adminVerify, (req, res, next) => {
    req.apiLimitMin;
    res.send("hello admin");
});

//UPDATE
router.put("/:id", apiLimitMin, updateUser, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});


//DELETE
router.delete("/:id", apiLimitMin, deleteUser, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//GET
router.get("/:id", apiLimitMin, getUser, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
}); 

//GET ALL

router.get("/", apiLimitMin, getUsers, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});


export default router
 