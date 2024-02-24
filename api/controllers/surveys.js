import Surveys from "../models/Surveys.js"
import Votes from "../models/Votes.js";
import { createError } from "../utils/error.js";
 

export const createSurvey = async (req, res, next) => {
    const newSurvey = new Surveys(req.body)

    try {
        const savedSurvey = await newSurvey.save()
        res.status(200).json(savedSurvey)
    } catch (error) {
        next(error)
    }
}

//update survey
 
export const updateSurvey = async (req, res, next) => {
     
    try {
        const updatedSurvey = await Surveys.findByIdAndUpdate(
            req.params.id,
            { $set: {status:req.body.status} },
            { new: true }
        );
        res.status(200).json(updatedSurvey)
    } catch (error) {
        next(error)
    }
}
 
//update ratings
export const updateRatings = async (req, res, next) => {

    const arr = req.body;
 
    const dataVotes = { surveyId:req.params.id, userId:req.params.userId, votes: req.body }

    const newVotes = new Votes(dataVotes)

    try {
        const savedVotes = await newVotes.save()
        res.status(200).json(savedVotes)
        console.log(savedVotes)
    } catch (error) {
        next(error)
    }

    
    try {
        Object.keys(arr).forEach(async function (key) {
            // console.log(key) 
            Object.keys(arr[key]).forEach(async function (keys) {
                //console.log(key) +  console.log(keys) + console.log(arr[key][keys])

                const arrContent = `anyOf.${key}.Options.items.${keys}.rating`; 
                const updateRatings = await Surveys.updateOne(
                    { "_id": req.params.id },
                    {
                        $set: {
                            [arrContent]: Number(arr[key][keys])
                        },

                    }, 
                )
                res.status(200).json(updateRatings)
            })
        });
       
    } catch (error) {
        next(error.message)
    }


};

//delete survey
export const deleteSurvey = async (req, res, next) => {
    try {
        await Surveys.findByIdAndDelete(req.params.id)
        res.status(200).json("Survey has been deleted!")
    } catch (error) {
        next(error)
    }
}

//get survey
export const getSurvey = async (req, res, next) => {
    try {
        const survey = await Surveys.findById(req.params.id)
        res.status(200).json(survey)
    } catch (error) {
        next(error)
    }
}

//get surveys
export const getSurveys = async (req, res, next) => {
    try {
        const surveys = await Surveys.find().sort({ $natural: -1 })
        res.status(200).json(surveys)
    } catch (error) {
        next(error)
    }
}

//get pendings
export const getPendings = async (req, res, next) => {
    try {
        const pending = await Surveys.find({ status: req.params.status })
        res.status(200).json(pending)
    } catch (error) {
        next(error)
    }
}


//get opened surveys
export const getOpened = async (req, res, next) => {
    try {
        const opened = await Surveys.find({ status: req.params.status })
        res.status(200).json(opened)
    } catch (error) {
        next(error)
    }
}


export const getMySurveys = async (req, res, next) => {
    try {
        const mysurveys = await Surveys.find({ created: `${req.params.created}` })
        res.status(200).json(mysurveys)
    } catch (error) {
        next(error)
    }
}

export const getMySurveyHistory = async (req,res, next) => {
    try {
        const mysurveyhistory = await Surveys.find({userId:`${req.params.userId}` })
        res.status(200).json(mysurveyhistory)
    } catch (error) {
        next(error)
    }
}

export const surveysVotes = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}