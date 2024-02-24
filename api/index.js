
import express from "express"; 
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import surveysRoute from "./routes/surveys.js"; 
import votesRoute from "./routes/votes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongo")
} catch {
    throw error;
} 
};

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected.");
});

/*
mongoose.connection.on("connected", () => {
    console.log("mongodb connected.");
});
*/



app.get("/", (req,res)=> {
    res.send("request");
});

//middlewares 
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/surveys", surveysRoute);
app.use("/api/votes", votesRoute);

app.use((error, req, res, next) => {

    const errorStatus = error.status || 500
    const errorMessage = error.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:error.stack,
    })
})

/*
app.listen(process.env.PORT, "0.0.0.0", () => {
    connect();
    console.log("connected to backend.");
});
*/

app.listen(8800, () => {
    connect();
    console.log("connected to backend");
});