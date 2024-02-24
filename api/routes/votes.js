import express from "express";
import Votes from "../models/Votes.js" 
import { createVotes, getMyVotes } from "../controllers/votes.js"; 
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

//CREATE
router.post("/", apiLimitMin, createVotes, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//GET VOTES
router.get("/:userId", apiLimitMin, getMyVotes, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});


export default router