import express from "express";
import Surveys from "../models/Surveys.js"
import { createError } from "../utils/error.js";
import { createSurvey, updateSurvey, deleteSurvey, getSurvey, getSurveys, updateRatings, getPendings, getOpened, getMySurveys, getMySurveyHistory } from "../controllers/surveys.js";
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
router.post("/", apiLimitMin, createSurvey, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//UPDATE
router.put("/:id", apiLimitMin, updateSurvey, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//UPDATE RATINGS
router.put("/ratings/:id/:userId", apiLimitMin, updateRatings, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//DELETE
router.delete("/:id", apiLimitMin, deleteSurvey, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//GET
router.get("/:id", apiLimitMin, getSurvey, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});


//GET ALL
router.get("/", apiLimitMin, getSurveys, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//GET OPEN SURVEYS
router.get("/opened/:status", apiLimitMin, getOpened, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

//GET PENDINGS
router.get("/pending/:status", apiLimitMin, getPendings, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
});

// GET MY SURVEYS
router.get("/getmysurvey/:created", apiLimitMin, getMySurveys, (req, res) => {
    req.apiLimitMin;
    res.status(429).json();
})

//GET MY HISTORY
router.get("/getmyhistory/:userid", apiLimitMin, getMySurveyHistory, (req,res) => {
    req.apiLimitMin;
    res.status(429).json();
})

export default router