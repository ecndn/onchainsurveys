import mongoose from 'mongoose';

const { Schema } = mongoose;

const SurveysSchema = new mongoose.Schema({
    surveyName: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: false
    },
    startDate: {
        type: String,
        required: false
    },
    endDate: {
        type: String,
        required: false
    },
 
    anyOf:[{ 
    }], 
  
    user_id: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Surveys", SurveysSchema);