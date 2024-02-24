import express from "express";
import { login, register } from "../controllers/auth.js";
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

router.post("/register", apiLimitMin, register, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});


router.post("/login", apiLimitMin, login, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});


export default router