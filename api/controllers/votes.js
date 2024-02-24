import Votes from "../models/Votes.js";
import { createError } from "../utils/error.js";

export const createVotes = async (req, res, next) => {
    const newVotes = new Votes(req.body)

    try {
        const savedVotes = await newVotes.save()
        res.status(200).json(savedVotes)
    } catch (error) {
        next(error)
    }
}

export const getMyVotes = async (req, res, next) => {
    try {
        const votes = await Votes.find({ userId: `${req.params.userId}` })
        res.status(200).json(votes)
    } catch (error) {
        next(error)
    }
}