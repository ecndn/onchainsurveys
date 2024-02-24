import User from "../models/Users.js"

export const createUser = async (req, res, next) => {
    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        console.log(req);
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: {
                name:req.body.name,
                surname:req.body.surname, 
                username:req.body.username,
                csprpublickey:req.body.csprpublickey,
                gender:req.body.gender,
                country:req.body.country,
                yob:req.body.yob

                } 
            },
            { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted!")
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}