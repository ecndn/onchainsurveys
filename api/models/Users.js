import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    surname:{
        type:String
    }, 
    username:{
        type:String,
        required:true,
        unique:true
    },
    csprpublickey:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
    },
    country:{
        type:String
    },
    yob:{
        type:Number, 
    }, 
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        default:0
    }, 
},{timestamps:true});

export default mongoose.model("User", UserSchema);