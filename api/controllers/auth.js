import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const register = async (req,res,next) => {
    try { 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({ 
            name:req.body.name,
            surname:req.body.surname,
            username:req.body.username,
            csprpublickey:req.body.csprpublickey,
            email:req.body.email, 
            gender:req.body.gender,
            country:req.body.country,
            yob:req.body.yob,
            password:hash,
        });
 
        const userExists = await User.findOne({username: newUser.username});
        const mailExists = await User.findOne({email: newUser.email});

        if(userExists) return next(createError(400, "User already exists."));
        if(mailExists) return next(createError(400, "Mail already exists."));
         
        await newUser.save()
        res.status(200).json("Registration completed successfully.")
         
    } catch (error) {
     next(error)
    }
};

export const login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username:`${username}`});
        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            user.password
        );

        if(!isPasswordCorrect) 
        return next(createError(400, "Wrong password or username!"));
        
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.jwt);

        const {password, isAdmin, ...all} = user._doc;

        res.cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json({...all, isAdmin});

    } catch (error) {
        next(error)
    }
};