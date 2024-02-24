import mongoose from 'mongoose';

const { Schema } = mongoose;

const VotesSchema = new mongoose.Schema({

    surveyId: {
        type: String
    },
    userId: {
        type: String
    },
    votes: {
        type: [{}]
    }

    /*userId:{
        type:String 
    },
    surveyId:{
        type:String 
    },
    optionId:{
        type:String
    } */
});

export default mongoose.model("Votes", VotesSchema);